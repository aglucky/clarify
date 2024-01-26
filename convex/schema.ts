import { defineSchema, defineTable } from "convex/server";
import { Infer, v } from "convex/values";
import { Table } from "convex-helpers/server";


export const Sources = Table("sources", {
    _id: v.id("sources"),
    link: v.string(),
    type: v.union(
        v.literal("rss"),
        v.literal("medium"),
        v.literal("other")
    ),
    name: v.optional(v.string())
})


export const Blogs = Table("blogs", {
    source: v.id("sources"),
    title: v.string(),
    link: v.string(),
    description: v.optional(v.string()),
    pubDate: v.string(),
    content: v.string(),
    author: v.optional(v.string()),
    categories: v.optional(v.array(v.string())),
})

export default defineSchema({
    sources: Sources.table,
    blogs: Blogs.table,

});