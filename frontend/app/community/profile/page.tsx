'use client';
import { useState } from 'react';
import { US_STATES } from '@/lib/mockData';

const COMMUNITY_TYPES = ['Rural', 'Small Town', 'Suburb', 'City'];
const PROJECT_STATUSES = ['No project yet', 'Proposed', 'Planning / permitting', 'Under construction', 'Operating'];
const ZONING_TYPES = ["Don't know", 'Agricultural', 'Residential', 'Commercial', 'Industrial', 'Special district'];

export default function ProfilePage() {
  const [state, setState] = useState('');
  const [communityType, setCommunityType] = useState('');
  const [projectStatus, setProjectStatus] = useState('');
  const [multipleProjects, setMultipleProjects] = useState(false);
  const [zoning, setZoning] = useState('');

  return (
    <div className="max-w-2xl mx-auto">
      <div className="bg-white rounded-lg border border-gray-200 p-6">
        <h2 className="text-lg font-semibold text-gray-900 flex items-center gap-2 mb-1">
          <svg className="w-5 h-5 text-[#f5a623]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
          </svg>
          My Community Profile
        </h2>
        <p className="text-sm text-gray-500 mb-6">Tell us about your community so we can connect you with similar groups.</p>

        <div className="space-y-5">
          {/* Community Name */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Community Name</label>
            <input type="text" placeholder="e.g., Bowling Green" className="w-full border border-gray-300 rounded px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-[#f5a623]" />
          </div>

          {/* State */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">State <span className="text-red-500">*</span></label>
            <select
              value={state}
              onChange={(e) => setState(e.target.value)}
              className="w-full border border-gray-300 rounded px-3 py-2 text-sm text-gray-700 focus:outline-none focus:ring-1 focus:ring-[#f5a623] bg-white"
            >
              <option value="">Select your state</option>
              {US_STATES.map(s => (
                <option key={s} value={s}>{s}</option>
              ))}
            </select>
          </div>

          {/* County */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">County / Municipality</label>
            <input type="text" placeholder="e.g., Wood County" className="w-full border border-gray-300 rounded px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-[#f5a623]" />
          </div>

          {/* Community Type */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Community Type <span className="text-red-500">*</span></label>
            <div className="flex gap-2 flex-wrap">
              {COMMUNITY_TYPES.map(t => (
                <button key={t} onClick={() => setCommunityType(t)}
                  className={`px-4 py-1.5 text-sm rounded-full border transition-colors ${
                    communityType === t ? 'border-[#f5a623] bg-orange-50 text-[#f5a623]' : 'border-gray-200 text-gray-600 hover:border-gray-400'
                  }`}>
                  {t}
                </button>
              ))}
            </div>
          </div>

          {/* Project Status */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Project Status <span className="text-red-500">*</span></label>
            <div className="space-y-1.5">
              {PROJECT_STATUSES.map(s => (
                <label key={s} className="flex items-center gap-3 p-2.5 rounded border border-gray-200 cursor-pointer hover:bg-gray-50">
                  <input type="radio" name="project-status" value={s} checked={projectStatus === s}
                    onChange={() => setProjectStatus(s)}
                    className="accent-[#f5a623]" />
                  <span className="text-sm text-gray-700">{s}</span>
                </label>
              ))}
            </div>
          </div>

          {/* Multiple projects */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Do you have more than one project?</label>
            <div className="flex rounded border border-gray-200 overflow-hidden">
              <button onClick={() => setMultipleProjects(false)}
                className={`flex-1 py-2 text-sm font-medium transition-colors ${!multipleProjects ? 'bg-[#f5a623] text-white' : 'text-gray-600 hover:bg-gray-50'}`}>
                No
              </button>
              <button onClick={() => setMultipleProjects(true)}
                className={`flex-1 py-2 text-sm font-medium transition-colors ${multipleProjects ? 'bg-[#f5a623] text-white' : 'text-gray-600 hover:bg-gray-50'}`}>
                Yes
              </button>
            </div>
          </div>

          {/* Developer */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Known or Likely Developer</label>
            <input type="text" placeholder="e.g., Meta, Google, AWS, QTS" className="w-full border border-gray-300 rounded px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-[#f5a623]" />
          </div>

          {/* LLC */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">LLC or Project Codename (optional)</label>
            <input type="text" placeholder="e.g., Liamea LLC / Project Accordion" className="w-full border border-gray-300 rounded px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-[#f5a623]" />
          </div>

          {/* Current Zoning */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Current Zoning (if known)</label>
            <div className="flex gap-2 flex-wrap">
              {ZONING_TYPES.map(z => (
                <button key={z} onClick={() => setZoning(z)}
                  className={`px-3 py-1.5 text-sm rounded border transition-colors ${
                    zoning === z ? 'border-[#f5a623] bg-orange-50 text-[#f5a623]' : 'border-gray-200 text-gray-600 hover:border-gray-400'
                  }`}>
                  {z}
                </button>
              ))}
            </div>
          </div>

          {/* Submit */}
          <button className="w-full bg-[#f5a623] text-white font-medium py-2.5 px-4 rounded hover:bg-orange-500 transition-colors mt-2">
            Save / Update Profile
          </button>
          <p className="text-xs text-gray-400 text-center">This helps BEACON connect you with communities facing similar projects.</p>
        </div>
      </div>
    </div>
  );
}
