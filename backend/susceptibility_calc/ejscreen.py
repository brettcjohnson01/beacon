"""
EPA EJScreen API wrapper for the Community Susceptibility Calculator.

Fetches environmental justice data by ZIP code and returns a normalized
percentile score (0–100) representing the community's combined environmental
justice burden.

API endpoint:
  https://ejscreen.epa.gov/mapper/ejscreenRESTbroker.aspx
  ?namestr={ZIP}&geometry=&distance=&unit=9035&areatype=&areaid=&f=pjson

On any failure (network error, bad ZIP, unexpected response shape) this module
returns a default moderate score rather than raising. Callers should treat the
returned score as advisory and log whether the API was actually used.
"""

import logging
from typing import Any

import httpx

logger = logging.getLogger(__name__)

EJSCREEN_URL = "https://ejscreen.epa.gov/mapper/ejscreenRESTbroker.aspx"
DEFAULT_PERCENTILE = 50  # used when the API call fails

# Fields to try, in preference order.  EJScreen field names vary slightly
# across API versions; we try several before falling back to the default.
PERCENTILE_FIELD_CANDIDATES = [
    "DSCORESI",      # EJ Index (supplemental) — overall composite
    "DSCORE",        # EJ Index (national scale)
    "P_MINORPCT",    # Percentile: minority population
    "P_LWINCPCT",    # Percentile: low-income population
    "EJ_DISPARITY",  # Named in spec
    "PEOPCOLORPCT",  # Named in spec (raw pct, treated as percentile proxy)
]


async def fetch_ejscreen_percentile(zip_code: str) -> tuple[int, bool]:
    """
    Fetch an EJ composite percentile (0–100) for the given ZIP code.

    Returns:
        (percentile, api_used)
        percentile  — integer 0–100
        api_used    — True if the live API was successfully used
    """
    if not zip_code or not zip_code.strip().isdigit():
        logger.info("EJScreen skipped: invalid or missing ZIP '%s'", zip_code)
        return DEFAULT_PERCENTILE, False

    params = {
        "namestr": zip_code.strip(),
        "geometry": "",
        "distance": "",
        "unit": "9035",
        "areatype": "",
        "areaid": "",
        "f": "pjson",
    }

    try:
        async with httpx.AsyncClient(timeout=10.0) as client:
            response = await client.get(EJSCREEN_URL, params=params)
            response.raise_for_status()
            data: Any = response.json()

        percentile = _extract_percentile(data)
        if percentile is None:
            logger.warning("EJScreen: no usable percentile field found for ZIP %s", zip_code)
            return DEFAULT_PERCENTILE, False

        logger.info("EJScreen: ZIP %s → percentile %d", zip_code, percentile)
        return percentile, True

    except Exception as exc:
        logger.warning("EJScreen API failed for ZIP %s: %s", zip_code, exc)
        return DEFAULT_PERCENTILE, False


def _extract_percentile(data: Any) -> int | None:
    """
    Walk the EJScreen JSON response looking for a usable percentile value.
    Returns an integer 0–100 or None if nothing usable is found.
    """
    # EJScreen responses typically nest data under 'items' or at top level
    records: list[dict] = []
    if isinstance(data, dict):
        if "items" in data and isinstance(data["items"], list):
            records = data["items"]
        elif "features" in data and isinstance(data["features"], list):
            records = [f.get("attributes", {}) for f in data["features"]]
        else:
            records = [data]
    elif isinstance(data, list):
        records = data

    for record in records:
        if not isinstance(record, dict):
            continue
        # Try known field names
        for field in PERCENTILE_FIELD_CANDIDATES:
            val = record.get(field)
            if val is not None:
                try:
                    pct = float(val)
                    # Some fields are 0–1 fractions; normalise to 0–100
                    if 0 < pct <= 1:
                        pct = pct * 100
                    return max(0, min(100, int(round(pct))))
                except (TypeError, ValueError):
                    continue

    return None


def ejscreen_pts_from_percentile(percentile: int) -> int:
    """
    Convert an EJ percentile to scoring points as defined in the spec.

    >=75th percentile  → 5 pts
    50–74th percentile → 3 pts
    <50th percentile   → 1 pt
    """
    if percentile >= 75:
        return 5
    if percentile >= 50:
        return 3
    return 1
