import { query, mutation } from "./_generated/server";
import { v } from "convex/values";

export const getExams = query({
  handler: async (ctx) => {
    return await ctx.db.query("exams").order("desc").collect();
  },
});

export const addExam = mutation({
  args: {
    examName: v.string(),
    keys: v.string(),
    paragraph: v.string(),
    time: v.string(),
    tag: v.optional(v.string()),
    createdAt: v.string(),
  },
  handler: async (ctx, args) => {
    return await ctx.db.insert("exams", args);
  },
});

export const deleteExam = mutation({
  args: { id: v.id("exams") },
  handler: async (ctx, args) => {
    await ctx.db.delete(args.id);
  },
});
