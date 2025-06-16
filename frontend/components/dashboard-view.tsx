"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import {
  Activity,
  TrendingUp,
  Clock,
  CreditCard,
  Play,
  Zap,
} from "lucide-react";
import { ForecastChart } from "./forecast-chart";
import { RegionBreakdownChart } from "./region-breakdown-chart";

export function DashboardView() {
  const [jsonInput, setJsonInput] = useState("");
  const [forecastData, setForecastData] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);

  const handleRunForecast = async () => {
    try {
      setLoading(true);
      const parsed = JSON.parse(jsonInput);
      const res = await fetch("http://localhost:8000/forecast", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(parsed),
      });
      const result = await res.json();
      setForecastData(result.forecast);
    } catch (error) {
      alert("Invalid JSON or forecast failed");
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      {/* Hero Widget */}
      <Card className="bg-gradient-to-r from-indigo-500/10 to-cyan-500/10 border-indigo-200/20 dark:border-indigo-800/20">
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="text-2xl font-bold">
                Next 24h Load Forecast
              </CardTitle>
              <p className="text-muted-foreground mt-2">
                Real-time distributed load prediction
              </p>
            </div>
            <Badge
              variant="secondary"
              className="bg-emerald-500/10 text-emerald-600 dark:text-emerald-400"
            >
              <Zap className="w-4 h-4 mr-1" />
              Active
            </Badge>
          </div>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="text-center p-4 rounded-2xl bg-background/50">
              <div className="text-3xl font-bold text-orange-500">72%</div>
              <div className="text-sm text-muted-foreground">
                Peak Load at 14:00
              </div>
            </div>
            <div className="text-center p-4 rounded-2xl bg-background/50">
              <div className="text-3xl font-bold text-green-500">94.2%</div>
              <div className="text-sm text-muted-foreground">
                Forecast Confidence
              </div>
            </div>
            <div className="text-center p-4 rounded-2xl bg-background/50">
              <div className="text-3xl font-bold text-blue-500">2.3s</div>
              <div className="text-sm text-muted-foreground">
                Processing Time
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Chart Section */}
        <div className="lg:col-span-2 space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Load Forecast Timeline</CardTitle>
            </CardHeader>
            <CardContent>
              <ForecastChart data={forecastData} />
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Regional Load Distribution</CardTitle>
            </CardHeader>
            <CardContent>
              <RegionBreakdownChart />
            </CardContent>
          </Card>
        </div>

        {/* Right Sidebar */}
        <div className="space-y-6">
          {/* Forecast Input Panel */}
          <Card>
            <CardHeader>
              <CardTitle>Run New Forecast</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="csv-upload">Upload CSV Data</Label>
                <Input
                  id="csv-upload"
                  type="file"
                  accept=".csv"
                  className="mt-1"
                />
              </div>
              <div>
                <Label htmlFor="json-input">Or Enter JSON Data</Label>
                <Textarea
                  id="json-input"
                  placeholder='[{"timestamp": "2024-01-01T00:00:00Z", "load": 45.2}]'
                  className="mt-1 h-24"
                  value={jsonInput}
                  onChange={(e) => setJsonInput(e.target.value)}
                />
              </div>
              <Button
                className="w-full bg-gradient-to-r from-indigo-500 to-cyan-500 hover:from-indigo-600 hover:to-cyan-600"
                onClick={handleRunForecast}
                disabled={loading}
              >
                <Play className="w-4 h-4 mr-2" />
                {loading ? "Running..." : "Run Forecast"}
              </Button>
            </CardContent>
          </Card>

          {/* Summary Cards */}
          {/* (unchanged summary cards) */}
        </div>
      </div>
    </div>
  );
}

// "use client";

// import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
// import { Button } from "@/components/ui/button";
// import { Input } from "@/components/ui/input";
// import { Label } from "@/components/ui/label";
// import { Textarea } from "@/components/ui/textarea";
// import { Badge } from "@/components/ui/badge";
// import {
//   Activity,
//   TrendingUp,
//   Clock,
//   CreditCard,
//   Play,
//   Zap,
// } from "lucide-react";
// import { ForecastChart } from "./forecast-chart";
// import { RegionBreakdownChart } from "./region-breakdown-chart";

