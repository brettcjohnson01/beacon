import pytest
from unittest.mock import MagicMock, patch

from app.schemas.requests import AnalyzeRequest
from app.schemas.responses import AnalyzeResponse
from app.services.analyzer import analyze_cba


def _make_fake_completion(response: AnalyzeResponse) -> MagicMock:
    mock_message = MagicMock()
    mock_message.parsed = response
    mock_choice = MagicMock()
    mock_choice.message = mock_message
    mock_completion = MagicMock()
    mock_completion.choices = [mock_choice]
    return mock_completion


def _minimal_response() -> AnalyzeResponse:
    return AnalyzeResponse(
        summary="A short agreement with limited commitments.",
        provisions=[],
        flags=[],
        suggestions=[],
        questions=[],
        uncertainty_notes=[],
    )


class TestAnalyzeCba:
    def test_raises_on_text_exceeding_max_input_chars(self):
        from app.core.settings import settings

        req = AnalyzeRequest(text="x" * 100)
        # Bypass Pydantic's max_length to test the service-layer guard directly.
        object.__setattr__(req, "text", "x" * (settings.max_input_chars + 1))

        with pytest.raises(ValueError, match="exceeds maximum"):
            analyze_cba(req)

    def test_returns_analyze_response_on_success(self):
        req = AnalyzeRequest(text="x" * 100)
        fake_response = _minimal_response()

        mock_client = MagicMock()
        mock_client.beta.chat.completions.parse.return_value = (
            _make_fake_completion(fake_response)
        )

        with patch("app.services.analyzer._get_client", return_value=mock_client):
            result = analyze_cba(req)

        assert isinstance(result, AnalyzeResponse)
        assert result.summary == "A short agreement with limited commitments."

    def test_calls_openai_with_correct_model_and_response_format(self):
        from app.core.settings import settings

        req = AnalyzeRequest(text="x" * 100)

        mock_client = MagicMock()
        mock_client.beta.chat.completions.parse.return_value = (
            _make_fake_completion(_minimal_response())
        )

        with patch("app.services.analyzer._get_client", return_value=mock_client):
            analyze_cba(req)

        kwargs = mock_client.beta.chat.completions.parse.call_args.kwargs
        assert kwargs["model"] == settings.openai_model
        assert kwargs["response_format"] is AnalyzeResponse

    def test_raises_when_parsed_result_is_none(self):
        req = AnalyzeRequest(text="x" * 100)

        mock_message = MagicMock()
        mock_message.parsed = None
        mock_choice = MagicMock()
        mock_choice.message = mock_message
        mock_completion = MagicMock()
        mock_completion.choices = [mock_choice]

        mock_client = MagicMock()
        mock_client.beta.chat.completions.parse.return_value = mock_completion

        with patch("app.services.analyzer._get_client", return_value=mock_client):
            with pytest.raises(ValueError, match="no structured output"):
                analyze_cba(req)
