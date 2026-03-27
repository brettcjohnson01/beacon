from typing import Optional

from pydantic import BaseModel, Field


class AnalyzeRequest(BaseModel):
    text: str = Field(
        ...,
        min_length=50,
        max_length=50_000,
        description="The full text of the CBA to analyze.",
    )
    document_title: Optional[str] = Field(
        None,
        max_length=200,
        description="Optional document title for display in results.",
    )
