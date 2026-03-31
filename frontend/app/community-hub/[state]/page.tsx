import Link from 'next/link';
import { STATE_HUB_DATA } from '@/lib/communityHubData';

export default async function StatePage({
  params,
}: {
  params: Promise<{ state: string }>;
}) {
  const { state: stateParam } = await params;
  const stateCode = stateParam.toUpperCase();
  const stateData = STATE_HUB_DATA[stateCode];

  if (!stateData) {
    return (
      <div className="bg-white border border-gray-200 rounded-lg p-8 text-center">
        <p className="text-gray-700 mb-4">
          No community hub page exists for this state yet.
        </p>
        <Link
          href="/community-hub"
          className="text-[#f5a623] hover:underline text-sm font-medium"
        >
          ← Back to Community Hub
        </Link>
      </div>
    );
  }

  return (
    <div className="space-y-10">
      {/* Breadcrumb */}
      <div className="flex items-center gap-2 text-sm text-gray-400">
        <Link href="/community-hub" className="hover:text-[#f5a623] transition-colors">
          Community Hub
        </Link>
        <span>/</span>
        <span className="text-gray-700">{stateData.name}</span>
      </div>

      {/* Header */}
      <div>
        <h2 className="text-3xl font-bold text-gray-900">{stateData.name}</h2>
        <p className="text-gray-600 mt-2 leading-relaxed max-w-2xl">{stateData.description}</p>
      </div>

      {/* Section 1: Research Reports */}
      <section>
        <h3 className="text-xl font-bold text-gray-900 mb-4">State &amp; Regional Research Reports</h3>
        <div className="space-y-3">
          {stateData.reports.map((report) => (
            <div
              key={report.url}
              className="bg-white border border-gray-200 rounded-lg p-5"
            >
              <div className="text-xs font-semibold text-gray-400 uppercase tracking-wide mb-1">
                {report.org}{report.year ? ` · ${report.year}` : ''}
              </div>
              <a
                href={report.url}
                target="_blank"
                rel="noopener noreferrer"
                className="font-semibold text-[#f5a623] hover:underline text-sm"
              >
                {report.title} ↗
              </a>
              <p className="text-sm text-gray-600 mt-1 leading-relaxed">{report.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Section 2: Organizing Groups */}
      <section>
        <h3 className="text-xl font-bold text-gray-900 mb-4">Organizing Groups</h3>
        <div className="space-y-3">
          {stateData.organizingGroups.map((org) => (
            <div
              key={org.url}
              className="bg-white border border-gray-200 rounded-lg p-5"
            >
              <a
                href={org.url}
                target="_blank"
                rel="noopener noreferrer"
                className="font-semibold text-[#f5a623] hover:underline text-sm"
              >
                {org.name} ↗
              </a>
              <p className="text-sm text-gray-600 mt-1 leading-relaxed">{org.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Section 3: County Pages */}
      <section>
        <h3 className="text-xl font-bold text-gray-900 mb-4">Local Resources by County</h3>
        {stateData.counties.length === 0 ? (
          <div className="bg-white border border-gray-200 rounded-lg p-6">
            <p className="text-gray-500 text-sm">
              County-level pages for {stateData.name} are in development. Check back soon, or{' '}
              <a
                href="mailto:contact@beaconproject.org"
                className="text-[#f5a623] hover:underline"
              >
                contact us
              </a>{' '}
              to contribute local data.
            </p>
          </div>
        ) : (
          <div className="space-y-2">
            {stateData.counties.map((county) =>
              county.hasPage ? (
                <Link
                  key={county.slug}
                  href={`/community-hub/${stateData.slug}/${county.slug}`}
                  className="flex items-center justify-between bg-white border border-gray-200 rounded-lg px-5 py-4 hover:border-[#f5a623]/50 transition-colors group"
                >
                  <span className="text-sm font-medium text-gray-900 group-hover:text-[#f5a623] transition-colors">
                    {county.name}
                  </span>
                  <span className="text-[#f5a623] group-hover:translate-x-1 transition-transform inline-block">→</span>
                </Link>
              ) : (
                <div
                  key={county.slug}
                  className="flex items-center justify-between bg-white border border-gray-200 rounded-lg px-5 py-4 opacity-60"
                >
                  <span className="text-sm text-gray-500">{county.name}</span>
                  <span className="text-xs px-2 py-0.5 bg-gray-100 text-gray-400 rounded-full font-medium">
                    Coming soon
                  </span>
                </div>
              )
            )}
          </div>
        )}
      </section>

      {/* Section 4: Forum CTA */}
      <section>
        <Link
          href="/community/forums"
          className="flex items-center justify-between bg-[#1a2332] text-white rounded-lg px-6 py-5 hover:bg-[#1a2332]/90 transition-colors group"
        >
          <span className="text-sm font-medium">
            Discuss {stateData.name} data center issues in the Community Forum
          </span>
          <span className="text-[#f5a623] text-xl group-hover:translate-x-1 transition-transform inline-block">
            →
          </span>
        </Link>
      </section>
    </div>
  );
}
