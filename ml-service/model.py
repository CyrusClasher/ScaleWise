from prophet import Prophet
import pandas as pd

def generate_forecast(df: pd.DataFrame, periods: int = 7):
    # Initialize model
    model = Prophet(daily_seasonality=True)
    
    # Train
    model.fit(df)

    # Create future DataFrame
    future = model.make_future_dataframe(periods=periods)

    # Predict
    forecast = model.predict(future)

    # Return only forecasted part (skip training portion)
    result = forecast[['ds', 'yhat']].tail(periods)
    return result.rename(columns={"yhat": "predicted"})
