import { create } from 'zustand';

// Define what a Snippet looks like on the frontend
interface Snippet {
  id: string;
  title: string | null;
  code: string;
  language: string | null;
  tags: string[];
}

interface SnippetState {
  snippets: Snippet[];
  searchQuery: string;
  
  // Actions
  setSnippets: (snippets: Snippet[]) => void;
  setSearchQuery: (query: string) => void;
  
  // Selector (Derived State)
  filteredSnippets: () => Snippet[];
}

export const useSnippetStore = create<SnippetState>((set, get) => ({
  snippets: [],
  searchQuery: '',

  setSnippets: (snippets) => set({ snippets }),
  setSearchQuery: (query) => set({ searchQuery: query }),

  // The "Smart" Selector: Filters snippets based on the search query
  filteredSnippets: () => {
    const { snippets, searchQuery } = get();
    if (!searchQuery) return snippets;
    
    const lowerQuery = searchQuery.toLowerCase();
    
    return snippets.filter(s => 
      (s.title?.toLowerCase().includes(lowerQuery)) ||
      (s.code.toLowerCase().includes(lowerQuery)) ||
      (s.tags.some(tag => tag.toLowerCase().includes(lowerQuery)))
    );
  }
}));