'use client';

import Link from 'next/link';
import Footer from '@/components/Footer';

export default function PrivacyPolicy() {
  return (
    <div className="min-h-screen bg-[#000000] text-[#F1F1F1] font-sans flex overflow-x-auto">
      {/* Left slanted lines - hidden on mobile */}
      <div className="slanted-lines hidden md:block" aria-hidden />
      {/* Main content */}
      <div className="w-full border-l border-r border-[rgba(255,255,255,0.12)] min-w-0">
        <div className="flex-1 min-w-0 flex justify-center">
          <div className="max-w-[680px] w-full px-4 py-6 sm:px-5 sm:py-8">
            {/* HEADER - matches Dashboard */}
            <header className="flex justify-between items-center mb-7">
              <Link
                href="/"
                className="text-[22px] font-bold text-[#F1F1F1] tracking-[-0.02em] hover:text-white transition-colors"
              >
                Snippet
              </Link>
              <Link
                href="/"
                className="text-sm text-[#999] border border-[#333] px-3 py-1.5 rounded-lg hover:text-white hover:border-[#555] transition-colors"
              >
                Back to dashboard
              </Link>
            </header>

            {/* Privacy policy content */}
            <article className="prose prose-invert max-w-none">
              <h1 className="text-[22px] font-bold text-[#F1F1F1] tracking-[-0.02em] mb-1">
                Privacy Policy
              </h1>
              <p className="text-[#888] text-[13px] mb-8">
                Last updated: February 9, 2026
              </p>

              <p className="text-[#a3a3a3] text-[15px] leading-relaxed mb-6">
                Snippet (&quot;we,&quot; &quot;us,&quot; or &quot;our&quot;) operates the Snippet browser extension and associated website/dashboard (collectively referred to as the &quot;Service&quot;).
              </p>
              <p className="text-[#a3a3a3] text-[15px] leading-relaxed mb-8">
                Your privacy is important to us. This Privacy Policy explains what information we collect, how we use it, and how we protect it when you use our Service. By using Snippet, you agree to the collection and use of information in accordance with this policy.
              </p>

              <h2 className="text-[17px] font-semibold text-[#F1F1F1] mt-8 mb-3">
                1. Information We Collect
              </h2>
              <p className="text-[#a3a3a3] text-[15px] leading-relaxed mb-4">
                We collect only the minimum amount of information necessary to provide the core functionality of Snippet: saving and organizing your code snippets.
              </p>
              <h3 className="text-[15px] font-medium text-[#F1F1F1] mt-4 mb-2">
                A. Information You Provide to Us
              </h3>
              <p className="text-[#a3a3a3] text-[15px] leading-relaxed mb-2">
                <strong className="text-[#a3a3a3]">Account Information:</strong> When you log in to use the Service (e.g., using Google authentication), we collect your email address and a unique user identifier to create and manage your account and keep your data synced across devices.
              </p>
              <p className="text-[#a3a3a3] text-[15px] leading-relaxed mb-2">
                <strong className="text-[#a3a3a3]">User Content (Snippets):</strong> The core function of the Service is to save content you select. When you use the extension to save a snippet, we collect and store:
              </p>
              <ul className="list-disc pl-6 text-[#a3a3a3] text-[15px] space-y-1 mb-4">
                <li>The text or code you highlighted.</li>
                <li>The URL of the page where you captured the snippet (to provide source context).</li>
                <li>Any titles, tags, or language identifiers associated with that snippet.</li>
              </ul>
              <h3 className="text-[15px] font-medium text-[#F1F1F1] mt-4 mb-2">
                B. Information Collected Automatically
              </h3>
              <p className="text-[#a3a3a3] text-[15px] leading-relaxed mb-2">
                <strong className="text-[#a3a3a3]">Technical Usage Data:</strong> Like most web services, our servers automatically collect certain information when you access the dashboard. This may include your IP address, browser type, operating system, and timestamps. This data is used for security, debugging, and maintaining the stability of the Service.
              </p>
              <p className="text-[#a3a3a3] text-[15px] leading-relaxed mb-6">
                <strong className="text-[#a3a3a3]">Cookies and Auth Tokens:</strong> We use essential cookies or local storage tokens solely to maintain your logged-in state so you don&apos;t have to re-authenticate every time you open the extension.
              </p>

              <h2 className="text-[17px] font-semibold text-[#F1F1F1] mt-8 mb-3">
                2. How We Use Your Information
              </h2>
              <p className="text-[#a3a3a3] text-[15px] leading-relaxed mb-2">
                We use the collected information for the sole purpose of providing and improving the Service:
              </p>
              <ul className="list-disc pl-6 text-[#a3a3a3] text-[15px] space-y-1 mb-2">
                <li>To provide access to your personal Snippet dashboard.</li>
                <li>To save, store, and retrieve the code snippets you have captured.</li>
              </ul>
              <p className="text-[#a3a3a3] text-[15px] leading-relaxed mb-2">
                <strong className="text-[#a3a3a3]">AI Processing:</strong> We send the text/code snippets you save to a third-party AI service (Google Gemini API) for the specific purpose of automatically generating descriptive titles, detecting programming languages, and suggesting relevant tags. This processing happens automatically when a snippet is saved.
              </p>
              <p className="text-[#a3a3a3] text-[15px] leading-relaxed mb-6">
                We do <strong>NOT</strong> sell your personal data to third parties. We do not use your saved content for advertising purposes.
              </p>

              <h2 className="text-[17px] font-semibold text-[#F1F1F1] mt-8 mb-3">
                3. Third-Party Service Providers
              </h2>
              <p className="text-[#a3a3a3] text-[15px] leading-relaxed mb-2">
                We rely on trusted third-party companies to provide the infrastructure necessary to run Snippet. These companies are authorized to use your data only as necessary to provide these services to us:
              </p>
              <ul className="list-disc pl-6 text-[#a3a3a3] text-[15px] space-y-1 mb-6">
                <li><strong className="text-[#a3a3a3]">Hosting &amp; Backend:</strong> Vercel (for hosting the website and API functions).</li>
                <li><strong className="text-[#a3a3a3]">Database:</strong> Vercel Postgres / NeonDB / Supabase (for securely storing your account info and saved snippets).</li>
                <li><strong className="text-[#a3a3a3]">Authentication:</strong> Better Auth (for managing secure logins).</li>
                <li><strong className="text-[#a3a3a3]">AI Processing:</strong> Google Gemini API (for analyzing snippets to generate metadata).</li>
              </ul>

              <h2 className="text-[17px] font-semibold text-[#F1F1F1] mt-8 mb-3">
                4. Data Security
              </h2>
              <p className="text-[#a3a3a3] text-[15px] leading-relaxed mb-4">
                We take reasonable measures to protect your information. We use industry-standard encryption (TLS/SSL) to protect data while it is in transit between your browser and our servers. Your saved snippets are stored in secure cloud databases.
              </p>
              <p className="text-[#a3a3a3] text-[15px] leading-relaxed mb-6">
                However, no method of transmission over the internet or method of electronic storage is 100% secure. While we strive to protect your data, we cannot guarantee its absolute security.
              </p>

              <h2 className="text-[17px] font-semibold text-[#F1F1F1] mt-8 mb-3">
                5. Your Data Rights
              </h2>
              <p className="text-[#a3a3a3] text-[15px] leading-relaxed mb-2">
                As a user of Snippet, you have control over your data:
              </p>
              <p className="text-[#a3a3a3] text-[15px] leading-relaxed mb-2">
                <strong className="text-[#a3a3a3]">Access &amp; Correction:</strong> You can view and edit all your saved snippets via your dashboard at any time.
              </p>
              <p className="text-[#a3a3a3] text-[15px] leading-relaxed mb-6">
                <strong className="text-[#a3a3a3]">Deletion:</strong> You can delete individual snippets directly in your dashboard. If you wish to delete your entire account and all associated data, please contact us at the email below, and we will promptly remove your data from our systems.
              </p>

              <h2 className="text-[17px] font-semibold text-[#F1F1F1] mt-8 mb-3">
                6. Changes to This Privacy Policy
              </h2>
              <p className="text-[#a3a3a3] text-[15px] leading-relaxed mb-6">
                We may update our Privacy Policy from time to time to reflect changes in our Service or legal requirements. We will notify you of any significant changes by posting the new Privacy Policy on this page and updating the &quot;Last updated&quot; date at the top.
              </p>

              <h2 className="text-[17px] font-semibold text-[#F1F1F1] mt-8 mb-3">
                7. Contact Us
              </h2>
              <p className="text-[#a3a3a3] text-[15px] leading-relaxed mb-2">
                If you have any questions about this Privacy Policy or how your data is handled, please contact us at:
              </p>
              <p className="text-[#a3a3a3] text-[15px] leading-relaxed mb-8">
                <strong className="text-[#a3a3a3]">GitHub Issues:</strong>{' '}
                <a href="https://github.com/ashree2118/snippetvault/issues" target="_blank" rel="noopener noreferrer" className="text-[#15B19A] hover:text-[#aaa] transition-colors">
                  GitHub repository issues page
                </a>
              </p>
            </article>

            <Footer />
          </div>
        </div>
      </div>
      {/* Right slanted lines - hidden on mobile */}
      <div className="slanted-lines hidden md:block" aria-hidden />
    </div>
  );
}
