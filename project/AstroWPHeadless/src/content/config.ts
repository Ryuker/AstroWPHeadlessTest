import { defineCollection } from "astro:content";
import { postsLoader } from "@loaders/posts";
import { gqlLoader } from "@loaders/gqlPosts";

const posts = defineCollection({
  loader: postsLoader,
  
  // schema: /* ... */
});

const GQLPosts = defineCollection({
  loader: gqlLoader,
  
  // schema: /* ... */
});

export const collections = {
	posts,
  GQLPosts,
};