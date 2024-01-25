import { query } from "./_generated/server";
import { v } from "convex/values";

export const getSource = query({
  args: { id: v.id("sources") },
  handler: async (ctx, args) => {
    return await ctx.db.get(args.id);
  },
});