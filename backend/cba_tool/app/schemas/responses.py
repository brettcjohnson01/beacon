from enum import Enum
from typing import List, Optional

from pydantic import BaseModel


class ProvisionCategory(str, Enum):
    JOBS_WORKFORCE = "jobs_workforce"
    TAX_REVENUE = "tax_revenue"
    TAX_INCENTIVES = "tax_incentives"
    ENVIRONMENTAL = "environmental"
    AIR_QUALITY = "air_quality"
    LAND_USE = "land_use"
    COMMUNITY_INVESTMENT = "community_investment"
    ENFORCEMENT = "enforcement"
    REPORTING = "reporting"
    DISPUTE_RESOLUTION = "dispute_resolution"
    DURATION = "duration"
    OTHER = "other"


class FlagType(str, Enum):
    VAGUE_LANGUAGE = "vague_language"
    UNENFORCEABLE = "unenforceable"
    MISSING_PROVISION = "missing_provision"
    ASYMMETRIC_OBLIGATION = "asymmetric_obligation"
    UNDEFINED_TERM = "undefined_term"
    NO_ACCOUNTABILITY = "no_accountability"
    SUNSET_CLAUSE = "sunset_clause"


class ConfidenceLevel(str, Enum):
    HIGH = "high"
    MEDIUM = "medium"
    LOW = "low"


class Provision(BaseModel):
    category: ProvisionCategory
    summary: str
    quoted_text: str
    confidence: ConfidenceLevel
    notes: Optional[str] = None


class Flag(BaseModel):
    flag_type: FlagType
    description: str
    quoted_text: Optional[str] = None
    provision_category: Optional[ProvisionCategory] = None


class Suggestion(BaseModel):
    description: str
    rationale: str
    provision_category: Optional[ProvisionCategory] = None


class Question(BaseModel):
    question: str
    rationale: str
    directed_at: Optional[str] = None


class UncertaintyNote(BaseModel):
    description: str


class AnalyzeResponse(BaseModel):
    summary: str
    provisions: List[Provision]
    flags: List[Flag]
    suggestions: List[Suggestion]
    questions: List[Question]
    uncertainty_notes: List[UncertaintyNote]
