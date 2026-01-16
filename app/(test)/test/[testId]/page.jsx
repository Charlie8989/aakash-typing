"use client";
import Button from "@/components/Button";
import { api } from "@/convex/_generated/api";
import { useMutation, useQuery } from "convex/react";
import { useParams, useRouter, useSearchParams } from "next/navigation";
import React, { useEffect, useRef, useState } from "react";
import { SignedIn, SignedOut, RedirectToSignIn } from "@clerk/nextjs";

const Page = () => {
  const router = useRouter();
  const { testId } = useParams();
  const examId = useSearchParams().get("examId");

  const [fontSize, setFontsize] = useState(17);
  const [secondtimer, setsecondTimer] = useState(59);
  const [minutetimer, setminuteTimer] = useState(4);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const editorRef = useRef(null);
  const backspaceCountRef = useRef(0);

  const exams = useQuery(api.exams.getExams);
  const saveResult = useMutation(api.results.saveResult);

  useEffect(() => {
    const blockKeys = (e) => {
      if (
        (e.ctrlKey || e.metaKey) &&
        ["c", "x", "a", "u"].includes(e.key.toLowerCase())
      ) {
        e.preventDefault();
      }
    };
    document.addEventListener("keydown", blockKeys);
    return () => document.removeEventListener("keydown", blockKeys);
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

  if (!exams || !examId) return null;

  const originalText = exams.find((e) => e._id === examId)?.paragraph;

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
    if (isSubmitting) return;
    setIsSubmitting(true);

    try {
      const result = checkErrors();

      await saveResult({
        examId,
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
    <>
      <SignedIn>
        <div>
          <div className="flex sm:flex-row px-5 flex-col items-center justify-between">
            <ul className="flex mt-2 p-2 rounded-md border items-center gap-4 font-bold cursor-pointer">
              <li onClick={() => setFontsize((p) => p - 1)}>A-</li>
              <li onClick={() => setFontsize(20)}>A</li>
              <li onClick={() => setFontsize((p) => p + 1)}>A+</li>
            </ul>
            <span className="font-semibold text-lg">
              Time: {minutetimer}:{secondtimer}
            </span>
          </div>

          <div
            style={{ fontSize: `${fontSize}px` }}
            onCopy={(e) => e.preventDefault()}
            onCut={(e) => e.preventDefault()}
            onContextMenu={(e) => e.preventDefault()}
            className="m-4 border-2 p-3 rounded-md"
          >
            {originalText}
          </div>

          <div
            ref={editorRef}
            onKeyDown={handleKeyDown}
            contentEditable
            className="min-h-[60vh] border-2 rounded-md border-purple-300 bg-purple-100 outline-none m-4 p-3"
          />

          <div className="flex justify-end sm:mt-10 mt-5 px-4">
            <Button
              text={isSubmitting ? "Submitting..." : "Submit Test"}
              disabled={isSubmitting}
              onClick={handleSubmit}
            />
          </div>
        </div>
      </SignedIn>

      <SignedOut>
        <RedirectToSignIn />
      </SignedOut>
    </>
  );
};

export default Page;
