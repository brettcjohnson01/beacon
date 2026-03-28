// ---------------------------------------------------------------------------
// State and county data for enhanced susceptibility scoring
// Michigan (480–499) and Virginia (200–246) ZIP prefix lookups
// All other states continue using STATE_DATA in page.tsx
// ---------------------------------------------------------------------------

/** Maps 3-digit ZIP prefix to a county identifier string.
 *  If that identifier exists in COUNTY_DATA, enhanced scoring is applied. */
export const ZIP_TO_COUNTY: Record<string, string> = {
  // Michigan (480–499)
  '480': 'Wayne County, MI',
  '481': 'Wayne County, MI',
  '482': 'Wayne County, MI',
  '483': 'Wayne County, MI',
  '484': 'Calhoun County, MI',
  '485': 'Jackson County, MI',
  '486': 'Saginaw County, MI',
  '487': 'Genesee County, MI',
  '488': 'Ingham County, MI',
  '489': 'Ingham County, MI',
  '490': 'Kalamazoo County, MI',
  '491': 'Kent County, MI',
  '492': 'Kent County, MI',
  '493': 'Kent County, MI',
  '494': 'Muskegon County, MI',
  '495': 'Grand Traverse County, MI',
  '496': 'Marquette County, MI',
  '497': 'Dickinson County, MI',
  '498': 'Delta County, MI',
  '499': 'Chippewa County, MI',

  // Virginia (200–246)
  '200': 'Arlington County, VA',
  '201': 'Fairfax County, VA',
  '202': 'Arlington County, VA',
  '203': 'Loudoun County, VA',
  '204': 'Loudoun County, VA',
  '205': 'Loudoun County, VA',
  '206': 'Prince William County, VA',
  '207': 'Prince William County, VA',
  '208': 'Fairfax County, VA',
  '209': 'Fairfax County, VA',
  '210': 'Arlington County, VA',
  '220': 'Prince William County, VA',
  '221': 'Prince William County, VA',
  '222': 'Arlington County, VA',
  '223': 'Fairfax County, VA',
  '224': 'Stafford County, VA',
  '225': 'Stafford County, VA',
  '226': 'Frederick County, VA',
  '227': 'Culpeper County, VA',
  '228': 'Rockingham County, VA',
  '229': 'Albemarle County, VA',
  '230': 'Henrico County, VA',
  '231': 'Henrico County, VA',
  '232': 'Henrico County, VA',
  '233': 'Chesterfield County, VA',
  '234': 'Roanoke County, VA',
  '235': 'Virginia Beach, VA',
  '236': 'Norfolk, VA',
  '237': 'Chesapeake, VA',
  '238': 'Virginia Beach, VA',
  '239': 'Hampton, VA',
  '240': 'Roanoke County, VA',
  '241': 'Roanoke County, VA',
  '242': 'Washington County, VA',
  '243': 'Tazewell County, VA',
  '244': 'Augusta County, VA',
  '245': 'Campbell County, VA',
  '246': 'Pittsylvania County, VA',
};

export interface CountyProfile {
  state: string;
  county: string;
  utilityProvider: string;
  utilityType: 'municipal' | 'iou' | 'coop';
  gridRegion: string;
  waterSystemNotes: string;
  waterStressLevel: 'low' | 'moderate' | 'high';
  taxIncentiveTier: 1 | 2 | 3;
  knownDataCenterActivity: boolean;
  activeIncentivePrograms: string[];
  llcTrackerEntries: string[];
  notes: string;
}

