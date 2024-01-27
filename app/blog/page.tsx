"use client"

import { api } from "../../convex/_generated/api";
import { Doc } from "../../convex/_generated/dataModel";
import { useQuery } from "convex/react";

export default function Home() {

  const blogs: Doc<"blogs">[] = useQuery(api.blogs.retrieveBlogs, { num: 10 }) || [];

  return (
    <main>
      <h1>Blog List</h1>
      <ul>
        {blogs.map((blog) => (
          <li key={blog.id}>
            <h3>{blog.title}</h3>
            <p>{blog.source}</p>
          </li>
        ))}
      </ul>
    </main>
  );
}