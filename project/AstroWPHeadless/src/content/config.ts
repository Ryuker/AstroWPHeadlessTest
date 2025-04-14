import { defineCollection } from "astro:content";
import { restLoader } from "@loaders/posts";
import { gqlLoader } from "@loaders/gqlPosts";
import { gqlPostSchema, postSchema, restPostSchema } from "./schemas/post";

const posts = defineCollection({
  loader: restLoader,
  schema: restPostSchema
});


const GQLPosts = defineCollection({
  loader: gqlLoader,
  // schema: /* ... */
  schema: gqlPostSchema,
});

export const collections = {
	posts,
  GQLPosts,
};