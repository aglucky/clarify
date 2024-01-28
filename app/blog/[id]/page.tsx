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
    const [iframeSrc, setIframeSrc] = useState<string>("");
    const iframeRef = useRef<HTMLIFrameElement>(null);

    useEffect(() => {
        if (blog && blog.content) {
            const doc = new DOMParser().parseFromString(blog.content, "text/html");
            const reader = new Readability(doc);
            const article = reader.parse();
            if (article?.content) {
                const blob = new Blob([article.content], { type: 'text/html' });
                const blobUrl = URL.createObjectURL(blob);
                setIframeSrc(blobUrl);
            }
        }
    }, [blog]);

    return (
        <main>
          <h1>Blog List</h1>
          <React.Suspense fallback={<div>Loading...</div>}>
            {blog ? (
              <div>
                <h2>{blog.title}</h2>
                {/* Render the processed content in an iframe */}
                <iframe ref={iframeRef} src={iframeSrc} title="Readable Content" width="100%" height="600px" />
              </div>
            ) : (
              <div>No blog content available.</div>
            )}
          </React.Suspense>
        </main>
      );
}