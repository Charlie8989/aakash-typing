import { v } from "convex/values";
import { mutation } from "./_generated/server";

export const insertDummyUser = mutation({
  args: {
    name: v.string(),
    selected_mode: v.string(),
  },
  handler: async (ctx, args) => {
    const userId = await  ctx.db.insert("user", {
      name: args.name,
      selected_mode: args.selected_mode,
    });
    return userId;
  },
});
