"""
FastAPI entrypoint for the Community Susceptibility Calculator.

Single endpoint:
  POST /api/susceptibility/calculate
"""

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from .ejscreen import fetch_ejscreen_percentile, ejscreen_pts_from_percentile
from .scorer import SusceptibilityInput, ScoreResult, calculate
from .submissions import SubmissionRecord, append_submission

app = FastAPI(
    title="BEACON Susceptibility Calculator",
    description="Scores community vulnerability to data center development.",
    version="0.1.0",
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # tighten for production
    allow_methods=["POST", "GET", "OPTIONS"],
    allow_headers=["*"],
)


@app.get("/health")
async def health() -> dict:
    return {"status": "ok", "tool": "susceptibility_calc"}


@app.post("/api/susceptibility/calculate", response_model=ScoreResult)
async def calculate_susceptibility(inp: SusceptibilityInput) -> ScoreResult:
    """
    Accept community data and return a full susceptibility score.

    EJScreen is called automatically if a ZIP code is provided.
    On API failure the score defaults to 2 pts (moderate) silently.
    """
    ejscreen_pts = 2
    ejscreen_used = False

    if inp.zip:
        percentile, ejscreen_used = await fetch_ejscreen_percentile(inp.zip)
        ejscreen_pts = ejscreen_pts_from_percentile(percentile) if ejscreen_used else 2

    return calculate(inp, ejscreen_pts=ejscreen_pts, ejscreen_used=ejscreen_used)


@app.post("/api/susceptibility/submit")
async def submit_anonymous(record: SubmissionRecord) -> dict:
    """
    Persist an anonymous submission record.  Fire-and-forget from the frontend —
    never raises errors visible to the user.
    """
    append_submission(record)
    return {"status": "ok"}
