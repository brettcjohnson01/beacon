'use client';

import { useState, useCallback, useRef, useEffect } from 'react';
import Link from 'next/link';
import {
  Chart as ChartJS,
  RadialLinearScale,
  PointElement,
  LineElement,
  Filler,
  Tooltip,
  Legend,
} from 'chart.js';
import { Radar } from 'react-chartjs-2';

ChartJS.register(RadialLinearScale, PointElement, LineElement, Filler, Tooltip, Legend);

// ---------------------------------------------------------------------------
// State data
// ---------------------------------------------------------------------------

interface StateInfo {
  name: string;
  taxTier: 1 | 2 | 3;
  waterStress: 'high' | 'moderate' | 'lower';
  gridRegion: 'ERCOT' | 'WECC' | 'MISO' | 'SPP' | 'SERC' | 'PJM' | 'NPCC';
  climateZone: 'cold' | 'moderate' | 'hot';
}

const STATE_DATA: Record<string, StateInfo> = {
  AL: { name: 'Alabama',        taxTier: 1, waterStress: 'lower',    gridRegion: 'SERC',  climateZone: 'hot' },
  AK: { name: 'Alaska',         taxTier: 3, waterStress: 'lower',    gridRegion: 'NPCC',  climateZone: 'cold' },
  AZ: { name: 'Arizona',        taxTier: 1, waterStress: 'high',     gridRegion: 'WECC',  climateZone: 'hot' },
  AR: { name: 'Arkansas',       taxTier: 1, waterStress: 'lower',    gridRegion: 'MISO',  climateZone: 'hot' },
  CA: { name: 'California',     taxTier: 3, waterStress: 'high',     gridRegion: 'WECC',  climateZone: 'hot' },
  CO: { name: 'Colorado',       taxTier: 2, waterStress: 'high',     gridRegion: 'WECC',  climateZone: 'moderate' },
  CT: { name: 'Connecticut',    taxTier: 3, waterStress: 'lower',    gridRegion: 'NPCC',  climateZone: 'moderate' },
  DE: { name: 'Delaware',       taxTier: 3, waterStress: 'lower',    gridRegion: 'PJM',   climateZone: 'moderate' },
  FL: { name: 'Florida',        taxTier: 2, waterStress: 'moderate', gridRegion: 'SERC',  climateZone: 'hot' },
  GA: { name: 'Georgia',        taxTier: 1, waterStress: 'moderate', gridRegion: 'SERC',  climateZone: 'hot' },
  HI: { name: 'Hawaii',         taxTier: 3, waterStress: 'lower',    gridRegion: 'NPCC',  climateZone: 'hot' },
  ID: { name: 'Idaho',          taxTier: 2, waterStress: 'high',     gridRegion: 'WECC',  climateZone: 'cold' },
  IL: { name: 'Illinois',       taxTier: 1, waterStress: 'lower',    gridRegion: 'MISO',  climateZone: 'moderate' },
  IN: { name: 'Indiana',        taxTier: 1, waterStress: 'lower',    gridRegion: 'MISO',  climateZone: 'moderate' },
  IA: { name: 'Iowa',           taxTier: 2, waterStress: 'lower',    gridRegion: 'MISO',  climateZone: 'cold' },
  KS: { name: 'Kansas',         taxTier: 2, waterStress: 'high',     gridRegion: 'SPP',   climateZone: 'moderate' },
  KY: { name: 'Kentucky',       taxTier: 2, waterStress: 'lower',    gridRegion: 'PJM',   climateZone: 'moderate' },
  LA: { name: 'Louisiana',      taxTier: 2, waterStress: 'lower',    gridRegion: 'MISO',  climateZone: 'hot' },
  ME: { name: 'Maine',          taxTier: 3, waterStress: 'lower',    gridRegion: 'NPCC',  climateZone: 'cold' },
  MD: { name: 'Maryland',       taxTier: 2, waterStress: 'lower',    gridRegion: 'PJM',   climateZone: 'moderate' },
  MA: { name: 'Massachusetts',  taxTier: 3, waterStress: 'lower',    gridRegion: 'NPCC',  climateZone: 'moderate' },
  MI: { name: 'Michigan',       taxTier: 2, waterStress: 'lower',    gridRegion: 'MISO',  climateZone: 'cold' },
  MN: { name: 'Minnesota',      taxTier: 2, waterStress: 'lower',    gridRegion: 'MISO',  climateZone: 'cold' },
  MS: { name: 'Mississippi',    taxTier: 2, waterStress: 'lower',    gridRegion: 'SERC',  climateZone: 'hot' },
  MO: { name: 'Missouri',       taxTier: 1, waterStress: 'moderate', gridRegion: 'MISO',  climateZone: 'moderate' },
  MT: { name: 'Montana',        taxTier: 3, waterStress: 'lower',    gridRegion: 'WECC',  climateZone: 'cold' },
  NE: { name: 'Nebraska',       taxTier: 1, waterStress: 'lower',    gridRegion: 'SPP',   climateZone: 'cold' },
  NV: { name: 'Nevada',         taxTier: 1, waterStress: 'high',     gridRegion: 'WECC',  climateZone: 'hot' },
  NH: { name: 'New Hampshire',  taxTier: 3, waterStress: 'lower',    gridRegion: 'NPCC',  climateZone: 'cold' },
  NJ: { name: 'New Jersey',     taxTier: 3, waterStress: 'lower',    gridRegion: 'PJM',   climateZone: 'moderate' },
  NM: { name: 'New Mexico',     taxTier: 1, waterStress: 'high',     gridRegion: 'WECC',  climateZone: 'hot' },
  NY: { name: 'New York',       taxTier: 3, waterStress: 'lower',    gridRegion: 'NPCC',  climateZone: 'moderate' },
  NC: { name: 'North Carolina', taxTier: 2, waterStress: 'moderate', gridRegion: 'SERC',  climateZone: 'moderate' },
  ND: { name: 'North Dakota',   taxTier: 3, waterStress: 'lower',    gridRegion: 'WECC',  climateZone: 'cold' },
  OH: { name: 'Ohio',           taxTier: 1, waterStress: 'lower',    gridRegion: 'PJM',   climateZone: 'moderate' },
  OK: { name: 'Oklahoma',       taxTier: 2, waterStress: 'high',     gridRegion: 'SPP',   climateZone: 'hot' },
  OR: { name: 'Oregon',         taxTier: 2, waterStress: 'moderate', gridRegion: 'WECC',  climateZone: 'moderate' },
  PA: { name: 'Pennsylvania',   taxTier: 2, waterStress: 'lower',    gridRegion: 'PJM',   climateZone: 'moderate' },
  RI: { name: 'Rhode Island',   taxTier: 3, waterStress: 'lower',    gridRegion: 'NPCC',  climateZone: 'moderate' },
  SC: { name: 'South Carolina', taxTier: 1, waterStress: 'lower',    gridRegion: 'SERC',  climateZone: 'hot' },
  SD: { name: 'South Dakota',   taxTier: 3, waterStress: 'lower',    gridRegion: 'WECC',  climateZone: 'cold' },
  TN: { name: 'Tennessee',      taxTier: 1, waterStress: 'lower',    gridRegion: 'SERC',  climateZone: 'hot' },
  TX: { name: 'Texas',          taxTier: 1, waterStress: 'high',     gridRegion: 'ERCOT', climateZone: 'hot' },
  UT: { name: 'Utah',           taxTier: 2, waterStress: 'high',     gridRegion: 'WECC',  climateZone: 'moderate' },
  VT: { name: 'Vermont',        taxTier: 3, waterStress: 'lower',    gridRegion: 'NPCC',  climateZone: 'cold' },
  VA: { name: 'Virginia',       taxTier: 1, waterStress: 'lower',    gridRegion: 'PJM',   climateZone: 'moderate' },
  WA: { name: 'Washington',     taxTier: 2, waterStress: 'moderate', gridRegion: 'WECC',  climateZone: 'moderate' },
  WV: { name: 'West Virginia',  taxTier: 2, waterStress: 'lower',    gridRegion: 'PJM',   climateZone: 'moderate' },
  WI: { name: 'Wisconsin',      taxTier: 1, waterStress: 'lower',    gridRegion: 'MISO',  climateZone: 'cold' },
  WY: { name: 'Wyoming',        taxTier: 3, waterStress: 'lower',    gridRegion: 'WECC',  climateZone: 'cold' },
};

