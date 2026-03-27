'use client';
import { useState, useMemo } from 'react';
import Link from 'next/link';
import dynamic from 'next/dynamic';
import { companyProfiles, allLlcs, type LlcStatus } from '@/lib/llcData';

const LlcMap = dynamic(() => import('@/components/LlcMap'), { ssr: false });

function StatusBadge({ status }: { status: LlcStatus }) {
  const config: Record<LlcStatus, { label: string; color: string }> = {
    operating: { label: 'Operating', color: 'bg-green-100 text-green-700' },
    under_construction: { label: 'Under Construction', color: 'bg-orange-100 text-orange-700' },
    proposed: { label: 'Proposed', color: 'bg-blue-100 text-blue-700' },
    approved: { label: 'Approved', color: 'bg-purple-100 text-purple-700' },
    cancelled: { label: 'Cancelled', color: 'bg-red-100 text-red-700' },
  };
  const { label, color } = config[status];
  return <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${color}`}>{label}</span>;
}

function formatAmount(amount: number, known: boolean): string {
  if (!known || amount === 0) return 'Unknown';
  if (amount >= 1_000_000_000) return `$${(amount / 1_000_000_000).toFixed(1)}B`;
  if (amount >= 1_000_000) return `$${(amount / 1_000_000).toFixed(1)}M`;
  if (amount === 1) return '$1 (symbolic)';
  return `$${amount.toLocaleString()}`;
}

const STATUS_OPTIONS: { value: string; label: string }[] = [
  { value: '', label: 'All statuses' },
  { value: 'operating', label: 'Operating' },
  { value: 'under_construction', label: 'Under Construction' },
  { value: 'proposed', label: 'Proposed' },
  { value: 'approved', label: 'Approved' },
  { value: 'cancelled', label: 'Cancelled' },
];

export default function LlcTrackerPage() {
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('');
  const [expandedRow, setExpandedRow] = useState<number | null>(null);

  const filtered = useMemo(() => {
    const q = search.toLowerCase();
    return allLlcs.filter((e) => {
      const matchesSearch =
        !q ||
        e.llcName.toLowerCase().includes(q) ||
        e.company.toLowerCase().includes(q) ||
        e.project.toLowerCase().includes(q) ||
        e.location.toLowerCase().includes(q);
      const matchesStatus = !statusFilter || e.status === statusFilter;
      return matchesSearch && matchesStatus;
    });
  }, [search, statusFilter]);

  return (
    <div className="min-h-screen bg-[#1a2332] text-white">
      {/* Nav */}
      <nav className="flex items-center justify-between px-6 py-3 border-b border-white/10">
        <span className="text-[#f5a623] font-bold text-lg tracking-wide">BEACON</span>
        <div className="flex items-center gap-6">
          <Link href="/" className="text-sm text-white hover:text-[#f5a623] transition-colors">
            Home
          </Link>
          <Link href="#tools" className="text-sm text-white hover:text-[#f5a623] transition-colors">
            Tools
          </Link>
          <Link href="#about" className="text-sm text-white hover:text-[#f5a623] transition-colors">
            About
          </Link>
          <button className="flex items-center gap-2 text-sm border border-[#f5a623] text-[#f5a623] px-3 py-1.5 rounded hover:bg-[#f5a623]/10 transition-colors">
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
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
            Track shell companies and LLCs used by hyperscalers for data center development, land
            acquisition, and tax incentive agreements.
          </p>
        </div>
      </section>

      {/* Map section */}
      <section className="bg-white py-12 px-4">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-2xl font-bold text-gray-900 mb-1">Map of Tracked Data Center LLCs</h2>
          <p className="text-gray-500 text-sm mb-6">
            {allLlcs.length} data center projects across {companyProfiles.length} hyperscalers
          </p>
          <div className="rounded-lg overflow-hidden border border-gray-200 shadow-sm">
            <LlcMap entries={allLlcs} height="360px" />
          </div>
        </div>
      </section>

      {/* All Projects table */}
      <section className="bg-white py-10 px-4 border-t border-gray-100">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">All Projects</h2>

          {/* Search + filter bar */}
          <div className="flex flex-col sm:flex-row gap-3 mb-5">
            <div className="flex-1 relative">
              <svg
                className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400"
                fill="none" viewBox="0 0 24 24" stroke="currentColor"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
              <input
                type="text"
                placeholder="Search by LLC name, company, project, or location…"
                value={search}
                onChange={(e) => { setSearch(e.target.value); setExpandedRow(null); }}
                className="w-full pl-9 pr-3 py-2 border border-gray-300 rounded text-sm text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-1 focus:ring-[#f5a623]"
              />
            </div>
            <select
              value={statusFilter}
              onChange={(e) => { setStatusFilter(e.target.value); setExpandedRow(null); }}
              className="px-3 py-2 border border-gray-300 rounded text-sm text-gray-700 focus:outline-none focus:ring-1 focus:ring-[#f5a623] bg-white"
            >
              {STATUS_OPTIONS.map((o) => (
                <option key={o.value} value={o.value}>{o.label}</option>
              ))}
            </select>
            <span className="self-center text-sm text-gray-500 shrink-0">
              {filtered.length} result{filtered.length !== 1 ? 's' : ''}
            </span>
          </div>

          {/* Table */}
          <div className="border border-gray-200 rounded-lg overflow-hidden">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-gray-50 border-b border-gray-200">
                  <th className="text-left px-4 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wide">LLC Name</th>
                  <th className="text-left px-4 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wide">Company</th>
                  <th className="text-left px-4 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wide">Project</th>
                  <th className="text-left px-4 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wide">Location</th>
                  <th className="text-left px-4 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wide">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {filtered.length === 0 ? (
                  <tr>
                    <td colSpan={5} className="px-4 py-8 text-center text-gray-400 text-sm italic">
                      No results match your search.
                    </td>
                  </tr>
                ) : (
                  filtered.map((entry, i) => {
                    const isExpanded = expandedRow === i;
                    return (
                      <>
                        <tr
                          key={`row-${i}`}
                          onClick={() => setExpandedRow(isExpanded ? null : i)}
                          className={`cursor-pointer transition-colors ${
                            isExpanded ? 'bg-orange-50' : 'hover:bg-gray-50'
                          }`}
                        >
                          <td className="px-4 py-3 text-gray-700">{entry.llcName}</td>
                          <td className="px-4 py-3 text-gray-500">{entry.company}</td>
                          <td className="px-4 py-3 font-medium text-gray-900">{entry.project}</td>
                          <td className="px-4 py-3 text-gray-500">{entry.location}</td>
                          <td className="px-4 py-3">
                            <StatusBadge status={entry.status} />
                          </td>
                        </tr>
                        {isExpanded && (
                          <tr key={`expanded-${i}`}>
                            <td
                              colSpan={5}
                              className="border-l-4 border-[#f5a623] bg-gray-50 px-6 py-4"
                            >
                              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-sm mb-4">
                                <div>
                                  <div className="text-xs font-semibold text-gray-500 uppercase mb-1">Facility Type</div>
                                  <div className="text-gray-800">{entry.facilityType}</div>
                                </div>
                                <div>
                                  <div className="text-xs font-semibold text-gray-500 uppercase mb-1">Known Incentives</div>
                                  <div className="text-gray-800">
                                    {formatAmount(entry.incentiveAmount, entry.incentivesKnown)}
                                  </div>
                                </div>
                                <div>
                                  <div className="text-xs font-semibold text-gray-500 uppercase mb-1">Confidence</div>
                                  <div className="text-gray-800 capitalize">{entry.confidence}</div>
                                </div>
                                <div>
                                  <div className="text-xs font-semibold text-gray-500 uppercase mb-1">NDA Involved</div>
                                  <div className="text-gray-800">{entry.ndaInvolved ? 'Yes' : 'No'}</div>
                                </div>
                              </div>
                              {entry.notes && (
                                <div className="text-sm mb-4">
                                  <div className="text-xs font-semibold text-gray-500 uppercase mb-1">Notes</div>
                                  <div className="text-gray-700">{entry.notes}</div>
                                </div>
                              )}
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
                    );
                  })
                )}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* Browse by Hyperscaler */}
      <section className="bg-white py-12 px-4 border-t border-gray-100">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-2xl font-bold text-gray-900 mb-8">Browse by Hyperscaler</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {companyProfiles.map((profile) => (
              <div
                key={profile.slug}
                className="bg-white border border-gray-200 rounded-lg p-6 flex flex-col shadow-sm"
              >
                <div className="mb-4">
                  <svg className="w-8 h-8 text-[#f5a623]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5}
                      d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-2 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                  </svg>
                </div>
                <h3 className="text-lg font-bold text-gray-900 mb-2">{profile.name}</h3>
                <p className="text-gray-500 text-sm leading-relaxed mb-4 flex-1">{profile.description}</p>
                <div className="flex gap-4 mb-5">
                  <div>
                    <div className="text-[#f5a623] font-bold text-xl">{profile.llcCount}</div>
                    <div className="text-gray-500 text-xs">LLC Entities</div>
                  </div>
                  <div>
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
