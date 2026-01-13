"use client";
import { useState } from "react";
import Dialog from "./Dialog";
import { useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";

const Card = ({ name, keys, time, examId }) => {
  const [open, setOpen] = useState(false);
  const [selectedExamId, setSelectedExamId] = useState(null);

  return (
    <>
      <div className="bg-purple-100 rounded-lg p-9 max-w-80 min-h-60">
        <p className="font-bold text-2xl">{name}</p>

        <p className="pt-4 flex justify-between">
          <span>{keys} Keys</span>
          <span>{time} </span>
        </p>

        <button
          onClick={() => {
            setOpen(true);
            setSelectedExamId(examId);
          }}
          className="mt-10 w-full bg-white p-3 rounded-md font-medium"
        >
          Start Typing
        </button>
      </div>

      <Dialog
        open={open}
        examId={examId}
        onClose={() => setOpen(false)}
        onStart={() => setOpen(false)}
      />
    </>
  );
};

export default Card;
