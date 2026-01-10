import { query } from "./_generated/server";
import { mutation } from "./_generated/server";
import { v } from "convex/values";

export const saveResult = mutation({
  args: {
    userId: v.id("user"),
    totalWords: v.number(),
    typedWords: v.number(),
    wrongWords: v.array(
      v.object({
        expected: v.string(),
        typed: v.string(),
        position: v.number(),
      })
    ),
    missingWords: v.array(v.string()),
    backspace: v.optional(v.number()),
  },
  handler: async (ctx, args) => {
    await ctx.db.insert("results", {
      ...args,
      createdAt: Date.now(),
    });
  },
});

export const getLatestResult = query({
  args: { userId: v.id("user") },
  handler: async (ctx, { userId }) => {
    return await ctx.db
      .query("results")
      .withIndex("by_userId_createdAt", (q) => q.eq("userId", userId))
      .order("desc")
      .first();
  },
});
