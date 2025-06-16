from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
from typing import List
import pandas as pd
from model import generate_forecast
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],  # or ["*"] during development
    allow_credentials=True,
    allow_methods=["*"],  # This is important for OPTIONS preflight
    allow_headers=["*"],
)

# ---------------------------
# Input schema for POST /forecast
# ---------------------------
class TimeSeriesPoint(BaseModel):
    ds: str  # Date in 'YYYY-MM-DD'
    y: float # Actual value

class ForecastRequest(BaseModel):
    time_series: List[TimeSeriesPoint]
    periods: int = 20  # Forecast for next 7 days by default

# ---------------------------
# POST route: /forecast
# ---------------------------
@app.post("/forecast")
def forecast_endpoint(req: ForecastRequest):
    try:
        # Convert list of points to DataFrame
        df = pd.DataFrame([p.dict() for p in req.time_series])

        # Call forecasting logic
        forecast_df = generate_forecast(df, req.periods)

        # Return result
        return {"forecast": forecast_df.to_dict(orient="records")}

    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
