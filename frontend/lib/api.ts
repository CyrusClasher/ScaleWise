// export async function postForecast(data: any) {
//   const res = await fetch("http://localhost:8000/forecast", {
//     method: "POST",
//     headers: { "Content-Type": "application/json" },
//     body: JSON.stringify(data),
//   });

//   if (!res.ok) throw new Error("Forecast API failed");
//   return res.json(); // expected to return forecast data
// }
// frontend/lib/api.ts

import { ForecastRequest, ForecastResponse } from "@/types/forecast";

export async function postForecast(
  data: ForecastRequest
): Promise<ForecastResponse> {
  const res = await fetch("http://localhost:8000/forecast", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });

  if (!res.ok) throw new Error("Forecast API failed");
  return res.json();
}
