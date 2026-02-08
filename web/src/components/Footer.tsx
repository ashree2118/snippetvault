import Link from "next/link";
import { Github, Twitter } from "lucide-react";

export const Footer = () => {
  return (
    <footer className="w-full border-t border-[#1e1e1e] px-4 py-6">
      <div className="mx-auto max-w-5xl flex flex-col items-center gap-4 sm:flex-row sm:justify-between sm:gap-0">
        
        {/* Copyright */}
        <p className="text-xs text-[#666] text-center sm:text-left">
          © {new Date().getFullYear()} Snippet. All rights reserved.
        </p>

        {/* Links */}
        <div className="flex items-center gap-4">
          <Link
            href="/privacy"
            className="text-xs text-[#15B19A] hover:text-[#aaa] transition-colors"
          >
            Privacy
          </Link>
          <Link
            href="https://github.com/ashree2118/snippetvault"
            target="_blank"
            className="inline-flex items-center gap-1 text-xs text-[#15B19A] hover:text-[#aaa] transition-colors"
          >
            <Github size={14} />
            GitHub
          </Link>

          <Link
            href="https://x.com/anushree210"
            target="_blank"
            className="inline-flex items-center gap-1 text-xs text-[#15B19A] hover:text-[#aaa] transition-colors"
          >
            <Twitter size={14} />
            X
          </Link>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
