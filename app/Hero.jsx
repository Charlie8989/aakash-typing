"use client";
import Button from "@/components/Button";
import { api } from "@/convex/_generated/api";
import { useUser } from "@clerk/nextjs";
import { useQuery } from "convex/react";
import { useRouter } from "next/navigation";
import React from "react";
import { Zap, Target, Brain } from "lucide-react";

const Hero = () => {
  const results = useQuery(api.results.getLatestResult);
  const router = useRouter();
  const { isSignedIn, isLoaded } = useUser();

  // const handleClick = async () => {
  //   await insertDummyUser();
  //   console.log("Dummy user inserted");
  // };

  const checkAuth = () => {
    if (!isLoaded) return;

    if (isSignedIn) {
      router.push("/exams");
    } else {
      router.push("/sign-in");
    }
  };

  return (
    <section className="pt-7 flex bg-gradient-to-br from-purple-100 via-white to-purple-200 sm:flex-row flex-col w-full items-center justify-center h-[70vh] sm:h-[90vh]">
      <div className="w-full flex flex-col items-center justify-center h-1/2 sm:w-1/2 sm:h-full px-6 text-center sm:text-left">
        <p className="text-purple-500 font-semibold mb-3">
          Master your keyboard
        </p>

        <h1 className="text-4xl sm:text-5xl font-bold leading-tight">
          Type Faster. <br />
          Think Sharper.
        </h1>

        <p className="text-slate-400 mt-4 max-w-md">
          Improve your typing speed and accuracy with real-time feedback, smart
          practice, and fun challenges.
        </p>

        <div className="flex gap-4 mt-6">
          <Button
            onClick={checkAuth}
            disabled={!isLoaded}
            text="Start Typing"
          />
          <button
            // onClick={() => handleClick()}
            onClick={() => router.push("/contact")}
            className="px-6 py-2 bg-white hover:bg-neutral-200 rounded-full text-[#111] hover:text-black/60 border-2"
          >
            Contact Us
          </button>
        </div>
      </div>

      <div className="sm:w-1/2 hidden sm:flex items-center justify-center relative">
        <div className="absolute w-96 h-96 bg-purple-400/20 rounded-full blur-3xl"></div>

        <div className="relative bg-white/60 backdrop-blur-xl rounded-2xl shadow-xl p-10 max-w-md w-full">
          <h3 className="text-2xl font-semibold text-purple-700 text-center mb-8">
            What You’ll Improve
          </h3>

          <div className="space-y-5">
            <div className="flex items-start gap-4 rounded-xl p-4 bg-white/80 border border-purple-100">
              <div className="w-10 h-10 rounded-lg bg-purple-100 flex items-center justify-center">
                <Zap className="text-purple-600" size={20} />
              </div>
              <div>
                <p className="font-medium text-gray-800">Typing Speed</p>
                <p className="text-sm text-gray-500">
                  Build faster typing habits with structured practice.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-4 rounded-xl p-4 bg-white/80 border border-purple-100">
              <div className="w-10 h-10 rounded-lg bg-purple-100 flex items-center justify-center">
                <Target className="text-purple-600" size={20} />
              </div>
              <div>
                <p className="font-medium text-gray-800">Accuracy</p>
                <p className="text-sm text-gray-500">
                  Minimize errors and improve precision over time.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-4 rounded-xl p-4 bg-white/80 border border-purple-100">
              <div className="w-10 h-10 rounded-lg bg-purple-100 flex items-center justify-center">
                <Brain className="text-purple-600" size={20} />
              </div>
              <div>
                <p className="font-medium text-gray-800">Focus</p>
                <p className="text-sm text-gray-500">
                  Stay consistent with distraction-free typing tests.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
