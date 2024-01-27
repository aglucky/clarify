"use client"

import styles from "./page.module.css";
import { Doc } from "../convex/_generated/dataModel";
import { api } from "../convex/_generated/api";
import { useQuery } from "convex/react";

export default function Home() {

  const blogs: Doc<"blogs">[] = useQuery(api.blogs.retrieveBlogs, { num: 10 }) || [];
  console.log(blogs)
  return (
    <main className={styles.main}>
      <h1>Blog List</h1>
      <ul className={styles.grid}>
        {blogs.map((blog) => (
          <li key={blog._id} className={styles.card}>
            <a href={`/blog/${blog._id}`}>
              <h3>{blog.title}</h3>
              <p>{blog.source}</p>
            </a>
          </li>
        ))}
      </ul>
    </main>
  );
}