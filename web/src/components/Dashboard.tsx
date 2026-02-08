'use client';

import { signIn, signOut, useSession } from "@/lib/auth-client";
import SnippetGrid from '@/components/SnippetGrid';

// We accept the data passed down from the server
export default function Dashboard({ initialSnippets }: { initialSnippets: any[] }) {
  const { data: session, isPending } = useSession();

  return (
    <div className="min-h-screen bg-[#000000] text-[#e0e0e0] font-sans flex overflow-x-auto">
      {/* Left slanted lines */}
      <div className="slanted-lines" aria-hidden />
      {/* Main content */}
      <div className=" w-full border-l border-r border-[rgba(255,255,255,0.12)]">
      <div className="flex-1 min-w-0 flex justify-center">
        <div className="max-w-[680px] w-full px-5 py-8">
        
        {/* HEADER */}
        <header className="flex justify-between items-center mb-7">
          <h1 className="text-[22px] font-bold text-[#e8e8e8] tracking-[-0.02em]">
            Snippet
          </h1>

          <div>
            {isPending ? (
               <span className="text-[#666] text-sm">Loading...</span>
            ) : session ? (
              <div className="flex items-center gap-3">
                {session.user.image && (
                    <img 
                    src={session.user.image} 
                    alt="Profile" 
                    className="w-7 h-7 rounded-full"
                    />
                )}
                <button 
                  onClick={() => signOut()}
                  className="text-sm text-[#999] border border-[#333] px-3 py-1.5 rounded-lg hover:text-white hover:border-[#555] transition-colors"
                >
                  Sign Out
                </button>
              </div>
            ) : (
              <button
                onClick={() => signIn.social({ provider: "google" })}
                className="flex items-center gap-2 text-[13px] text-[#ccc] border border-[#2a2a2a] px-4 py-[7px] rounded-lg hover:border-[#444] hover:text-white transition-colors"
              >
                {/* Google Icon */}
                <svg className="w-4 h-4" viewBox="0 0 24 24">
                  <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4" />
                  <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
                  <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05" />
                  <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" />
                </svg>
                Sign in
              </button>
            )}
          </div>
        </header>

        {/* DATA GRID */}
        <SnippetGrid initialData={initialSnippets} />

        </div>
      </div></div>
      {/* Right slanted lines */}
      <div className="slanted-lines" aria-hidden />
    </div>
    
  );
}