import Link from 'next/link';

export default function Home() {
  return (
    <div className="min-h-screen bg-[#1a2332] text-white">
      {/* Nav */}
      <nav className="flex items-center justify-between px-6 py-3 border-b border-white/10">
        <Link href="/" className="text-[#f5a623] font-bold text-lg tracking-wide hover:opacity-80 transition-opacity">BEACON</Link>
        <div className="flex items-center gap-6">
          <Link href="/" className="text-sm text-white hover:text-[#f5a623] transition-colors">Home</Link>
          <Link href="#tools" className="text-sm text-white hover:text-[#f5a623] transition-colors">Tools</Link>
          <Link href="#about" className="text-sm text-white hover:text-[#f5a623] transition-colors">About</Link>
          <button className="flex items-center gap-2 text-sm border border-[#f5a623] text-[#f5a623] px-3 py-1.5 rounded hover:bg-[#f5a623]/10 transition-colors">
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
            Menu
          </button>
        </div>
      </nav>

      {/* Hero */}
      <section className="bg-[#1a2332] py-20 px-4 text-center">
        <div className="max-w-2xl mx-auto">
          {/* Server/beacon icon */}
          <div className="flex justify-center mb-6 text-[#f5a623]">
            <svg className="w-16 h-16" fill="none" viewBox="0 0 64 64" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5}
                d="M20 12h24a2 2 0 012 2v8a2 2 0 01-2 2H20a2 2 0 01-2-2v-8a2 2 0 012-2z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5}
                d="M20 28h24a2 2 0 012 2v8a2 2 0 01-2 2H20a2 2 0 01-2-2v-8a2 2 0 012-2z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5}
                d="M20 44h24a2 2 0 012 2v4a2 2 0 01-2 2H20a2 2 0 01-2-2v-4a2 2 0 012-2z" />
              <circle cx="42" cy="17" r="1.5" fill="currentColor" stroke="none" />
              <circle cx="42" cy="33" r="1.5" fill="currentColor" stroke="none" />
              <circle cx="42" cy="48" r="1.5" fill="currentColor" stroke="none" />
              {/* Signal lines */}
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5}
                d="M32 4 C38 4 42 8 42 12" opacity="0.6" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5}
                d="M32 4 C26 4 22 8 22 12" opacity="0.6" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5}
                d="M32 1 C42 1 48 6 48 12" opacity="0.3" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5}
                d="M32 1 C22 1 16 6 16 12" opacity="0.3" />
            </svg>
          </div>
          <h1 className="text-4xl font-bold text-[#f5a623] mb-4 tracking-wide">BEACON</h1>
          <p className="text-xl font-semibold text-white mb-4">
            Empowering Communities Facing Data Center Development
          </p>
          <p className="text-gray-300 text-sm leading-relaxed mb-8 max-w-lg mx-auto">
            BEACON provides tools, data, and community connections to help residents
            understand, evaluate, and respond to data center projects—ensuring benefits are real,
            impacts are transparent, and local voices are heard.
          </p>
          <div className="flex items-center justify-center gap-4">
            <Link
              href="#tools"
              className="px-6 py-2.5 border border-[#f5a623] text-[#f5a623] rounded text-sm font-medium hover:bg-[#f5a623]/10 transition-colors"
            >
              Explore Tools
            </Link>
            <Link
              href="#about"
              className="px-6 py-2.5 border border-white/40 text-white rounded text-sm font-medium hover:bg-white/10 transition-colors"
            >
              Learn More
            </Link>
          </div>
        </div>
      </section>

      {/* What BEACON Offers */}
      <section className="bg-[#141c29] py-16 px-4">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-2xl font-bold text-white text-center mb-10">What BEACON Offers</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <OfferCard
              icon={
                <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              }
              title="Research & Transparency"
              description="Clear breakdowns of water, energy, emissions, incentives, and zoning impacts."
            />
            <OfferCard
              icon={
                <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 11h.01M12 11h.01M15 11h.01M4 7h16a1 1 0 011 1v9a1 1 0 01-1 1H4a1 1 0 01-1-1V8a1 1 0 011-1z" />
                </svg>
              }
              title="Community Tools"
              description="Interactive calculators and trackers to estimate local impacts and find similar communities."
            />
            <OfferCard
              icon={
                <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                </svg>
              }
              title="Connection & Organizing"
              description="Channels and forums to share strategies, ask questions, and build coalitions."
            />
          </div>
        </div>
      </section>

      {/* Featured Tools */}
      <section id="tools" className="bg-[#141c29] py-16 px-4 border-t border-white/5">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-2xl font-bold text-white text-center mb-10">Featured Tools</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <ToolCard
              href="/susceptibility"
              icon={
                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
              }
              title="Community Susceptibility Calculator"
              description="Assess your community's vulnerability to data center development"
            />
            <ToolCard
              href="/footprint"
              icon={
                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                </svg>
              }
              title="Footprint Calculator"
              description="Estimate water, energy, and emissions impacts of proposed projects"
            />
            <ToolCard
              href="/llc-tracker"
              icon={
                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                </svg>
              }
              title="LLC Tracker + Map"
              description="Track shell companies and hidden data center projects"
            />
            <ToolCard
              href="/community"
              icon={
                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
              }
              title="Community Network"
              description="Connect with others facing similar challenges"
            />
          </div>
          <div className="text-center mt-8">
            <Link
              href="#tools"
              className="inline-block px-6 py-2.5 border border-[#f5a623] text-[#f5a623] rounded text-sm font-medium hover:bg-[#f5a623]/10 transition-colors"
            >
              View All Tools
            </Link>
          </div>
        </div>
      </section>

      {/* Why This Matters */}
      <section id="about" className="bg-[#1a2332] py-16 px-4">
        <div className="max-w-2xl mx-auto">
          <h2 className="text-2xl font-bold text-white text-center mb-10">Why This Matters</h2>
          <ul className="space-y-4">
            {[
              'Data centers can bring jobs and tax revenue—but also major water and electricity demands.',
              'Many deals are made under NDAs, leaving communities without key information.',
              'Infrastructure impacts (power plants, transmission, water sourcing) often fall on residents.',
              'BEACON centralizes information so communities can make informed decisions and negotiate confidently.',
            ].map((point) => (
              <li key={point} className="flex items-start gap-3">
                <span className="text-[#f5a623] mt-1 shrink-0">•</span>
                <span className="text-gray-300 text-sm leading-relaxed">{point}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Join CTA */}
      <section className="bg-[#141c29] py-16 px-4 text-center border-t border-white/5">
        <div className="max-w-lg mx-auto">
          <div className="flex justify-center mb-4 text-[#f5a623]">
            <svg className="w-10 h-10" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5}
                d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
          </div>
          <h2 className="text-2xl font-bold text-white mb-4">Join a Growing Network of Communities</h2>
          <p className="text-gray-300 text-sm leading-relaxed mb-8">
            Whether you&apos;re just learning about a proposed project or organizing your
            neighborhood, BEACON helps you connect with others facing similar challenges.
          </p>
          <Link
            href="/community"
            className="inline-block px-8 py-3 bg-[#f5a623] text-white font-medium rounded hover:bg-orange-500 transition-colors text-sm"
          >
            Visit Community Network
          </Link>
        </div>
      </section>
    </div>
  );
}

function OfferCard({
  icon,
  title,
  description,
}: {
  icon: React.ReactNode;
  title: string;
  description: string;
}) {
  return (
    <div className="bg-white rounded-lg p-6 text-center">
      <div className="flex justify-center mb-3 text-[#f5a623]">{icon}</div>
      <h3 className="font-semibold text-gray-900 mb-2 text-sm">{title}</h3>
      <p className="text-gray-500 text-xs leading-relaxed">{description}</p>
    </div>
  );
}

function ToolCard({
  href,
  icon,
  title,
  description,
}: {
  href: string;
  icon: React.ReactNode;
  title: string;
  description: string;
}) {
  return (
    <Link
      href={href}
      className="block bg-[#1a2332] border border-white/10 rounded-lg p-5 hover:border-[#f5a623]/40 transition-colors group"
    >
      <div className="text-[#f5a623] mb-3">{icon}</div>
      <h3 className="font-semibold text-white text-sm mb-2">{title}</h3>
      <p className="text-gray-400 text-xs leading-relaxed mb-4">{description}</p>
      <div className="flex justify-end">
        <span className="text-[#f5a623] text-lg group-hover:translate-x-1 transition-transform inline-block">→</span>
      </div>
    </Link>
  );
}
