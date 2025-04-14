import { z } from "astro:content";
import type { gqlPostSchema, restPostSchema } from "../schemas/post";


export type RestPost = z.infer<typeof restPostSchema>;

export type GQLPost = z.infer<typeof gqlPostSchema>;