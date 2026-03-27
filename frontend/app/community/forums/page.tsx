'use client';
import { useState } from 'react';
import { FORUM_TOPICS } from '@/lib/mockData';

export default function ForumsPage() {
  const [expanded, setExpanded] = useState<Record<string, boolean>>({
    zoning: true,
    organizing: true,
  });

  return (
    <div className="max-w-2xl mx-auto">
      <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
        <div className="px-6 py-4 border-b border-gray-100">
          <h2 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
            <svg className="w-5 h-5 text-[#f5a623]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
            </svg>
            Community Forums
          </h2>
          <p className="text-sm text-gray-500 mt-1">Explore conversations organized by theme. Click on a topic to see related channels and threads.</p>
        </div>

        <div className="divide-y divide-gray-100">
          {FORUM_TOPICS.map((topic) => (
            <div key={topic.id}>
              <button
                onClick={() => setExpanded(e => ({ ...e, [topic.id]: !e[topic.id] }))}
                className="w-full px-6 py-4 flex items-center justify-between hover:bg-gray-50 transition-colors text-left"
              >
                <div>
                  <div className="font-medium text-gray-900">{topic.title}</div>
                  <div className="text-sm text-gray-500 mt-0.5">{topic.description}</div>
                  {expanded[topic.id] && topic.channels.length === 0 && (
                    <div className="text-xs text-gray-400 italic mt-2">No channels yet for this topic</div>
                  )}
                </div>
                <span className={`ml-4 text-xs px-2 py-1 rounded-full font-medium shrink-0 ${
                  topic.channels.length > 0 ? 'bg-orange-100 text-[#f5a623]' : 'bg-gray-100 text-gray-500'
                }`}>
                  {topic.channels.length} {topic.channels.length === 1 ? 'channel' : 'channels'}
                </span>
              </button>
              {expanded[topic.id] && topic.channels.length > 0 && (
                <div className="px-6 pb-3 space-y-1">
                  {topic.channels.map((ch) => (
                    <a
                      key={ch.id}
                      href={`/community/channels?channel=${ch.id}`}
                      className="flex items-center gap-2 text-sm text-gray-700 hover:text-[#f5a623] py-1.5"
                    >
                      <svg className="w-4 h-4 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                      </svg>
                      {ch.name}
                    </a>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
