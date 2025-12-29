import React from "react";

const Footer = () => {
  return (
    <footer className="bg-black border-t border-white/10 text-white px-6 md:px-16 lg:px-24 py-10">
      
      <div className="flex flex-col md:flex-row justify-between gap-8">
        
        <div>
          <h3 className="text-xl font-bold">TypeFast</h3>
          <p className="text-slate-400 mt-2 max-w-xs">
            Practice smarter. Type faster. Build accuracy that sticks.
          </p>
        </div>

        <div className="flex gap-16">
          <div>
            <h4 className="font-semibold mb-3">Product</h4>
            <ul className="space-y-2 text-slate-400">
              <li className="hover:text-white cursor-pointer">Typing Test</li>
              <li className="hover:text-white cursor-pointer">Practice</li>
              <li className="hover:text-white cursor-pointer">Leaderboard</li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold mb-3">Company</h4>
            <ul className="space-y-2 text-slate-400">
              <li className="hover:text-white cursor-pointer">About</li>
              <li className="hover:text-white cursor-pointer">Contact</li>
              <li className="hover:text-white cursor-pointer">Privacy Policy</li>
            </ul>
          </div>
        </div>
      </div>

      <div className="border-t border-white/10 mt-10 pt-6 flex flex-col sm:flex-row justify-between items-center gap-4 text-slate-400 text-sm">
        <p>© {new Date().getFullYear()} TypeFast. All rights reserved.</p>
        <p>Code By Charlie ❤️ </p>
      </div>
    </footer>
  );
};

export default Footer;
