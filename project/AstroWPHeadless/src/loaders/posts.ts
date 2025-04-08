import { splitString } from '@utils/helpers';
import type { Loader } from 'astro/loaders';
import { restPostsTransformer } from './transformers/posts';
import { postSchema } from '@content/schemas/post';

console.log('loading content');

export const restLoader: Loader = {
	name: 'rest-posts-loader',
	load: async (context) => {
    const response =  await fetch(`http://astrowpheadless.local/wp-json/wp/v2/posts?wp:featuredmedia,_embedded&_embed`);
    const posts = await response.json();
    const myPosts = posts.map(restPostsTransformer);

    console.log(myPosts[0]);

    context.store.set({
      id: '23h2bhbhb22b',
			data: myPosts
		});
  },
  schema: postSchema,
};