import { z } from "astro:content";
import type { postSchema } from "../schemas/post";


export type Post = z.infer<typeof postSchema>;