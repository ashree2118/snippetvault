'use client';

import { useState, useEffect } from 'react';
import { Check, Copy } from 'lucide-react';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { vscDarkPlus } from 'react-syntax-highlighter/dist/cjs/styles/prism';

interface CodeBlockProps {
  code: string;
  language: string;
  /** When true, code block shows full height (no max-height). Controlled by snippet card expand. */
  expanded?: boolean;
}

export default function CodeBlock({ code, language, expanded = false }: CodeBlockProps) {
  const [copied, setCopied] = useState(false);
  const [isMounted, setIsMounted] = useState(false); // To prevent SSR issues with SyntaxHighlighter

  // Strip markdown code fences (```lang ... ```) if present
  const cleanCode = code
    .replace(/^```[\w#\+]*\s*\n?/gm, '')
    .replace(/```\s*$/gm, '')
    .trim();
  useEffect(() => {
    setIsMounted(true);
  }, []);

  const handleCopy = () => {
    navigator.clipboard.writeText(cleanCode);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="relative rounded-xl overflow-hidden bg-[#070707] border border-[#1c1c1c]">
      {/* Top-right: copy icon only */}
      <div className="absolute top-3 right-3 z-10 flex items-center gap-2.5">
        <button
          onClick={handleCopy}
          className="text-[#555] hover:text-[#999] transition-colors p-1"
          title="Copy to clipboard"
        >
          {copied ? <Check size={16} className="text-[#666]" /> : <Copy size={16} />}
        </button>
      </div>

      {/* --- The Syntax Highlighter --- */}
      <div className={`overflow-auto custom-scrollbar ${expanded ? '' : 'max-h-[160px]'}`}>
        {isMounted ? (
          <SyntaxHighlighter
            language={language?.toLowerCase() || 'text'}
            style={vscDarkPlus}
            // We inject your exact UI styles here:
            customStyle={{
              margin: 0,
              padding: '20px 50px 20px 20px', // Your padding
              background: 'transparent',      // Use parent bg
              fontSize: '11.5px',             // Your font size
              lineHeight: '1.8',              // Your line height
            }}
            wrapLongLines={true}
          >
            {cleanCode}
          </SyntaxHighlighter>
        ) : (
          // Fallback to plain text while loading (prevents flickering)
          <pre 
            className="font-mono text-[11.5px] leading-[1.8] text-[#c8c8c8] whitespace-pre-wrap break-words"
            style={{ margin: 0, padding: '20px 50px 20px 20px' }}
          >
            {cleanCode}
          </pre>
        )}
        </div>
    </div>
  );
}