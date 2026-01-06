"use client";
import Button from "@/components/Button";
import { api } from "@/convex/_generated/api";
import { useUser } from "@clerk/nextjs";
import { useMutation } from "convex/react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React from "react";

const Hero = () => {
  const insertDummyUser = useMutation(api.user.insertDummyUser);
  const router = useRouter();
  const { isSignedIn, isLoaded, user } = useUser();

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
    <section className="pt-7 flex sm:flex-row flex-col w-full h-[90vh]">
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

      <div className="w-full h-1/2 sm:w-1/2 sm:h-full flex items-center justify-center">
        <img src="/typing.jpg" alt="Typing Illustration" />
      </div>
    </section>
  );
};

export default Hero;
