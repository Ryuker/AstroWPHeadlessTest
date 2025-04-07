import { splitString } from '@utils/helpers';
import type { Loader } from 'astro/loaders';

console.log('loading content');

export const postsLoader: Loader = {
	name: 'posts',
	load: async (context) => {
    const response =  await fetch(`http://astrowpheadless.local/wp-json/wp/v2/posts?wp:featuredmedia,_embedded&_embed`);
    const posts = await response.json();

    // console.log(posts[0]);

    // Must return an array of entries with an id property, or an object with IDs as keys and entries as values

    const myPosts = await posts.map((post) => {
      const { content: { rendered: content} } = post;
      const pagesContent = splitString(content, /<!--nextpage-->/ );
      const pages = pagesContent.map(page =>  {
        return { content: page} 
      });

      return {
        ...post,
        id: post.id.toString(),
        // slug: post.slug,
        // date: post.date,
        // authors: post.authors,
        // data: post,
        pages: pages,
      }
    });

    // console.log('posts', myPosts);

    context.store.set({
      id: '23h2bhbhb22b',
			data: myPosts
		});
  }
};