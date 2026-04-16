"use client";
import React from "react";
import { Loader } from "lucide-react";
import { useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";
import { useUser } from "@clerk/nextjs";
import Link from "next/link";

const page = () => {
  const { user } = useUser();
  const results = useQuery(api.results.getAllResults);

  if (results === undefined) {
    return (
      <div className="h-[90vh] w-full flex justify-center items-center">
        <Loader className="animate-spin text-purple-600" />
        <p className="ml-2">Loading Profile…</p>
      </div>
    );
  }

  if (results === undefined) {
    return (
      <div className="h-[90vh] w-full flex justify-center items-center">
        <Loader className="animate-spin text-purple-600" />
        <p className="ml-2">Loading Profile…</p>
      </div>
    );
  }

  const hasResults = results && results.length > 0;

  const latestResults = hasResults
    ? results
        .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
        .slice(0, 3)
    : [];

  const totalTests = hasResults ? results.length : 0;
  const avgAccuracy = hasResults
    ? Math.round(
        results.reduce((sum, r) => {
          const accuracy = ((r.typedWords - r.wrongWords.length) / r.totalWords) * 100;
          return sum + accuracy;
        }, 0) / results.length
      )
    : 0;
  const bestAccuracy = hasResults
    ? Math.max(
        ...results.map((r) => ((r.typedWords - r.wrongWords.length) / r.totalWords) * 100)
      )
    : 0;
  const totalWordsTyped = hasResults ? results.reduce((sum, r) => sum + r.typedWords, 0) : 0;
  const totalMistakes = hasResults ? results.reduce((sum, r) => sum + r.wrongWords.length, 0) : 0;

  const calculateScore = () => {
    if (!hasResults) return 0;
    
    const accuracyScore = (avgAccuracy / 100) * 40;
    const mistakeRate = (totalMistakes / totalWordsTyped) * 100;
    const consistencyScore = Math.max(0, (1 - mistakeRate / 100) * 30);
    const wordsScore = Math.min(100, (totalWordsTyped / 500) * 100) * 0.2;
    const efficiencyScore = Math.min(10, totalTests);
    const totalScore = accuracyScore + consistencyScore + wordsScore + efficiencyScore;
    return Math.round(totalScore);
  };

  const getTag = (score) => {
    if (score >= 90) return { tag: "Master Typist", color: "bg-red-500", textColor: "text-red-500" };
    if (score >= 80) return { tag: "Expert", color: "bg-purple-600", textColor: "text-purple-600" };
    if (score >= 70) return { tag: "Advanced", color: "bg-blue-500", textColor: "text-blue-500" };
    if (score >= 60) return { tag: "Intermediate", color: "bg-green-500", textColor: "text-green-500" };
    if (score >= 50) return { tag: "Beginner", color: "bg-yellow-500", textColor: "text-yellow-500" };
    return { tag: "Novice", color: "bg-gray-500", textColor: "text-gray-500" };
  };

  const overallScore = calculateScore();
  const userTag = getTag(overallScore);

  return (
    <div className="w-full min-h-[90vh] bg-gradient-to-br from-purple-100 via-white to-purple-200 px-4 py-10">
      <div className="max-w-6xl mx-auto">
        <div className="flex items-center gap-4 mb-8">
          <img
            src={user?.imageUrl}
            className="w-14 h-14 rounded-full border-2 border-purple-300"
            alt=""
          />
          <div>
            <h1 className="text-2xl font-bold text-purple-700">
              {user?.fullName}
            </h1>
            <p className={`text-sm font-semibold ${userTag.textColor}`}>Rank : {userTag.tag} </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-10">
          <div className="rounded-2xl bg-white p-6 shadow-md border border-purple-100">
            <p className="text-sm text-gray-500 mb-2">Total Tests</p>
            <p className="text-3xl font-bold text-purple-600">{totalTests}</p>
          </div>
          <div className="rounded-2xl bg-white p-6 shadow-md border border-purple-100">
            <p className="text-sm text-gray-500 mb-2">Average Accuracy</p>
            <p className="text-3xl font-bold text-purple-600">{avgAccuracy}%</p>
          </div>
          <div className="rounded-2xl bg-white p-6 shadow-md border border-purple-100">
            <p className="text-sm text-gray-500 mb-2">Best Accuracy</p>
            <p className="text-3xl font-bold text-purple-600">{Math.round(bestAccuracy)}%</p>
          </div>
          <div className="rounded-2xl bg-white p-6 shadow-md border border-purple-100">
            <p className="text-sm text-gray-500 mb-2">Overall Score</p>
            <p className="text-3xl font-bold text-purple-600">{overallScore}/100</p>
            <p className={`text-sm font-semibold mt-2 ${userTag.textColor}`}>{userTag.tag}</p>
          </div>
        </div>

        <div className="mb-8 p-4 rounded-2xl bg-purple-50 border border-purple-200">
          <p className="text-sm text-gray-600">Total Words Typed: <span className="text-lg font-bold text-purple-600">{totalWordsTyped}</span></p>
        </div>

        <h2 className="text-xl font-bold text-purple-700 mb-6">Recent Tests</h2>

        {!hasResults ? (
          <div className="rounded-2xl bg-white p-12 shadow-md border border-purple-100 text-center">
            <p className="text-gray-500 text-lg mb-4">No tests taken yet</p>
            <p className="text-gray-400 mb-6">Start your first typing test to see your results here</p>
            <Link href="/exams">
              <button className="bg-purple-600 hover:bg-purple-700 text-white font-semibold py-2 px-6 rounded-lg transition-all">
                Take Your First Test
              </button>
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {latestResults.map((r) => {
            const accuracy = Math.round(
              ((r.typedWords - r.wrongWords.length) / r.totalWords) * 100
            );

            const errorRate = (r.wrongWords.length / r.typedWords) * 100;

            const consistency = Math.round(100 - errorRate);

            return (
              <div
                key={r._id}
                className="rounded-2xl bg-white p-6 shadow-md border border-purple-100 flex flex-col justify-between"
              >
                <div>
                  <p className="text-sm text-gray-500 mb-1">
                    {r?.examName || "Typing Test"}
                  </p>
                  <p className="text-xl font-bold text-purple-600">
                    {accuracy}% Accuracy
                  </p>
                  <p className="text-sm text-gray-600 mt-2">
                    Consistency: {consistency}%
                  </p>
                  <p className="text-sm text-gray-600">
                    Mistakes: {r.wrongWords.length}
                  </p>
                  <p className="text-sm text-gray-600">
                    Typed Words: {r.typedWords}
                  </p>
                </div>

                <p className="text-xs text-gray-400 mt-4">
                  {new Date(r.createdAt).toLocaleDateString("en-IN")}
                </p>
              </div>
            );
          })}
          </div>
        )}

        {hasResults && (
          <div className="flex justify-end mt-8">
            <Link href="/profile/results">
              <button className="rounded-lg bg-purple-500 hover:bg-purple-600 text-white font-semibold px-6 py-3">
                View All Results
              </button>
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default page;
