import { z } from "astro:content";
import type { gqlPostSchema, restPostSchema } from "../schemas/post";


export type Post = z.infer<typeof restPostSchema>;

export type GQLPost = z.infer<typeof gqlPostSchema>;