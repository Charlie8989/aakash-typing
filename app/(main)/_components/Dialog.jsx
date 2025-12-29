"use client";
import { v4 as uuidv4 } from "uuid";
import { useRouter } from "next/navigation";

const Dialog = ({ open, onClose, onStart }) => {
  if (!open) return null;

  const goFullScreen = () => {
    if (document.documentElement.requestFullscreen) {
      document.documentElement.requestFullscreen();
    }
  };

  const router = useRouter();

  const startTest = () => {
    const testId = uuidv4();
    router.push(`/test/${testId}`);
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
            placeholder="Enter your name"
            className="w-full border p-2 rounded"
          />

          <select className="w-full border p-2 rounded" required>
            <option>Select mode</option>
            <option>Practice</option>
            <option>Exam</option>
          </select>

          <button
            onClick={() => {
              onStart();
              startTest();
              goFullScreen();
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
