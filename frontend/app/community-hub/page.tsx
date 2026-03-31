import Link from 'next/link';
import { STATE_HUB_DATA, GENERAL_RESOURCES } from '@/lib/communityHubData';

export default function CommunityHubPage() {
  const states = Object.values(STATE_HUB_DATA);

  return (
    <div className="space-y-12">
      {/* State index */}
      <section>
        <div className="mb-6">
          <h2 className="text-2xl font-bold text-gray-900">States</h2>
          <p className="text-gray-500 text-sm mt-1">
            Select a state to find research reports, organizing groups, and local resources.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
          {states.map((state) => (
            <Link
              key={state.code}
              href={`/community-hub/${state.slug}`}
              className="block bg-white border border-gray-200 rounded-lg p-6 hover:border-[#f5a623]/50 hover:shadow-sm transition-all group"
            >
              <div className="flex items-start justify-between gap-4">
                <div className="flex-1">
                  <h3 className="text-lg font-bold text-gray-900 group-hover:text-[#f5a623] transition-colors">
                    {state.name}
                  </h3>
                  <p className="text-xs text-gray-400 mt-0.5 mb-2">
                    Data centers tracked:{' '}
                    <span className="italic">data not yet available</span>
                  </p>
                  <p className="text-sm text-gray-600 leading-relaxed">{state.description}</p>
                </div>
                <span className="text-[#f5a623] text-xl shrink-0 group-hover:translate-x-1 transition-transform inline-block">
                  →
                </span>
              </div>
            </Link>
          ))}
        </div>

        <p className="text-sm text-gray-500 italic">
          More states coming — contact us to prioritize your state.
        </p>
      </section>

      {/* General resources */}
      <section>
        <div className="mb-6">
          <h2 className="text-2xl font-bold text-gray-900">General Resources</h2>
          <p className="text-gray-500 text-sm mt-1">
            National tools and reports useful for any community facing data center development.
          </p>
        </div>

        <div className="space-y-3">
          {GENERAL_RESOURCES.map((resource) => (
            <div
              key={resource.url}
              className="bg-white border border-gray-200 rounded-lg p-5"
            >
              <div className="text-xs font-semibold text-gray-400 uppercase tracking-wide mb-1">
                {resource.org}
              </div>
              <a
                href={resource.url}
                target="_blank"
                rel="noopener noreferrer"
                className="font-semibold text-[#f5a623] hover:underline text-sm"
              >
                {resource.title} ↗
              </a>
              <p className="text-sm text-gray-600 mt-1 leading-relaxed">{resource.description}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
