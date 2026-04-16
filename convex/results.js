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
    userEmail: v.optional(v.string()),
    userImageUrl: v.optional(v.string()),
  },
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity();
    const exam = await ctx.db.get(args.examId);

    let realName = "User";
    
    if (identity.name) {
      realName = identity.name;
    } else if (identity.given_name || identity.family_name) {
      realName = `${identity.given_name || ""} ${identity.family_name || ""}`.trim();
    }

    await ctx.db.insert("results", {
      userId: identity.subject,
      userEmail: args.userEmail || identity.email || "no-email@example.com",
      userName: realName,
      userImageUrl: args.userImageUrl,
      examId: args.examId,
      examName: exam.examName,
      totalWords: args.totalWords,
      typedWords: args.typedWords,
      wrongWords: args.wrongWords,
      missingWords: args.missingWords,
      backspace: args.backspace || 0,
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

export const getAllResultsForLeaderboard = query({
  args: {},
  handler: async (ctx) => {
    return await ctx.db.query("results").collect();
  },
});
