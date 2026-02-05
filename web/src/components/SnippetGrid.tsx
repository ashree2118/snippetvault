'use client';

import { useEffect } from 'react';
import { useSnippetStore } from '@/store/useSnippetStore';

// We pass the initial data from the Server Component
export default function SnippetGrid({ initialData }: { initialData: any[] }) {
  const { setSnippets, setSearchQuery, filteredSnippets } = useSnippetStore();
  const snippets = filteredSnippets(); // Get the filtered list

  // Load server data into Zustand on mount
  useEffect(() => {
    setSnippets(initialData);
  }, [initialData, setSnippets]);

  return (
    <div>
      {/* 1. Search Bar */}
      <div className="mb-8">
        <input 
          type="text" 
          placeholder="Search snippets, tags, or code..." 
          className="w-full bg-gray-900 border border-gray-700 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-blue-500 transition-colors"
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>

      {/* 2. Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {snippets.length === 0 ? (
          <p className="text-gray-500">No matching snippets found.</p>
        ) : (
          snippets.map((snippet) => (
            <div key={snippet.id} className="bg-gray-900 border border-gray-800 rounded-xl p-5 hover:border-blue-500/50 transition-all">
              <div className="flex justify-between items-start mb-3">
                <h2 className="font-semibold text-lg text-white truncate pr-4">
                  {snippet.title || "Untitled"}
                </h2>
                <span className="text-xs bg-gray-800 px-2 py-1 rounded text-gray-400 uppercase">
                  {snippet.language || "text"}
                </span>
              </div>
              
              <div className="bg-black/50 p-3 rounded-md mb-4 font-mono text-xs text-gray-300 overflow-hidden h-24 relative">
                <pre>{snippet.code}</pre>
                <div className="absolute bottom-0 left-0 w-full h-8 bg-gradient-to-t from-gray-900 to-transparent"></div>
              </div>

              <div className="flex flex-wrap gap-2">
                {snippet.tags.map((tag, i) => (
                  <span key={i} className="text-xs text-blue-300 bg-blue-900/30 px-2 py-1 rounded-md">
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