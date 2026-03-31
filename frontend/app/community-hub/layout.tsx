import { ReactNode } from 'react';
import Link from 'next/link';

export default function CommunityHubLayout({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-[#1a2332] text-white py-8 px-4 text-center relative">
        <Link
          href="/"
          className="absolute left-6 top-6 text-[#f5a623] font-bold text-lg tracking-wide hover:opacity-80 transition-opacity"
        >
          BEACON
        </Link>
        <div className="absolute right-6 top-6 flex items-center gap-6">
          <Link href="/" className="text-sm text-white hover:text-[#f5a623] transition-colors">
            Home
          </Link>
          <Link href="/#tools" className="text-sm text-white hover:text-[#f5a623] transition-colors">
            Tools
          </Link>
          <Link href="/#about" className="text-sm text-white hover:text-[#f5a623] transition-colors">
            About
          </Link>
        </div>
        <div className="text-[#f5a623] mb-2 flex justify-center">
          <svg className="w-10 h-10" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={1.5}
              d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
        </div>
        <h1 className="text-3xl font-bold text-[#f5a623]">Community Hub</h1>
        <p className="mt-2 text-gray-300 max-w-xl mx-auto text-sm">
          Research, resources, and organizing support for communities navigating data center development.
        </p>
      </header>

      <main className="max-w-5xl mx-auto px-4 py-8">{children}</main>
    </div>
  );
}
