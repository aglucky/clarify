import { BlogSchema, BlogType } from "../types";
import { query, mutation } from "./_generated/server";
import { z } from "zod";
import { NoOp } from "convex-helpers/server/customFunctions";
import { zCustomQuery, zCustomMutation } from "convex-helpers/server/zod";

const zQuery = zCustomQuery(query, NoOp);
const zMutation = zCustomMutation(mutation, NoOp);

export const checkIfNewBlog = zQuery({
  args: { blog: BlogSchema },
  handler: async (ctx, args) => {
    const dbBlog = await ctx.db
      .query("blogs")
      .filter((q) => q.eq(q.field("link"), args.blog.link))
      .take(1);

    return dbBlog == null;
  },
});

export const addZodBlog = zMutation({
    args: { blog: BlogSchema },
    handler: async (ctx, { blog }) => {
      const newBlogId = await ctx.db.insert("blogs", {
        source: blog.source,
        title: blog.title,
        link: blog.link,
        description: blog.description,
        pubDate: blog.pubDate || new Date().toISOString(),
        content: blog.content || "",
        categories: blog.categories,
        author: blog.author,
      });
  
      return newBlogId;
    },
  });