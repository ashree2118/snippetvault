'use client';

import { signIn, signOut, useSession } from "@/lib/auth-client";
import SnippetGrid from '@/components/SnippetGrid';

// We accept the data passed down from the server
export default function Dashboard({ initialSnippets }: { initialSnippets: any[] }) {
  const { data: session, isPending } = useSession();

  return (
    <div className="min-h-screen bg-black text-white p-10 font-sans">
      <div className="max-w-5xl mx-auto">
        
        {/* HEADER SECTION (Handles Auth) */}
        <header className="flex justify-between items-center mb-10 border-b border-gray-800 pb-5">
          <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
            SnippetVault
          </h1>

          <div>
            {isPending ? (
               <span className="text-gray-500">Loading...</span>
            ) : session ? (
              <div className="flex items-center gap-4">
                {session.user.image && (
                    <img 
                    src={session.user.image} 
                    alt="Profile" 
                    className="w-8 h-8 rounded-full border border-gray-700"
                    />
                )}
                <button 
                  onClick={() => signOut()}
                  className="text-sm bg-red-500/10 text-red-400 px-3 py-1 rounded hover:bg-red-500/20"
                >
                  Sign Out
                </button>
              </div>
            ) : (
              <button
                onClick={() => signIn.social({ provider: "google" })}
                className="bg-white text-black px-4 py-2 rounded font-medium hover:bg-gray-200 flex items-center gap-2"
              >
                {/* Google Icon */}
                <svg className="w-4 h-4" viewBox="0 0 24 24">
                  <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4" />
                  <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
                  <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05" />
                  <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" />
                </svg>
                Sign in with Google
              </button>
            )}
          </div>
        </header>

        {/* DATA GRID (Passed prop to Client Component) */}
        {/* Only show grid if logged in, or show public ones? You decide. For now showing all. */}
        <SnippetGrid initialData={initialSnippets} />

      </div>
    </div>
  );
}