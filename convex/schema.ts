import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export default defineSchema({
    sources: defineTable({
        link: v.string(),
        type: v.union(
            v.literal("rss"),
            v.literal("other")
        ),
        contentLocation: v.string()
    }),

    blogs: defineTable({
        source: v.id("sources"),
        title: v.string(),
        link: v.string(),
        description: v.string(),
        pubDate: v.string(),
    }),

});