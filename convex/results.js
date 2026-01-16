import { query } from "./_generated/server";
import { mutation } from "./_generated/server";
import { v } from "convex/values";

export const saveResult = mutation({
  args: {
    examId: v.id("exams"),
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
    const identity = await ctx.auth.getUserIdentity();
    const exam = await ctx.db.get(args.examId);

    await ctx.db.insert("results", {
      userId: identity.subject,
      examId: args.examId,
      examName: exam.examName,
      ...args,
      createdAt: Date.now(),
    });
  },
});

export const getLatestResult = query({
  args: {},
  handler: async (ctx) => {
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) return null;

    return await ctx.db
      .query("results")
      .withIndex("by_userId", (q) => q.eq("userId", identity.subject))
      .order("desc")
      .first();
  },
});

export const getAllResults = query({
  args: {},
  handler: async (ctx) => {
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) return [];

    return await ctx.db
      .query("results")
      .withIndex("by_userId", (q) => q.eq("userId", identity.subject))
      .collect();
  },
});