const TAX_TIER_LABELS: Record<number, string> = {
  1: 'High tax incentive exposure state',
  2: 'Moderate tax incentive exposure state',
  3: 'Lower tax incentive exposure state',
};

// ---------------------------------------------------------------------------
// Form types
// ---------------------------------------------------------------------------

interface FormData {
  communityName: string;
  state: string;
  zip: string;
  communityType: 'rural' | 'small_town' | 'suburb' | 'city' | '';
  waterSystemSize: 'small' | 'medium' | 'large' | '';
  waterSource: 'groundwater' | 'surface' | 'mixed' | '';
  waterStress: 'yes' | 'somewhat' | 'no' | '';
  utilityType: 'municipal' | 'iou' | 'unknown' | '';
  industrialLand: 'yes' | 'some' | 'little' | 'unknown' | '';
  recentRezoning: 'yes' | 'no' | 'unknown' | '';
  protectedLand: 'yes' | 'no' | 'unknown' | '';
  projectStage: 'rumor' | 'announced' | 'permit' | 'negotiating' | 'approved' | '';
  ndasSigned: 'yes' | 'unknown' | 'no' | '';
  organizingStatus: 'little' | 'some' | 'strong' | '';
}

interface DimScore { score: number; max: number; pct: number; }
interface ScoreResult {
  total: number;
  tier: string;
  tierLabel: string;
  tierColor: string;
  dimensions: Record<string, DimScore>;
  flags: string[];
  urgency: string | null;
}

// ---------------------------------------------------------------------------
// Scoring logic
// ---------------------------------------------------------------------------

function computeScore(form: FormData, ejPts: number): ScoreResult {
  const si = STATE_DATA[form.state];

  // Dimension 1 — Water (max 20)
  const wSize   = ({ small: 8, medium: 4, large: 1 } as Record<string, number>)[form.waterSystemSize] ?? 0;
  const wSource  = ({ groundwater: 7, mixed: 4, surface: 2 } as Record<string, number>)[form.waterSource] ?? 0;
  const wStress  = ({ yes: 5, somewhat: 3, no: 0 } as Record<string, number>)[form.waterStress] ?? 0;
  const wMod     = ({ high: 2, moderate: 1, lower: 0 } as Record<string, number>)[si?.waterStress ?? 'lower'];
  const water    = Math.min(20, wSize + wSource + wStress + wMod);

  // Dimension 2 — Energy (max 20)
  const ePts   = ({ municipal: 8, iou: 3, unknown: 5 } as Record<string, number>)[form.utilityType] ?? 0;
  const gPts   = 4; // default moderate — question removed for general-audience accessibility
  const gMod   = ({ ERCOT: 5, WECC: 3, MISO: 3, SPP: 2, SERC: 2, PJM: 2, NPCC: 1 } as Record<string, number>)[si?.gridRegion ?? ''] ?? 0;
  const energy  = Math.min(20, ePts + gPts + gMod);

  // Dimension 3 — Zoning (max 18)
  const lPts   = ({ yes: 7, some: 4, little: 1, unknown: 4 } as Record<string, number>)[form.industrialLand] ?? 0;
  const rPts   = ({ yes: 6, no: 0, unknown: 2 } as Record<string, number>)[form.recentRezoning] ?? 0;
  const pPts   = ({ yes: 2, no: 0, unknown: 2 } as Record<string, number>)[form.protectedLand] ?? 0;
  const zoning  = Math.min(18, lPts + rPts + pPts);

  // Dimension 4 — Tax (max 15, auto)
  const tax = ({ 1: 15, 2: 10, 3: 5 } as Record<number, number>)[si?.taxTier ?? 2] ?? 10;

  // Dimension 5 — Geographic (max 10)
  const cPts   = ({ cold: 4, moderate: 2, hot: 1 } as Record<string, number>)[si?.climateZone ?? 'moderate'];
  const ctPts  = ({ rural: 4, small_town: 3, suburb: 2, city: 1 } as Record<string, number>)[form.communityType] ?? 2;
  const geo    = Math.min(10, cPts + ctPts + 1); // +1 fiber default

  // Dimension 6 — Community Vulnerability (max 10)
  const burden  = ({ yes: 3, some: 2, little: 0, unknown: 0 } as Record<string, number>)[form.industrialLand] ?? 0;
  const community = Math.min(10, ejPts + burden + 2); // +2 schools default

  // Dimension 7 — Organizing (max 7)
  const oPts  = ({ little: 5, some: 3, strong: 1 } as Record<string, number>)[form.organizingStatus] ?? 0;
  const nPts  = ({ yes: 2, unknown: 1, no: 0 } as Record<string, number>)[form.ndasSigned] ?? 0;
  const org   = Math.min(7, oPts + nPts);

  const total = water + energy + zoning + tax + geo + community + org;

  let tier = 'low', tierLabel = 'LOW RISK', tierColor = '#22c55e';
  if (total >= 75) { tier = 'critical'; tierLabel = 'CRITICAL RISK'; tierColor = '#ef4444'; }
  else if (total >= 50) { tier = 'high'; tierLabel = 'HIGH RISK'; tierColor = '#f5a623'; }
  else if (total >= 25) { tier = 'moderate'; tierLabel = 'MODERATE RISK'; tierColor = '#eab308'; }

  const urgencyMap: Record<string, string> = {
    negotiating: 'URGENT',
    permit: 'ACT NOW',
    approved: 'WINDOW CLOSING',
  };

  const dimensions: Record<string, DimScore> = {
    water:      { score: water,     max: 20, pct: Math.round(water / 20 * 100) },
    energy:     { score: energy,    max: 20, pct: Math.round(energy / 20 * 100) },
    zoning:     { score: zoning,    max: 18, pct: Math.round(zoning / 18 * 100) },
    tax:        { score: tax,       max: 15, pct: Math.round(tax / 15 * 100) },
    geographic: { score: geo,       max: 10, pct: Math.round(geo / 10 * 100) },
    community:  { score: community, max: 10, pct: Math.round(community / 10 * 100) },
    organizing: { score: org,       max: 7,  pct: Math.round(org / 7 * 100) },
  };

  const flags = Object.entries(dimensions)
    .sort((a, b) => b[1].pct - a[1].pct)
    .slice(0, 3)
    .map(([k]) => k);

  return {
    total,
    tier,
    tierLabel,
    tierColor,
    dimensions,
    flags,
    urgency: urgencyMap[form.projectStage] ?? null,
  };
}

