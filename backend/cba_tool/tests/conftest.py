import os

# Set before any app modules are imported. settings.py loads at import
# time and requires OPENAI_API_KEY; without this, every test file that
# imports app code would fail at collection.
os.environ.setdefault("OPENAI_API_KEY", "test-key-for-testing")
