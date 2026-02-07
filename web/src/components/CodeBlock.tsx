'use client';

import { useState } from 'react';
import { Check, Copy, Maximize2, Minimize2 } from 'lucide-react';

interface CodeBlockProps {
  code: string;
  language: string;
}

export default function CodeBlock({ code, language }: CodeBlockProps) {
  const [copied, setCopied] = useState(false);
  const [expanded, setExpanded] = useState(false);

  // Strip markdown code fences (```lang ... ```) if present
  const cleanCode = code
    .replace(/^```[\w#\+]*\s*\n?/gm, '')
    .replace(/```\s*$/gm, '')
    .trim();

  const handleCopy = () => {
    navigator.clipboard.writeText(cleanCode);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="relative rounded-xl overflow-hidden bg-[#111111] border border-[#1c1c1c]">
      {/* Top-right actions: expand pill + copy icon */}
      <div className="absolute top-3 right-3 z-10 flex items-center gap-2.5">
        {/* Expand pill button */}
        <button
          onClick={() => setExpanded(!expanded)}
          className="flex items-center gap-1.5 bg-[#1a1a1a] border border-[#2a2a2a] rounded-lg px-3 py-1.5 text-[11px] text-[#666] hover:text-[#999] hover:border-[#3a3a3a] transition-colors"
        >
          <span className="font-sans">{expanded ? 'collapse' : 'expand'}</span>
          {expanded ? <Minimize2 size={11} /> : <Maximize2 size={11} />}
        </button>
        {/* Copy button */}
        <button
          onClick={handleCopy}
          className="text-[#555] hover:text-[#999] transition-colors p-1"
          title="Copy to clipboard"
        >
          {copied ? <Check size={16} className="text-[#666]" /> : <Copy size={16} />}
        </button>
      </div>

      {/* Plain code - no syntax highlighting, clean monospace */}
      <div className={`overflow-auto custom-scrollbar ${expanded ? '' : 'max-h-[160px]'}`}>
        <pre
          className="font-mono text-[11.5px] leading-[1.8] text-[#c8c8c8] whitespace-pre-wrap break-words"
          style={{ margin: 0, padding: '20px 50px 20px 20px' }}
        >
          {cleanCode}
        </pre>
      </div>
    </div>
  );
}