"""
Anonymous submission tracking for the Community Susceptibility Calculator.

Appends a sanitized, anonymised record to a local JSON file after each
calculation.  No PII is stored — ZIP codes are truncated to the first 3
digits before persisting.
"""

import json
import logging
from datetime import datetime, timezone
from pathlib import Path
from typing import Any

from pydantic import BaseModel

logger = logging.getLogger(__name__)

DATA_FILE = Path(__file__).parent / "data" / "submissions.json"


class SubmissionRecord(BaseModel):
    timestamp: str
    state: str
    zip_prefix: str          # first 3 digits only
    community_type: str
    water_system_size: str
    water_source: str
    water_stress: str
    utility_type: str
    industrial_land: str
    recent_rezoning: str
    protected_land: str
    project_stage: str
    ndas_signed: str
    organizing_status: str
    total_score: int
    tier: str
    dimension_scores: dict[str, int]


def _load() -> list[dict[str, Any]]:
    try:
        text = DATA_FILE.read_text(encoding="utf-8").strip()
        return json.loads(text) if text else []
    except (FileNotFoundError, json.JSONDecodeError):
        return []


def _save(records: list[dict[str, Any]]) -> None:
    DATA_FILE.parent.mkdir(parents=True, exist_ok=True)
    DATA_FILE.write_text(json.dumps(records, indent=2), encoding="utf-8")


def append_submission(record: SubmissionRecord) -> None:
    """Append one anonymous submission record to submissions.json."""
    try:
        records = _load()
        records.append(record.model_dump())
        _save(records)
    except Exception as exc:
        # Never raise — submission tracking must never surface errors to users.
        logger.warning("Failed to persist submission: %s", exc)
