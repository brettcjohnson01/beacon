from fastapi import APIRouter, HTTPException

from app.schemas.requests import AnalyzeRequest
from app.schemas.responses import AnalyzeResponse
from app.services.analyzer import analyze_cba

router = APIRouter()


@router.post("/analyze", response_model=AnalyzeResponse)
def analyze(request: AnalyzeRequest) -> AnalyzeResponse:
    try:
        return analyze_cba(request)
    except ValueError as exc:
        raise HTTPException(status_code=422, detail=str(exc))
