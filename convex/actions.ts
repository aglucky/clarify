"use node";

import { action } from "./_generated/server";
import { v } from "convex/values";
import { api } from "../convex/_generated/api";
import Parser from 'rss-parser';
import { Doc } from "./_generated/dataModel";
import { BlogSchema, BlogType, validateBlog } from "../types"
import { parse } from 'node-html-parser';
import { Sources } from "./schema";

export const addNewBlogsToSource = action({
    // args: { source: Sources.doc },
    args: { source: v.id("sources") },
    handler: async (ctx, args) => {
        // const source = args.source
        const source = await ctx.runQuery(api.sources.getSource, { id: args.source })
        if (!source) return "fail"

        const blogs = await parseSource(source);
        const newBlogs = blogs.filter(async (blog) => await ctx.runQuery(api.blogs.checkIfNewBlog, { blog: blog }));
        // console.log(newBlogs)
        const newBlogsWithContent = await Promise.all(newBlogs.map(async (blog) => {
            return blog.content ? blog : { ...blog, content: await parseBlog(blog.link!) };
        }));
        console.log(newBlogsWithContent)
        await Promise.all(newBlogsWithContent.map(async (blog) => await ctx.runMutation(api.blogs.addZodBlog, { blog: blog })))
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

    return feed.items.map(item => validateBlog({
        link: item.link,
        source: source._id,
        title: item.title,
        description: item.summary,
        pubDate: new Date(item.pubDate || "").toISOString(),
        content: item['content:encoded'],
        categories: item.categories
    })).filter((blog): blog is BlogType => blog !== null);
}

async function getRSSArticles(source: Doc<"sources">): Promise<BlogType[]> {
    let parser = new Parser();
    let feed = await parser.parseURL(source.link);
    console.log(feed.title);
    return feed.items.map(item => validateBlog({
        link: item.link,
        source: source._id,
        title: item.title,
        description: item.content,
        pubDate: new Date(item.pubDate || "").toISOString(),
        content: undefined,
        categories: item.categories || []
    })).filter((blog): blog is BlogType => blog !== null);
}

function parseHTMLForCSSSelector(html: string, cssSelector: string) {
    const document = parse(html);
    const element = document.querySelector(cssSelector);
    return element ? element.outerHTML : null;
}

async function parseBlog(blogLink: string): Promise<string> {
    const response = await fetch(blogLink);
    const data = await response.text();

    const cssSelector = 'article.BlogPost';
    return parseHTMLForCSSSelector(data, cssSelector) || ""
}