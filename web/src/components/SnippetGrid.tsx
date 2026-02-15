'use client';

import { useEffect, useState } from 'react';
import { useSnippetStore } from '@/store/useSnippetStore';
import CodeBlock from './CodeBlock';
import { parseSnippetContent } from '@/lib/parseSnippetContent';
import { Search, Trash2, Edit2, Save, X } from 'lucide-react';
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
  const { deleteSnippet, updateSnippet } = useSnippetStore();
  const [expanded, setExpanded] = useState(false);
  const [isEditing, setIsEditing] = useState(false);

  // Edit State
  const [editTitle, setEditTitle] = useState(snippet.title || '');
  const [editExplanation, setEditExplanation] = useState(snippet.explanation || '');
  const [editCode, setEditCode] = useState(snippet.code || '');

  // Initialize edit state when entering edit mode
  useEffect(() => {
    if (isEditing) {
      setEditTitle(snippet.title || '');
      setEditExplanation(snippet.explanation || '');

      // Legacy handling: if no explanation exists, try to separate it from code? 
      // For now, simpler: if explanation is empty, everything is in code. Users can cut/paste.
      setEditCode(snippet.code || '');
    }
  }, [isEditing, snippet]);

  const handleDelete = async () => {
    if (confirm('Are you sure you want to delete this snippet? This action cannot be undone.')) {
      await deleteSnippet(snippet.id);
    }
  };

  const handleSave = async () => {
    await updateSnippet(snippet.id, {
      title: editTitle,
      explanation: editExplanation,
      code: editCode,
    });
    setIsEditing(false);
  };

  // View Logic
  // If we have an explanation, we render it separately.
  // Otherwise, we do legacy parsing on the code field.
  const hasExplanation = !!snippet.explanation;

  // Legacy parsing (fallback)
  const fullContent = [snippet.explanation, snippet.code].filter(Boolean).join('\n\n'); // Only used for legacy mixed content
  const segments = !hasExplanation ? parseSnippetContent(fullContent, snippet.language?.toLowerCase() || 'text') : [];

  return (
    <div className="rounded-2xl p-6 border border-[#1a1a1a]">
      {/* Title row: title left, actions right */}
      <div className="flex items-start justify-between gap-3 mb-2">
        {isEditing ? (
          <input
            type="text"
            value={editTitle}
            onChange={(e) => setEditTitle(e.target.value)}
            className="flex-1 bg-[#111] border border-[#333] rounded-lg px-3 py-1.5 text-[15px] font-bold text-[#e8e8e8] focus:outline-none focus:border-[#555]"
            placeholder="Snippet Title"
          />
        ) : (
          <h2 className="text-[15px] font-bold text-[#e8e8e8] leading-snug tracking-[-0.01em] flex-1 min-w-0">
            {snippet.title || "Title of the code snippet"}
          </h2>
        )}

        <div className="flex items-center gap-2 shrink-0">
          {isEditing ? (
            <>
              <button
                onClick={handleSave}
                aria-label="Save changes"
                className="flex items-center justify-center p-2 text-[#4dffb8] hover:bg-[#1a2a20] rounded-lg transition-all"
              >
                <Save size={16} />
              </button>
              <button
                onClick={() => setIsEditing(false)}
                aria-label="Cancel edit"
                className="flex items-center justify-center p-2 text-[#ff4d4d] hover:bg-[#2a1a1a] rounded-lg transition-all"
              >
                <X size={16} />
              </button>
            </>
          ) : (
            <>
              <button
                onClick={() => setIsEditing(true)}
                aria-label="Edit snippet"
                className="flex items-center justify-center p-2 text-[#a0a0a0] hover:text-[#fff] hover:bg-[#2a2a2a] rounded-lg transition-all"
              >
                <Edit2 size={16} />
              </button>
              <button
                onClick={handleDelete}
                aria-label="Delete snippet"
                className="flex items-center justify-center p-2 text-[#a0a0a0] hover:text-[#ff4d4d] hover:bg-[#2a1a1a] rounded-lg transition-all"
              >
                <Trash2 size={16} />
              </button>
              <button
                onClick={() => setExpanded(!expanded)}
                className="flex items-center gap-1.5 bg-[#1a1a1a] rounded-lg px-3 py-1.5 text-[11px] text-[#666] hover:text-[#999] hover:border-[#3a3a3a] transition-colors"
                aria-label={expanded ? "Collapse" : "Expand"}
              >
                <span className="font-sans">{expanded ? 'collapse' : 'expand'}</span>
                {expanded ? <Minimize2 size={11} /> : <Maximize2 size={11} />}
              </button>
            </>
          )}
        </div>
      </div>

      {/* Content Area */}
      <div className="flex flex-col gap-4 mt-2">
        {isEditing ? (
          <>
            {/* Explanation Input */}
            <div>
              <label className="block text-[11px] text-[#555] uppercase tracking-wider mb-1 font-semibold">Explanation</label>
              <textarea
                value={editExplanation}
                onChange={(e) => setEditExplanation(e.target.value)}
                className="w-full bg-[#111] border border-[#333] rounded-lg px-3 py-2 text-[13px] text-[#ccc] focus:outline-none focus:border-[#555] min-h-[80px]"
                placeholder="Add an explanation..."
              />
            </div>

            {/* Code Input */}
            <div>
              <label className="block text-[11px] text-[#555] uppercase tracking-wider mb-1 font-semibold">Code</label>
              <textarea
                value={editCode}
                onChange={(e) => setEditCode(e.target.value)}
                className="w-full bg-[#111] border border-[#333] rounded-lg px-3 py-2 text-[13px] text-[#ccc] font-mono focus:outline-none focus:border-[#555] min-h-[150px]"
                placeholder="Paste your code here..."
              />
            </div>
          </>
        ) : (
          hasExplanation ? (
            // New Clean Render: Explanation -> Code
            <>
              {snippet.explanation && (
                <p className="text-[12.5px] text-[#777] leading-[1.7]">
                  {snippet.explanation}
                </p>
              )}
              <div className="rounded-xl overflow-hidden">
                <CodeBlock
                  code={snippet.code}
                  language={snippet.language}
                  expanded={expanded}
                />
              </div>
            </>
          ) : (
            // Legacy Logic
            segments.map((seg, i) => {
              if (seg.type === 'text') {
                const shouldTruncate = !expanded && seg.content.length > MAX_DESCRIPTION_PREVIEW;
                const displayText = shouldTruncate
                  ? seg.content.slice(0, MAX_DESCRIPTION_PREVIEW)
                  : seg.content;
                return (
                  <p key={i} className="text-[12.5px] text-[#777] leading-[1.7]">
                    {displayText}
                    {shouldTruncate && (
                      <button onClick={() => setExpanded(true)} className="text-white font-semibold hover:underline ml-1">See more</button>
                    )}
                    {expanded && seg.content.length > MAX_DESCRIPTION_PREVIEW && (
                      <button onClick={() => setExpanded(false)} className="text-white font-semibold hover:underline ml-1">See less</button>
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
            })
          )
        )}
      </div>
    </div>
  );
}