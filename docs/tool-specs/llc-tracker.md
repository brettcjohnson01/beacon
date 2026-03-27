# Tool Spec: LLC Tracker

## Purpose
Help communities identify who is actually behind a proposed 
data center by tracking shell LLCs back to their parent 
hyperscaler companies.

## Current priority
Phase 2 — data collection ongoing, build after CBA tool MVP 
is deployed.

## What this tool does
The LLC Tracker accepts a company name, LLC name, or location 
and returns known connections between shell entities and their 
parent hyperscalers, along with project details and why this 
matters for the community.

## Primary users
- community groups who received a permit application from 
  an unknown LLC
- journalists investigating who is behind a local project
- local officials evaluating a rezoning or incentive request
- advocates researching a developer's track record

## Data schema
Each LLC record should contain:

### Entity fields
- llc_name — the legal name of the shell entity
- parent_company — the confirmed or suspected hyperscaler
- confidence — confirmed / probable / suspected
- jurisdiction — state where LLC is registered
- registered_date — date of LLC registration if known

### Project fields
- project_name — local name or codename if known
- location_city — city
- location_state — state
- location_county — county
- project_status — proposed / permitted / under construction / 
  operating
- facility_size_mw — capacity in megawatts if known
- site_acres — land area if known

### Incentive fields
- tax_incentives_known — yes / no / unknown
- incentive_description — free text description if known
- incentive_amount — dollar value if disclosed
- nda_involved — yes / no / unknown

### Source fields
- source_type — permit / business registry / news / court 
  filing / FOIA / other
- source_url — link to original document
- source_date — date of source
- notes — anything else relevant

## Data collection priority
Collect in this order:

1. Google — most documented LLC patterns publicly
2. Meta — extensive use of single-purpose LLCs
3. Microsoft — growing footprint, less documented
4. Amazon/AWS — complex subsidiary structure
5. Others — Apple, Oracle, QTS, Equinix

## Known data sources
- State business registries (most states are free and searchable)
- County permit and rezoning applications
- Good Jobs First subsidy tracker
- Data Center Watch project list
- Investigative reporting (Washington Post, Bloomberg, local outlets)
- FOIA requests to planning departments

## MVP scope
- Searchable database of LLC to parent company mappings
- Filter by state, parent company, project status
- Project detail page showing all known fields
- Clear confidence labeling on every record
- Links to original sources

## Not in MVP scope
- Automated scraping of state registries
- Real-time monitoring of new LLC filings
- User submissions of new LLC records
- API integration with Perplexity or other search tools

## How to start collecting data
Use Claude's Deep Research feature in claude.ai to research 
each hyperscaler's known LLC patterns. Ask it to find:
- known LLC names used for land acquisition
- known project codenames
- confirmed parent company links with sources

Store findings in a spreadsheet matching the data schema 
above before any database is built.

## Architecture location
- Backend: backend/llc_tracker/
- Follows standard BEACON backend structure per CLAUDE.md
- Database: PostgreSQL table per the schema above

## Success criteria for MVP
- A community member can search by city or company and find 
  relevant LLC records
- Every record shows its source and confidence level
- The tool clearly distinguishes confirmed from suspected links
- A non-expert can understand why each record matters