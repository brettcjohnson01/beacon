# Tool Spec: CBA AI Tool (CBAI)

## Purpose
Help communities understand, review, and strengthen Community 
Benefits Agreements (CBAs) related to data center projects.

## Current priority
This is the active MVP tool. Build this first.

## What this tool does
The CBAI tool accepts a CBA document or draft text and returns 
a structured analysis that helps communities:
- understand what the agreement actually commits to
- identify vague, weak, or unenforceable language
- surface provisions that are missing or underspecified
- compare language against stronger known alternatives
- generate follow-up questions for developers or officials

## Primary users
- community groups preparing for CBA negotiations
- local advocates reviewing a draft agreement
- journalists evaluating what was actually promised
- local officials assessing enforceability

## End-to-end MVP workflow
1. User uploads or pastes CBA text
2. System parses and extracts provisions by category
3. System flags weak, vague, or missing language
4. System suggests stronger alternatives or follow-up questions
5. System returns structured, reviewable output
6. Frontend displays results clearly with source references

## Input types
- Pasted text
- Uploaded PDF (future)
- URL to public document (future)

## Output structure
The API response should include:
- `provisions[]` — extracted clauses with category labels
- `flags[]` — weak, vague, or missing items with explanation
- `suggestions[]` — stronger alternatives or additions
- `questions[]` — follow-up questions for officials/developers
- `summary` — plain-language overview of the agreement
- `uncertainty_notes` — what the system could not determine
- `source_references[]` — text spans the analysis is based on

## Provision categories to recognize
- Jobs and workforce commitments
- Tax revenue and fiscal contributions
- Tax incentives and subsidy disclosures
- Environmental commitments (energy, water, emissions)
- Air quality and backup generation
- Land use and zoning conditions
- Community investment funds
- Enforcement mechanisms and penalties
- Reporting and transparency requirements
- Dispute resolution processes
- Duration and renewal terms

## Flags to surface
- Vague language (e.g. "best efforts", "as feasible")
- Unenforceable commitments (no mechanism, no penalty)
- Missing standard provisions
- Asymmetric obligations (community bears risk, company does not)
- Undefined terms
- No reporting or accountability requirements
- Sunset clauses that limit long-term benefit

## What to distinguish
Always preserve the distinction between:
- what the document explicitly states
- what the system inferred from context
- what is missing or unknown
- what would require legal review to interpret

Do not present inferences as facts.
Do not fabricate legal conclusions.

## Data sources for comparison
The backend should eventually support comparison against:
- a curated library of public CBA examples
- known best-practice provisions from comparable projects
- flagged weak-language patterns from prior agreements

For MVP, a small curated set of examples is sufficient.
Do not over-engineer the retrieval layer at this stage.

## MVP scope
- Accept pasted text input
- Parse and categorize provisions
- Flag weak or missing language
- Return structured JSON the frontend can display
- Basic source traceability (which text drove which finding)

## Not in MVP scope
- PDF upload processing
- Full vector search across large document libraries
- User accounts or saved analyses
- Comparison across multiple documents simultaneously
- Legal advice or definitive legal interpretation

## Architecture location
- Backend: `backend/cba_tool/`
- Follows standard BEACON backend structure per CLAUDE.md

## Current backend status
Migrated prototype exists in `backend/cba_tool/`.
Run a keep/refactor/discard assessment before building.
Treat existing code as reference for intent, not as 
finished architecture.

## Success criteria for MVP
- A user can paste CBA text and receive a structured analysis
- Output clearly distinguishes findings from inferences
- Red flags are explained, not just labeled
- A non-expert can read and act on the output
- The frontend can consume the response without custom parsing