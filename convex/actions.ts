"use node";

import { action } from "./_generated/server";
import { v } from "convex/values";
import { api } from "../convex/_generated/api";
import Parser from 'rss-parser';
import { Doc } from "./_generated/dataModel";
import { BlogType } from "../types"

import { parse } from 'node-html-parser';




export const updateSource = action({
    args: { sourceId: v.id("sources") },
    handler: async (ctx, args) => {
        const source = await ctx.runQuery(api.sources.getSource, { id: args.sourceId });

        if (!source) {
            return "failure";
        }

        const blogs = await parseSource(source);
        console.log(blogs[0])

        return "success";
    },
});


async function parseSource(source: Doc<"sources">): Promise<BlogType[]> {
    if (source.type == "rss") {
        return getRSSArticles(source);
    }
    else if (source.type == "medium") {
        return getMediumArticles(source)
    }

    return []
}


async function getMediumArticles(source: Doc<"sources">): Promise<BlogType[]> {
    let parser = new Parser();
    let feed = await parser.parseURL(source.link);
    console.log(feed.title);
    return feed.items.map(item => ({
        link: item.link,
        source: source._id,
        title: item.title,
        description: item.summary,
        pubDate: new Date(item.pubDate || "").toISOString(),
        content: item['content:encoded'],
        categories: item.categories
    }));
}

async function getRSSArticles(source: Doc<"sources">): Promise<BlogType[]> {
    let parser = new Parser();
    let feed = await parser.parseURL(source.link);
    const blogPromises = feed.items.slice(0,1).map(async (item) => {
        return {
            link: item.link,
            source: source._id,
            title: item.title,
            description: item.content,
            pubDate: new Date(item.pubDate || "").toISOString(),
            content: await parseBlog(item.link || ""),
            categories: item.categories || []
        };
    });

    return Promise.all(blogPromises);
}

function parseHTMLForCSSSelector(html: string, cssSelector: string) {
    const document = parse(html);
    const element = document.querySelector(cssSelector);
    return element ? element.outerHTML : null;
}

async function parseBlog(blogLink: string): Promise<string> {
    if (blogLink === "") {
        return "";
    }
    const response = await fetch(blogLink);
    const data = await response.text();

    const cssSelector = 'article.BlogPost';
    return parseHTMLForCSSSelector(data, cssSelector) || ""
}