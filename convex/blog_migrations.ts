import migration from "./lib/migrations";

export const removeContent = migration({
    table: "blogs",
    batchSize: 100,
    migrateDoc: async ({ db }, blog) => {
        return await db.patch(blog._id, { content: undefined });
    },
})