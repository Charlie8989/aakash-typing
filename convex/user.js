import { v } from "convex/values";
import { mutation } from "./_generated/server";

export const insertDummyUser = mutation({
  args: {
    name: v.string(),
    key_limit: v.optional(v.number()),
    time_limit: v.optional(v.number()),
  },
  handler: async (ctx, args) => {
    const userId = await ctx.db.insert("user", {
      name: args.name,
      selected_mode: args.selected_mode,
    });
    return userId;
  },
});
