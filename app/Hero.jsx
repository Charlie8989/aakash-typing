import Button from "@/components/Button";
import Link from "next/link";
import React from "react";

const Hero = () => {
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
          <Link href="/exams">
            <Button text="Start Typing" />
          </Link>
          <button className="px-6 py-2 bg-white hover:bg-neutral-200 rounded-full text-[#111] hover:text-black/60 border-2">
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
