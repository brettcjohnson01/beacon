# CBA Tool Backend Audit

**Date:** 2026-03-26
**Scope:** `backend/cba_tool/`
**Spec reference:** `docs/tool-specs/cba-tool.md`

---

## 1. Current folder structure

```
backend/cba_tool/
├── README.md                         # Setup instructions, mostly accurate
├── claude.md                         # Duplicate/predecessor of CLAUDE.md — discard
├── requirements.txt                  # Pinned deps, mostly correct stack
├── app/
│   ├── main.py                       # 224-line monolith: config + models + routes + helpers
│   └── retrieval/
│       ├── schema.py                 # Chunk TypedDict — worth keeping
│       └── search.py                 # FAISS vector search — worth keeping
├── data/
│   └── metadata/
│       ├── documents.csv             # 13 CBA/adjacent documents — worth keeping
│       └── sources.csv               # Single placeholder source — worth keeping
└── scripts/
    ├── build_chunks.py               # Chunking pipeline — worth keeping
    ├── build_faiss_index.py          # FAISS index builder — keep, fix
    ├── extract_text.py               # PDF text extractor — worth keeping
    └── test_search.py                # 9-line manual smoke test — discard
```

Notable absences: no `app/api/`, no `app/schemas/`, no `app/services/`,
no `app/core/`, no `tests/` directory.

---

## 2. What exists and is worth keeping

### `data/metadata/documents.csv`
13 documents with rich metadata (agreement type, project type, location,
year, enforceability, parties). Spans 2000–2025. Useful as the seed
comparison corpus the spec mentions for future comparison features.
Keep as-is.

### `app/retrieval/schema.py`
Clean `Chunk` TypedDict with the right fields. Useful when the comparison
library feature is built. Keep.

### `app/retrieval/search.py`
FAISS semantic search over a pre-built index. Correctly uses
`text-embedding-3-small`. Will be needed when the comparison corpus
retrieval layer is built. Keep — but it is not wired into the MVP
workflow yet and should not be.

### `scripts/extract_text.py`
Simple PDF → text extraction via `pypdf`. Useful for future PDF upload
support. Keep.

### `scripts/build_chunks.py`
Reasonable fixed-size chunking (2000 chars) with metadata passthrough.
Will be needed when the corpus grows. Keep.

### `scripts/build_faiss_index.py`
Correctly embeds chunks and builds a FAISS IndexFlatL2. Keep — but fix
the duplicate import block at the top (lines 1–26 are copied twice).

### `requirements.txt`
The package selection (FastAPI, Pydantic, OpenAI SDK, uvicorn, dotenv,
FAISS) is appropriate. Keep as a starting point but pin to specific
versions per-package and remove `annotated-doc==0.0.4` (unused, obscure).

---

## 3. What needs refactoring

### `app/main.py` — structural collapse
Everything is in one file: environment config, Pydantic models, route
handlers, CSV loaders, and a lazy OpenAI client initializer. This is not
serviceable as the tool grows. The route handlers are also doing business
logic (building prompts, calling OpenAI, formatting responses) directly
— they should delegate to a services layer.

Specific problems:
- `DOCS_CSV_PATH` / `SOURCES_CSV_PATH` / `OPENAI_MODEL` /
  `MAX_QUESTION_CHARS` are bare module-level constants, not a settings
  object — no `.env` validation, no type safety
- `DocumentMetadata` and `SourceMetadata` are response models but are
  also doing parsing duty — conflated concerns
- The `/ask` prompt construction is hardcoded inside the route handler
- `_read_csv_as_dicts`, `load_documents`, `load_sources`, `_matches`,
  `_truthy_str` are utility functions that belong in a data access layer

### `app/retrieval/search.py`
Index and metadata paths are hardcoded strings. These should come from
settings. Minor issue, easy fix.

---

## 4. What should be discarded

### `app/main.py` — the `/ask` route
The core workflow is wrong for the spec. `/ask` accepts a free-text
question string, retrieves chunks from a pre-built FAISS index of
existing CBA documents, and returns an OpenAI-generated answer. This is
a RAG chatbot over a static document library.

The spec calls for something fundamentally different: a user submits
CBA text for analysis, and the system returns a structured breakdown of
that document — provisions, flags, suggestions, questions. The user is
not asking questions about other documents; they are submitting their
own document for review.

The route should be replaced entirely with a `/analyze` endpoint.

### `app/main.py` — `/search`, `/documents`, `/sources` routes
These serve the library browsing use case (search the corpus, browse
document metadata). They are not part of MVP scope per the spec. They
may be useful eventually, but they are distracting right now and should
not be in the MVP build. Remove from main.py; can be reintroduced later
as a separate router.

### `claude.md` (in `backend/cba_tool/`)
A 313-line predecessor to the monorepo CLAUDE.md. Now superseded.
Keeping it creates confusion about which file governs. Discard.

### `scripts/test_search.py`
9 lines. Not a test — it is a manual smoke script with no assertions.
Does not belong in `scripts/`. Discard; replace with a real test later.

---

## 5. What is missing for the MVP

The prototype has essentially none of the MVP workflow the spec defines.

### Core missing pieces

**`/analyze` endpoint**
The entry point for the entire tool does not exist. A user cannot
currently submit CBA text and receive structured analysis.

**Provision extraction**
No logic exists to parse CBA text into categorized provisions. The spec
defines 11 categories (jobs, tax revenue, tax incentives, environmental
commitments, air quality, land use, community investment, enforcement,
reporting, dispute resolution, duration). None are implemented.

