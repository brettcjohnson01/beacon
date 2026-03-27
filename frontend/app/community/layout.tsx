import { ReactNode } from 'react';
import NavTabs from '@/components/NavTabs';

export default function CommunityLayout({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-[#1a2332] text-white py-8 px-4 text-center">
        <div className="text-[#f5a623] mb-2 flex justify-center">
          <svg className="w-10 h-10" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5}
              d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z" />
          </svg>
        </div>
        <h1 className="text-3xl font-bold text-[#f5a623]">Community Network</h1>
        <p className="mt-2 text-gray-300 max-w-xl mx-auto text-sm">
          Connect with communities facing similar data center projects. Share strategies, resources, and organizing tactics.
        </p>
        <p className="mt-1 text-gray-400 text-xs italic">
          This is an early MVP. Profiles and messages are stored locally for now.
        </p>
      </header>

      <nav className="bg-white border-b border-gray-200">
        <div className="max-w-5xl mx-auto px-4 py-2">
          <NavTabs />
        </div>
      </nav>

      <div className="bg-white border-b border-gray-200">
        <div className="max-w-5xl mx-auto px-4 py-2 flex items-center gap-2 text-gray-400">
          <svg className="w-4 h-4 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
          <input
            type="text"
            placeholder="Search channels, topics, or threads..."
            className="w-full text-sm text-gray-600 outline-none placeholder-gray-400"
          />
        </div>
      </div>

      <main className="max-w-5xl mx-auto px-4 py-6">{children}</main>
    </div>
  );
}
