import { splitString } from '@utils/helpers';
import type { Loader } from 'astro/loaders';

console.log('loading graphql content');

export const gqlLoader: Loader = {
  name: 'gqlPosts-loader',
  load: async (context) => {
    const response =  await fetch(`http://astrowpheadless.local/graphql`, 
    {
      method: 'POST',
      headers: {'Content-Type':'application/json'},
      body: JSON.stringify({
        query: `
          query IndexPage {
            posts(where: {orderby: {field: DATE, order: DESC}}) {
              nodes {
                id
                slug
                date
                title
                excerpt
                featuredImage {
                  node {
                    sourceUrl
                  }
                }
                authors {
                  nodes {
                    id
                    name
                  }
                }
                content
              }
            }
          }
        `
      }),
    });

    const { data: { posts: { nodes: posts}} } = await response.json();
    console.log('body:', posts[5].authors);

    // Must return an array of entries with an id property, or an object with IDs as keys and entries as values

    const myPosts = await posts.map((post) => {
      const { content } = post;
      const pagesContent = splitString(content, /<!--nextpage-->/ );
      const pages = pagesContent.map(page =>  {
        return { content: page} 
      });

      const authors = post.authors.nodes.map(author => author);

      return {
        ...post,
        id: post.id.toString(),
        // slug: post.slug,
        // date: post.date,
        authors,
        // data: post,
        pages: pages,
      }
    });

    // console.log('posts', myPosts);

    context.store.set({
      id: '26t61t21g2t6',
      data: myPosts
    });
  },
  // schema: async () => z.object({
  //   // ...
  // })
};