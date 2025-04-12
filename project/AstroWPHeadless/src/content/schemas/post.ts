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
  editorBlocks: z.array(z.object({
    name: z.string(),
    attributes: z.object({
      language: z.string(),
      lineNumbers: z.boolean(),
      code: z.string(),
      copyButton: z.boolean(),
      copyButtonString: z.string(),
    }),
    renderedHtml: z.string(),
  })).optional(),
  pages: z.array(z.object({content: z.string()})),
});