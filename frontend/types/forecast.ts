// frontend/types/forecast.ts

export interface TimeSeriesPoint {
  ds: string; // ISO date string
  y: number;
}

export interface ForecastRequest {
  time_series: TimeSeriesPoint[];
  periods: number;
}

export interface ForecastPoint {
  ds: string; // Forecasted date
  predicted: number;
}

export interface ForecastResponse {
  forecast: ForecastPoint[];
}