// ---------------------------------------------------------------------------
// Dynamic explanations
// ---------------------------------------------------------------------------

function dimensionExplanation(key: string, form: FormData, dim: DimScore): string {
  const si = STATE_DATA[form.state];
  switch (key) {
    case 'water':
      return `Score driven by ${form.waterSource === 'groundwater' ? 'groundwater dependency' : form.waterSource === 'mixed' ? 'mixed water sources' : 'surface water supply'}, ${form.waterSystemSize === 'small' ? 'a small system under 5,000 people' : form.waterSystemSize === 'medium' ? 'a mid-size system' : 'a large system'}, and ${form.waterStress === 'yes' ? 'active drought/stress conditions' : form.waterStress === 'somewhat' ? 'occasional water stress' : 'no known water stress'}${si?.waterStress === 'high' ? `, plus state-level water stress in ${si.name}` : ''}.`;
    case 'energy':
      return `Score driven by ${form.utilityType === 'municipal' ? 'a municipal or co-op utility' : form.utilityType === 'iou' ? 'an investor-owned utility' : 'unknown utility type'}, a moderate baseline grid capacity assumption, and ${si?.gridRegion ?? 'unknown'} grid region stress.`;
    case 'zoning':
      return `Score driven by ${form.industrialLand === 'yes' ? 'significant available industrial land' : form.industrialLand === 'some' ? 'some available land' : form.industrialLand === 'little' ? 'little available land' : 'unknown land availability'}, ${form.recentRezoning === 'yes' ? 'active rezoning' : form.recentRezoning === 'no' ? 'no recent rezoning' : 'unknown rezoning status'}, and ${form.protectedLand === 'yes' ? 'protected land or farmland nearby' : form.protectedLand === 'no' ? 'no protected land buffering the area' : 'unknown protected land status'}.`;
    case 'tax':
      return `${si?.name ?? 'This state'} is a Tier ${si?.taxTier ?? '?'} state — ${TAX_TIER_LABELS[si?.taxTier ?? 2].toLowerCase()} — resulting in ${dim.score} of 15 possible points automatically.`;
    case 'geographic':
      return `Score based on ${si?.climateZone ?? 'unknown'} climate zone (${si?.name ?? 'state'}) and ${form.communityType.replace('_', ' ')} community type, which affect a data center's attractiveness to developers.`;
    case 'community':
      return `Score reflects environmental justice data for this area plus ${form.industrialLand === 'yes' ? 'significant existing industrial land burden' : form.industrialLand === 'some' ? 'some industrial land burden' : 'low industrial land burden'} and default school/hospital proximity assumption.`;
    case 'organizing':
      return `Score driven by ${form.organizingStatus === 'little' ? 'little to no existing organizing capacity' : form.organizingStatus === 'some' ? 'early-stage organizing' : 'strong, active coalition'}${form.ndasSigned === 'yes' ? ' and NDAs limiting information access' : form.ndasSigned === 'unknown' ? ' and uncertain NDA status' : ''}.`;
    default:
      return '';
  }
}

function flagDescription(key: string, form: FormData): { title: string; body: string; action: string } {
  const si = STATE_DATA[form.state];
  switch (key) {
    case 'water':
      return {
        title: '💧 Water Vulnerability',
        body: `Your ${form.waterSource === 'groundwater' ? 'aquifer-dependent' : 'surface water'} system${form.waterSystemSize === 'small' ? ' serving under 5,000 people' : ''} faces serious capacity risk from a facility using 1–5 million gallons per day.${form.waterStress === 'yes' ? ' Drought conditions further compress the available margin.' : ''}`,
        action: 'Demand an independent water impact study as a condition of any permit or rezoning approval.',
      };
    case 'energy':
      return {
        title: '⚡ Energy Infrastructure',
        body: `Your ${si?.gridRegion ?? ''} grid region faces capacity constraints that a major data center load would significantly worsen.${form.utilityType === 'municipal' ? ' A municipal or co-op utility may have limited ability to absorb this demand without rate impacts.' : ''}`,
        action: 'Request a formal load impact study from your utility before any permits are issued.',
      };
    case 'zoning':
      return {
        title: '🏗️ Land & Zoning Readiness',
        body: `${form.recentRezoning === 'yes' ? 'Active rezoning activity combined with' : form.industrialLand === 'yes' ? 'Significant available industrial land combined with' : 'Zoning conditions combined with'} ${form.protectedLand === 'no' ? 'no protected land buffer' : 'limited or unknown protected land buffer'} make this area attractive for rapid site selection.`,
        action: 'Attend all zoning board meetings and formally request a community input period before any rezoning vote.',
      };
    case 'tax':
      return {
        title: '💰 Tax & Incentive Exposure',
        body: `${si?.name ?? 'This state'} has some of the most aggressive data center tax incentive programs in the country (Tier ${si?.taxTier ?? '?'}). Public subsidies can total hundreds of millions with limited transparency.`,
        action: 'Request a full fiscal impact analysis showing net taxpayer benefit after all exemptions, abatements, and infrastructure costs.',
      };
    case 'geographic':
      return {
        title: '🌍 Geographic & Climate Factors',
        body: `This area's ${si?.climateZone ?? ''} climate and ${form.communityType.replace('_', ' ')} character increase both developer attractiveness and potential community impact from industrial-scale infrastructure.`,
        action: 'Document baseline environmental and infrastructure conditions now — before any permits are filed — to support future impact assessments.',
      };
    case 'community':
      return {
        title: '🏘️ Community Vulnerability',
        body: `This community already faces elevated environmental and economic burdens. Adding industrial-scale data center infrastructure compounds cumulative impacts on residents with fewest resources to respond.`,
        action: 'Request a formal Environmental Justice Impact Assessment as a condition of any permit or approval.',
      };
    case 'organizing':
      return {
        title: '🤝 Organizing & Political Capacity',
        body: `With ${form.organizingStatus === 'little' ? 'little existing coalition infrastructure' : 'early-stage organizing'}, your leverage window is narrow.${form.ndasSigned === 'yes' ? ' NDAs limiting public information further reduce your ability to mobilize.' : ''}`,
        action: 'Connect with state-level data center organizing groups and file public records requests immediately.',
      };
    default:
      return { title: key, body: '', action: '' };
  }
}

