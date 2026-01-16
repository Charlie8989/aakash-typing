import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export default defineSchema({
  user: defineTable({
    name: v.string(),
    selected_mode: v.string(),
  }),

  results: defineTable({
    userId: v.string(),
    totalWords: v.number(),
    examId: v.optional(v.id("exams")),
    examName: v.optional(v.string()),
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
    createdAt: v.number(),
  })
    .index("by_userId", ["userId"])
    .index("by_userId_createdAt", ["userId", "createdAt"]),

  exams: defineTable({
    examName: v.string(),
    createdAt: v.string(),
    keys: v.string(),
    paragraph: v.string(),
    time: v.string(),
  }),
});
