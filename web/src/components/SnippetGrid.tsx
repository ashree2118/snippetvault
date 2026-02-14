'use client';

import { useEffect, useState } from 'react';
import { useSnippetStore } from '@/store/useSnippetStore';
import CodeBlock from './CodeBlock';
import { parseSnippetContent } from '@/lib/parseSnippetContent';
import { Search, Trash2 } from 'lucide-react';
import { Maximize2, Minimize2 } from 'lucide-react';

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

const MAX_DESCRIPTION_PREVIEW = 150;

function SnippetCard({ snippet }: { snippet: any }) {
  const { deleteSnippet } = useSnippetStore();
  const [expanded, setExpanded] = useState(false);

  const handleDelete = async () => {
    if (confirm('Are you sure you want to delete this snippet? This action cannot be undone.')) {
      await deleteSnippet(snippet.id);
    }
  };

  // Combine optional explanation with code so we get text → code → text... order
  const explanation = (snippet as any).explanation || '';
  const fullContent = [explanation, snippet.code].filter(Boolean).join('\n\n');
  const segments = parseSnippetContent(fullContent, snippet.language?.toLowerCase() || 'text');

  return (
    <div className="rounded-2xl p-6 border border-[#1a1a1a]">
      {/* Title row: title left, expand button right */}
      <div className="flex items-start justify-between gap-3 mb-2">
        <h2 className="text-[15px] font-bold text-[#e8e8e8] leading-snug tracking-[-0.01em] flex-1 min-w-0">
          {snippet.title || "Title of the code snippet"}
        </h2>

        <div className="flex items-center gap-2 shrink-0">
          <button
            onClick={handleDelete}
            aria-label="Delete snippet"
            className="flex items-center justify-center p-1.5 text-[#666] hover:text-[#ff4d4d] hover:bg-[#2a1a1a] rounded-lg transition-colors"
          >
            <Trash2 size={14} />
          </button>

          <button
            onClick={() => setExpanded(!expanded)}
            className="flex items-center gap-1.5 bg-[#1a1a1a] rounded-lg px-3 py-1.5 text-[11px] text-[#666] hover:text-[#999] hover:border-[#3a3a3a] transition-colors"
          >
            <span className="font-sans">{expanded ? 'collapse' : 'expand'}</span>
            {expanded ? <Minimize2 size={11} /> : <Maximize2 size={11} />}
          </button>
        </div>
      </div>

      {/* Segments: description → code block → description → code block ... */}
      <div className="flex flex-col gap-4">
        {segments.map((seg, i) => {
          if (seg.type === 'text') {
            const shouldTruncate = !expanded && seg.content.length > MAX_DESCRIPTION_PREVIEW;
            const displayText = shouldTruncate
              ? seg.content.slice(0, MAX_DESCRIPTION_PREVIEW)
              : seg.content;
            return (
              <p
                key={i}
                className="text-[12.5px] text-[#777] leading-[1.7]"
              >
                {displayText}
                {shouldTruncate && (
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
                {expanded && seg.content.length > MAX_DESCRIPTION_PREVIEW && (
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
            );
          }
          return (
            <div key={i} className="rounded-xl overflow-hidden">
              <CodeBlock
                code={seg.content}
                language={seg.language}
                expanded={expanded}
              />
            </div>
          );
        })}
      </div>
    </div>
  );
}