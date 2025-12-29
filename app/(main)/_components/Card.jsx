"use client";
import { useState } from "react";
import Dialog from "./Dialog";

const Card = ({ name, words, time }) => {
  const [open, setOpen] = useState(false);


  return (
    <>
      <div className="bg-purple-100 rounded-lg p-9 max-w-80 min-h-60">
        <p className="font-bold text-2xl">{name}</p>

        <p className="pt-4 flex justify-between">
          <span>{words} Words</span>
          <span>{time} Min</span>
        </p>

        <button
          onClick={() => {
            setOpen(true);
          }}
          className="mt-10 w-full bg-white p-3 rounded-md font-medium"
        >
          Start Typing
        </button>
      </div>

      <Dialog
        open={open}
        onClose={() => setOpen(false)}
        onStart={() => {
          setOpen(false);
          console.log("Start exam");
        }}
      />
    </>
  );
};

export default Card;
