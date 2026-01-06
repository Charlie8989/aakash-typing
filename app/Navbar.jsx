"use client";

import { useEffect, useState } from "react";
import EncryptedTextDemoSecond from "./Encrypted";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { User2 } from "lucide-react";
import { SignOutButton, useUser } from "@clerk/nextjs";

const Navbar = () => {
  const [isMobile, setIsMobile] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const { isSignedIn, isLoaded, user } = useUser();

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
      if (window.innerWidth >= 768) setMenuOpen(false);
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  if (!isLoaded) {
    return null;
  }

  const gotoAuth = () => {
    if (!isSignedIn) {
      router.push("/sign-in");
    } else {
      setOpen((prev) => !prev);
    }
  };

  return (
    <div className="text-black">
      <div className="flex sticky z-50 top-0  px-4 py-4 justify-between items-center">
        <div className="text-lg sm:text-2xl">
          <Link href="/">
            <EncryptedTextDemoSecond text="TypeWithAakash" />
          </Link>
        </div>

        {!isMobile && (
          <ul className="flex gap-7 items-center relative">
            <li>
              <Link href="/" onClick={() => setMenuOpen(false)}>
                Home
              </Link>
            </li>

            <li>
              <Link href="/exams" onClick={() => setMenuOpen(false)}>
                Exams
              </Link>
            </li>

            <li>
              <Link href="/about" onClick={() => setMenuOpen(false)}>
                About
              </Link>
            </li>

            <li className="relative">
              <button
                onClick={gotoAuth}
                className="border rounded-full w-10 h-10 flex items-center justify-center border-gray-400"
              >
                {isSignedIn ? (
                  <img
                    src={user.imageUrl}
                    className="rounded-full w-10 h-10"
                    alt="user logo"
                  />
                ) : (
                  <User2 className="size-5" />
                )}
              </button>

              {open && isSignedIn && (
                <div className="absolute right-0 mt-2 bg-white border rounded-lg shadow-lg">
                  <SignOutButton>
                    <button className="w-full text-left px-4 py-2 hover:bg-gray-100 text-red-500">
                      Logout
                    </button>
                  </SignOutButton>
                </div>
              )}
            </li>
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
            {isSignedIn && (
              <button className="w-full p-2 mt-5 rounded-lg text-center bg-[#b657f5] text-white font-semibold text-md ">
                My Profile
              </button>
            )}
            {isSignedIn ? (
              <SignOutButton>
                <button className="w-full border-2 p-2 mt-3 rounded-lg text-center text-red-600 font-semibold text-md ">
                  LogOut
                </button>
              </SignOutButton>
            ) : (
              <button
                onClick={gotoAuth}
                className="w-full bg-[#b657f5] p-2 mt-5 rounded-lg text-center text-white font-semibold text-m"
              >
                Login
              </button>
            )}
          </div>
        </div>
      )}

      <hr />
    </div>
  );
};

export default Navbar;
