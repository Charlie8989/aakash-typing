"use client";
import Navbar from "@/app/Navbar";
import { api } from "@/convex/_generated/api";
import { useQuery } from "convex/react";
import { ArrowDownIcon, Loader } from "lucide-react";
import Link from "next/link";
import React, { useEffect, useState } from "react";

const Stat = ({ label, score, bg, text }) => (
  <div
    className={`flex justify-between items-center px-4 py-3 rounded-lg ${bg} ${text}`}
  >
    <span className="font-medium">{label}</span>
    <span className="font-semibold text-slate-800">{score}</span>
  </div>
);

const getAccuracyUI = (accuracy) => {
  if (accuracy >= 90)
    return {
      gradient: "from-green-400 to-green-700",
      circle: "bg-green-800",
      title: "Excellent",
      slogan: "Outstanding accuracy! You type like a pro.",
    };

  if (accuracy >= 75)
    return {
      gradient: "from-blue-400 to-blue-700",
      circle: "bg-blue-800",
      title: "Great",
      slogan: "Nice work! Keep pushing for perfection.",
    };

  if (accuracy >= 50)
    return {
      gradient: "from-yellow-400 to-yellow-600",
      circle: "bg-yellow-700",
      title: "Good",
      slogan: "You're improving. Keep practicing.",
    };

  return {
    gradient: "from-red-400 to-red-700",
    circle: "bg-red-800",
    title: "Needs Improvement",
    slogan: "Slow down and focus on accuracy.",
  };
};

const Page = () => {
  const [userId, setUserId] = useState(null);

  useEffect(() => {
    const id = localStorage.getItem("userId");
    if (id) setUserId(JSON.parse(id));
  }, []);

  const result = useQuery(
    api.results.getLatestResult,
    userId ? { userId } : "skip"
  );

  if (result === undefined)
    return (
      <div className="flex w-screen h-[90vh] items-center justify-center">
        <Loader className="size-8 text-purple-400 animate-spin" />
        <span className="font-semibold ml-4">Analyzing Your Submission..</span>
      </div>
    );

  if (!result) return <p>No result found</p>;

  const accuracy = Math.round(
    ((result.typedWords - result.wrongWords.length) / result.totalWords) * 100
  );

  const ui = getAccuracyUI(accuracy);

  return (
    <>
      <Navbar />

      <div className="flex justify-center items-center">
        <div className="flex sm:flex-row flex-col justify-center items-stretch mt-10 gap-6">
          <div
            className={`w-[320px] h-fit sm:h-[460px] rounded-2xl bg-gradient-to-b ${ui.gradient} text-white p-6 shadow-lg flex flex-col justify-between`}
          >
            <div>
              <p className="text-center text-lg opacity-80">Your Accuracy</p>

              <div
                className={`w-36 h-36 mx-auto my-6 rounded-full ${ui.circle} flex flex-col items-center justify-center`}
              >
                <span className="text-5xl font-bold">{accuracy}%</span>
                <span className="text-sm opacity-70">of 100</span>
              </div>

              <h2 className="text-center text-2xl font-semibold">{ui.title}</h2>
              <p className="text-center text-sm opacity-80 mt-2">{ui.slogan}</p>
            </div>
          </div>

          <div className="w-[320px] h-fit sm:h-[460px] rounded-2xl bg-white p-6 shadow-lg flex flex-col justify-between">
            <div>
              <h3 className="font-semibold text-lg mb-4">Summary</h3>

              <div className="space-y-3">
                <Stat
                  label="Total Words"
                  score={result.totalWords}
                  bg="bg-blue-100"
                  text="text-blue-600"
                />
                <Stat
                  label="Typed Words"
                  score={result.typedWords}
                  bg="bg-green-100"
                  text="text-green-600"
                />
                <Stat
                  label="Wrong Words"
                  score={result.wrongWords.length}
                  bg="bg-red-100"
                  text="text-red-600"
                />
                <Stat
                  label="Missing Words"
                  score={result.missingWords.length}
                  bg="bg-yellow-100"
                  text="text-yellow-600"
                />
                <Stat
                  label="BackSpace Counts"
                  score={result.backspace}
                  bg="bg-purple-100"
                  text="text-purple-600"
                />
              </div>
            </div>

            <button className="w-full bg-slate-800 text-white py-3 mt-4 rounded-full hover:bg-slate-900">
              Continue
            </button>
          </div>
        </div>
      </div>

      <div className="w-full p-6 border-t-2 mt-3 sm:mt-20 flex justify-between items-center">
        <Link href="/">
          <button className="flex items-center rounded-lg hover:bg-gray-100 hover:underline border p-4 gap-2">
            <ArrowDownIcon className="rotate-90 size-4" />
            Back to Home
          </button>
        </Link>

        <Link href="/exams">
          <button className="flex items-center rounded-lg text-white bg-[#a629fa] hover:bg-[#7e38ad] border p-4 gap-2">
            Other Tests
            <ArrowDownIcon className="rotate-270 size-4" />
          </button>
        </Link>
      </div>
    </>
  );
};

export default Page;
