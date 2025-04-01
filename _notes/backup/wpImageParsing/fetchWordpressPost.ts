export async function fetchWordPressPost(slug: string) {
  console.log('slug:', slug);
  const response = await fetch(`https://your-wordpress-site.com/wp-json/wp/v2/posts?slug=${slug}`);
  const posts = await response.json();
  return posts;
}