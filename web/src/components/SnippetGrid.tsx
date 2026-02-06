'use client';

import { useEffect } from 'react';
import { useSnippetStore } from '@/store/useSnippetStore';
import CodeBlock from './CodeBlock'; // <--- Import new component
import { Trash2 } from 'lucide-react'; // Optional: Delete icon

export default function SnippetGrid({ initialData }: { initialData: any[] }) {
  const { setSnippets, setSearchQuery, filteredSnippets } = useSnippetStore();
  const snippets = filteredSnippets();

  useEffect(() => {
    setSnippets(initialData);
  }, [initialData, setSnippets]);

  return (
    <div>
      {/* Search Bar (Keep existing) */}
      <div className="mb-8">
        <input 
          type="text" 
          placeholder="Search snippets, tags, or code..." 
          className="w-full bg-gray-900 border border-gray-700 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-blue-500 transition-colors"
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>

      {/* The Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {snippets.length === 0 ? (
          <p className="text-gray-500 col-span-full text-center py-10">No snippets found.</p>
        ) : (
          snippets.map((snippet) => (
            <div key={snippet.id} className="bg-gray-900 border border-gray-800 rounded-xl p-5 hover:border-blue-500/50 transition-all flex flex-col">
              
              {/* Card Header */}
              <div className="flex justify-between items-start mb-3">
                <h2 className="font-semibold text-lg text-white truncate pr-2" title={snippet.title || undefined}>
                  {snippet.title || "Untitled"}
                </h2>
                <span className="text-[10px] bg-blue-900/30 text-blue-300 px-2 py-1 rounded uppercase tracking-wider">
                  {snippet.language || "TXT"}
                </span>
              </div>

              {/* Explanation (Optional) */}
              {(snippet as any).explanation && (
                <p className="text-gray-400 text-xs mb-3 line-clamp-2">
                  {(snippet as any).explanation}
                </p>
              )}
              
              {/* COLORFUL CODE BLOCK */}
              <div className="mb-4 h-48 overflow-y-auto custom-scrollbar rounded-md">
                 <CodeBlock 
                    code={snippet.code} 
                    language={snippet.language?.toLowerCase() || 'text'} 
                 />
              </div>

              {/* Tags Footer */}
              <div className="flex flex-wrap gap-2 mt-auto pt-3 border-t border-gray-800/50">
                {snippet.tags.map((tag: string, i: number) => (
                  <span key={i} className="text-xs text-gray-500 hover:text-gray-300 transition-colors">
                    #{tag}
                  </span>
                ))}
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}