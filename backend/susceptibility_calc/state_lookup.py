"""
Hardcoded state-level data for the Community Susceptibility Calculator.

Each state entry contains:
- name: full state name
- tax_tier: 1 (highest exposure) / 2 (moderate) / 3 (lower)
- water_stress: 'high' / 'moderate' / 'lower'
- grid_region: ERCOT / WECC / MISO / SPP / SERC / PJM / NPCC
- climate_zone: 'cold' / 'moderate' / 'hot'
"""

from typing import TypedDict, Literal


WaterStress = Literal["high", "moderate", "lower"]
GridRegion = Literal["ERCOT", "WECC", "MISO", "SPP", "SERC", "PJM", "NPCC"]
ClimateZone = Literal["cold", "moderate", "hot"]


class StateInfo(TypedDict):
    name: str
    tax_tier: Literal[1, 2, 3]
    water_stress: WaterStress
    grid_region: GridRegion
    climate_zone: ClimateZone


STATE_DATA: dict[str, StateInfo] = {
    "AL": {"name": "Alabama",       "tax_tier": 1, "water_stress": "lower",    "grid_region": "SERC",  "climate_zone": "hot"},
    "AK": {"name": "Alaska",        "tax_tier": 3, "water_stress": "lower",    "grid_region": "NPCC",  "climate_zone": "cold"},
    "AZ": {"name": "Arizona",       "tax_tier": 1, "water_stress": "high",     "grid_region": "WECC",  "climate_zone": "hot"},
    "AR": {"name": "Arkansas",      "tax_tier": 1, "water_stress": "lower",    "grid_region": "MISO",  "climate_zone": "hot"},
    "CA": {"name": "California",    "tax_tier": 3, "water_stress": "high",     "grid_region": "WECC",  "climate_zone": "hot"},
    "CO": {"name": "Colorado",      "tax_tier": 2, "water_stress": "high",     "grid_region": "WECC",  "climate_zone": "moderate"},
    "CT": {"name": "Connecticut",   "tax_tier": 3, "water_stress": "lower",    "grid_region": "NPCC",  "climate_zone": "moderate"},
    "DE": {"name": "Delaware",      "tax_tier": 3, "water_stress": "lower",    "grid_region": "PJM",   "climate_zone": "moderate"},
    "FL": {"name": "Florida",       "tax_tier": 2, "water_stress": "moderate", "grid_region": "SERC",  "climate_zone": "hot"},
    "GA": {"name": "Georgia",       "tax_tier": 1, "water_stress": "moderate", "grid_region": "SERC",  "climate_zone": "hot"},
    "HI": {"name": "Hawaii",        "tax_tier": 3, "water_stress": "lower",    "grid_region": "NPCC",  "climate_zone": "hot"},
    "ID": {"name": "Idaho",         "tax_tier": 2, "water_stress": "high",     "grid_region": "WECC",  "climate_zone": "cold"},
    "IL": {"name": "Illinois",      "tax_tier": 1, "water_stress": "lower",    "grid_region": "MISO",  "climate_zone": "moderate"},
    "IN": {"name": "Indiana",       "tax_tier": 1, "water_stress": "lower",    "grid_region": "MISO",  "climate_zone": "moderate"},
    "IA": {"name": "Iowa",          "tax_tier": 2, "water_stress": "lower",    "grid_region": "MISO",  "climate_zone": "cold"},
    "KS": {"name": "Kansas",        "tax_tier": 2, "water_stress": "high",     "grid_region": "SPP",   "climate_zone": "moderate"},
    "KY": {"name": "Kentucky",      "tax_tier": 2, "water_stress": "lower",    "grid_region": "PJM",   "climate_zone": "moderate"},
    "LA": {"name": "Louisiana",     "tax_tier": 2, "water_stress": "lower",    "grid_region": "MISO",  "climate_zone": "hot"},
    "ME": {"name": "Maine",         "tax_tier": 3, "water_stress": "lower",    "grid_region": "NPCC",  "climate_zone": "cold"},
    "MD": {"name": "Maryland",      "tax_tier": 2, "water_stress": "lower",    "grid_region": "PJM",   "climate_zone": "moderate"},
    "MA": {"name": "Massachusetts", "tax_tier": 3, "water_stress": "lower",    "grid_region": "NPCC",  "climate_zone": "moderate"},
    "MI": {"name": "Michigan",      "tax_tier": 2, "water_stress": "lower",    "grid_region": "MISO",  "climate_zone": "cold"},
    "MN": {"name": "Minnesota",     "tax_tier": 2, "water_stress": "lower",    "grid_region": "MISO",  "climate_zone": "cold"},
    "MS": {"name": "Mississippi",   "tax_tier": 2, "water_stress": "lower",    "grid_region": "SERC",  "climate_zone": "hot"},
    "MO": {"name": "Missouri",      "tax_tier": 1, "water_stress": "moderate", "grid_region": "MISO",  "climate_zone": "moderate"},
    "MT": {"name": "Montana",       "tax_tier": 3, "water_stress": "lower",    "grid_region": "WECC",  "climate_zone": "cold"},
    "NE": {"name": "Nebraska",      "tax_tier": 1, "water_stress": "lower",    "grid_region": "SPP",   "climate_zone": "cold"},
    "NV": {"name": "Nevada",        "tax_tier": 1, "water_stress": "high",     "grid_region": "WECC",  "climate_zone": "hot"},
    "NH": {"name": "New Hampshire", "tax_tier": 3, "water_stress": "lower",    "grid_region": "NPCC",  "climate_zone": "cold"},
    "NJ": {"name": "New Jersey",    "tax_tier": 3, "water_stress": "lower",    "grid_region": "PJM",   "climate_zone": "moderate"},
    "NM": {"name": "New Mexico",    "tax_tier": 1, "water_stress": "high",     "grid_region": "WECC",  "climate_zone": "hot"},
    "NY": {"name": "New York",      "tax_tier": 3, "water_stress": "lower",    "grid_region": "NPCC",  "climate_zone": "moderate"},
    "NC": {"name": "North Carolina","tax_tier": 2, "water_stress": "moderate", "grid_region": "SERC",  "climate_zone": "moderate"},
    "ND": {"name": "North Dakota",  "tax_tier": 3, "water_stress": "lower",    "grid_region": "WECC",  "climate_zone": "cold"},
    "OH": {"name": "Ohio",          "tax_tier": 1, "water_stress": "lower",    "grid_region": "PJM",   "climate_zone": "moderate"},
    "OK": {"name": "Oklahoma",      "tax_tier": 2, "water_stress": "high",     "grid_region": "SPP",   "climate_zone": "hot"},
    "OR": {"name": "Oregon",        "tax_tier": 2, "water_stress": "moderate", "grid_region": "WECC",  "climate_zone": "moderate"},
    "PA": {"name": "Pennsylvania",  "tax_tier": 2, "water_stress": "lower",    "grid_region": "PJM",   "climate_zone": "moderate"},
    "RI": {"name": "Rhode Island",  "tax_tier": 3, "water_stress": "lower",    "grid_region": "NPCC",  "climate_zone": "moderate"},
    "SC": {"name": "South Carolina","tax_tier": 1, "water_stress": "lower",    "grid_region": "SERC",  "climate_zone": "hot"},
    "SD": {"name": "South Dakota",  "tax_tier": 3, "water_stress": "lower",    "grid_region": "WECC",  "climate_zone": "cold"},
    "TN": {"name": "Tennessee",     "tax_tier": 1, "water_stress": "lower",    "grid_region": "SERC",  "climate_zone": "hot"},
    "TX": {"name": "Texas",         "tax_tier": 1, "water_stress": "high",     "grid_region": "ERCOT", "climate_zone": "hot"},
    "UT": {"name": "Utah",          "tax_tier": 2, "water_stress": "high",     "grid_region": "WECC",  "climate_zone": "moderate"},
    "VT": {"name": "Vermont",       "tax_tier": 3, "water_stress": "lower",    "grid_region": "NPCC",  "climate_zone": "cold"},
    "VA": {"name": "Virginia",      "tax_tier": 1, "water_stress": "lower",    "grid_region": "PJM",   "climate_zone": "moderate"},
    "WA": {"name": "Washington",    "tax_tier": 2, "water_stress": "moderate", "grid_region": "WECC",  "climate_zone": "moderate"},
    "WV": {"name": "West Virginia", "tax_tier": 2, "water_stress": "lower",    "grid_region": "PJM",   "climate_zone": "moderate"},
    "WI": {"name": "Wisconsin",     "tax_tier": 1, "water_stress": "lower",    "grid_region": "MISO",  "climate_zone": "cold"},
    "WY": {"name": "Wyoming",       "tax_tier": 3, "water_stress": "lower",    "grid_region": "WECC",  "climate_zone": "cold"},
}

# Tax tier descriptive labels
TAX_TIER_LABELS: dict[int, str] = {
    1: "High tax incentive exposure state",
    2: "Moderate tax incentive exposure state",
    3: "Lower tax incentive exposure state",
}


def get_state_info(state_code: str) -> StateInfo | None:
    return STATE_DATA.get(state_code.upper())


def get_state_callout(state_code: str) -> str | None:
    """Return the UI callout string for the given state code."""
    info = get_state_info(state_code)
    if not info:
        return None
    tier = info["tax_tier"]
    return f"{info['name']}: {TAX_TIER_LABELS[tier]} — Tier {tier}"