function getNextSteps(result: ScoreResult, _form: FormData): string[] {
  const steps: string[] = [];
  if (result.urgency) steps.push('File public records requests immediately — gather all project documents, permits, and correspondence before information becomes restricted.');
  if (result.flags.includes('water')) steps.push('Commission or request an independent water impact study — ask specifically about peak daily water withdrawal relative to your system capacity.');
  if (result.flags.includes('tax')) steps.push('Request a full fiscal impact analysis from your municipality showing net taxpayer benefit after all exemptions and infrastructure costs.');
  if (result.flags.includes('organizing')) steps.push('Connect with state-level data center organizing groups and regional environmental justice networks to build coalition capacity.');
  if (result.flags.includes('energy')) steps.push('Contact your utility and public utility commission to request a formal load impact study for the proposed facility.');
  steps.push('Use the BEACON CBA Tool to analyze or compare any Community Benefits Agreement language associated with this project.');
  return steps.slice(0, 5);
}

// ---------------------------------------------------------------------------
// UI helpers
// ---------------------------------------------------------------------------

type BtnVal = string;

function ButtonToggle({
  options,
  value,
  onChange,
}: {
  options: Array<{ value: BtnVal; label: string }>;
  value: BtnVal;
  onChange: (v: BtnVal) => void;
}) {
  return (
    <div className="flex flex-wrap gap-2">
      {options.map((opt) => (
        <button
          key={opt.value}
          type="button"
          onClick={() => onChange(opt.value)}
          className={`px-4 py-2 rounded border text-sm font-medium transition-colors cursor-pointer ${
            value === opt.value
              ? 'bg-[#f5a623] border-[#f5a623] text-white'
              : 'border-gray-300 text-gray-700 bg-white hover:border-[#f5a623] hover:text-[#f5a623]'
          }`}
        >
          {opt.label}
        </button>
      ))}
    </div>
  );
}

// ---------------------------------------------------------------------------
// Popover help system
// ---------------------------------------------------------------------------

interface PopoverLink { text: string; url: string; }
interface PopoverContent {
  title: string;
  explanation: string;
  steps: string[];
  links?: PopoverLink[];
  note?: string;
}

function InfoIcon({ content }: { content: PopoverContent }) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;
    const handler = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, [open]);

  return (
    <div ref={ref} className="relative inline-block ml-1.5 align-middle">
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        className="text-gray-400 hover:text-[#f5a623] transition-colors focus:outline-none"
        aria-label="More information"
      >
        <svg className="w-4 h-4" viewBox="0 0 20 20" fill="currentColor">
          <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
        </svg>
      </button>
      {open && (
        <div className="absolute z-50 left-0 top-6 w-[480px] min-w-[380px] bg-white border-l-[3px] border-[#f5a623] rounded-r-lg shadow-lg p-3 text-left">
          <div className="flex justify-between items-start mb-2">
            <p className="text-sm font-bold text-gray-900">{content.title}</p>
            <button type="button" onClick={() => setOpen(false)} className="text-gray-400 hover:text-gray-600 ml-2 shrink-0 text-xs">✕</button>
          </div>
          <p className="text-xs text-gray-600 mb-2 leading-relaxed">{content.explanation}</p>
          <ol className="space-y-1.5 mb-2">
            {content.steps.map((s, i) => (
              <li key={i} className="text-xs text-gray-700 flex gap-1.5 leading-relaxed">
                <span className="shrink-0 text-[#f5a623] font-bold">{i + 1}.</span>
                <span>{s}</span>
              </li>
            ))}
          </ol>
          {content.links?.map((link, i) => (
            <a key={i} href={link.url} target="_blank" rel="noopener noreferrer"
              className="block text-xs text-[#f5a623] hover:underline mb-1 font-medium">
              {link.text}
            </a>
          ))}
          {content.note && <p className="text-xs text-gray-500 italic mt-1.5 leading-relaxed">{content.note}</p>}
        </div>
      )}
    </div>
  );
}

const HELP: Record<string, PopoverContent> = {
  waterSystemSize: {
    title: 'How to find your water system size',
    explanation: 'This refers to how many people your municipal water utility serves — not your city\'s total population.',
    steps: [
      'Go to the EPA Safe Drinking Water database and search for your city or county name.',
      'Look for your system in the results — the "Population Served Count" column shows the number directly.',
      'Use that number to select your answer above.',
    ],
    links: [{ text: 'Search EPA Safe Drinking Water Database →', url: 'https://sdwis.epa.gov/ords/sfdw_pub/r/sfdw/simple-search/home' }],
    note: 'Example: Ann Arbor, MI shows Population Served Count: 241,868 → select "50,000+ people"',
  },
  waterSource: {
    title: 'How to find your water source',
    explanation: 'Search by your state and county to find your water system. The results table shows "Primary Source" and "Population Served Count" columns which answer both this question and the water system size question.',
    steps: [
      'Go to the EPA Safe Drinking Water database link below.',
      'Select your state and enter your county name, then click Search.',
      'The "Primary Source" column shows exactly what to select: Surface water, Groundwater, or Purchased (count as Mixed).',
    ],
    links: [{ text: 'Search EPA Safe Drinking Water Database →', url: 'https://enviro.epa.gov/enviro/sdwis_find_sys_detail.sys_search_by_county' }],
  },
  waterStress: {
    title: 'How to check your region\'s water stress',
    explanation: 'Water stress means demand is approaching or exceeding available supply. Drought conditions make communities more vulnerable to large industrial water users.',
    steps: [
      'Visit drought.gov and navigate to your state.',
      'Check if your county is currently showing D1 (Moderate Drought) or higher.',
      'If yes, select "Yes — drought conditions or restrictions".',
    ],
    links: [{ text: 'Check Current Drought Conditions by State →', url: 'https://www.drought.gov/states' }],
    note: 'Update the URL to append your state name, e.g. drought.gov/states/michigan',
  },
  utilityType: {
    title: 'How to find your utility type',
    explanation: 'Municipal utilities are owned by local government. Co-ops are member-owned nonprofits. IOUs (Investor-Owned Utilities) are private companies — like DTE Energy, Dominion, or Duke Energy.',
    steps: [
      'Check the company name on your electric bill.',
      'If it includes words like "Electric Cooperative", "Co-op", or "Municipal Light" — select Municipal/Co-op.',
      'If it\'s a large corporate name (DTE, Consumers Energy, Dominion, Xcel, etc.) — select Investor-owned (IOU).',
      'Still unsure? Google your utility name + "municipal or investor owned".',
    ],
  },
  industrialLand: {
    title: 'How to check local zoning',
    explanation: 'Industrial-zoned land can be developed for data centers faster, often without a public rezoning hearing — giving communities less time to respond.',
    steps: [
      'Search Google for "[your county name] GIS parcel viewer" or "[your county name] zoning map".',
      'Look for parcels labeled I-1, I-2, M-1, M-2, or "Heavy Industrial" near major roads or highways.',
      'If you see large undeveloped parcels with industrial zoning near the proposed site, select "Yes, significant".',
    ],
  },
  recentRezoning: {
    title: 'How to find rezoning applications',
    explanation: 'Rezoning applications are public record and must be posted on county websites and noticed in local newspapers.',
    steps: [
      'Visit your county planning department website and look for "Current Applications", "Pending Permits", or "Planning Commission Agenda".',
      'Search your local newspaper for "rezoning" in the past 6 months.',
      'Look for any large parcel (100+ acres) being converted from agricultural or residential to industrial use.',
      'You can also file a public records request at muckrock.com.',
    ],
    links: [{ text: 'File a Public Records Request →', url: 'https://www.muckrock.com' }],
  },
  protectedLand: {
    title: 'How to check for protected land',
    explanation: 'Proximity to protected land can create legal leverage for communities to challenge permits under federal and state environmental law.',
    steps: [
      'For wetlands: Use the USFWS National Wetlands Inventory mapper.',
      'For farmland: Use the USDA Web Soil Survey — look for "Prime Farmland" designation within 1 mile of the proposed site.',
      'If you find either within 1 mile, select "Some" or "Significant protected land".',
    ],
    links: [
      { text: 'Check National Wetlands Inventory →', url: 'https://www.fws.gov/program/national-wetlands-inventory' },
      { text: 'Check USDA Farmland Classification →', url: 'https://websoilsurvey.nrcs.usda.gov' },
    ],
  },
  projectStage: {
    title: 'How to find the project\'s approval stage',
    explanation: 'Where a project is in the approval process determines how much leverage your community still has. Earlier = more leverage.',
    steps: [
      'Search "[developer name OR project codename] [your county] permit" in Google News.',
      'Check your county planning commission meeting minutes (posted on county website).',
      'File a public records request for any communications between county officials and the developer.',
    ],
    links: [{ text: 'File a Public Records Request →', url: 'https://www.muckrock.com' }],
  },
  ndasSigned: {
    title: 'How to find out about NDAs',
    explanation: 'NDAs between developers and local officials are increasingly common but may be challenged under your state\'s open records laws.',
    steps: [
      'Submit a public records request to your county administrator asking for any confidentiality or non-disclosure agreements related to economic development projects.',
      'Check local planning commission minutes for references to "confidential" economic development discussions.',
      'Local news often reports on NDAs when they become public.',
    ],
    links: [{ text: 'File a Public Records Request →', url: 'https://www.muckrock.com' }],
  },
};

