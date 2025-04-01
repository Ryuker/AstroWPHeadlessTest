// @ts-nocheck
import { getImage } from 'astro/assets';
import pLimit from 'p-limit';
import { Buffer } from 'buffer'; // Ensure Buffer is imported

const WORDPRESS_API_URL = 'https://your-wordpress-site.com/wp-json/wp/v2/posts';
const POSTS_PER_PAGE = 10;  // Adjust as needed
const CONCURRENCY_LIMIT = 5; // Adjust as needed

async function fetchAllPosts() {
  let posts = [];
  let page = 1;
  let fetchedPosts;

  do {
    const response = await fetch(`${WORDPRESS_API_URL}?per_page=${POSTS_PER_PAGE}&page=${page}`);
    fetchedPosts = await response.json();
    posts = posts.concat(fetchedPosts);
    page++;
  } while (fetchedPosts.length === POSTS_PER_PAGE);

  return posts;
}

function extractImageUrls(posts: any[]): string[] {
  const imageUrls: string[] = [];
  posts.forEach(post => {
    const parser = new DOMParser();
    const doc = parser.parseFromString(post.content.rendered, 'text/html');
    const images = doc.querySelectorAll('img');
    images.forEach(img => {
      const src = img.getAttribute('src');
      if (src) {
        imageUrls.push(src);
      }
    });
  });
  return imageUrls;
}

async function downloadAndOptimizeImage(url: string) {
  const response = await fetch(url);
  const buffer = await response.arrayBuffer();
  const optimizedImage = await getImage(
    {
      src: Buffer.from(buffer), 
    }, {
      
    });
  return `data:image/webp;base64,${optimizedImage.toString('base64')}`;
}

async function optimizeImages(imageUrls: string[], imageConfig: any) {
  const limit = pLimit(CONCURRENCY_LIMIT);
  const optimizedImages = await Promise.all(imageUrls.map(url => limit(() => downloadAndOptimizeImage(url, imageConfig))));
  return optimizedImages;
}

function transformHtml(htmlString: string, optimizedImages: string[]) {
  const parser = new DOMParser();
  const doc = parser.parseFromString(htmlString, 'text/html');
  const images = doc.querySelectorAll('img');

  images.forEach((img, index) => {
    const optimizedSrc = optimizedImages[index];
    const alt = img.getAttribute('alt') || '';
    const pictureElement = document.createElement('picture');
    const sourceElement = document.createElement('source');
    sourceElement.setAttribute('srcset', optimizedSrc);
    sourceElement.setAttribute('type', 'image/webp');
    const imgElement = document.createElement('img');
    imgElement.setAttribute('src', optimizedSrc);
    imgElement.setAttribute('alt', alt);
    imgElement.setAttribute('loading', 'lazy');
    imgElement.setAttribute('width', '600');
    imgElement.setAttribute('height', '400');
    pictureElement.appendChild(sourceElement);
    pictureElement.appendChild(imgElement);
    img.replaceWith(pictureElement);
  });

  return doc.body.innerHTML;
}

export default async function wordpressImageOptimizer(imageConfig: any) {
  const posts = await fetchAllPosts();
  const imageUrls = extractImageUrls(posts);
  const optimizedImages = await optimizeImages(imageUrls, imageConfig);

  const transformedPosts = posts.map(post => ({
    ...post,
    content: transformHtml(post.content.rendered, optimizedImages)
  }));

  return transformedPosts;
}