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

  if (!results || results.length === 0) {
    return (
      <div className="h-[90vh] flex justify-center items-center text-gray-500">
        No results yet. Take your first test
      </div>
    );
  }

  const latestResults = results.slice(0, 3);

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
            <p className="text-sm text-gray-500">Your Recent Typing Results</p>
          </div>
        </div>

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

        <div className="flex justify-end mt-8">
          <Link href="/profile/results">
            <button className="rounded-lg bg-purple-500 hover:bg-purple-600 text-white font-semibold px-6 py-3">
              View All Results
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default page;
