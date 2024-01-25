"use node";

import { action } from "./_generated/server";
import { v } from "convex/values";
import { api } from "../convex/_generated/api";
import Parser from 'rss-parser';

export const updateSource = action({
    args: { sourceId: v.id("sources") },
    handler: async (ctx, args) => {
        const source = await ctx.runQuery(api.sources.getSource, { id: args.sourceId });

        if (!source) {
            return "failure";
        }
        else if (source.type == "rss") {
            let parser = new Parser();
            let feed = await parser.parseURL(source.link);
            console.log(feed.title);

            feed.items.forEach(item => {
                console.log(item)
                console.log(item[source.contentLocation])
            });
        }
        return "success";
    },
});