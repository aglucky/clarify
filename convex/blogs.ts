import { BlogSchema, BlogType } from "../types";
import { query, mutation } from "./_generated/server";
import { z } from "zod";
import { NoOp } from "convex-helpers/server/customFunctions";
import { zCustomQuery, zCustomMutation } from "convex-helpers/server/zod";
import { v } from "convex/values";
import { Doc, Id } from "./_generated/dataModel";

const zQuery = zCustomQuery(query, NoOp);
const zMutation = zCustomMutation(mutation, NoOp);

export const getBlog = query({
  args: { id: v.id("blogs") },
  handler: async (ctx, args) => {
    return await ctx.db.get(args.id);
  },
});

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

type BlogWithSourceName = {
  blogs: Doc<"blogs">[];
  sourceMap: Array<{ id: Id<"sources">; name: string }>;
};

export const retrieveBlogs = query({
  args: { num: v.number() },
  handler: async (ctx, { num }): Promise<BlogWithSourceName> => {
    const blogs = await ctx.db.query("blogs").take(num);
    const sourceIds = [... new Set(blogs.map((blog) => blog.source))];
    const sourceNameMap = await Promise.all(
      sourceIds.map(async (id) => ({
        id,
        name: (await ctx.db.get(id))?.name || "N/A",
      }))
    );
    return { blogs: blogs, sourceMap: sourceNameMap };
  },
});