export interface ResourceLink {
  org: string;
  title: string;
  description: string;
  url: string;
  year?: number;
}

export interface OrgLink {
  name: string;
  description: string;
  url: string;
}

export interface CountyStub {
  name: string;
  slug: string;
  hasPage: boolean;
}

export interface StateHubData {
  code: string;
  name: string;
  slug: string;
  description: string;
  reports: ResourceLink[];
  organizingGroups: OrgLink[];
  counties: CountyStub[];
}

export const STATE_HUB_DATA: Record<string, StateHubData> = {
  MI: {
    code: 'MI',
    name: 'Michigan',
    slug: 'MI',
    description:
      'Michigan is an emerging data center market with growing investments in the western part of the state. State law provides significant sales tax exemptions with limited disclosure requirements.',
    reports: [
      {
        org: 'Graham Sustainability Institute, University of Michigan',
        title: 'What Michigan Local Governments Should Know About Data Centers',
        description:
          'A practical briefing for local officials on fiscal, environmental, and infrastructure implications of data center development.',
        url: 'https://graham.umich.edu/media/files/DC-Factsheet-LocalGov.pdf',
        year: 2024,
      },
      {
        org: 'Joyce Foundation',
        title: 'Economic, Fiscal, and Energy-related Impacts of Data Centers in the Great Lakes Region',
        description:
          'Regional analysis of data center growth trends and their fiscal and energy impacts across Great Lakes states.',
        url: 'https://www.joycefdn.org/grants/data-centers-great-lakes',
        year: 2024,
      },
    ],
    organizingGroups: [
      {
        name: 'Michigan League of Conservation Voters',
        description: 'Statewide environmental advocacy organization tracking data center and energy policy.',
        url: 'https://www.michiganlcv.org',
      },
      {
        name: 'Sierra Club Michigan Chapter',
        description: 'Environmental advocacy with active work on energy and land use issues related to data centers.',
        url: 'https://www.sierraclub.org/michigan',
      },
      {
        name: 'Michigan Climate Action Network',
        description: 'Coalition of organizations working on climate and clean energy policy in Michigan.',
        url: 'https://www.michiganclimatenetwork.org',
      },
    ],
    counties: [],
  },
  VA: {
    code: 'VA',
    name: 'Virginia',
    slug: 'VA',
    description:
      'Virginia hosts the largest concentration of data centers in the world, centered in Northern Virginia. State and local policy, grid impacts, and community organizing are all highly active.',
    reports: [
      {
        org: 'Piedmont Environmental Council',
        title: 'Existing and Proposed Data Center Map (Virginia)',
        description: 'Interactive map of existing and proposed data center developments across Virginia.',
        url: 'https://www.pecva.org/data-centers',
        year: 2024,
      },
      {
        org: 'Piedmont Environmental Council',
        title: 'Factsheet: Data Centers — Industry Impacts in Virginia',
        description:
          `Overview of the fiscal, environmental, and grid impacts of Virginia's data center industry.`,
        url: 'https://www.pecva.org/resources/data-center-factsheet',
        year: 2024,
      },
      {
        org: 'Piedmont Environmental Council',
        title: 'Transmission Proposals Related to Data Center Growth',
        description:
          'Analysis of transmission infrastructure proposals driven by data center electricity demand in Virginia.',
        url: 'https://www.pecva.org/resources/transmission-proposals',
        year: 2024,
      },
      {
        org: 'Joint Legislative Audit and Review Commission (JLARC)',
        title: 'Data Centers in Virginia',
        description:
          'Comprehensive state audit of data center tax incentives, fiscal impacts, and policy options.',
        url: 'https://jlarc.virginia.gov/landing-2024-data-centers.shtml',
        year: 2024,
      },
    ],
    organizingGroups: [
      {
        name: 'Piedmont Environmental Council',
        description:
          'Leading land use and environmental advocacy organization in Virginia, with deep expertise on data center impacts.',
        url: 'https://www.pecva.org',
      },
      {
        name: 'Virginia Organizing',
        description: 'Statewide grassroots organizing network focused on equity and accountability.',
        url: 'https://virginia-organizing.org',
      },
      {
        name: 'Clean Virginia',
        description:
          'Advocacy organization focused on utility regulation, energy policy, and corporate accountability in Virginia.',
        url: 'https://www.cleanvirginia.org',
      },
    ],
    counties: [],
  },
};

export interface GeneralResource {
  org: string;
  title: string;
  description: string;
  url: string;
}

export const GENERAL_RESOURCES: GeneralResource[] = [
  {
    org: 'EPA ECHO',
    title: 'Facility Search',
    description:
      'Search for data centers and industrial facilities in your community to assess environmental compliance.',
    url: 'https://echo.epa.gov',
  },
  {
    org: 'Good Jobs First',
    title: 'Subsidy Tracker',
    description: 'Search tax incentives and subsidies awarded to data centers by state and company.',
    url: 'https://subsidytracker.goodjobsfirst.org',
  },
  {
    org: 'Good Jobs First',
    title: 'What to Ask When a Data Center Comes to Town',
    description: 'A practical guide to questions communities should ask before approving a project.',
    url: 'https://goodjobsfirst.org/wp-content/uploads/2024/03/What-to-Ask-When-a-Data-Center-Comes-to-Town.pdf',
  },
  {
    org: 'Good Jobs First',
    title: 'Cloudy with a Loss of Spending Control',
    description: 'Report on how data center tax exemptions are straining state budgets.',
    url: 'https://goodjobsfirst.org/cloudy-with-a-loss-of-spending-control/',
  },
  {
    org: 'World Resources Institute',
    title: 'Aqueduct Water Risk Atlas',
    description: 'Assess local water stress and risk for any location globally.',
    url: 'https://www.wri.org/applications/aqueduct/water-risk-atlas',
  },
];