// export function DashboardView() {
//   return (
//     <div className="space-y-6">
//       {/* Hero Widget */}
//       <Card className="bg-gradient-to-r from-indigo-500/10 to-cyan-500/10 border-indigo-200/20 dark:border-indigo-800/20">
//         <CardHeader>
//           <div className="flex items-center justify-between">
//             <div>
//               <CardTitle className="text-2xl font-bold">
//                 Next 24h Load Forecast
//               </CardTitle>
//               <p className="text-muted-foreground mt-2">
//                 Real-time distributed load prediction
//               </p>
//             </div>
//             <Badge
//               variant="secondary"
//               className="bg-emerald-500/10 text-emerald-600 dark:text-emerald-400"
//             >
//               <Zap className="w-4 h-4 mr-1" />
//               Active
//             </Badge>
//           </div>
//         </CardHeader>
//         <CardContent>
//           <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
//             <div className="text-center p-4 rounded-2xl bg-background/50">
//               <div className="text-3xl font-bold text-orange-500">72%</div>
//               <div className="text-sm text-muted-foreground">
//                 Peak Load at 14:00
//               </div>
//             </div>
//             <div className="text-center p-4 rounded-2xl bg-background/50">
//               <div className="text-3xl font-bold text-green-500">94.2%</div>
//               <div className="text-sm text-muted-foreground">
//                 Forecast Confidence
//               </div>
//             </div>
//             <div className="text-center p-4 rounded-2xl bg-background/50">
//               <div className="text-3xl font-bold text-blue-500">2.3s</div>
//               <div className="text-sm text-muted-foreground">
//                 Processing Time
//               </div>
//             </div>
//           </div>
//         </CardContent>
//       </Card>

//       {/* Main Content Grid */}
//       <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
//         {/* Chart Section */}
//         <div className="lg:col-span-2 space-y-6">
//           <Card>
//             <CardHeader>
//               <CardTitle>Load Forecast Timeline</CardTitle>
//             </CardHeader>
//             <CardContent>
//               <ForecastChart />
//             </CardContent>
//           </Card>

//           <Card>
//             <CardHeader>
//               <CardTitle>Regional Load Distribution</CardTitle>
//             </CardHeader>
//             <CardContent>
//               <RegionBreakdownChart />
//             </CardContent>
//           </Card>
//         </div>

//         {/* Right Sidebar */}
//         <div className="space-y-6">
//           {/* Forecast Input Panel */}
//           <Card>
//             <CardHeader>
//               <CardTitle>Run New Forecast</CardTitle>
//             </CardHeader>
//             <CardContent className="space-y-4">
//               <div>
//                 <Label htmlFor="csv-upload">Upload CSV Data</Label>
//                 <Input
//                   id="csv-upload"
//                   type="file"
//                   accept=".csv"
//                   className="mt-1"
//                 />
//               </div>
//               <div>
//                 <Label htmlFor="json-input">Or Enter JSON Data</Label>
//                 <Textarea
//                   id="json-input"
//                   placeholder='{"timestamp": "2024-01-01T00:00:00Z", "load": 45.2}'
//                   className="mt-1 h-24"
//                 />
//               </div>
//               <Button className="w-full bg-gradient-to-r from-indigo-500 to-cyan-500 hover:from-indigo-600 hover:to-cyan-600">
//                 <Play className="w-4 h-4 mr-2" />
//                 Run Forecast
//               </Button>
//             </CardContent>
//           </Card>

//           {/* Summary Cards */}
//           <div className="grid grid-cols-1 gap-4">
//             <Card>
//               <CardContent className="p-4">
//                 <div className="flex items-center space-x-3">
//                   <div className="p-2 bg-green-500/10 rounded-lg">
//                     <TrendingUp className="h-5 w-5 text-green-500" />
//                   </div>
//                   <div>
//                     <div className="text-2xl font-bold">94.2%</div>
//                     <div className="text-sm text-muted-foreground">
//                       Forecast Accuracy
//                     </div>
//                   </div>
//                 </div>
//               </CardContent>
//             </Card>

//             <Card>
//               <CardContent className="p-4">
//                 <div className="flex items-center space-x-3">
//                   <div className="p-2 bg-blue-500/10 rounded-lg">
//                     <Activity className="h-5 w-5 text-blue-500" />
//                   </div>
//                   <div>
//                     <div className="text-2xl font-bold">127</div>
//                     <div className="text-sm text-muted-foreground">
//                       Forecasts This Month
//                     </div>
//                   </div>
//                 </div>
//               </CardContent>
//             </Card>

//             <Card>
//               <CardContent className="p-4">
//                 <div className="flex items-center space-x-3">
//                   <div className="p-2 bg-purple-500/10 rounded-lg">
//                     <CreditCard className="h-5 w-5 text-purple-500" />
//                   </div>
//                   <div>
//                     <div className="text-2xl font-bold">2,450</div>
//                     <div className="text-sm text-muted-foreground">
//                       Credits Remaining
//                     </div>
//                   </div>
//                 </div>
//               </CardContent>
//             </Card>

//             <Card>
//               <CardContent className="p-4">
//                 <div className="flex items-center space-x-3">
//                   <div className="p-2 bg-orange-500/10 rounded-lg">
//                     <Clock className="h-5 w-5 text-orange-500" />
//                   </div>
//                   <div>
//                     <div className="text-2xl font-bold">2.3s</div>
//                     <div className="text-sm text-muted-foreground">
//                       Avg. Forecast Time
//                     </div>
//                   </div>
//                 </div>
//               </CardContent>
//             </Card>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }
