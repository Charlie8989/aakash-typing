"use client";
import Link from "next/link";
import React, { useState } from "react";
import PrivacyDialog from "./(main)/_components/PrivacyDialog";

const Footer = () => {
  const [openPrivacy, setOpenPrivacy] = useState(false);

  return (
    <>
      <footer className="bg-black border-t border-white/10 text-white px-6 md:px-16 lg:px-24 py-10">
        <div className="flex flex-col md:flex-row justify-between gap-8">
          <div>
            <h3 className="text-xl font-bold">TypeWithAakash</h3>
            <p className="text-slate-400 mt-2 max-w-xs">
              Practice smarter. Type faster. Build accuracy that sticks.
            </p>
          </div>

          <div className="flex gap-16">
            <div>
              <h4 className="font-semibold mb-3">Product</h4>
              <ul className="space-y-2 text-slate-400">
                <Link href="/exams">
                  <li className="hover:text-white cursor-pointer">Practice</li>
                </Link>
              </ul>
            </div>

            <div>
              <h4 className="font-semibold mb-3">Company</h4>
              <ul className="space-y-2 text-slate-400">
                <Link href="/about">
                  <li className="hover:text-white cursor-pointer">About</li>
                </Link>

                <li className="hover:text-white cursor-pointer">
                  <a href="mailto:sahuayush467@gmail.com">Contact</a>
                </li>

                <li
                  onClick={() => setOpenPrivacy(true)}
                  className="hover:text-white cursor-pointer"
                >
                  Privacy Policy
                </li>
              </ul>
            </div>
          </div>
        </div>

        <div className="border-t border-white/10 mt-10 pt-6 flex justify-between text-slate-400 text-sm">
          <p>
            © {new Date().getFullYear()} TypeWithAakash All rights reserved.
          </p>
          <p>Code By Charlie ❤️</p>
        </div>
      </footer>

      <PrivacyDialog open={openPrivacy} onClose={() => setOpenPrivacy(false)} />
    </>
  );
};

export default Footer;
