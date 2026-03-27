import pytest
from pydantic import ValidationError

from app.schemas.requests import AnalyzeRequest
from app.schemas.responses import (
    AnalyzeResponse,
    ConfidenceLevel,
    Flag,
    FlagType,
    Provision,
    ProvisionCategory,
)


class TestAnalyzeRequest:
    def test_rejects_text_below_minimum_length(self):
        with pytest.raises(ValidationError):
            AnalyzeRequest(text="too short")

    def test_rejects_empty_text(self):
        with pytest.raises(ValidationError):
            AnalyzeRequest(text="")

    def test_rejects_text_above_maximum_length(self):
        with pytest.raises(ValidationError):
            AnalyzeRequest(text="x" * 50_001)

    def test_accepts_valid_text(self):
        req = AnalyzeRequest(text="x" * 100)
        assert req.text == "x" * 100

    def test_document_title_is_optional(self):
        req = AnalyzeRequest(text="x" * 100)
        assert req.document_title is None

    def test_document_title_accepts_value(self):
        req = AnalyzeRequest(text="x" * 100, document_title="Test CBA")
        assert req.document_title == "Test CBA"

    def test_document_title_rejects_overlong_value(self):
        with pytest.raises(ValidationError):
            AnalyzeRequest(text="x" * 100, document_title="x" * 201)


class TestAnalyzeResponse:
    def _minimal(self, **overrides):
        defaults = {
            "summary": "A test summary.",
            "provisions": [],
            "flags": [],
            "suggestions": [],
            "questions": [],
            "uncertainty_notes": [],
        }
        return AnalyzeResponse(**{**defaults, **overrides})

    def test_valid_empty_lists(self):
        r = self._minimal()
        assert r.summary == "A test summary."
        assert r.provisions == []

    def test_provision_notes_defaults_to_none(self):
        p = Provision(
            category=ProvisionCategory.JOBS_WORKFORCE,
            summary="Developer commits to 50 local hires.",
            quoted_text="Developer shall hire no fewer than 50 local residents.",
            confidence=ConfidenceLevel.HIGH,
        )
        assert p.notes is None

    def test_missing_provision_flag_allows_null_quoted_text(self):
        f = Flag(
            flag_type=FlagType.MISSING_PROVISION,
            description="No dispute resolution process is specified.",
            quoted_text=None,
        )
        assert f.quoted_text is None

    def test_provision_category_serializes_as_string_value(self):
        p = Provision(
            category=ProvisionCategory.ENFORCEMENT,
            summary="Penalty clause.",
            quoted_text="A penalty of $10,000 per violation shall apply.",
            confidence=ConfidenceLevel.HIGH,
        )
        data = p.model_dump()
        assert data["category"] == "enforcement"
        assert data["confidence"] == "high"
