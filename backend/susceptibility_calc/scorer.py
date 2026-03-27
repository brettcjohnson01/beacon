"""
Scoring logic for the Community Susceptibility Calculator.

All seven dimensions are computed here as pure functions that accept
typed inputs and return integer scores.  Callers assemble the full
ScoreResult from these dimension scores.

Maximum points by dimension:
  Water         20
  Energy        20
  Zoning        18
  Tax           15
  Geographic    10
  Community     10
  Organizing     7
  ─────────────────
  Total        100
"""

from typing import Literal
from pydantic import BaseModel

from .state_lookup import get_state_info


# ---------------------------------------------------------------------------
# Input types
# ---------------------------------------------------------------------------

CommunityType  = Literal["rural", "small_town", "suburb", "city"]
WaterSize      = Literal["small", "medium", "large"]
WaterSource    = Literal["groundwater", "surface", "mixed"]
WaterStress    = Literal["yes", "somewhat", "no"]
UtilityType    = Literal["municipal", "iou", "unknown"]
GridConcerns   = Literal["yes", "sometimes", "no"]
IndustrialLand = Literal["yes", "some", "little", "unknown"]
Rezoning       = Literal["yes", "rumors", "no", "unknown"]
ProtectedLand  = Literal["significant", "some", "none"]
ProjectStage   = Literal["rumor", "announced", "permit", "negotiating", "approved"]
NdasSigned     = Literal["yes", "unknown", "no"]
OrgStatus      = Literal["little", "some", "strong"]


class SusceptibilityInput(BaseModel):
    state: str
    zip: str = ""
    community_type: CommunityType
    water_system_size: WaterSize
    water_source: WaterSource
    water_stress: WaterStress
    utility_type: UtilityType
    grid_concerns: GridConcerns
    industrial_land: IndustrialLand
    recent_rezoning: Rezoning
    protected_land: ProtectedLand
    project_stage: ProjectStage
    ndas_signed: NdasSigned
    organizing_status: OrgStatus


# ---------------------------------------------------------------------------
# Output types
# ---------------------------------------------------------------------------

class DimensionScore(BaseModel):
    score: int
    max: int
    pct: int  # 0–100, rounded


class ScoreResult(BaseModel):
    total_score: int
    tier: Literal["low", "moderate", "high", "critical"]
    tier_label: str
    dimensions: dict[str, DimensionScore]
    flags: list[str]          # keys of 3 highest-scoring dimensions
    urgency: str | None       # "URGENT" / "ACT NOW" / "WINDOW CLOSING" / None
    ejscreen_used: bool


# ---------------------------------------------------------------------------
# Dimension calculators
# ---------------------------------------------------------------------------

def score_water(inp: SusceptibilityInput) -> int:
    size_pts    = {"small": 8, "medium": 4, "large": 1}[inp.water_system_size]
    source_pts  = {"groundwater": 7, "mixed": 4, "surface": 2}[inp.water_source]
    stress_pts  = {"yes": 5, "somewhat": 3, "no": 0}[inp.water_stress]

    state_info = get_state_info(inp.state)
    ws = state_info["water_stress"] if state_info else "lower"
    mod = {"high": 2, "moderate": 1, "lower": 0}[ws]

    return min(20, size_pts + source_pts + stress_pts + mod)


def score_energy(inp: SusceptibilityInput) -> int:
    utility_pts  = {"municipal": 8, "iou": 3, "unknown": 5}[inp.utility_type]
    grid_pts     = {"yes": 7, "sometimes": 4, "no": 1}[inp.grid_concerns]

    state_info = get_state_info(inp.state)
    region = state_info["grid_region"] if state_info else ""
    region_mod = {
        "ERCOT": 5, "WECC": 3, "MISO": 3, "SPP": 2,
        "SERC": 2, "PJM": 2, "NPCC": 1,
    }.get(region, 0)

    return min(20, utility_pts + grid_pts + region_mod)


def score_zoning(inp: SusceptibilityInput) -> int:
    land_pts    = {"yes": 7, "some": 4, "little": 1, "unknown": 4}[inp.industrial_land]
    rezone_pts  = {"yes": 6, "rumors": 3, "no": 0, "unknown": 2}[inp.recent_rezoning]
    protect_pts = {"none": 5, "some": 2, "significant": 0}[inp.protected_land]
    return min(18, land_pts + rezone_pts + protect_pts)


