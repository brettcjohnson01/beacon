export const FORUM_TOPICS = [
  {
    id: 'tax',
    title: 'Tax Incentives & Subsidies',
    description: 'Strategies for negotiating or challenging tax incentive packages',
    channels: [],
  },
  {
    id: 'water',
    title: 'Water & Cooling Systems',
    description: 'Water use impacts, cooling infrastructure, and environmental concerns',
    channels: [],
  },
  {
    id: 'zoning',
    title: 'Zoning & Ordinances',
    description: 'Land use regulations, rezoning battles, and local ordinances',
    channels: [{ id: 'pwc', name: 'Prince William County, VA' }],
  },
  {
    id: 'organizing',
    title: 'Organizing Tactics',
    description: 'Coalition building, public engagement, and advocacy strategies',
    channels: [{ id: 'nss', name: 'National Strategy & Story Sharing' }],
  },
];

export const CHANNELS = [
  { id: 'nss', name: 'National Strategy & Story Sharing', description: 'Share tactics, legal strategies, and campaign stories across communities' },
  { id: 'bowling', name: 'Bowling Green, OH – Meta DC', description: 'Discussing the proposed Meta data center in Bowling Green' },
  { id: 'memphis', name: 'West Memphis, AR – Google', description: 'Google facility discussion for West Memphis area' },
  { id: 'pwc', name: 'Prince William County, VA', description: 'Zoning and rezoning issues in Prince William County' },
];

export const MESSAGES: Record<string, Array<{ id: number; author: string; time: string; content: string }>> = {
  nss: [
    { id: 1, author: 'Sarah M. (Virginia)', time: '2 hours ago', content: 'We just got our county to pass a temporary moratorium on data center rezoning. Happy to share our talking points and organizing timeline.' },
    { id: 2, author: 'Mike D. (Ohio)', time: '4 hours ago', content: 'Has anyone successfully gotten a CBA attached to a tax incentive package? Our developer is pushing back hard.' },
  ],
  bowling: [
    { id: 3, author: 'Tom R. (Ohio)', time: '1 day ago', content: 'Meeting with county commissioners scheduled for next Tuesday. Anyone have experience with Meta negotiations?' },
  ],
  memphis: [],
  pwc: [
    { id: 4, author: 'Residents Coalition', time: '3 hours ago', content: 'The rezoning vote has been delayed to next month. This gives us more time to organize.' },
  ],
};

export const US_STATES = [
  'Alabama','Alaska','Arizona','Arkansas','California','Colorado','Connecticut',
  'Delaware','Florida','Georgia','Hawaii','Idaho','Illinois','Indiana','Iowa',
  'Kansas','Kentucky','Louisiana','Maine','Maryland','Massachusetts','Michigan',
  'Minnesota','Mississippi','Missouri','Montana','Nebraska','Nevada','New Hampshire',
  'New Jersey','New Mexico','New York','North Carolina','North Dakota','Ohio',
  'Oklahoma','Oregon','Pennsylvania','Rhode Island','South Carolina','South Dakota',
  'Tennessee','Texas','Utah','Vermont','Virginia','Washington','West Virginia',
  'Wisconsin','Wyoming',
];
