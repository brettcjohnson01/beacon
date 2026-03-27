'use client';
import { useState } from 'react';
import { CHANNELS, MESSAGES } from '@/lib/mockData';

export default function ChannelsPage() {
  const [selectedChannel, setSelectedChannel] = useState('nss');
  const [message, setMessage] = useState('');

  const channel = CHANNELS.find(c => c.id === selectedChannel)!;
  const msgs = MESSAGES[selectedChannel] || [];

  return (
    <div className="space-y-4">
      {/* Create channel form */}
      <div className="bg-white rounded-lg border border-gray-200 p-6 max-w-2xl mx-auto">
        <h2 className="text-lg font-semibold text-gray-900 flex items-center gap-2 mb-1">
          <span className="text-[#f5a623]">+</span>
          Start a New Conversation
        </h2>
        <p className="text-sm text-gray-500 mb-4">Create a new channel to discuss a topic, coordinate organizing, or ask questions.</p>
        <div className="space-y-3">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Channel / Topic Title <span className="text-red-500">*</span></label>
            <input type="text" placeholder="e.g., Water Use Questions - Nebraska"
              className="w-full border border-gray-300 rounded px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-[#f5a623]" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Description (optional)</label>
            <input type="text" placeholder="Brief description of this channel"
              className="w-full border border-gray-300 rounded px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-[#f5a623]" />
          </div>
          <div className="flex items-center gap-2">
            <input type="checkbox" id="link-profile" className="rounded" />
            <label htmlFor="link-profile" className="text-sm text-gray-700">Link to my community profile</label>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">First Message / Question (optional)</label>
            <textarea placeholder="Start the conversation with a message or question..."
              rows={3}
              className="w-full border border-gray-300 rounded px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-[#f5a623]" />
          </div>
          <button className="w-full bg-[#f5a623] text-white font-medium py-2 px-4 rounded hover:bg-orange-500 transition-colors flex items-center justify-center gap-1">
            <span>+</span> Create Channel
          </button>
        </div>
      </div>

      {/* All channels + message view */}
      <div className="bg-white rounded-lg border border-gray-200 overflow-hidden max-w-2xl mx-auto">
        <div className="px-6 py-4 border-b border-gray-100">
          <h2 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
            <svg className="w-5 h-5 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
            </svg>
            All Channels
          </h2>
        </div>
        <div className="flex min-h-[400px]">
          {/* Channel sidebar */}
          <div className="w-56 border-r border-gray-100 flex-shrink-0">
            <div className="p-2 space-y-0.5">
              <div className="text-xs font-medium text-gray-500 px-3 py-2">Channels</div>
              {CHANNELS.map((ch) => (
                <button
                  key={ch.id}
                  onClick={() => setSelectedChannel(ch.id)}
                  className={`w-full text-left px-3 py-2 text-sm rounded transition-colors ${
                    selectedChannel === ch.id
                      ? 'bg-orange-50 text-[#f5a623] font-medium border border-orange-200'
                      : 'text-gray-700 hover:bg-gray-50'
                  }`}
                >
                  {ch.name}
                </button>
              ))}
            </div>
          </div>

          {/* Message area */}
          <div className="flex-1 flex flex-col">
            <div className="px-4 py-3 border-b border-gray-100">
              <div className="font-medium text-gray-900 text-sm">{channel.name}</div>
              {channel.description && (
                <div className="text-xs text-gray-500 mt-0.5">{channel.description}</div>
              )}
            </div>
            <div className="flex-1 p-4 space-y-4 overflow-y-auto">
              {msgs.length === 0 ? (
                <div className="text-sm text-gray-400 italic text-center mt-8">No messages yet. Be the first to post.</div>
              ) : (
                msgs.map((msg) => (
                  <div key={msg.id}>
                    <div className="flex items-baseline justify-between mb-0.5">
                      <span className="text-sm font-medium text-[#f5a623]">{msg.author}</span>
                      <span className="text-xs text-gray-400">{msg.time}</span>
                    </div>
                    <p className="text-sm text-gray-700">{msg.content}</p>
                  </div>
                ))
              )}
            </div>
            <div className="p-3 border-t border-gray-100 flex items-center gap-2">
              <input
                type="text"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Type your message..."
                className="flex-1 border border-gray-300 rounded px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-[#f5a623]"
              />
              <button className="bg-[#f5a623] text-white p-2 rounded hover:bg-orange-500 transition-colors">
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