def score_tax(inp: SusceptibilityInput) -> int:
    state_info = get_state_info(inp.state)
    tier = state_info["tax_tier"] if state_info else 2
    return {1: 15, 2: 10, 3: 5}[tier]


def score_geographic(inp: SusceptibilityInput) -> int:
    state_info = get_state_info(inp.state)
    climate = state_info["climate_zone"] if state_info else "moderate"
    climate_pts = {"cold": 4, "moderate": 2, "hot": 1}[climate]
    comm_pts    = {"rural": 4, "small_town": 3, "suburb": 2, "city": 1}[inp.community_type]
    fiber_pts   = 1  # MVP default
    return min(10, climate_pts + comm_pts + fiber_pts)


def score_community(inp: SusceptibilityInput, ejscreen_pts: int) -> int:
    # Industrial burden inferred from land availability
    burden_pts = {"yes": 3, "some": 2, "little": 0, "unknown": 0}[inp.industrial_land]
    schools_pts = 2  # MVP default
    return min(10, ejscreen_pts + burden_pts + schools_pts)


def score_organizing(inp: SusceptibilityInput) -> int:
    org_pts = {"little": 5, "some": 3, "strong": 1}[inp.organizing_status]
    nda_pts = {"yes": 2, "unknown": 1, "no": 0}[inp.ndas_signed]
    return min(7, org_pts + nda_pts)


# ---------------------------------------------------------------------------
# Urgency flag
# ---------------------------------------------------------------------------

def get_urgency(stage: ProjectStage) -> str | None:
    return {
        "negotiating": "URGENT",
        "permit":       "ACT NOW",
        "approved":     "WINDOW CLOSING",
    }.get(stage)


# ---------------------------------------------------------------------------
# Top-flag selection
# ---------------------------------------------------------------------------

def top_flags(dimensions: dict[str, DimensionScore], n: int = 3) -> list[str]:
    """Return keys of the n dimensions with the highest score/max ratio."""
    return sorted(
        dimensions.keys(),
        key=lambda k: dimensions[k].score / dimensions[k].max,
        reverse=True,
    )[:n]


# ---------------------------------------------------------------------------
# Tier classification
# ---------------------------------------------------------------------------

def classify_tier(total: int) -> tuple[str, str]:
    if total < 25:
        return "low",      "LOW RISK"
    if total < 50:
        return "moderate", "MODERATE RISK"
    if total < 75:
        return "high",     "HIGH RISK"
    return "critical",     "CRITICAL RISK"


# ---------------------------------------------------------------------------
# Main entry point
# ---------------------------------------------------------------------------

def calculate(inp: SusceptibilityInput, ejscreen_pts: int = 2, ejscreen_used: bool = False) -> ScoreResult:
    """
    Compute a full ScoreResult from user inputs and an optional EJScreen
    percentile score.  ejscreen_pts defaults to 2 (the silent-failure default).
    """
    water      = score_water(inp)
    energy     = score_energy(inp)
    zoning     = score_zoning(inp)
    tax        = score_tax(inp)
    geographic = score_geographic(inp)
    community  = score_community(inp, ejscreen_pts)
    organizing = score_organizing(inp)

    total = water + energy + zoning + tax + geographic + community + organizing
    tier, tier_label = classify_tier(total)

    def dim(score: int, max_pts: int) -> DimensionScore:
        return DimensionScore(score=score, max=max_pts, pct=round(score / max_pts * 100))

    dimensions: dict[str, DimensionScore] = {
        "water":      dim(water,      20),
        "energy":     dim(energy,     20),
        "zoning":     dim(zoning,     18),
        "tax":        dim(tax,        15),
        "geographic": dim(geographic, 10),
        "community":  dim(community,  10),
        "organizing": dim(organizing,  7),
    }

    return ScoreResult(
        total_score=total,
        tier=tier,
        tier_label=tier_label,
        dimensions=dimensions,
        flags=top_flags(dimensions),
        urgency=get_urgency(inp.project_stage),
        ejscreen_used=ejscreen_used,
    )
