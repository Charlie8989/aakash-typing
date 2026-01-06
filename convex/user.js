import { mutation } from "./_generated/server";


export const insertDummyUser = mutation({
  handler: async (ctx) => {
    await ctx.db.insert("user", {
      email: "dummy@example.com",
      username: "dummy_user",
      subscription: "free",
    });
  },
});
