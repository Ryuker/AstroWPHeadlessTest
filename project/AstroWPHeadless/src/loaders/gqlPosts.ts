import type { Loader } from 'astro/loaders';
import { postSchema } from "@content/schemas/post";
import { getPageBlocks, gqLPostsTransformer } from "./transformers/posts";
import type { Post } from '@content/types/post';


console.log('loading graphql content');


export const gqlLoader: Loader = {
  name: 'gql-posts-loader',
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
                editorBlocks {
                  name
                  ... on KevinbatdorfCodeBlockPro {
                    attributes {
                      language
                      lineNumbers
                      code
                      copyButton
                      copyButtonString
                    }
                    renderedHtml
                  }
                  renderedHtml
                }
              }
            }
          }
        `
      }),
    });

    
    const { data: { posts: { nodes: posts}} } = await response.json();
    const myPosts = posts.map(gqLPostsTransformer);

    myPosts.forEach((post: Post) => console.log(post.title));

    context.store.set({
      id: '26t61t21g2t6',
      data: myPosts
    });
  },
  schema: postSchema,
};



