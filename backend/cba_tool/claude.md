# CLAUDE.md

## Project: BEACON CBA Backend

This repository is part of **BEACON**, a public-interest platform that helps communities understand, evaluate, negotiate, or oppose proposed data center developments.

This specific repository is for the backend of the **Community Benefits Agreement AI (CBAI)** tool and related future BEACON intelligence features.

## What BEACON is

BEACON exists to reduce the information gap communities face when a data center is proposed in their area.

Communities are often asked to evaluate projects with:
- limited time
- fragmented information
- unclear public benefits
- uncertain environmental and infrastructure impacts
- little leverage in negotiations
- difficulty distinguishing between promises, obligations, and real outcomes

BEACON should help users understand both:
- potential **benefits** such as tax revenue, jobs, or negotiated community commitments
- potential **costs or externalities** such as energy demand, water use, air pollution, land-use impacts, transmission constraints, tax incentives, and environmental justice concerns

The broader platform may eventually include:
- factsheets and explainers
- project or locality profiles
- document analysis tools
- case libraries of comparable communities
- research checklists
- benefits vs. externalities trackers
- maps and public-data integrations

This repository does **not** need to implement all of that now.

## Purpose of this repository

This repo should become the backend foundation for the **CBAI tool**, which will help communities:
- understand draft or proposed community benefits agreements
- identify vague, weak, or unenforceable language
- compare draft provisions against stronger alternatives
- surface likely missing provisions
- generate follow-up questions for developers or public officials
- support transparent, structured, reviewable outputs

## Current status of this repository

Treat this repository as an **early prototype**.

It contains useful signals about the intended direction, but it should **not** be treated as a mature codebase whose architecture must be preserved.

Assume:
- some existing code may be worth keeping
- some existing code may only be useful as reference
- some existing structure may need to be discarded or rewritten

When working in this repo, use the current implementation primarily as a **reference for intent**, not as a structure that must be preserved.

## How to treat the existing codebase

When starting work in this repo:

1. inspect what already exists
2. identify what is worth preserving
3. identify what should be refactored
4. identify what should be discarded
5. propose a cleaner MVP backend architecture before major edits

Do **not** assume the current structure is correct just because it exists.

Likely examples of things worth preserving or learning from:
- the use of Python + FastAPI
- the general idea of document ingestion and retrieval
- rough metadata and source-handling concepts
- any useful scripts or parsing logic

Likely examples of things that may need redesign:
- thin prototype routes that bypass good architecture
- direct model-calling patterns without proper service boundaries
- fragile retrieval logic
- unclear schema boundaries
- missing test structure
- missing separation between parsing, retrieval, analysis, and API layers

## Primary users of the broader platform

BEACON is intended for:
- community groups and residents
- local advocates and organizers
- journalists
- researchers and students
- local officials and planning stakeholders

Because of that, the backend should support outputs that are:
- understandable
- transparent
- structured
- evidence-aware
- honest about uncertainty

## Core product principles

When making technical decisions, prefer systems that support these principles:

- **Transparency:** clearly separate facts, estimates, assumptions, and unknowns
- **Traceability:** preserve the ability to point back to source text where possible
- **Public-interest framing:** do not default to corporate or promotional language
- **Maintainability:** simple architecture is better than clever architecture
- **Incrementalism:** build the MVP in layers
- **Extensibility:** future BEACON tools should be able to reuse components
- **Trustworthiness:** do not overstate confidence or fabricate certainty

## Domain context to keep in mind

Data center development often involves tradeoffs that are not obvious to the public. Relevant issue areas include:
- tax revenue and fiscal effects
- tax incentives and subsidy disclosure
- permanent job creation versus investment scale
- electricity demand and grid impacts
- water use and cooling technologies
- diesel backup generators and air quality concerns
- land use and zoning impacts
- environmental justice and cumulative burdens
- differences between company promises, legal obligations, and actual observed outcomes

When generating product logic or outputs, preserve distinctions between:
- public claims
- contractual commitments
- regulatory requirements
- actual measured outcomes
- inferred risks or open questions

Do not collapse these into one category.

## Immediate priority

The immediate priority is **not** to solve the entire BEACON vision.

The immediate priority is to create a **clean, maintainable MVP backend foundation** for the CBAI workflow.

