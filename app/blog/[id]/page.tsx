"use client"

import { usePathname } from "next/navigation";
import { useQuery } from "convex/react";
import { Id } from "../../../convex/_generated/dataModel";
import { api } from "../../../convex/_generated/api";
import React, { useState, useEffect, useRef } from "react";
import { Readability } from "@mozilla/readability";

export default function Home() {
    const pathname = usePathname();
    const id = pathname?.split("/")[2] as Id<"blogs">;
    const blog = useQuery(api.blogs.getBlog, { id: id });

    return (
        <main>
          <h1>Blog List</h1>
          <React.Suspense fallback={<div>Loading...</div>}>
            {blog ? (
              <div>
                <h2>{blog.title}</h2>
                <iframe
                  srcDoc={blog.content}
                  title="Blog Content"
                  frameBorder="0"
                  width="100%"
                  height="600px"
                  sandbox="allow-same-origin allow-scripts allow-popups allow-forms"
                ></iframe>
              </div>
            ) : (
              <div>No blog content available.</div>
            )}
          </React.Suspense>
        </main>
      );
}