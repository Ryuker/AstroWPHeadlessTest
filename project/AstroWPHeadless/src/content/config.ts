import { defineCollection } from "astro:content";
import { postsLoader } from "@loaders/posts";

const posts = defineCollection({
  loader: postsLoader,
  
  // schema: /* ... */
});

export const collections = {
	posts,
};