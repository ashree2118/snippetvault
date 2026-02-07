'use client';

import { useEffect, useState } from 'react';
import { useSnippetStore } from '@/store/useSnippetStore';
import CodeBlock from './CodeBlock';
import { Search } from 'lucide-react';

export default function SnippetGrid({ initialData }: { initialData: any[] }) {
  const { setSnippets, setSearchQuery, filteredSnippets } = useSnippetStore();
  const snippets = filteredSnippets();

  useEffect(() => {
    setSnippets(initialData);
  }, [initialData, setSnippets]);

  return (
    <div>
      {/* Search Bar */}
      <div className="mb-7">
        <div className="relative">
          <Search size={15} className="absolute left-4 top-1/2 -translate-y-1/2 text-[#444]" />
          <input 
            type="text" 
            placeholder="Search for 'hydration error'" 
            className="w-full bg-[#111111] border border-[#1a1a1a] rounded-xl pl-11 pr-4 py-3 text-[13px] text-[#ccc] placeholder-[#444] focus:outline-none focus:border-[#2a2a2a] transition-colors"
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
      </div>

      {/* Snippet List - Single Column */}
      <div className="flex flex-col gap-5">
        {snippets.length === 0 ? (
          <p className="text-[#555] text-center py-16 text-sm">No snippets found.</p>
        ) : (
          snippets.map((snippet) => (
            <SnippetCard key={snippet.id} snippet={snippet} />
          ))
        )}
      </div>
    </div>
  );
}

function SnippetCard({ snippet }: { snippet: any }) {
  const [expanded, setExpanded] = useState(false);

  const description = (snippet as any).explanation || '';
  const shouldTruncate = description.length > 150;
  const displayDescription = expanded ? description : description.slice(0, 150);

  return (
    <div className="rounded-2xl p-6 border border-[#1a1a1a]">
      {/* Title */}
      <h2 className="text-[15px] font-bold text-white mb-2 leading-snug tracking-[-0.01em]">
        {snippet.title || "Title of the code snippet"}
      </h2>

      {/* Description */}
      <p className="text-[12.5px] text-[#777] leading-[1.7] mb-4">
        {description ? displayDescription : 'Description of the code snippet explaining what is there. the text part will go here'}
        {shouldTruncate && !expanded && (
          <>
            {' '}
            <button 
              onClick={() => setExpanded(true)}
              className="text-white font-semibold hover:underline"
            >
              See more
            </button>
          </>
        )}
        {shouldTruncate && expanded && (
          <>
            {' '}
            <button 
              onClick={() => setExpanded(false)}
              className="text-white font-semibold hover:underline"
            >
              See less
            </button>
          </>
        )}
      </p>

      {/* Code Block */}
      <div className="rounded-xl overflow-hidden">
        <CodeBlock 
          code={snippet.code} 
          language={snippet.language?.toLowerCase() || 'text'} 
        />
      </div>
    </div>
  );
}