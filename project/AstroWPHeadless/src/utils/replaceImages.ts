import { getImage } from "astro:assets";
import { replaceAsync } from "./helpers";


// Optimizes images inside the content string
export async function optimizeImages(postContent: string, settings) {
  const newPost = replaceAsync(postContent,/<img[^>]+src="([^">]+)"([^>]*)\/?>/g, async(_, src, attrs) => {
    // Extract the alt attribute if it exists
    const altMatch = attrs.match(/alt="([^"]*)"/);
    const alt = altMatch ? altMatch[1] : '';

    // Generate optimized image
    const optimizedImage = await generateOptimizedImage(src, settings);
    
    return `<img src="${optimizedImage.src}" alt="${alt}" loading="lazy" decoding="async" />`;
  });
  return newPost;
}

async function generateOptimizedImage(url: string, settings){
  const fullSettings = { src: url, ...settings};
  const optimizedImage = await getImage(fullSettings);
  return optimizedImage;
}
