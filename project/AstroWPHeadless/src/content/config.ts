import { defineCollection } from "astro:content";
import { restLoader } from "@loaders/posts";
import { gqlLoader } from "@loaders/gqlPosts";
import { postSchema } from "./schemas/post";

const posts = defineCollection({
  loader: restLoader,
  schema: postSchema,
});


const GQLPosts = defineCollection({
  loader: gqlLoader,
  // schema: /* ... */
  schema: postSchema,
});

export const collections = {
	posts,
  GQLPosts,
};