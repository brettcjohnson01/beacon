'use client';
import { use, useState } from 'react';
import Link from 'next/link';
import dynamic from 'next/dynamic';
import { companyProfiles, type LlcEntry, type LlcStatus } from '@/lib/llcData';

const LlcMap = dynamic(() => import('@/components/LlcMap'), { ssr: false });

function formatAmount(amount: number, known: boolean): string {
  if (!known || amount === 0) return 'Unknown';
  if (amount >= 1_000_000_000) return `$${(amount / 1_000_000_000).toFixed(1)}B`;
  if (amount >= 1_000_000) return `$${(amount / 1_000_000).toFixed(1)}M`;
  if (amount === 1) return '$1 (symbolic)';
  return `$${amount.toLocaleString()}`;
}

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

export default function CompanyPage({
  params,
}: {
  params: Promise<{ company: string }>;
}) {
  const { company: slug } = use(params);
  const profile = companyProfiles.find((p) => p.slug === slug);
  const [expandedIndex, setExpandedIndex] = useState<number | null>(null);

  if (!profile) {
    return (
      <div className="min-h-screen bg-[#1a2332] text-white flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-[#f5a623] mb-4">Company not found</h1>
          <Link href="/llc-tracker" className="text-gray-300 hover:text-white underline">
            Back to LLC Tracker
          </Link>
        </div>
      </div>
    );
  }

  const toggleRow = (i: number) => {
    setExpandedIndex(expandedIndex === i ? null : i);
  };

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
      <section className="bg-[#1a2332] py-12 px-4">
        <div className="max-w-6xl mx-auto">
          <Link
            href="/llc-tracker"
            className="inline-block text-gray-300 hover:text-white text-sm mb-6 transition-colors"
          >
            &larr; Back to LLC Tracker
          </Link>
          <h1 className="text-3xl font-bold text-[#f5a623] mb-2 tracking-wide">
            {profile.name} &ndash; LLC Tracker
          </h1>
          <p className="text-gray-300 text-sm leading-relaxed max-w-2xl">
            {profile.description}
          </p>
        </div>
      </section>

      {/* Main content */}
      <section className="bg-white text-gray-900 min-h-screen">
        {/* Filter bar */}
        <div className="border-b border-gray-200 px-6 py-3 flex items-center justify-between">
          <span className="text-sm font-medium text-gray-700 flex items-center gap-1">
            <span>&#9881;</span> Filters
          </span>
          <span className="text-sm text-gray-500">{profile.llcs.length} projects</span>
        </div>

        {/* Split layout */}
        <div className="flex" style={{ minHeight: '600px' }}>
          {/* Map — left 50% */}
          <div className="w-1/2 sticky top-0" style={{ height: '600px' }}>
            <LlcMap entries={profile.llcs} height="100%" zoom={5} />
          </div>

          {/* Table — right 50%, scrollable */}
          <div className="w-1/2 overflow-y-auto" style={{ maxHeight: '600px' }}>
            <table className="w-full text-sm">
              <thead className="bg-gray-50 border-b border-gray-200 sticky top-0">
                <tr>
                  <th className="text-left px-4 py-3 font-semibold text-gray-700 text-xs uppercase tracking-wide">
                    LLC Name
                  </th>
                  <th className="text-left px-4 py-3 font-semibold text-gray-700 text-xs uppercase tracking-wide">
                    Project
                  </th>
                  <th className="text-left px-4 py-3 font-semibold text-gray-700 text-xs uppercase tracking-wide">
                    Location
                  </th>
                  <th className="text-left px-4 py-3 font-semibold text-gray-700 text-xs uppercase tracking-wide">
                    Status
                  </th>
                </tr>
              </thead>
              <tbody>
                {profile.llcs.map((entry: LlcEntry, i: number) => (
                  <>
                    <tr
                      key={`row-${i}`}
                      onClick={() => toggleRow(i)}
                      className={`border-b border-gray-100 cursor-pointer transition-colors ${
                        expandedIndex === i
                          ? 'border-l-4 border-l-[#f5a623] bg-orange-50'
                          : 'hover:bg-gray-50'
                      }`}
                    >
                      <td className="px-4 py-3 font-medium text-gray-900">{entry.llcName}</td>
                      <td className="px-4 py-3 text-gray-600 max-w-[200px]">
                        <span className="line-clamp-2">{entry.project}</span>
                      </td>
                      <td className="px-4 py-3 text-gray-500 text-xs">{entry.location}</td>
                      <td className="px-4 py-3">
                        <StatusBadge status={entry.status} />
                      </td>
                    </tr>
                    {expandedIndex === i && (
                      <tr
                        key={`expanded-${i}`}
                        className="border-l-4 border-l-[#f5a623] bg-orange-50"
                      >
                        <td colSpan={4} className="px-6 py-4">
                          <div className="grid grid-cols-2 gap-4 mb-4 text-sm">
                            <div>
                              <div className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-1">
                                Facility Type
                              </div>
                              <div className="text-gray-800">{entry.facilityType}</div>
                            </div>
                            <div>
                              <div className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-1">
                                Known Incentives
                              </div>
                              <div className="text-gray-800">
                                {formatAmount(entry.incentiveAmount, entry.incentivesKnown)}
                              </div>
                            </div>
                            <div className="col-span-2">
                              <div className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-1">
                                Notes
                              </div>
                              <div className="text-gray-700 leading-relaxed">{entry.notes}</div>
                            </div>
                            <div>
                              <div className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-1">
                                Confidence
                              </div>
                              <div className="text-gray-800 capitalize">{entry.confidence}</div>
                            </div>
                            <div>
                              <div className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-1">
                                NDA Involved
                              </div>
                              <div className="text-gray-800">{entry.ndaInvolved ? 'Yes' : 'No'}</div>
                            </div>
                          </div>
                          <button
                            disabled
                            className="w-full bg-[#f5a623] text-white font-medium py-2 rounded text-sm opacity-60 cursor-not-allowed"
                          >
                            View Full Details
                          </button>
                        </td>
                      </tr>
                    )}
                  </>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>
    </div>
  );
}
