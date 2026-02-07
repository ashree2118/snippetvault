'use client';

import { useState } from 'react';

import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';


import { vscDarkPlus } from 'react-syntax-highlighter/dist/cjs/styles/prism';

import { Check, Copy, Terminal } from 'lucide-react';

interface CodeBlockProps {
  code: string;
  language: string;
}

export default function CodeBlock({ code, language }: CodeBlockProps) {
  const [copied, setCopied] = useState(false);

  let lang = (language || 'text').toLowerCase();
  if (lang === 'c++') lang = 'cpp';
  if (lang === 'c#') lang = 'csharp';
  if (lang === 'react') lang = 'jsx';
  if (lang === 'js') lang = 'javascript';
  if (lang === 'ts') lang = 'typescript';

  const handleCopy = () => {
    navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="relative group rounded-md overflow-hidden border border-gray-800 bg-[#1e1e1e] flex flex-col h-full">
      {/* Header with Language Name */}
      <div className="flex justify-between items-center bg-[#252526] px-4 py-2 border-b border-gray-800">
        <div className="flex items-center gap-2 text-xs text-gray-400">
          <Terminal size={12} />
          <span className="uppercase font-semibold tracking-wider">{lang}</span>
        </div>
        
        {/* Copy Button */}
        <button
          onClick={handleCopy}
          className="text-gray-400 hover:text-white transition-colors"
          title="Copy to clipboard"
        >
          {copied ? <Check size={14} className="text-green-400" /> : <Copy size={14} />}
        </button>
      </div>

      {/* The Highlighter */}
      <div className="flex-1 overflow-auto custom-scrollbar">
        <SyntaxHighlighter
          language={lang}
          style={vscDarkPlus}
          customStyle={{
            margin: 0,
            padding: '1.5rem',
            fontSize: '0.875rem', 
            lineHeight: '1.6',
            background: 'transparent', 
          }}
          wrapLongLines={true}
        >
          {code}
        </SyntaxHighlighter>
      </div>
    </div>
  );
}