**Flag detection**
No logic to identify vague language ("best efforts", "as feasible"),
unenforceable commitments, missing provisions, asymmetric obligations,
undefined terms, or sunset clauses. The spec lists 7 flag types.

**Structured response schema**
The spec defines a specific output shape: `provisions[]`, `flags[]`,
`suggestions[]`, `questions[]`, `summary`, `uncertainty_notes`,
`source_references[]`. None of these exist as Pydantic models.

**Services layer**
No `app/services/` directory. Business logic for the analysis workflow
(extract → flag → suggest → question → summarize) has nowhere to live
that isn't a route handler.

**Source traceability**
The spec requires `source_references[]` — which text spans drove which
finding. There is no mechanism to capture or return this.

**Input validation**
No validation of submitted CBA text: minimum length, max length, empty
input handling.

**Settings module**
No `app/core/settings.py`. Configuration is scattered bare constants.

**Tests**
No `tests/` directory. No unit tests, no integration tests.

---

## 6. Proposed clean architecture

```
backend/cba_tool/
├── app/
│   ├── main.py                    # App init, router registration, lifespan only
│   ├── api/
│   │   └── routes/
│   │       ├── analyze.py         # POST /analyze — thin handler, delegates to service
│   │       └── health.py          # GET /
│   ├── schemas/
│   │   ├── requests.py            # AnalyzeRequest
│   │   └── responses.py           # AnalyzeResponse, Provision, Flag, Suggestion,
│   │                              #   Question, SourceReference, UncertaintyNote
│   ├── services/
│   │   └── analyzer.py            # Orchestrates: extract → flag → suggest → question
│   │                              #   → summarize. Calls OpenAI. Returns domain objects.
│   ├── core/
│   │   └── settings.py            # Pydantic BaseSettings: OPENAI_API_KEY, model,
│   │                              #   max input length, etc.
│   └── retrieval/                 # Carry forward, not wired into MVP
│       ├── schema.py              # (keep as-is)
│       └── search.py              # (keep, update paths to use settings)
├── data/
│   └── metadata/
│       ├── documents.csv          # (keep as-is)
│       └── sources.csv            # (keep as-is)
├── scripts/
│   ├── build_chunks.py            # (keep as-is)
│   ├── build_faiss_index.py       # (keep, fix duplicate imports)
│   └── extract_text.py            # (keep as-is)
├── tests/
│   ├── test_analyze.py            # Integration test: paste text → valid response shape
│   └── test_schemas.py            # Unit tests: schema validation, edge cases
├── requirements.txt               # Revise
└── README.md                      # Update to reflect new workflow
```

### Key design decisions

**Single service, single responsibility**
`services/analyzer.py` owns the full analysis workflow. It constructs
the prompt, calls OpenAI, parses the structured response back into
domain objects, and returns them to the route handler. The route handler
does nothing except validate input and serialize output.

**One endpoint for MVP**
`POST /analyze` is the only new route needed. The library browsing routes
(`/search`, `/documents`, `/sources`) can be added later as a separate
router module without touching the analysis path.

**Structured output via prompted JSON**
For MVP, use a single OpenAI call with a system prompt that instructs
the model to return structured JSON matching the response schema. Parse
and validate the output through Pydantic. Do not use function calling
or tool use at this stage — straightforward JSON output is easier to
debug and audit.

**Source traceability via text spans**
The prompt should instruct the model to include verbatim quoted text
from the submitted document that supports each finding. This satisfies
the `source_references[]` requirement without a retrieval layer.

**Retrieval layer is not in MVP**
`app/retrieval/` is preserved but not wired in. The comparison corpus
feature (comparing against known CBAs) is explicitly out of MVP scope.
Do not route through it.

---

## 7. Recommended build order

**Step 1 — Core settings**
Create `app/core/settings.py`. Define `OPENAI_API_KEY`, `OPENAI_MODEL`,
`MAX_INPUT_CHARS`. Load from `.env`. This unblocks everything else.

**Step 2 — Response schemas**
Define all Pydantic models in `app/schemas/responses.py`:
`Provision`, `Flag`, `Suggestion`, `Question`, `SourceReference`,
`UncertaintyNote`, `AnalyzeResponse`.
Define `AnalyzeRequest` in `app/schemas/requests.py`.
Get the output shape right before writing any analysis logic.

**Step 3 — Analyzer service**
Build `app/services/analyzer.py`. Write the system prompt. Call OpenAI.
Parse the JSON response into the domain models. Add a fallback for
malformed model output. This is the hardest and most important step.

**Step 4 — Analyze route**
Create `app/api/routes/analyze.py`. Thin handler: validate request,
call analyzer service, return response. Wire into `app/main.py`.

**Step 5 — Basic tests**
`tests/test_schemas.py` — validate that edge cases (empty text, very
short text, malformed model output) are handled correctly.
`tests/test_analyze.py` — one integration test with a short real CBA
excerpt that verifies the response shape is correct.

**Step 6 — Cleanup**
Delete `claude.md`. Delete `scripts/test_search.py`. Fix duplicate
imports in `build_faiss_index.py`. Update `README.md`.

---

## Summary judgement

The prototype demonstrates intent but implements the wrong workflow.
It is a RAG chatbot for browsing a document library. The spec calls for
a document analysis tool that processes a user-submitted CBA and returns
structured findings. These share infrastructure (OpenAI, FastAPI,
Pydantic) but almost nothing at the application layer.

The data files, retrieval module, and ingestion scripts are genuinely
useful and should be preserved. The API layer should be rebuilt from
scratch following the architecture above. This is not a large build —
the MVP is one endpoint backed by one service — but it needs to be
built correctly rather than bolted onto what is there.
