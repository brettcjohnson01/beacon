'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

const tabs = [
  { href: '/community/profile', label: 'Find Similar Communities', icon: '👥' },
  { href: '/community/channels', label: 'Start a Conversation', isPlus: true },
  { href: '/community/forums', label: 'Forums & Threads', icon: '💬' },
];

export default function NavTabs() {
  const pathname = usePathname();
  return (
    <div className="flex gap-1">
      {tabs.map((tab) => {
        const active = pathname === tab.href || pathname.startsWith(tab.href + '/');
        return (
          <Link
            key={tab.href}
            href={tab.href}
            className={`flex items-center gap-1.5 px-4 py-2 text-sm font-medium rounded border transition-colors ${
              active
                ? 'border-[#f5a623] text-[#f5a623] bg-orange-50'
                : 'border-transparent text-gray-600 hover:border-gray-300 hover:text-gray-900'
            }`}
          >
            {tab.isPlus && <span className="font-bold">+</span>}
            {tab.icon && <span>{tab.icon}</span>}
            {tab.label}
          </Link>
        );
      })}
    </div>
  );
}
