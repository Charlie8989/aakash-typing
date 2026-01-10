"use client";
import { v4 as uuidv4 } from "uuid";
import { useRouter } from "next/navigation";
import { useMutation } from "convex/react";
import { api } from "@/convex/_generated/api";
import { useState } from "react";

const Dialog = ({ open, onClose, onStart }) => {
  const insertDummyUser = useMutation(api.user.insertDummyUser);

  const [name, setName] = useState("");
  const [mode, setMode] = useState("practice");

  if (!open) return null;

  const handleStart = async () => {
    if (!name) {
      alert("Name missing");
      return;
    }
    const id = await insertDummyUser({
      name,
      selected_mode: mode,
    });
    localStorage.setItem("userId", JSON.stringify(id));
  };

  const goFullScreen = () => {
    if (document.documentElement.requestFullscreen) {
      document.documentElement.requestFullscreen();
    }
  };

  const router = useRouter();

  const startTest = () => {
    const testId = uuidv4();
    router.push(`/test/${testId}`);
    // localStorage.setItem("testId", testId);
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

          <select
            className="w-full border p-2 rounded"
            required
            value={mode}
            onChange={(e) => setMode(e.target.value)}
          >
            <option>Select mode</option>
            <option>Practice</option>
            <option>Exam</option>
          </select>

          <button
            onClick={() => {
              onStart();
              startTest();
              // goFullScreen();
              handleStart();
            }}
            className="w-full bg-purple-600 text-white py-2 rounded"
          >
            Start Now
          </button>
        </div>
      </div>
    </div>
  );
};

export default Dialog;
