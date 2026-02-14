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

  deleteSnippet: (id: string) => Promise<void>;
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
  },

  deleteSnippet: async (id: string) => {
    // Optimistic update
    set((state) => ({
      snippets: state.snippets.filter((s) => s.id !== id),
    }));

    try {
      const response = await fetch(`/api/snippet/${id}`, {
        method: 'DELETE',
      });

      if (!response.ok) {
        throw new Error('Failed to delete snippet');
      }
    } catch (error) {
      console.error('Error deleting snippet:', error);
      // Rollback (optional, but good practice - omitting for simplicity unless requested)
    }
  },
}));