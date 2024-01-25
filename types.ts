import { z } from 'zod';

export const BlogSchema = z.object({
    source: z.string().optional(),
    title: z.string().optional(),
    link: z.string().optional(),
    description: z.string().optional(),
    pubDate: z.string().optional(),
    content: z.string().optional(),
    categories: z.array(z.string()).optional(),
    author: z.string().optional(),
  });

export type BlogType = z.infer<typeof BlogSchema>;