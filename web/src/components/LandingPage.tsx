'use client';

import { signIn } from "@/lib/auth-client";
import { Check, Code, Zap, Globe, Moon, Database, ArrowRight } from "lucide-react";
import Footer from '@/components/Footer';
import { BorderBeam } from "@/components/ui/border-beam";
import Image from "next/image";
import img1 from "@/components/ui/img1.png";
import img2 from "@/components/ui/img2.png";
import img3 from "@/components/ui/img3.png";


export default function LandingPage() {
   return (
      <div className="min-h-screen bg-[#0a0a0a] text-[#e0e0e0] font-sans flex overflow-x-hidden">
         {/* Left slanted lines - hidden on mobile */}
         <div className="slanted-lines hidden md:block" aria-hidden />

         {/* Main content */}
         <div className="w-full border-l border-r border-[rgba(255,255,255,0.12)] min-w-0 relative flex flex-col">
            <div className="absolute inset-0 bg-[url('/grid.svg')] bg-center [mask-image:linear-gradient(180deg,white,rgba(255,255,255,0))]"></div>

            {/* Navbar Placeholder - matching Dashboard header style */}
            <header className="relative z-10 flex justify-between items-center px-6 py-5 max-w-6xl mx-auto w-full">
               <h1 className="text-[22px] font-bold text-[#e8e8e8] tracking-[-0.02em]">
                  Snippet
               </h1>
               <div className="relative inline-flex overflow-hidden rounded-lg border border-[#2a2a2a]">
                  <button
                     onClick={() => signIn.social({ provider: "google" })}
                     className="relative z-10 flex items-center gap-2 text-[13px] text-[#ccc]
               px-4 py-[7px]
               hover:text-white transition-colors bg-transparent"
                  >
                     <svg className="w-4 h-4" viewBox="0 0 24 24">
                        <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4" />
                        <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
                        <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05" />
                        <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" />
                     </svg>
                     Sign in
                  </button>

                  <BorderBeam
                     duration={4}
                     size={40}
                     className="pointer-events-none from-[#15B19A] via-[#15B19A] to-white/10"
                  />
               </div>
            </header>

            <main className="relative z-10 flex flex-col items-center w-full">

               {/* HERO SECTION */}
               <section className="w-full max-w-4xl mx-auto px-6 py-20 text-center flex flex-col items-center">
                  <h1 className="text-4xl md:text-6xl font-bold bg-gradient-to-b from-white to-[#888] bg-clip-text text-transparent mb-6 tracking-tight">
                     Save Code. Save Solutions.<br />
                     Find Them Instantly.
                  </h1>
                  <p className="text-lg md:text-xl text-[#888] max-w-2xl mb-10 leading-relaxed">
                     Snippet is your personal library for code, bug fixes, and tech notes.
                     Save anything from the web in one click. Find it anytime.
                  </p>
                  <button
                     onClick={() =>
                        window.open(
                           "https://chromewebstore.google.com/detail/eiocbpfklgmgmmnhgcklcpbnmedjmkjh?utm_source=item-share-cb",
                           "_blank"
                        )
                     }
                     className="
    inline-flex
    h-[50px]
    px-[22px]
    justify-center
    items-center
    gap-[10px]
    rounded-[20px]
    border
    border-[#565656]
    text-white
    font-regular
    transition-all
    transform
    hover:scale-105
    active:scale-95
  "
                     style={{
                        background:
                           "linear-gradient(180deg, #2E2E2E 0%, #242424 28.25%, #222 56.5%, #000 113%)",
                        boxShadow: "0px 6px 6.1px 0 rgba(255, 255, 255, 0.10)",
                     }}
                  >
                     Get Started Free <ArrowRight size={18} />
                  </button>
               </section>

               {/* SUB-HERO (1-line clarity) */}
               <section className="w-full border-y border-[#1e1e1e] bg-[#0f0f0f]/50 backdrop-blur-sm">
                  <div className="max-w-4xl mx-auto px-6 py-8 text-center">
                     <p className="text-[#a0a0a0] font-medium text-lg">
                        Stop bookmarking full articles just for one solution.
                     </p>
                  </div>
               </section>

               {/* WHAT IT DOES (Very clear) */}
               <section className="w-full max-w-4xl mx-auto px-6 py-24">
                  <div className="text-center mb-16">
                     <h2 className="text-3xl font-bold text-[#999] mb-4">What is <span className="text-white">Snippet?</span></h2>
                     <p className="text-[#888] max-w-2xl mx-auto text-lg leading-relaxed">
                        Snippet helps you save useful code and explanations from the web and keeps them organized automatically.
                     </p>
                  </div>
                  <div className="grid md:grid-cols-3 gap-8 text-center">
                     <div className="p-6 rounded-2xl bg-[#0B0B0B] border border-[#1e1e1e] hover:border-[#333] transition-colors">
                        <div className="relative w-48 h-32 mx-auto mb-2">
                           <Image src={img1} alt="No bookmarks" fill className="object-contain" />
                        </div>
                        <h3 className="text-[#999] font-medium mb-2">No messy bookmarks</h3>
                     </div>
                     <div className="p-6 rounded-2xl bg-[#0B0B0B] border border-[#1e1e1e] hover:border-[#333] transition-colors">
                        <div className="relative w-48 h-32 mx-auto mb-2">
                           <Image src={img2} alt="No lost solutions" fill className="object-contain" />
                        </div>
                        <h3 className="text-[#999] font-medium mb-2">No lost solutions</h3>
                     </div>
                     <div className="p-6 rounded-2xl bg-[#0B0B0B] border border-[#1e1e1e] hover:border-[#333] transition-colors">
                        <div className="relative w-48 h-32 mx-auto mb-2">
                           <Image src={img3} alt="No manual sorting" fill className="object-contain" />
                        </div>
                        <h3 className="text-[#999] font-medium mb-2">No manual sorting</h3>
                     </div>
                  </div>

               </section>

               {/* HOW IT WORKS (Simple steps) */}
               <section className="w-full bg-[#0d0d0d] border-y border-[#1e1e1e]">
                  <div className="max-w-4xl mx-auto px-6 py-24">
                     <h2 className="text-3xl font-bold text-white text-center mb-16">How it works</h2>

                     <div className="flex flex-col md:flex-row items-center justify-center gap-8 md:gap-12">
                        {/* Step 1 */}
                        <div className="flex flex-col items-center gap-4 text-center">
                           <div className="w-12 h-12 rounded-full bg-[#1e1e1e] flex items-center justify-center text-white font-bold border border-[#333] text-xl">1</div>
                           <p className="text-[#ccc] font-medium">Highlight code or text<br /><span className="text-[#666] text-sm font-normal">on any website</span></p>
                        </div>

                        <div className="hidden md:block w-16 h-0.5 bg-[#1e1e1e]"></div>
                        <div className="md:hidden w-0.5 h-12 bg-[#1e1e1e]"></div>

                        {/* Step 2 */}
                        <div className="flex flex-col items-center gap-4 text-center">
                           <div className="w-12 h-12 rounded-full bg-[#1e1e1e] flex items-center justify-center text-white font-bold border border-[#333] text-xl">2</div>
                           <p className="text-[#ccc] font-medium">Right-click → Save<br /><span className="text-[#666] text-sm font-normal">to SnippetVault</span></p>
                        </div>

                        <div className="hidden md:block w-16 h-0.5 bg-[#1e1e1e]"></div>
                        <div className="md:hidden w-0.5 h-12 bg-[#1e1e1e]"></div>

                        {/* Step 3 */}
                        <div className="flex flex-col items-center gap-4 text-center">
                           <div className="w-12 h-12 rounded-full bg-[#1e1e1e] flex items-center justify-center text-white font-bold border border-[#333] text-xl">3</div>
                           <p className="text-[#ccc] font-medium">Search and Use<br /><span className="text-[#666] text-sm font-normal">it later instantly</span></p>
                        </div>
                     </div>

                     <p className="text-center text-[#666] mt-12 text-sm uppercase tracking-widest font-medium">That’s it.</p>
                  </div>
               </section>

               {/* KEY FEATURES (Plain language) */}
               <section className="w-full max-w-5xl mx-auto px-6 py-24">
                  <div className="text-center mb-16">
                     <h2 className="text-3xl font-bold text-white mb-4">Features</h2>
                     <p className="text-[#888]">Everything you need to manage your code snippets.</p>
                  </div>

                  <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                     <div className="p-8 rounded-3xl bg-[#141414] border border-[#1e1e1e] hover:border-[#333] transition-all group">
                        <div className="mb-6 inline-flex p-3 rounded-xl bg-[#1e1e1e] text-[#15B19A] group-hover:text-white group-hover:bg-[#2a2a2a] transition-colors">
                           <Globe size={24} />
                        </div>
                        <h3 className="text-xl font-bold text-white mb-3">One-Click Save</h3>
                        <p className="text-[#888] leading-relaxed">Save code or text directly from any webpage.</p>
                     </div>

                     <div className="p-8 rounded-3xl bg-[#141414] border border-[#1e1e1e] hover:border-[#333] transition-all group">
                        <div className="mb-6 inline-flex p-3 rounded-xl bg-[#1e1e1e] text-[#15B19A] group-hover:text-white group-hover:bg-[#2a2a2a] transition-colors">
                           <Database size={24} />
                        </div>
                        <h3 className="text-xl font-bold text-white mb-3">AI Auto-Organizes</h3>
                        <p className="text-[#888] leading-relaxed">Snippet adds titles, tags, and language for you.</p>
                     </div>

                     <div className="p-8 rounded-3xl bg-[#141414] border border-[#1e1e1e] hover:border-[#333] transition-all group">
                        <div className="mb-6 inline-flex p-3 rounded-xl bg-[#1e1e1e] text-[#15B19A] group-hover:text-white group-hover:bg-[#2a2a2a] transition-colors">
                           <Code size={24} />
                        </div>
                        <h3 className="text-xl font-bold text-white mb-3">Clean Code Formatting</h3>
                        <p className="text-[#888] leading-relaxed">Code looks clean and readable with syntax highlighting.</p>
                     </div>

                     <div className="p-8 rounded-3xl bg-[#141414] border border-[#1e1e1e] hover:border-[#333] transition-all group">
                        <div className="mb-6 inline-flex p-3 rounded-xl bg-[#1e1e1e] text-[#15B19A] group-hover:text-white group-hover:bg-[#2a2a2a] transition-colors">
                           <Zap size={24} />
                        </div>
                        <h3 className="text-xl font-bold text-white mb-3">Cloud Sync</h3>
                        <p className="text-[#888] leading-relaxed">Your snippets are saved online. Access them anytime.</p>
                     </div>

                     <div className="p-8 rounded-3xl bg-[#141414] border border-[#1e1e1e] hover:border-[#333] transition-all group lg:col-span-2">
                        <div className="mb-6 inline-flex p-3 rounded-xl bg-[#1e1e1e] text-[#15B19A] group-hover:text-white group-hover:bg-[#2a2a2a] transition-colors">
                           <Moon size={24} />
                        </div>
                        <h3 className="text-xl font-bold text-white mb-3">Dark Mode UI</h3>
                        <p className="text-[#888] leading-relaxed">Simple, distraction-free design for developers.</p>
                     </div>
                  </div>
               </section>

               {/* WHY YOU’LL LIKE IT */}
               <section className="w-full bg-[#0f0f0f] py-24 px-6 border-t border-[#1e1e1e]">
                  <div className="max-w-4xl mx-auto flex flex-col md:flex-row gap-12 md:gap-24">
                     <div className="flex-1">
                        <h2 className="text-3xl font-bold text-white mb-2">Why use Snippet?</h2>
                        <p className="text-[#888]">Designed for efficiency.</p>
                     </div>

                     <div className="flex-1 space-y-6">
                        <div className="flex gap-4 items-start">
                           <div className="w-6 h-6 rounded-full bg-[#15B19A]/10 flex items-center justify-center shrink-0 mt-0.5">
                              <Check size={14} className="text-[#15B19A]" />
                           </div>
                           <p className="text-[#ccc] text-lg">Never lose a fix you found online</p>
                        </div>
                        <div className="flex gap-4 items-start">
                           <div className="w-6 h-6 rounded-full bg-[#15B19A]/10 flex items-center justify-center shrink-0 mt-0.5">
                              <Check size={14} className="text-[#15B19A]" />
                           </div>
                           <p className="text-[#ccc] text-lg">Find old solutions in seconds</p>
                        </div>
                        <div className="flex gap-4 items-start">
                           <div className="w-6 h-6 rounded-full bg-[#15B19A]/10 flex items-center justify-center shrink-0 mt-0.5">
                              <Check size={14} className="text-[#15B19A]" />
                           </div>
                           <p className="text-[#ccc] text-lg">Learn faster by saving what matters</p>
                        </div>
                        <div className="flex gap-4 items-start">
                           <div className="w-6 h-6 rounded-full bg-[#15B19A]/10 flex items-center justify-center shrink-0 mt-0.5">
                              <Check size={14} className="text-[#15B19A]" />
                           </div>
                           <p className="text-[#ccc] text-lg">Keep everything in one place</p>
                        </div>
                     </div>
                  </div>
               </section>

               {/* WHO IT’S FOR */}
               <section className="w-full max-w-4xl mx-auto px-6 py-24">
                  <h2 className="text-3xl font-bold text-white text-center mb-16">Perfect for</h2>

                  <div className="grid md:grid-cols-2 gap-8">
                     <div className="bg-[#141414] p-8 rounded-3xl border border-[#1e1e1e]">
                        <h3 className="text-xl font-bold text-white mb-6 border-b border-[#2a2a2a] pb-4">Who</h3>
                        <ul className="space-y-4 text-[#aaa]">
                           <li className="flex items-center gap-3">
                              <span className="w-2 h-2 rounded-full bg-[#ccc]"></span>
                              Developers
                           </li>
                           <li className="flex items-center gap-3">
                              <span className="w-2 h-2 rounded-full bg-[#ccc]"></span>
                              Students
                           </li>
                           <li className="flex items-center gap-3">
                              <span className="w-2 h-2 rounded-full bg-[#ccc]"></span>
                              Self-learners
                           </li>
                        </ul>
                     </div>

                     <div className="bg-[#141414] p-8 rounded-3xl border border-[#1e1e1e]">
                        <h3 className="text-xl font-bold text-white mb-6 border-b border-[#2a2a2a] pb-4">Save</h3>
                        <ul className="space-y-4 text-[#aaa]">
                           <li className="flex items-center gap-3">
                              <span className="w-2 h-2 rounded-full bg-[#ccc]"></span>
                              Bug fixes
                           </li>
                           <li className="flex items-center gap-3">
                              <span className="w-2 h-2 rounded-full bg-[#ccc]"></span>
                              Helper functions
                           </li>
                           <li className="flex items-center gap-3">
                              <span className="w-2 h-2 rounded-full bg-[#ccc]"></span>
                              Commands and configs
                           </li>
                           <li className="flex items-center gap-3">
                              <span className="w-2 h-2 rounded-full bg-[#ccc]"></span>
                              Notes from docs and blogs
                           </li>
                        </ul>
                     </div>
                  </div>
               </section>

               {/* FINAL CTA (Clear & direct) */}
               <div className="w-full border-t border-[#1e1e1e]" />
               <section className="w-full py-32 px-6 text-center">
                  <h2 className="text-3xl md:text-5xl font-bold text-white mb-8 tracking-tight">Turn the web into<br />your personal code notebook.</h2>
                  <p className="text-xl text-[#888] mb-12">Save once. Find forever.</p>

                  <div className="flex flex-col items-center gap-6">
                     <button
                        onClick={() =>
                           window.open(
                              "https://chromewebstore.google.com/detail/eiocbpfklgmgmmnhgcklcpbnmedjmkjh?utm_source=item-share-cb",
                              "_blank"
                           )
                        }
                        className="
    inline-flex
    h-[50px]
    px-[22px]
    justify-center
    items-center
    gap-[10px]
    rounded-[20px]
    border
    border-[#565656]
    text-white
    font-regular
    transition-all
    transform
    hover:scale-105
    active:scale-95
  "
                        style={{
                           background:
                              "linear-gradient(180deg, #2E2E2E 0%, #242424 28.25%, #222 56.5%, #000 113%)",
                           boxShadow: "0px 6px 6.1px 0 rgba(255, 255, 255, 0.10)",
                        }}
                     >
                        Install Snippet <ArrowRight size={18} />
                     </button>
                     <p className="text-sm text-[#555]">Free forever for individual developers.</p>
                  </div>
               </section>

            </main>

            <Footer />
         </div>

         {/* Right slanted lines - hidden on mobile */}
         <div className="slanted-lines hidden md:block" aria-hidden />
      </div>
   );
}
