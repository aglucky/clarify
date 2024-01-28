"use client"

import { useQuery } from "convex/react";
import { api } from "../convex/_generated/api";
import Link from "next/link";

export default function Home() {

  const data = useQuery(api.blogs.retrieveBlogs, { num: 50 });
  const blogs = data?.blogs || []
  const sources = data?.sourceMap || []
  const sourceMap = new Map(sources.map(source => [source.id, source.name]));

  return (
    <main>
      <h1>Blog List</h1>
      <ul>
        {blogs.map((blog) => (
          <li key={blog.id}>
            <Link href={`/blog/${blog._id}`}>
              <h3>{blog.title}</h3>
              <p>{sourceMap.get(blog.source)}</p>
            </Link>
          </li>
        ))}
      </ul>
    </main>
  );
}