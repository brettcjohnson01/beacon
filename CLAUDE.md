# CLAUDE.md
## Project: BEACON

BEACON is a public-interest platform that helps communities 
understand, evaluate, negotiate, or oppose proposed data center 
developments. It reduces information asymmetry so communities 
can understand promised benefits, likely externalities, and their 
leverage points before approvals, rezonings, utility decisions, 
or community-benefit negotiations occur.

## Monorepo structure
- `frontend/` — Next.js web application (not yet built)
- `backend/cba_tool/` — FastAPI backend for the CBA AI tool
- `backend/susceptibility_calc/` — Community Susceptibility Calculator
- `backend/llc_tracker/` — LLC Tracker
- `backend/footprint_calc/` — Footprint Calculator
- `backend/shared/` — shared utilities, schemas, auth across tools
- `docs/tool-specs/` — detailed spec for each tool
- `docs/` — internal documentation

## Active tool priority
Current sprint: CBA Tool backend MVP
Next: Susceptibility Calculator
Paused: LLC Tracker, Footprint Calculator, Community Connector

When starting work, default to the active priority unless 
explicitly directed otherwise. When switching tools, read 
the relevant spec in docs/tool-specs/ before proceeding.

## Tech stack
- Frontend: Next.js (not yet built)
- Backend: Python / FastAPI
- Database: PostgreSQL (to be configured)
- Hosting: Vercel (frontend) + Railway or Render (backend)

## Tool specs
Detailed specs for each tool live in docs/tool-specs/.
Read the relevant spec before working on any tool.
- docs/tool-specs/cba-tool.md
- docs/tool-specs/susceptibility-calc.md
- docs/tool-specs/llc-tracker.md
- docs/tool-specs/footprint-calc.md
- docs/tool-specs/community-connector.md

## What BEACON is
BEACON exists to reduce the information gap communities face 
when a data center is proposed in their area.

Communities are often asked to evaluate projects with:
- limited time
- fragmented information
- unclear public benefits
- uncertain environmental and infrastructure impacts
- little leverage in negotiations
- difficulty distinguishing between promises, obligations, 
  and real outcomes

BEACON should help users understand both:
- potential benefits such as tax revenue, jobs, or negotiated 
  community commitments
- potential costs or externalities such as energy demand, water 
  use, air pollution, land-use impacts, transmission constraints, 
  tax incentives, and environmental justice concerns

## The five tools
### 1. CBA AI Tool (CBAI) — current priority
Help communities understand, review, compare, and question 
Community Benefits Agreements related to data center projects.
See: docs/tool-specs/cba-tool.md

### 2. Community Susceptibility Calculator
Help communities understand their vulnerability to data center 
development across energy, land, fiscal, resource, and 
community-power dimensions.
See: docs/tool-specs/susceptibility-calc.md

### 3. LLC Tracker
Help communities identify who is actually behind a proposed 
data center by tracking shell LLCs back to parent hyperscalers.
See: docs/tool-specs/llc-tracker.md

### 4. Footprint Calculator
Help communities estimate the likely energy, water, emissions, 
and grid impacts of a proposed facility based on specifications.
See: docs/tool-specs/footprint-calc.md

### 5. Community Connector
Help communities find and connect with other communities facing 
similar data center proposals or impacts.
See: docs/tool-specs/community-connector.md

## Primary users
BEACON is intended for:
- community groups and residents
- local advocates and organizers
- journalists
- researchers and students
- local officials and planning stakeholders

Because of that, all tools should support outputs that are:
- understandable to non-experts
- transparent about uncertainty
- structured and reviewable
- evidence-aware
- honest about what is known vs. unknown

## Core product principles
When making technical decisions, prefer systems that support 
these principles:

- Transparency: clearly separate facts, estimates, assumptions, 
  and unknowns
- Traceability: preserve the ability to point back to source 
  text where possible
- Public-interest framing: do not default to corporate or 
  promotional language
- Maintainability: simple architecture is better than clever 
  architecture
- Incrementalism: build the MVP in layers
- Extensibility: future BEACON tools should be able to reuse 
  components
- Trustworthiness: do not overstate confidence or fabricate 
  certainty

## Domain context
Data center development often involves tradeoffs that are not 
obvious to the public. Relevant issue areas include:
- tax revenue and fiscal effects
- tax incentives and subsidy disclosure
- permanent job creation versus investment scale
- electricity demand and grid impacts
- water use and cooling technologies
- diesel backup generators and air quality concerns
- land use and zoning impacts
- environmental justice and cumulative burdens
- differences between company promises, legal obligations, 
  and actual observed outcomes

When generating product logic or outputs, preserve distinctions 
between:
- public claims
- contractual commitments
- regulatory requirements
- actual measured outcomes
- inferred risks or open questions

Do not collapse these into one category.

## Architecture preferences
Prefer a clean, conventional structure for each backend tool:
- `app/api` for routes
- `app/schemas` for request/response and domain schemas
- `app/services` for business logic
- `app/core` for settings and shared utilities
- `app/db` for persistence concerns
- `app/ingestion` for document/source processing
- `app/retrieval` for search or retrieval logic
- `tests/` for tests

Keep boundaries clear:
- routes should stay thin
- services should hold business logic
- parsing and ingestion should be modular
- retrieval should be inspectable
- persistence concerns should be separate from API concerns

## Coding preferences
- Use Python typing where practical
- Prefer explicit code over magic
- Write small, composable functions
- Keep route handlers thin
- Use descriptive names
- Avoid giant files
- Avoid tangled imports
- Avoid premature abstraction
- Prefer deterministic, auditable behavior
- Make outputs easy for a frontend to consume

## API design preferences
Design APIs with the BEACON frontend in mind.

Prefer:
- predictable request/response shapes
- structured outputs over giant blobs of text
- response fields that allow the frontend to display:
  - extracted clauses or findings
  - issue categories
  - red flags
  - missing provisions or gaps
  - suggested follow-up questions
  - source references
  - confidence or uncertainty markers

## Current codebase status
The monorepo contains:
- `backend/cba_tool/` — migrated prototype, treat as early 
  draft, keep/refactor/discard assessment needed
- All other backend folders — empty scaffolding, to be built
- `frontend/` — empty, Next.js to be initialized when ready

When starting work on any tool:
1. inspect what already exists in that folder
2. identify what is worth preserving
3. identify what should be refactored or discarded
4. propose a clean MVP architecture before major edits
5. do not treat prototype code as sacred

## Expected working style
When asked to work on the repository:
1. first understand the current codebase in the relevant folder
2. explain what exists today
3. identify what should be kept, refactored, or discarded
4. propose a plan before major edits unless explicitly asked 
   to proceed
5. make changes in small, reviewable steps
6. explain important tradeoffs when relevant
7. prioritize maintainability over speed hacks

## When requirements are unclear
- choose the narrowest credible MVP interpretation
- state assumptions clearly
- build in a way that allows future expansion without 
  overbuilding now

## What not to do
- Do not invent capabilities the product does not yet have
- Do not fabricate sources, citations, legal conclusions, 
  or findings
- Do not silently hardcode assumptions that should be visible
- Do not optimize for enterprise-scale infrastructure at 
  this stage
- Do not introduce complexity purely for hypothetical future 
  needs
- Do not treat prototype code as sacred
- Do not present advocacy claims as settled fact without 
  signaling source type
- Do not collapse promised benefits, legal obligations, and 
  measured outcomes into one category
- Do not build more than one tool at a time unless explicitly 
  instructed