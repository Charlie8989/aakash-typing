"use client";
import Button from "@/components/Button";
import { api } from "@/convex/_generated/api";
import { useMutation, useQuery } from "convex/react";
import { useParams, useRouter, useSearchParams } from "next/navigation";
import React, { useEffect, useRef, useState } from "react";
import { SignedIn, SignedOut, RedirectToSignIn, useUser } from "@clerk/nextjs";

const Page = () => {
  const router = useRouter();
  const { user: clerkUser } = useUser();
  const { testId } = useParams();
  const searchParams = useSearchParams();
  const examId = searchParams.get("examId");

  const exams = useQuery(api.exams.getExams);
  const saveResult = useMutation(api.results.saveResult);

  const [fontSize, setFontsize] = useState(17);
  const [secondtimer, setsecondTimer] = useState(59);
  const [minutetimer, setminuteTimer] = useState(4);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [, forceRender] = useState(0);

  const editorRef = useRef(null);
  const backspaceCountRef = useRef(0);

  const paramLimit = Number(searchParams.get("limit"));
  const paramTime = Number(searchParams.get("time"));

  const fullText =
    exams?.find((e) => e._id === examId)?.paragraph || "";

  const finalKeyLimit =
    paramLimit && paramLimit > 0 ? paramLimit : fullText.length;

  const finalTime =
    paramTime && paramTime > 0 ? paramTime : 5;

  const originalText = fullText.slice(0, finalKeyLimit);

  useEffect(() => {
    const startMinute = finalTime > 0 ? finalTime - 1 : 0;
    setminuteTimer(startMinute);
    setsecondTimer(59);
  }, [finalTime]);

  useEffect(() => {
    if (minutetimer === 0 && secondtimer === 0) {
      handleSubmit();
      return;
    }

    const interval = setInterval(() => {
      setsecondTimer((prev) => {
        if (prev === 0) {
          if (minutetimer > 0) {
            setminuteTimer((m) => m - 1);
            return 59;
          }
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [minutetimer, secondtimer]);

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

  const getHighlightedOriginal = () => {
    const typed = editorRef.current?.innerText || "";
    const originalWords = originalText.split(" ");
    const typedWords = typed.trim().split(/\s+/).filter(Boolean);

    // Find the current word index being typed
    // Count complete words (words followed by space)
    const spaceCount = (typed.match(/ /g) || []).length;
    const currentWordIndex = spaceCount;

    return originalWords.map((word, i) => {
      // Only highlight the current word being typed
      if (i === currentWordIndex) {
        if (!typedWords[i]) return <span key={i}>{word} </span>;
        if (typedWords[i] === word)
          return <span key={i} className="bg-yellow-300">{word} </span>;
        return <span key={i} className="bg-red-400 text-white">{word} </span>;
      }
      // All other words have no highlight
      return <span key={i}>{word} </span>;
    });
  };

  const checkErrors = () => {
    const typedText = editorRef.current?.innerText || "";
    const originalWords = originalText.split(" ");
    const typedWords = typedText.trim().split(/\s+/).filter(Boolean);

    let wrongWords = [];
    let missingWords = [];

    originalWords.forEach((word, index) => {
      if (!typedWords[index]) missingWords.push(word);
      else if (typedWords[index] !== word) {
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
      const userEmail = clerkUser?.primaryEmailAddress?.emailAddress;
      const userImageUrl = clerkUser?.imageUrl;

      await saveResult({
        examId,
        totalWords: result.totalWords,
        typedWords: result.typedWords,
        wrongWords: result.wrongWords,
        missingWords: result.missingWords,
        backspace: result.backspace,
        userEmail,
        userImageUrl,
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

  const handleInput = () => {
    forceRender((p) => p + 1);
  };

  if (!exams || !examId) return null;

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

          <div style={{ fontSize: `${fontSize}px` }} className="m-4 border-2 p-3 rounded-md">
            {getHighlightedOriginal()}
          </div>

          <div
            ref={editorRef}
            contentEditable
            onInput={handleInput}
            onKeyDown={handleKeyDown}
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