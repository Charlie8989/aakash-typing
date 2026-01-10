import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export default defineSchema({
  user: defineTable({
    name: v.string(),
    selected_mode: v.string(),
  }),
  results: defineTable({
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
    createdAt: v.number(),
  })
    .index("by_userId", ["userId"])
    .index("by_userId_createdAt", ["userId", "createdAt"]),
});
