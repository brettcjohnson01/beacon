from fastapi import FastAPI

from app.api.routes.analyze import router as analyze_router

app = FastAPI(title="BEACON CBA Tool")

app.include_router(analyze_router)


@app.get("/")
def health() -> dict:
    return {"status": "ok"}