export const COUNTY_DATA: Record<string, CountyProfile> = {
  // -------------------------------------------------------------------------
  // Michigan
  // -------------------------------------------------------------------------
  'Kent County, MI': {
    state: 'MI',
    county: 'Kent County',
    utilityProvider: 'Consumers Energy / LBWL',
    utilityType: 'iou',
    gridRegion: 'MISO',
    waterSystemNotes: 'Grand River watershed, moderate system size, municipal supply',
    waterStressLevel: 'low',
    taxIncentiveTier: 2,
    knownDataCenterActivity: true,
    activeIncentivePrograms: [
      'Michigan Public Act 23 of 2015 data center sales tax exemption',
      'MEDC business development grants',
    ],
    llcTrackerEntries: ['Franklin Lowell LLC', 'Franklin Partners'],
    notes:
      'Microsoft data center project via Franklin Partners intermediary; NDAs signed with Lowell Township and 3 other townships; community opposition forced Microsoft to reveal identity January 2026',
  },

  'Ottawa County, MI': {
    state: 'MI',
    county: 'Ottawa County',
    utilityProvider: 'Consumers Energy',
    utilityType: 'iou',
    gridRegion: 'MISO',
    waterSystemNotes: 'Lake Michigan watershed, adequate supply',
    waterStressLevel: 'low',
    taxIncentiveTier: 2,
    knownDataCenterActivity: true,
    activeIncentivePrograms: [
      'Michigan Public Act 23 of 2015',
      'MEDC incentives',
    ],
    llcTrackerEntries: ['Franklin Partners'],
    notes:
      'Franklin Partners active in multiple Ottawa County townships on behalf of Microsoft',
  },

  'Wayne County, MI': {
    state: 'MI',
    county: 'Wayne County',
    utilityProvider: 'DTE Energy',
    utilityType: 'iou',
    gridRegion: 'MISO',
    waterSystemNotes: 'Detroit Water and Sewerage Department, large system, Great Lakes supply',
    waterStressLevel: 'low',
    taxIncentiveTier: 2,
    knownDataCenterActivity: false,
    activeIncentivePrograms: ['Michigan Public Act 23 of 2015'],
    llcTrackerEntries: [],
    notes:
      'No confirmed hyperscaler data center activity; urban density makes large campus development less likely',
  },

  // -------------------------------------------------------------------------
  // Virginia
  // -------------------------------------------------------------------------
  'Loudoun County, VA': {
    state: 'VA',
    county: 'Loudoun County',
    utilityProvider: 'Dominion Energy Virginia',
    utilityType: 'iou',
    gridRegion: 'PJM',
    waterSystemNotes:
      'Loudoun Water authority, large system, Potomac River supply, under strain from massive data center load growth',
    waterStressLevel: 'moderate',
    taxIncentiveTier: 1,
    knownDataCenterActivity: true,
    activeIncentivePrograms: [
      'Virginia data center sales tax exemption VA Code 58.1-609.3',
      'Local machinery and tools tax exemption',
      'Loudoun County data center overlay district',
    ],
    llcTrackerEntries: ['Vadata Inc.', 'Amazon Data Services Inc.', 'Franklin Partners'],
    notes:
      'Data Center Alley — highest density data center market in the world. Over 100 data centers operating. Dominion Energy has flagged grid capacity concerns in published IRP. County assessed $1.9B/year in foregone tax revenue per Good Jobs First.',
  },

  'Prince William County, VA': {
    state: 'VA',
    county: 'Prince William County',
    utilityProvider: 'Dominion Energy Virginia',
    utilityType: 'iou',
    gridRegion: 'PJM',
    waterSystemNotes:
      'Prince William County Service Authority, large system, Occoquan Reservoir supply',
    waterStressLevel: 'moderate',
    taxIncentiveTier: 1,
    knownDataCenterActivity: true,
    activeIncentivePrograms: [
      'Virginia data center sales tax exemption',
      'Prince William Digital Gateway rezoning district',
    ],
    llcTrackerEntries: ['Vadata Inc.'],
    notes:
      'Digital Gateway rezoning approved 2023 after major community opposition and temporary moratorium. 2,100 acres rezoned for data center development. Ongoing litigation from community groups.',
  },

  'Henrico County, VA': {
    state: 'VA',
    county: 'Henrico County',
    utilityProvider: 'Dominion Energy Virginia',
    utilityType: 'iou',
    gridRegion: 'PJM',
    waterSystemNotes: 'Henrico County water authority, large system',
    waterStressLevel: 'low',
    taxIncentiveTier: 1,
    knownDataCenterActivity: true,
    activeIncentivePrograms: [
      'Virginia data center sales tax exemption',
      'Henrico County cut data center tax rate by 88%',
    ],
    llcTrackerEntries: ['Scout Development LLC'],
    notes:
      "Meta's Scout Development LLC operating Project Echo data center. County reduced data center machinery and tools tax rate by 88% to attract development.",
  },

  'Fairfax County, VA': {
    state: 'VA',
    county: 'Fairfax County',
    utilityProvider: 'Dominion Energy Virginia',
    utilityType: 'iou',
    gridRegion: 'PJM',
    waterSystemNotes:
      'Fairfax Water authority, very large system, Potomac and Occoquan supply',
    waterStressLevel: 'low',
    taxIncentiveTier: 1,
    knownDataCenterActivity: true,
    activeIncentivePrograms: [
      'Virginia data center sales tax exemption',
      'Fairfax County local tax incentives',
    ],
    llcTrackerEntries: ['Vadata Inc.', 'Amazon Data Services Inc.'],
    notes:
      'Major Amazon/AWS presence in Reston and Herndon corridors. Some of the highest-value data center real estate in the US.',
  },

  'Arlington County, VA': {
    state: 'VA',
    county: 'Arlington County',
    utilityProvider: 'Dominion Energy Virginia',
    utilityType: 'iou',
    gridRegion: 'PJM',
    waterSystemNotes: 'Arlington County water service, large system, Potomac River supply',
    waterStressLevel: 'low',
    taxIncentiveTier: 1,
    knownDataCenterActivity: false,
    activeIncentivePrograms: ['Virginia data center sales tax exemption'],
    llcTrackerEntries: [],
    notes:
      'Dense urban county adjacent to Washington DC. High land costs and limited industrial land reduce large-campus data center viability, though smaller colocation facilities exist.',
  },
};
