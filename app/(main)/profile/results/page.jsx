"use client";
import { api } from "@/convex/_generated/api";
import { useQuery } from "convex/react";
import { Loader, TrendingUp, TrendingDown } from "lucide-react";

const formatDate = (ts) =>
  new Date(ts).toLocaleDateString("en-IN", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });

const calcAccuracy = (r) =>
  Math.round(((r.typedWords - r.wrongWords.length) / r.totalWords) * 100);

const Page = () => {
  const results = useQuery(api.results.getAllResults);

  if (results === undefined)
    return (
      <div className="h-[90vh] flex justify-center items-center">
        <Loader className="animate-spin text-purple-500" />
        <span className="ml-3">Loading your results…</span>
      </div>
    );

  if (!results.length)
    return (
      <div className="h-[90vh] flex justify-center items-center text-gray-500">
        No results yet. Take your first test
      </div>
    );

  return (
    <div className="max-w-6xl h-[90vh] mx-auto p-6">
      <h1 className="text-2xl font-bold mb-6">Your Test History</h1>

      <div className="grid grid-cols-1 gap-5">
        {results.map((r, index) => {
          const accuracy = calcAccuracy(r);
          const prev = results[index + 1];
          const prevAccuracy = prev ? calcAccuracy(prev) : null;
          const delta = prevAccuracy !== null ? accuracy - prevAccuracy : null;

          return (
            <div
              key={r._id}
              className="rounded-2xl bg-white shadow-md border border-purple-100 p-6"
            >
              <div className="flex justify-between items-start mb-4">
                <div>
                  <p className="text-lg font-semibold text-purple-700">
                    {r?.examName || "Typing Test"}
                  </p>
                  <p className="text-sm text-gray-400">
                    {formatDate(r.createdAt)}
                  </p>
                </div>

                {delta !== null && delta !== 0 && (
                  <div
                    className={`flex items-center gap-1 text-sm font-semibold ${
                      delta > 0 ? "text-green-600" : "text-red-600"
                    }`}
                  >
                    {delta > 0 ? (
                      <TrendingUp size={16} />
                    ) : (
                      <TrendingDown size={16} />
                    )}
                    {delta > 0 && "+"}
                    {Math.abs(delta)}%
                  </div>
                )}
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="rounded-xl bg-purple-50 p-4">
                  <p className="text-sm text-gray-500">Accuracy</p>
                  <p className="text-2xl font-bold text-purple-600">
                    {accuracy}%
                  </p>
                </div>

                <div className="rounded-xl bg-blue-50 p-4">
                  <p className="text-sm text-gray-500">Typed Words</p>
                  <p className="text-2xl font-bold text-blue-600">
                    {r.typedWords}
                  </p>
                </div>

                <div className="rounded-xl bg-red-50 p-4">
                  <p className="text-sm text-gray-500">Mistakes</p>
                  <p className="text-2xl font-bold text-red-600">
                    {r.wrongWords.length}
                  </p>
                </div>

                <div className="rounded-xl bg-yellow-50 p-4">
                  <p className="text-sm text-gray-500">Missing Words</p>
                  <p className="text-2xl font-bold text-yellow-600">
                    {r.missingWords.length}
                  </p>
                </div>

                <div className="rounded-xl bg-green-50 p-4">
                  <p className="text-sm text-gray-500">Correct Words</p>
                  <p className="text-2xl font-bold text-green-600">
                    {r.typedWords - r.wrongWords.length}
                  </p>
                </div>

                <div className="rounded-xl bg-indigo-50 p-4">
                  <p className="text-sm text-gray-500">Backspaces</p>
                  <p className="text-2xl font-bold text-indigo-600">
                    {r.backspace ?? 0}
                  </p>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Page;
