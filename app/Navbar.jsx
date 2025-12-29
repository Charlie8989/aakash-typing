"use client";

import { useEffect, useState } from "react";
import EncryptedTextDemoSecond from "./Encrypted";
import Link from "next/link";

const Navbar = () => {
  const [isMobile, setIsMobile] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
      if (window.innerWidth >= 768) setMenuOpen(false);
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <div className="text-black">
      <div className="flex sticky z-50 top-0  px-4 py-4 justify-between items-center">
        <div className="text-lg sm:text-2xl">
          <Link href="/">
            <EncryptedTextDemoSecond text="Typing" />
          </Link>
        </div>

        {!isMobile && (
          <ul className="flex gap-7">
            <Link href="/">
              <li onClick={() => setMenuOpen(false)}>Home</li>
            </Link>
            <Link href="/exams">
              <li onClick={() => setMenuOpen(false)}>Exams</li>
            </Link>{" "}
            <Link href="/about">
              <li onClick={() => setMenuOpen(false)}>About</li>
            </Link>
          </ul>
        )}

        {isMobile && (
          <button
            onClick={() => setMenuOpen(true)}
            className="text-2xl"
            aria-label="Open Menu"
          >
            ☰
          </button>
        )}
      </div>

      {isMobile && menuOpen && (
        <div className="fixed inset-0 backdrop-blur-sm z-50">
          <div
            className="absolute inset-0 bg-black/40"
            onClick={() => setMenuOpen(false)}
          />

          <div className="absolute right-0 top-0 h-full w-[70vw] bg-white p-5 shadow-lg">
            <div
              className="mb-6 cursor-pointer text-right"
              onClick={() => setMenuOpen(false)}
            >
              ✕
            </div>

            <ul className="flex flex-col gap-4 text-lg">
              <Link href="/">
                <li onClick={() => setMenuOpen(false)}>Home</li>
              </Link>
              <Link href="/exams">
                <li onClick={() => setMenuOpen(false)}>Exams</li>
              </Link>{" "}
              <Link href="/about">
                <li onClick={() => setMenuOpen(false)}>About</li>
              </Link>
            </ul>
          </div>
        </div>
      )}

      <hr />
    </div>
  );
};

export default Navbar;