function ProgressBar({ step, total }: { step: number; total: number }) {
  const labels = ['Community', 'Water', 'Energy & Land', 'Project Status', 'Organizing'];
  return (
    <div className="mb-8">
      <div className="flex items-center justify-between mb-2">
        {labels.map((label, i) => {
          const n = i + 1;
          const active = n === step;
          const done = n < step;
          return (
            <div key={n} className="flex flex-col items-center flex-1">
              <div
                className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold mb-1 ${
                  done ? 'bg-[#f5a623] text-white' : active ? 'bg-[#f5a623] text-white ring-4 ring-orange-100' : 'bg-gray-200 text-gray-500'
                }`}
              >
                {done ? '✓' : n}
              </div>
              <span className={`text-xs hidden sm:block text-center ${active ? 'text-[#f5a623] font-semibold' : 'text-gray-400'}`}>{label}</span>
            </div>
          );
        })}
      </div>
      <div className="w-full bg-gray-200 h-1.5 rounded-full">
        <div
          className="bg-[#f5a623] h-1.5 rounded-full transition-all duration-300"
          style={{ width: `${((step - 1) / (total - 1)) * 100}%` }}
        />
      </div>
    </div>
  );
}

function GaugeRing({ score, tierLabel, tierColor }: { score: number; tierLabel: string; tierColor: string }) {
  const r = 72;
  const cx = 90;
  const cy = 90;
  const circ = 2 * Math.PI * r;
  const offset = circ * (1 - score / 100);
  return (
    <div className="flex flex-col items-center">
      <svg width="180" height="180" viewBox="0 0 180 180" className="drop-shadow-sm">
        <circle cx={cx} cy={cy} r={r} fill="none" stroke="#e5e7eb" strokeWidth="14" />
        <circle
          cx={cx} cy={cy} r={r}
          fill="none"
          stroke={tierColor}
          strokeWidth="14"
          strokeDasharray={circ}
          strokeDashoffset={offset}
          strokeLinecap="round"
          transform={`rotate(-90 ${cx} ${cy})`}
          style={{ transition: 'stroke-dashoffset 1s ease' }}
        />
        <text x={cx} y={cy - 8} textAnchor="middle" fontSize="36" fontWeight="bold" fill={tierColor}>{score}</text>
        <text x={cx} y={cy + 12} textAnchor="middle" fontSize="10" fontWeight="600" fill="#6b7280" letterSpacing="0.05em">{tierLabel}</text>
        <text x={cx} y={cy + 26} textAnchor="middle" fontSize="9" fill="#9ca3af">out of 100</text>
      </svg>
      <p className="text-sm text-gray-500 mt-1">Overall Risk Score</p>
    </div>
  );
}

function RadarChart({ dimensions }: { dimensions: Record<string, DimScore> }) {
  const labels = ['💧 Water', '⚡ Energy', '🏗️ Zoning', '💰 Tax', '🌍 Geographic', '🏘️ Community', '🤝 Organizing'];
  const keys = ['water', 'energy', 'zoning', 'tax', 'geographic', 'community', 'organizing'];
  const data = {
    labels,
    datasets: [
      {
        label: 'Risk %',
        data: keys.map((k) => dimensions[k]?.pct ?? 0),
        backgroundColor: 'rgba(245, 166, 35, 0.35)',
        borderColor: '#f5a623',
        borderWidth: 2,
        pointBackgroundColor: '#f5a623',
        pointRadius: 4,
      },
    ],
  };
  const options = {
    responsive: true,
    layout: { padding: { top: 12, bottom: 12, left: 16, right: 16 } },
    scales: {
      r: {
        min: 0,
        max: 100,
        ticks: { stepSize: 25, font: { size: 10 }, color: '#9ca3af' },
        grid: { color: '#e5e7eb' },
        angleLines: { color: '#e5e7eb' },
        pointLabels: { font: { size: 12 }, color: '#374151', padding: 8 },
      },
    },
    plugins: {
      legend: { display: false },
      tooltip: {
        callbacks: {
          label: (ctx: { parsed: { r: number }; dataIndex: number }) => {
            const k = keys[ctx.dataIndex];
            const d = dimensions[k];
            return ` ${d.score} / ${d.max} pts (${ctx.parsed.r}%)`;
          },
        },
      },
    },
  };
  return <Radar data={data} options={options} />;
}

function ScoreBar({ pct, color }: { pct: number; color: string }) {
  return (
    <div className="w-full bg-gray-100 rounded-full h-2.5 overflow-hidden">
      <div
        className="h-2.5 rounded-full transition-all duration-700"
        style={{ width: `${pct}%`, backgroundColor: color }}
      />
    </div>
  );
}

// ---------------------------------------------------------------------------
// Main page
// ---------------------------------------------------------------------------

const TOTAL_STEPS = 5;
const EJSCREEN_URL = 'https://ejscreen.epa.gov/mapper/ejscreenRESTbroker.aspx';

const INITIAL_FORM: FormData = {
  communityName: '',
  state: '',
  zip: '',
  communityType: '',
  waterSystemSize: '',
  waterSource: '',
  waterStress: '',
  utilityType: '',
  industrialLand: '',
  recentRezoning: '',
  protectedLand: '',
  projectStage: '',
  ndasSigned: '',
  organizingStatus: '',
};

export default function SusceptibilityPage() {
  const [step, setStep] = useState(1);
  const [form, setForm] = useState<FormData>(INITIAL_FORM);
  const [ejPts, setEjPts] = useState(2);
  const [ejStatus, setEjStatus] = useState<'idle' | 'loading' | 'done' | 'failed'>('idle');
  const [result, setResult] = useState<ScoreResult | null>(null);

  const set = useCallback(<K extends keyof FormData>(key: K, val: FormData[K]) => {
    setForm((prev) => ({ ...prev, [key]: val }));
  }, []);

  const stateInfo = form.state ? STATE_DATA[form.state] : null;
  const stateCallout = stateInfo
    ? `${stateInfo.name}: ${TAX_TIER_LABELS[stateInfo.taxTier]} — Tier ${stateInfo.taxTier}`
    : null;

  const fetchEjscreen = useCallback(async (zip: string) => {
    if (!zip || !/^\d{5}$/.test(zip)) return;
    setEjStatus('loading');
    try {
      const params = new URLSearchParams({
        namestr: zip,
        geometry: '',
        distance: '',
        unit: '9035',
        areatype: '',
        areaid: '',
        f: 'pjson',
      });
      const res = await fetch(`${EJSCREEN_URL}?${params}`, { signal: AbortSignal.timeout(10000) });
      if (!res.ok) throw new Error('HTTP error');
      const data = await res.json();
      // Try to find a usable percentile field
      const candidates = ['DSCORESI', 'DSCORE', 'P_MINORPCT', 'P_LWINCPCT', 'EJ_DISPARITY', 'PEOPCOLORPCT'];
      let found: number | null = null;
      const records: Record<string, unknown>[] = Array.isArray(data)
        ? data
        : data?.items ?? data?.features?.map((f: { attributes: unknown }) => f.attributes) ?? [data];
      for (const rec of records) {
        if (!rec || typeof rec !== 'object') continue;
        for (const field of candidates) {
          const val = (rec as Record<string, unknown>)[field];
          if (val != null) {
            const n = parseFloat(String(val));
            if (!isNaN(n)) {
              found = n > 1 ? Math.min(100, Math.max(0, n)) : Math.min(100, Math.max(0, n * 100));
              break;
            }
          }
        }
        if (found !== null) break;
      }
      if (found === null) throw new Error('No usable field');
      const pts = found >= 75 ? 5 : found >= 50 ? 3 : 1;
      setEjPts(pts);
      setEjStatus('done');
    } catch {
      setEjStatus('failed');
      setEjPts(2); // silent default
    }
  }, []);

  // Step validation — which fields must be filled to advance
  const canAdvance = (): boolean => {
    if (step === 1) return !!form.state && !!form.communityType;
    if (step === 2) return !!form.waterSystemSize && !!form.waterSource && !!form.waterStress;
    if (step === 3) return !!form.utilityType && !!form.industrialLand && !!form.recentRezoning && !!form.protectedLand;
    if (step === 4) return !!form.projectStage && !!form.ndasSigned;
    if (step === 5) return !!form.organizingStatus;
    return false;
  };

  const handleCalculate = () => {
    const r = computeScore(form, ejPts);
    setResult(r);
    window.scrollTo({ top: 0, behavior: 'smooth' });
    // Fire-and-forget anonymous submission — never surfaces errors to user
    try {
      const payload = {
        timestamp: new Date().toISOString(),
        state: form.state,
        zip_prefix: form.zip.length >= 3 ? form.zip.slice(0, 3) : '',
        community_type: form.communityType,
        water_system_size: form.waterSystemSize,
        water_source: form.waterSource,
        water_stress: form.waterStress,
        utility_type: form.utilityType,
        industrial_land: form.industrialLand,
        recent_rezoning: form.recentRezoning,
        protected_land: form.protectedLand,
        project_stage: form.projectStage,
        ndas_signed: form.ndasSigned,
        organizing_status: form.organizingStatus,
        total_score: r.total,
        tier: r.tier,
        dimension_scores: Object.fromEntries(
          Object.entries(r.dimensions).map(([k, v]) => [k, v.score])
        ),
      };
      fetch('/api/susceptibility/submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      }).catch(() => {/* silent */});
    } catch {/* silent */}
  };

  const handleReset = () => {
    setStep(1);
    setForm(INITIAL_FORM);
    setEjPts(2);
    setEjStatus('idle');
    setResult(null);
  };

  const dimMeta: Array<{ key: string; label: string; icon: string }> = [
    { key: 'water',      label: 'Water Vulnerability',     icon: '💧' },
    { key: 'energy',     label: 'Energy Infrastructure',   icon: '⚡' },
    { key: 'zoning',     label: 'Land & Zoning Readiness', icon: '🏗️' },
    { key: 'tax',        label: 'Tax & Incentive Exposure', icon: '💰' },
    { key: 'geographic', label: 'Geographic Factors',      icon: '🌍' },
    { key: 'community',  label: 'Community Vulnerability',  icon: '🏘️' },
    { key: 'organizing', label: 'Organizing Capacity',      icon: '🤝' },
  ];

  // -------------------------------------------------------------------------
  // RESULTS VIEW
  // -------------------------------------------------------------------------

  if (result) {
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

        {/* Results hero */}
        <section className="bg-[#1a2332] py-10 px-4 text-center">
          <div className="max-w-2xl mx-auto">
            <h1 className="text-3xl font-bold text-[#f5a623] mb-2 tracking-wide">Susceptibility Results</h1>
            {form.communityName && <p className="text-gray-300 text-lg">{form.communityName}{form.state ? `, ${STATE_DATA[form.state]?.name ?? form.state}` : ''}</p>}
          </div>
        </section>

        <div className="bg-white pb-16">
          <div className="max-w-5xl mx-auto px-4 pt-0">

            {/* Urgency banner */}
            {result.urgency && (
              <div className="bg-red-600 text-white px-6 py-4 rounded-b-lg mb-6 flex items-start gap-3">
                <span className="text-xl mt-0.5">⚠️</span>
                <div>
                  <span className="font-bold">URGENT: </span>
                  Based on the project stage you selected, your leverage window may be closing.{' '}
                  {result.urgency === 'WINDOW CLOSING'
                    ? 'Even post-approval, community organizing can shape implementation conditions.'
                    : 'Take action now — every week matters.'}
                </div>
              </div>
            )}

            {/* Gauge + Radar side by side */}
            <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
              <div className="bg-white border border-gray-200 rounded-xl shadow-sm p-8 flex flex-col items-center justify-center">
                <GaugeRing score={result.total} tierLabel={result.tierLabel} tierColor={result.tierColor} />
              </div>
              <div className="bg-white border border-gray-200 rounded-xl shadow-sm p-6">
                <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wide mb-4 text-center">Risk Profile by Category</h3>
                <RadarChart dimensions={result.dimensions} />
              </div>
            </div>

            {/* Dimension breakdown */}
            <div className="bg-white border border-gray-200 rounded-xl shadow-sm p-6 mb-6">
              <h2 className="text-xl font-bold text-gray-900 mb-5">Score Breakdown</h2>
              <div className="space-y-5">
                {dimMeta.map(({ key, label, icon }) => {
                  const d = result.dimensions[key];
                  const color = d.pct >= 75 ? '#ef4444' : d.pct >= 50 ? '#f5a623' : d.pct >= 25 ? '#eab308' : '#22c55e';
                  return (
                    <div key={key}>
                      <div className="flex items-center justify-between mb-1">
                        <span className="text-sm font-semibold text-gray-800">{icon} {label}</span>
                        <span className="text-sm font-mono text-gray-600">{d.score} / {d.max} pts</span>
                      </div>
                      <ScoreBar pct={d.pct} color={color} />
                      <p className="text-xs text-gray-500 mt-1.5 leading-relaxed">{dimensionExplanation(key, form, d)}</p>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Top risk flags */}
            <div className="mb-6">
              <h2 className="text-xl font-bold text-gray-900 mb-4">Top Risk Flags</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {result.flags.map((key) => {
                  const { title, body, action } = flagDescription(key, form);
                  return (
                    <div key={key} className="border-l-4 border-[#f5a623] bg-orange-50 rounded-r-lg p-5">
                      <div className="font-bold text-gray-900 mb-2">{title}</div>
                      <p className="text-sm text-gray-700 mb-3 leading-relaxed">{body}</p>
                      <p className="text-xs font-semibold text-[#f5a623] uppercase tracking-wide">Action</p>
                      <p className="text-sm text-gray-800 leading-relaxed">{action}</p>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Next steps */}
            <div className="bg-white border border-gray-200 rounded-xl shadow-sm p-6 mb-6">
              <h2 className="text-xl font-bold text-gray-900 mb-4">Recommended Next Steps</h2>
              <ul className="space-y-3">
                {getNextSteps(result, form).map((step, i) => (
                  <li key={i} className="flex gap-3 text-sm text-gray-700 leading-relaxed">
                    <span className="w-5 h-5 rounded-full bg-[#f5a623] text-white text-xs font-bold flex items-center justify-center shrink-0 mt-0.5">{i + 1}</span>
                    {step}
                  </li>
                ))}
              </ul>
              <div className="mt-6 pt-5 border-t border-gray-100 flex flex-col sm:flex-row gap-3 items-start sm:items-center">
                <Link
                  href="/cba"
                  className="inline-block bg-[#f5a623] text-white font-semibold px-6 py-3 rounded-lg hover:bg-orange-500 transition-colors"
                >
                  Build Your CBA →
                </Link>
                <button
                  onClick={handleReset}
                  className="inline-block border border-gray-300 text-gray-700 font-medium px-5 py-3 rounded-lg hover:border-gray-400 transition-colors text-sm"
                >
                  Recalculate →
                </button>
              </div>
            </div>

            {/* Disclaimer */}
            <p className="text-xs text-gray-400 text-center leading-relaxed mt-4 pb-4">
              This tool uses publicly available data and self-reported community inputs. Results are intended to guide organizing and research, not provide legal or technical advice.
            </p>

          </div>
        </div>
      </div>
    );
  }

  // -------------------------------------------------------------------------
  // FORM VIEW
  // -------------------------------------------------------------------------

  return (
    <div className="min-h-screen bg-[#1a2332] text-white">
      {/* Nav */}
      <nav className="flex items-center justify-between px-6 py-3 border-b border-white/10">
        <span className="text-[#f5a623] font-bold text-lg tracking-wide">BEACON</span>
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
      <section className="bg-[#1a2332] py-14 px-4 text-center">
        <div className="max-w-2xl mx-auto">
          <h1 className="text-4xl font-bold text-[#f5a623] mb-4 tracking-wide">Community Susceptibility Calculator</h1>
          <p className="text-lg text-gray-300 leading-relaxed">
            Understand your community&apos;s vulnerability to data center development across water, energy, land, tax, and organizing dimensions.
          </p>
        </div>
      </section>

      {/* Form card */}
      <section className="bg-white py-12 px-4 min-h-[60vh]">
        <div className="max-w-2xl mx-auto">
          <ProgressBar step={step} total={TOTAL_STEPS} />

          {/* Step 1 — Community */}
          {step === 1 && (
            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-1">Your Community</h2>
              <p className="text-gray-500 text-sm mb-6">Tell us about the community facing this proposal.</p>

              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-1.5">Community Name <span className="text-gray-400 font-normal">(optional)</span></label>
                  <input
                    type="text"
                    value={form.communityName}
                    onChange={(e) => set('communityName', e.target.value)}
                    placeholder="e.g. Walton County"
                    className="w-full px-3 py-2 border border-gray-300 rounded text-sm text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-1 focus:ring-[#f5a623]"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-1.5">State <span className="text-red-500">*</span></label>
                  <select
                    value={form.state}
                    onChange={(e) => set('state', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded text-sm text-gray-800 focus:outline-none focus:ring-1 focus:ring-[#f5a623] bg-white"
                  >
                    <option value="">Select a state…</option>
                    {Object.entries(STATE_DATA)
                      .sort((a, b) => a[1].name.localeCompare(b[1].name))
                      .map(([code, info]) => (
                        <option key={code} value={code}>{info.name}</option>
                      ))}
                  </select>
                  {stateCallout && (
                    <div className="mt-2 px-3 py-2 bg-orange-50 border border-orange-200 rounded text-sm text-orange-800">
                      {stateCallout}
                    </div>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-1.5">ZIP Code <span className="text-gray-400 font-normal">(optional — used for environmental data lookup)</span></label>
                  <input
                    type="text"
                    value={form.zip}
                    onChange={(e) => set('zip', e.target.value)}
                    onBlur={(e) => fetchEjscreen(e.target.value)}
                    placeholder="e.g. 30201"
                    maxLength={5}
                    className="w-full px-3 py-2 border border-gray-300 rounded text-sm text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-1 focus:ring-[#f5a623]"
                  />
                  {ejStatus === 'loading' && (
                    <p className="mt-1.5 text-sm text-gray-500 flex items-center gap-2">
                      <span className="inline-block w-3 h-3 border-2 border-gray-400 border-t-transparent rounded-full animate-spin" />
                      Looking up your community data…
                    </p>
                  )}
                  {ejStatus === 'done' && (
                    <p className="mt-1.5 text-sm text-green-600 font-medium">Community data loaded ✓</p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Community Type <span className="text-red-500">*</span></label>
                  <ButtonToggle
                    options={[
                      { value: 'rural',      label: 'Rural' },
                      { value: 'small_town', label: 'Small Town' },
                      { value: 'suburb',     label: 'Suburb' },
                      { value: 'city',       label: 'City' },
                    ]}
                    value={form.communityType}
                    onChange={(v) => set('communityType', v as FormData['communityType'])}
                  />
                </div>
              </div>
            </div>
          )}

          {/* Step 2 — Water */}
          {step === 2 && (
            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-1">Water</h2>
              <p className="text-gray-500 text-sm mb-6">Data centers can use 1–5 million gallons of water per day. Tell us about your local water system.</p>

              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Water system size<InfoIcon content={HELP.waterSystemSize} /></label>
                  <ButtonToggle
                    options={[
                      { value: 'small',  label: 'Fewer than 5,000 people' },
                      { value: 'medium', label: '5,000–50,000 people' },
                      { value: 'large',  label: '50,000+ people' },
                    ]}
                    value={form.waterSystemSize}
                    onChange={(v) => set('waterSystemSize', v as FormData['waterSystemSize'])}
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Primary water source<InfoIcon content={HELP.waterSource} /></label>
                  <ButtonToggle
                    options={[
                      { value: 'groundwater', label: 'Groundwater / Aquifer' },
                      { value: 'surface',     label: 'Surface water (river, lake, reservoir)' },
                      { value: 'mixed',       label: 'Mixed' },
                    ]}
                    value={form.waterSource}
                    onChange={(v) => set('waterSource', v as FormData['waterSource'])}
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Known water stress<InfoIcon content={HELP.waterStress} /></label>
                  <ButtonToggle
                    options={[
                      { value: 'yes',      label: 'Yes — drought conditions or restrictions' },
                      { value: 'somewhat', label: 'Somewhat / occasionally' },
                      { value: 'no',       label: 'No known stress' },
                    ]}
                    value={form.waterStress}
                    onChange={(v) => set('waterStress', v as FormData['waterStress'])}
                  />
                </div>
              </div>
            </div>
          )}

          {/* Step 3 — Energy & Land */}
          {step === 3 && (
            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-1">Energy & Land</h2>
              <p className="text-gray-500 text-sm mb-6">Data centers consume 50–200+ megawatts of power and require large industrial sites. Tell us about local conditions.</p>

              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Utility provider type<InfoIcon content={HELP.utilityType} /></label>
                  <ButtonToggle
                    options={[
                      { value: 'municipal', label: 'Municipal utility or rural co-op' },
                      { value: 'iou',       label: 'Investor-owned utility (IOU)' },
                      { value: 'unknown',   label: 'Unknown' },
                    ]}
                    value={form.utilityType}
                    onChange={(v) => set('utilityType', v as FormData['utilityType'])}
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Available industrial / undeveloped land near proposed site<InfoIcon content={HELP.industrialLand} /></label>
                  <ButtonToggle
                    options={[
                      { value: 'yes',     label: 'Yes, significant' },
                      { value: 'some',    label: 'Some' },
                      { value: 'little',  label: 'Little to none' },
                      { value: 'unknown', label: 'Unknown' },
                    ]}
                    value={form.industrialLand}
                    onChange={(v) => set('industrialLand', v as FormData['industrialLand'])}
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Recent rezoning proposed or approved<InfoIcon content={HELP.recentRezoning} /></label>
                  <ButtonToggle
                    options={[
                      { value: 'yes',     label: 'Yes — rezoning filed or approved' },
                      { value: 'no',      label: 'No / Not that I know of' },
                      { value: 'unknown', label: 'Unknown — I haven\'t checked' },
                    ]}
                    value={form.recentRezoning}
                    onChange={(v) => set('recentRezoning', v as FormData['recentRezoning'])}
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Near farmland, wetlands, or protected land<InfoIcon content={HELP.protectedLand} /></label>
                  <ButtonToggle
                    options={[
                      { value: 'yes',     label: 'Yes — protected land or farmland nearby' },
                      { value: 'no',      label: 'No protected land nearby' },
                      { value: 'unknown', label: 'Unknown — I haven\'t checked' },
                    ]}
                    value={form.protectedLand}
                    onChange={(v) => set('protectedLand', v as FormData['protectedLand'])}
                  />
                </div>
              </div>
            </div>
          )}

          {/* Step 4 — Project Status */}
          {step === 4 && (
            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-1">Project Status</h2>
              <p className="text-gray-500 text-sm mb-6">Where is the proposed data center in the approval process?</p>

              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Current project stage<InfoIcon content={HELP.projectStage} /></label>
                  <ButtonToggle
                    options={[
                      { value: 'rumor',        label: 'Just a rumor' },
                      { value: 'announced',    label: 'Publicly announced' },
                      { value: 'permit',       label: 'Permit filed' },
                      { value: 'negotiating',  label: 'Incentives being negotiated' },
                      { value: 'approved',     label: 'Already approved' },
                    ]}
                    value={form.projectStage}
                    onChange={(v) => set('projectStage', v as FormData['projectStage'])}
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Has local government signed NDAs restricting public information?<InfoIcon content={HELP.ndasSigned} /></label>
                  <ButtonToggle
                    options={[
                      { value: 'yes',     label: 'Yes' },
                      { value: 'unknown', label: 'Unknown' },
                      { value: 'no',      label: 'No' },
                    ]}
                    value={form.ndasSigned}
                    onChange={(v) => set('ndasSigned', v as FormData['ndasSigned'])}
                  />
                </div>
              </div>
            </div>
          )}

          {/* Step 5 — Organizing */}
          {step === 5 && (
            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-1">Organizing Capacity</h2>
              <p className="text-gray-500 text-sm mb-6">How organized is your community to respond to this proposal?</p>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Current organizing status</label>
                <ButtonToggle
                  options={[
                    { value: 'little', label: 'Little to no organizing' },
                    { value: 'some',   label: 'Some organizing, early stages' },
                    { value: 'strong', label: 'Strong, active coalition' },
                  ]}
                  value={form.organizingStatus}
                  onChange={(v) => set('organizingStatus', v as FormData['organizingStatus'])}
                />
              </div>

              <div className="mt-8 p-4 bg-blue-50 border border-blue-200 rounded-lg">
                <p className="text-sm text-blue-800 leading-relaxed">
                  <strong>Ready to calculate.</strong> Your inputs cover all seven risk dimensions. Click &ldquo;Calculate Score&rdquo; to see your community&apos;s full susceptibility profile.
                </p>
              </div>
            </div>
          )}

          {/* Navigation buttons */}
          <div className="mt-8 flex justify-between items-center">
            <button
              type="button"
              onClick={() => setStep((s) => s - 1)}
              disabled={step === 1}
              className={`px-5 py-2.5 rounded font-medium text-sm transition-colors ${
                step === 1
                  ? 'text-gray-300 cursor-not-allowed'
                  : 'border border-gray-300 text-gray-700 hover:border-gray-400'
              }`}
            >
              ← Back
            </button>

            {step < TOTAL_STEPS ? (
              <button
                type="button"
                onClick={() => setStep((s) => s + 1)}
                disabled={!canAdvance()}
                className={`px-6 py-2.5 rounded font-semibold text-sm transition-colors ${
                  canAdvance()
                    ? 'bg-[#f5a623] text-white hover:bg-orange-500'
                    : 'bg-gray-200 text-gray-400 cursor-not-allowed'
                }`}
              >
                Next →
              </button>
            ) : (
              <button
                type="button"
                onClick={handleCalculate}
                disabled={!canAdvance()}
                className={`px-8 py-2.5 rounded font-semibold text-sm transition-colors ${
                  canAdvance()
                    ? 'bg-[#f5a623] text-white hover:bg-orange-500'
                    : 'bg-gray-200 text-gray-400 cursor-not-allowed'
                }`}
              >
                Calculate Score →
              </button>
            )}
          </div>
        </div>
      </section>
    </div>
  );
}
