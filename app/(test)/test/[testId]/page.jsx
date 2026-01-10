"use client";
import Button from "@/components/Button";
import { api } from "@/convex/_generated/api";
import { useMutation } from "convex/react";
import { useParams, useRouter } from "next/navigation";
import React, { useEffect, useRef, useState } from "react";

const Page = () => {
  const router = useRouter();
  const [fontSize, setFontsize] = useState(17);
  const [secondtimer, setsecondTimer] = useState(59);
  const [minutetimer, setminuteTimer] = useState(4);
  const editorRef = useRef(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [userId, setUserId] = useState(null);
  const saveResult = useMutation(api.results.saveResult);
  const { testId } = useParams();
  const backspaceCountRef = useRef(0);

  useEffect(() => {
    const id = localStorage.getItem("userId");
    if (id) setUserId(JSON.parse(id));
  }, []);

  useEffect(() => {
    if (secondtimer <= 0) return;
    const interval = setInterval(() => {
      setsecondTimer((prev) => prev - 1);
    }, 1000);

    return () => clearInterval(interval);
  }, [secondtimer]);

  useEffect(() => {
    if (minutetimer <= 0) return;
    const interval = setInterval(() => {
      setminuteTimer((prev) => prev - 1);
    }, 60000);

    return () => clearInterval(interval);
  }, [minutetimer]);

  const reducesize = () => {
    setFontsize((prev) => prev - 1);
    console.log(fontSize);
  };

  const increasesize = () => {
    setFontsize((prev) => prev + 1);
    console.log(fontSize);
  };

  const resetsize = () => {
    setFontsize(20);
    console.log(fontSize);
  };

  const originalText = `रकोेतदाा ादा ादा ाद`;

  const normalizeText = (text) =>
    text.normalize("NFC").replace(/\s+/g, " ").trim();

  const checkErrors = () => {
    const typedText = normalizeText(editorRef.current?.innerText || "");
    const original = normalizeText(originalText);

    const originalWords = original.split(" ");
    const typedWords = typedText.split(" ");

    let wrongWords = [];
    let missingWords = [];

    originalWords.forEach((word, index) => {
      if (!typedWords[index]) {
        missingWords.push(word);
      } else if (typedWords[index] !== word) {
        wrongWords.push({
          expected: word,
          typed: typedWords[index],
          position: index,
        });
      }
    });

    return {
      totalWords: originalWords.length,
      typedWords: typedWords.length,
      wrongWords,
      missingWords,
      backspace: backspaceCountRef.current,
    };
  };

  const handleSubmit = async () => {
    if (!userId) {
      alert("User not found");
      return;
    }

    if (isSubmitting) return;

    setIsSubmitting(true);
    try {
      const result = checkErrors();

      await saveResult({
        userId,
        totalWords: result.totalWords,
        typedWords: result.typedWords,
        wrongWords: result.wrongWords,
        missingWords: result.missingWords,
        backspace: result.backspace,
      });
    } catch (err) {
      console.error(err);
    } finally {
      router.push(`/test/${testId}/result`);
      setIsSubmitting(false);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Backspace") {
      backspaceCountRef.current += 1;
    }
  };

  return (
    <div>
      <div className="flex sm:flex-row px-5 flex-col items-center justify-between">
        <ul
          className={`flex mt-2 p-2 rounded-md border-1 items-center justify-center flex-row gap-4 font-bold cursor-pointer`}
        >
          <li onClick={reducesize}>A-</li>
          <li onClick={resetsize}>A</li>
          <li onClick={increasesize}>A+</li>
        </ul>
        <span className="font-semibold text-lg">
          Time:{minutetimer}:{secondtimer}
        </span>
      </div>

      <div
        style={{ fontSize: `${fontSize}px` }}
        className="m-4 border-2 p-3 rounded-md "
      >
        {originalText}
      </div>

      <div
        ref={editorRef}
        onKeyDown={handleKeyDown}
        contentEditable
        className="min-h-[60vh] max-h-fit border-2 rounded-md border-purple-300 bg-purple-100 outline-none m-4 p-3"
      ></div>
      <div className="flex justify-end sm:mt-10 mt-5  px-4">
        <Button
          text={isSubmitting ? "Submitting..." : "Submit Test"}
          disabled={isSubmitting}
          onClick={handleSubmit}
        />
      </div>
    </div>
  );
};

export default Page;
