"use client";
import { v4 as uuidv4 } from "uuid";
import { useRouter } from "next/navigation";
import { useMutation } from "convex/react";
import { api } from "@/convex/_generated/api";
import { useState } from "react";

const Dialog = ({ open, onClose, onStart, examId }) => {
  const insertDummyUser = useMutation(api.user.insertDummyUser);
  const router = useRouter();

  const [name, setName] = useState("");
  const [keyLimit, setKeyLimit] = useState("");
  const [timeLimit, setTimeLimit] = useState("");

  if (!open) return null;

  const goFullScreen = () => {
    if (document.documentElement.requestFullscreen) {
      document.documentElement.requestFullscreen();
    }
  };

  const startTest = async () => {
    if (!name.trim()) return;

    const limit = Number(keyLimit);
    const time = Number(timeLimit);

    const finalLimit = limit >= 10 ? limit : null;
    const finalTime = time > 0 ? time : null;

    if (finalLimit) localStorage.setItem("keyLimit", finalLimit);
    if (finalTime) localStorage.setItem("timeLimit", finalTime);

    const id = await insertDummyUser({
      name: name.trim(),
      key_limit: finalLimit || undefined,
      time_limit: finalTime || undefined,
    });

    localStorage.setItem("userId", JSON.stringify(id));

    const testId = uuidv4();

    let url = `/test/${testId}?examId=${examId}`;
    if (finalLimit) url += `&limit=${finalLimit}`;
    if (finalTime) url += `&time=${finalTime}`;

    router.push(url);
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center">
      <div className="bg-white text-black rounded-xl w-[90%] max-w-md p-6 relative">
        <button onClick={onClose} className="absolute top-3 right-3 text-xl">
          ✕
        </button>

        <h2 className="text-2xl font-bold mb-4">Start Typing Test</h2>

        <div className="space-y-4">
          <input
            type="text"
            value={name}
            placeholder="Enter your name"
            className="w-full border p-2 rounded"
            onChange={(e) => setName(e.target.value)}
          />

          <input
            type="number"
            min="10"
            value={keyLimit}
            placeholder="Key limit (Please enter more than 10)"
            className="w-full border p-2 rounded"
            onChange={(e) => {
              const val = e.target.value;
              if (val === "" || Number(val) >= 10) {
                setKeyLimit(val);
              }
            }}
          />

          <input
            type="number"
            min="1"
            value={timeLimit}
            placeholder="Time in minutes (Please enter more than 0)"
            className="w-full border p-2 rounded"
            onChange={(e) => {
              const val = e.target.value;
              if (val === "" || Number(val) > 0) {
                setTimeLimit(val);
              }
            }}
          />

          <button
            disabled={!name.trim()}
            onClick={() => {
              onStart();
              goFullScreen();
              startTest();
            }}
            className={`w-full py-2 rounded text-white ${
              name.trim()
                ? "bg-purple-600 hover:bg-purple-700"
                : "bg-gray-400 cursor-not-allowed"
            }`}
          >
            Start Now
          </button>
        </div>
      </div>
    </div>
  );
};

export default Dialog;