That likely means supporting a narrow end-to-end flow such as:
1. accept a CBA-related document or text
2. parse and structure the content
3. identify major provision categories
4. flag weak, vague, or missing language
5. generate a structured response the frontend can display clearly

## What this backend should eventually support

Over time, this backend may support one or more of the following BEACON capabilities:

### 1. CBAI Assistant
Help users understand, review, compare, and question Community Benefits Agreements related to data center projects.

### 2. Project Impact Snapshot
Structure known facts and unknowns about a project or locality across categories such as jobs, tax revenue, tax incentives, electricity demand, water use, air quality, zoning, and environmental justice.

### 3. Community Research Checklist Builder
Help users identify which records, permits, agencies, and questions matter for a given project.

### 4. Comparable Communities / Case Library
Help users find similar cases or communities and learn from prior experiences.

### 5. Benefits and Externalities Tracker
Compare promised benefits against enforceable commitments, public costs, and observed burdens.

Again: this repository does **not** need to implement all of these now. The first priority is the **CBAI backend**.

## Scope for this repository

Assume this repo should focus on backend responsibilities such as:
- API endpoints
- schemas and validation
- document ingestion
- parsing pipelines
- retrieval logic
- analysis orchestration
- source attribution structures
- persistence abstractions
- testing basics
- configuration and local development ergonomics

Do **not** assume this repo is responsible for the entire frontend or all BEACON product logic.

## Architecture preferences

Prefer a clean, conventional structure such as:

- `app/api` for routes
- `app/schemas` or `app/models` for request/response and domain schemas
- `app/services` for business logic
- `app/core` for settings and shared utilities
- `app/repositories` or `app/db` for persistence concerns
- `app/ingestion` or `app/parsers` for document/source processing
- `app/retrieval` for search or retrieval logic
- `tests/` for tests
- `docs/` for internal project documentation

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
  - extracted clauses
  - issue categories
  - red flags
  - missing provisions
  - suggested follow-up questions
  - source references
  - confidence or uncertainty markers

## Retrieval and document-analysis guidance

For document-based analysis:
- preserve source traceability where possible
- keep extracted text separate from interpreted analysis
- surface uncertainty
- avoid hallucinated legal interpretations
- distinguish clearly between:
  - what the document explicitly says
  - what the system inferred
  - what remains unknown

Design outputs so users can inspect why a conclusion was reached.

## MVP guidance

The MVP should likely focus on one narrow but useful workflow:
- upload or provide CBA-related text or documents
- parse and extract relevant content
- identify major issue categories
- flag vague or weak language
- suggest stronger provisions or follow-up questions
- return a structured, reviewable result

Do **not** try to build every future BEACON capability in version one.

## What to optimize for first

When proposing plans or making changes, prioritize:

1. a clean backend structure
2. one end-to-end CBA review workflow
3. inspectable and trustworthy outputs
4. easy future extension
5. simplicity over overengineering

## What not to do

- Do not invent capabilities the product does not yet have
- Do not fabricate sources, citations, legal conclusions, or findings
- Do not silently hardcode assumptions that should be visible
- Do not optimize for enterprise-scale infrastructure at this stage
- Do not introduce complexity purely for hypothetical future needs
- Do not treat prototype code as sacred
- Do not present advocacy claims as settled fact without signaling source type
- Do not collapse promised benefits, legal obligations, and measured outcomes into one category

## Expected working style in this repo

When asked to work on the repository:

1. first understand the current codebase
2. explain what exists today
3. identify what should be kept, refactored, or discarded
4. propose a plan before major edits unless explicitly asked to proceed
5. make changes in small, reviewable steps
6. explain important tradeoffs when relevant
7. prioritize maintainability over speed hacks

## When requirements are unclear

If requirements are unclear:
- choose the narrowest credible MVP interpretation
- state assumptions clearly
- build in a way that allows future expansion without overbuilding now

## First priority if starting fresh

If asked where to begin, start by:
- reviewing the current repo structure
- identifying missing backend layers
- proposing a clean MVP architecture for the CBAI workflow
- scaffolding only what is needed for that MVP

## Default instruction for initial repo work

Unless told otherwise, start with a **keep / refactor / discard** assessment of the existing prototype before making major architectural changes.

