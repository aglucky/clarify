import { zid } from 'convex-helpers/server/zod.js';
import { z } from 'zod';

export const BlogSchema = z.object({
    source: zid("sources"),
    title: z.string(),
    link: z.string(),
    description: z.string().optional(),
    pubDate: z.string().optional(),
    content: z.string().optional(),
    categories: z.array(z.string()).optional(),
    author: z.string().optional(),
  });

export type BlogType = z.infer<typeof BlogSchema>;

export function validateBlog(blog: any): BlogType | null {
  const validationResult = BlogSchema.safeParse(blog);
  if (validationResult.success) {
    return validationResult.data;
  } else {
    console.error('Invalid blog data:', validationResult.error);
    return null;
  }
}