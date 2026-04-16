"use client";
import React from "react";
import { Loader } from "lucide-react";
import { useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";

const Page = () => {
  const allResults = useQuery(api.results.getAllResultsForLeaderboard);

  if (allResults === undefined) {
    return (
      <div className="h-[90vh] w-full flex justify-center items-center">
        <Loader className="animate-spin text-purple-600" />
        <p className="ml-2">Loading Leaderboard…</p>
      </div>
    );
  }

  const calculateScore = (results) => {
    if (!results || results.length === 0) return 0;

    const totalTests = results.length;
    const avgAccuracy = Math.round(
      results.reduce((sum, r) => {
        const accuracy = ((r.typedWords - r.wrongWords.length) / r.totalWords) * 100;
        return sum + accuracy;
      }, 0) / results.length
    );

    const totalWordsTyped = results.reduce((sum, r) => sum + r.typedWords, 0);
    const totalMistakes = results.reduce((sum, r) => sum + r.wrongWords.length, 0);

    const accuracyScore = (avgAccuracy / 100) * 40;
    const mistakeRate = (totalMistakes / totalWordsTyped) * 100;
    const consistencyScore = Math.max(0, (1 - mistakeRate / 100) * 30);
    const wordsScore = Math.min(100, (totalWordsTyped / 500) * 100) * 0.2;
    const efficiencyScore = Math.min(10, totalTests);

    const totalScore = accuracyScore + consistencyScore + wordsScore + efficiencyScore;
    return Math.round(totalScore);
  };

  const leaderboardData = Object.entries(
    allResults.reduce((acc, result) => {
      const email = result.userEmail || result.userId;
      const key = email || `user-${result.userId}`;
      
      if (!acc[key]) {
        acc[key] = {
          email: email,
          userId: result.userId,
          name: result.userName,
          imageUrl: result.userImageUrl,
          results: [],
        };
      }
      acc[key].results.push(result);
      return acc;
    }, {})
  ).map(([_, userData]) => ({
    ...userData,
    score: calculateScore(userData.results),
    tests: userData.results.length,
  }))
    .filter(user => user.score > 0 && user.name && user.name.trim())
    .sort((a, b) => b.score - a.score);

  return (
    <div className="w-full min-h-[90vh] bg-gradient-to-br from-purple-100 via-white to-purple-200 px-4 py-10">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl font-bold text-purple-700 mb-2">Global Leaderboard</h1>
        <p className="text-gray-600 mb-8">Top Typists Ranked by Overall Score</p>

        {leaderboardData.length === 0 ? (
          <div className="text-center py-10">
            <p className="text-gray-500">No leaderboard data yet. Be the first!</p>
          </div>
        ) : (
          <div className="space-y-4">
            {leaderboardData.map((user, index) => {
              return (
                <div
                  key={user.email}
                  className={`rounded-2xl p-6 shadow-md border-2 flex items-center justify-between transition-all ${
                    "bg-white border-purple-100 hover:shadow-lg"
                  }`}
                >
                  <div className="flex items-center gap-5 flex-1">
                    <span className="text-2xl font-bold text-purple-600 min-w-8">
                      {index + 1}
                    </span>

                    {user.imageUrl ? (
                      <img
                        src={user.imageUrl}
                        alt={user.name}
                        className="w-14 h-14 rounded-full border-2 border-purple-300 shadow-md object-cover"
                      />
                    ) : (
                      <div className="w-14 h-14 rounded-full border-2 border-purple-300 shadow-md bg-purple-200 flex items-center justify-center">
                        <span className="text-xl">{user.name?.charAt(0)?.toUpperCase()}</span>
                      </div>
                    )}

                    <div className="flex-1">
                      <p className="text-lg font-bold text-gray-800">{user?.name}</p>
                    </div>
                  </div>

                  <div className="text-right">
                    <p className="text-3xl font-bold text-purple-600">{user.score}</p>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};

export default Page;
