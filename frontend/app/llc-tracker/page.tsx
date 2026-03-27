'use client';
import Link from 'next/link';
import dynamic from 'next/dynamic';
import { companyProfiles, allLlcs, type LlcStatus } from '@/lib/llcData';

const LlcMap = dynamic(() => import('@/components/LlcMap'), { ssr: false });

function StatusBadge({ status }: { status: LlcStatus }) {
  const config = {
    operating: { label: 'Operating', color: 'bg-green-100 text-green-700' },
    under_construction: { label: 'Under Construction', color: 'bg-orange-100 text-orange-700' },
    proposed: { label: 'Proposed', color: 'bg-blue-100 text-blue-700' },
    approved: { label: 'Approved', color: 'bg-purple-100 text-purple-700' },
    cancelled: { label: 'Cancelled', color: 'bg-red-100 text-red-700' },
  };
  const { label, color } = config[status];
  return (
    <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${color}`}>{label}</span>
  );
}

export default function LlcTrackerPage() {
  return (
    <div className="min-h-screen bg-[#1a2332] text-white">
      {/* Nav */}
      <nav className="flex items-center justify-between px-6 py-3 border-b border-white/10">
        <span className="text-[#f5a623] font-bold text-lg tracking-wide">BEACON</span>
        <div className="flex items-center gap-6">
          <Link href="/" className="text-sm text-white hover:text-[#f5a623] transition-colors">
            Home
          </Link>
          <Link
            href="#tools"
            className="text-sm text-white hover:text-[#f5a623] transition-colors"
          >
            Tools
          </Link>
          <Link
            href="#about"
            className="text-sm text-white hover:text-[#f5a623] transition-colors"
          >
            About
          </Link>
          <button className="flex items-center gap-2 text-sm border border-[#f5a623] text-[#f5a623] px-3 py-1.5 rounded hover:bg-[#f5a623]/10 transition-colors">
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
            Menu
          </button>
        </div>
      </nav>

      {/* Hero */}
      <section className="bg-[#1a2332] py-16 px-4 text-center">
        <div className="max-w-2xl mx-auto">
          <h1 className="text-4xl font-bold text-[#f5a623] mb-4 tracking-wide">LLC Tracker</h1>
          <p className="text-lg text-gray-300 leading-relaxed">
            Track shell companies and hidden subsidiaries used by hyperscalers to acquire land,
            secure tax incentives, and develop data centers—often before their identity is disclosed
            to the public.
          </p>
        </div>
      </section>

      {/* Map section */}
      <section className="bg-white py-12 px-4">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-2xl font-bold text-gray-900 mb-2">
            Map of Tracked Data Center LLCs
          </h2>
          <p className="text-gray-500 text-sm mb-6">
            60 data center projects across 4 hyperscalers
          </p>
          <div className="rounded-lg overflow-hidden border border-gray-200 shadow-sm">
            <LlcMap entries={allLlcs} height="320px" />
          </div>
        </div>
      </section>

      {/* Company cards */}
      <section className="bg-white py-12 px-4 border-t border-gray-100">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-2xl font-bold text-gray-900 mb-8">Hyperscaler Companies</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {companyProfiles.map((profile) => (
              <div
                key={profile.slug}
                className="bg-white border border-gray-200 rounded-lg p-6 flex flex-col shadow-sm"
              >
                {/* Building icon */}
                <div className="mb-4">
                  <svg
                    className="w-8 h-8 text-[#f5a623]"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={1.5}
                      d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-2 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"
                    />
                  </svg>
                </div>

                <h3 className="text-lg font-bold text-gray-900 mb-2">{profile.name}</h3>
                <p className="text-gray-500 text-sm leading-relaxed mb-4 flex-1">
                  {profile.description}
                </p>

                {/* Stats row */}
                <div className="flex gap-4 mb-5">
                  <div className="text-center">
                    <div className="text-[#f5a623] font-bold text-xl">{profile.llcCount}</div>
                    <div className="text-gray-500 text-xs">LLC Entities</div>
                  </div>
                  <div className="text-center">
                    <div className="text-[#f5a623] font-bold text-xl">{profile.llcs.length}</div>
                    <div className="text-gray-500 text-xs">Projects</div>
                  </div>
                </div>

                <Link
                  href={`/llc-tracker/${profile.slug}`}
                  className="block w-full text-center bg-[#f5a623] text-white font-medium py-2.5 rounded hover:bg-orange-500 transition-colors text-sm"
                >
                  View LLCs
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
