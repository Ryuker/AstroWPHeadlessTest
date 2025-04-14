import { z } from "astro:content";

const blockSchema = z.object({
  name: z.string(),
  attributes: z.object({
    language: z.string(),
    lineNumbers: z.boolean(),
    code: z.string(),
    copyButton: z.boolean(),
    copyButtonString: z.string(),
  }).optional(),
  renderedHtml: z.string(),
})

const postSchema = z.object({
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
});

export const restPostSchema = postSchema.extend({
  pages: z.array(z.object({content: z.string()})),
})

export const gqlPostSchema = postSchema.extend({
  pagesBlocks: z.array(z.array(blockSchema)),
})

