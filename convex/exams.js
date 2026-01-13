import { query } from "./_generated/server";

export const getExams = query({
  handler: async (ctx) => {
    return await ctx.db.query("exams").collect();
  },
});
