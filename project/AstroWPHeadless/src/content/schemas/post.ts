import { z } from "astro:content";

export const postSchema = z.object({
  id: z.string(),
  slug: z.string(),
  date: z.date(),
  title: z.string(),
  excerpt: z.string(),
  featuredImageUrl: z.string(),
  authors: z.array(z.object({
    id: z.string(),
    name: z.string(),
  })),
  pages: z.array(z.object({content: z.string()})),
});