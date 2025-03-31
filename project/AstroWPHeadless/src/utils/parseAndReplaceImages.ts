import { fetchWordPressPost } from './fetchWordpressPost.ts';

export function replaceImgWithAstroImage(postContent: string) {
  const newPost = postContent.replace(/<img[^>]+src="([^">]+)"([^>]*)\/?>/g, (_, src, attrs) => {
    // Extract the alt attribute if it exists
    const altMatch = attrs.match(/alt="([^"]*)"/);
    const alt = altMatch ? altMatch[1] : '';

    return `<Image src="${src}" alt="${alt}" sizes="(max-width: 600px) 300px, (max-width: 1200px) 600px, 1200px" />`;
  });
  return newPost;
}

export function replacePictureWithAstroPicture(postContent: string) {
  return postContent.replace(/<figure[^>]*>.*?<\/figure>/gs, (match) => {
    const srcMatch = match.match(/<img[^>]+src="([^">]+)"/);
    if (srcMatch) {
      const src = srcMatch[1];
      return `<Picture src="${src}" widths={[300, 600, 1200]} sizes="(max-width: 600px) 300px, (max-width: 1200px) 600px, 1200px" />`;
    }
    return match;
  });
}

export async function getOptimizedPost(slug: string ) {
  const post = await fetchWordPressPost(slug);
  return {
    ...post,
    content: replacePictureWithAstroPicture(post.content.rendered)
  };
}
