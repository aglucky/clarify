import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export default defineSchema({
    sources: defineTable({
        link: v.string(),
        type: v.union(
            v.literal("rss"),
            v.literal("medium"),
            v.literal("other")
        ),
        name: v.optional(v.string())
    }),

    blogs: defineTable({
        source: v.id("sources"),
        title: v.string(),
        link: v.string(),
        description: v.string(),
        pubDate: v.string(),
        content: v.string(),
        author: v.optional(v.string()),
        categories: v.optional(v.array(v.string())),
    }),

});