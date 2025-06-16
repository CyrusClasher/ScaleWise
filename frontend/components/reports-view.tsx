"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Search,
  Download,
  Share,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";

const mockReports = [
  {
    id: 1,
    date: "2024-01-15",
    model: "LSTM-Advanced",
    duration: "2.3s",
    accuracy: "94.2%",
    user: "John Doe",
    type: "Load Forecast",
  },
  {
    id: 2,
    date: "2024-01-14",
    model: "Random Forest",
    duration: "1.8s",
    accuracy: "91.7%",
    user: "Jane Smith",
    type: "Peak Prediction",
  },
  {
    id: 3,
    date: "2024-01-13",
    model: "Neural Network",
    duration: "3.1s",
    accuracy: "96.1%",
    user: "Mike Johnson",
    type: "Load Forecast",
  },
  {
    id: 4,
    date: "2024-01-12",
    model: "ARIMA",
    duration: "0.9s",
    accuracy: "88.4%",
    user: "Sarah Wilson",
    type: "Trend Analysis",
  },
  {
    id: 5,
    date: "2024-01-11",
    model: "LSTM-Advanced",
    duration: "2.7s",
    accuracy: "93.8%",
    user: "John Doe",
    type: "Load Forecast",
  },
];

export function ReportsView() {
  const [searchTerm, setSearchTerm] = useState("");
  const [filterType, setFilterType] = useState("all");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  const filteredReports = mockReports.filter((report) => {
    const matchesSearch =
      report.user.toLowerCase().includes(searchTerm.toLowerCase()) ||
      report.model.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = filterType === "all" || report.type === filterType;
    return matchesSearch && matchesFilter;
  });

  const totalPages = Math.ceil(filteredReports.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedReports = filteredReports.slice(
    startIndex,
    startIndex + itemsPerPage
  );

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Forecast Reports</h1>
      </div>

      <Card>
        <CardHeader>
          <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
            <CardTitle>Previous Forecasts</CardTitle>
            <div className="flex flex-col sm:flex-row gap-2 w-full sm:w-auto">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search reports..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 w-full sm:w-64"
                />
              </div>
              <Select value={filterType} onValueChange={setFilterType}>
                <SelectTrigger className="w-full sm:w-48">
                  <SelectValue placeholder="Filter by type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Types</SelectItem>
                  <SelectItem value="Load Forecast">Load Forecast</SelectItem>
                  <SelectItem value="Peak Prediction">
                    Peak Prediction
                  </SelectItem>
                  <SelectItem value="Trend Analysis">Trend Analysis</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="rounded-lg border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Date</TableHead>
                  <TableHead>Model Used</TableHead>
                  <TableHead>Duration</TableHead>
                  <TableHead>Accuracy</TableHead>
                  <TableHead>User</TableHead>
                  <TableHead>Type</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {paginatedReports.map((report) => (
                  <TableRow key={report.id}>
                    <TableCell className="font-medium">{report.date}</TableCell>
                    <TableCell>{report.model}</TableCell>
                    <TableCell>{report.duration}</TableCell>
                    <TableCell>
                      <Badge
                        variant={
                          Number.parseFloat(report.accuracy) > 90
                            ? "default"
                            : "secondary"
                        }
                        className={
                          Number.parseFloat(report.accuracy) > 90
                            ? "bg-green-500/10 text-green-600 dark:text-green-400"
                            : ""
                        }
                      >
                        {report.accuracy}
                      </Badge>
                    </TableCell>
                    <TableCell>{report.user}</TableCell>
                    <TableCell>
                      <Badge variant="outline">{report.type}</Badge>
                    </TableCell>
                    <TableCell>
                      <div className="flex space-x-2">
                        <Button size="sm" variant="ghost">
                          <Download className="h-4 w-4" />
                        </Button>
                        <Button size="sm" variant="ghost">
                          <Share className="h-4 w-4" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>

          {/* Pagination */}
          <div className="flex items-center justify-between mt-4">
            <div className="text-sm text-muted-foreground">
              Showing {startIndex + 1} to{" "}
              {Math.min(startIndex + itemsPerPage, filteredReports.length)} of{" "}
              {filteredReports.length} results
            </div>
            <div className="flex items-center space-x-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                disabled={currentPage === 1}
              >
                <ChevronLeft className="h-4 w-4" />
                Previous
              </Button>
              <div className="flex items-center space-x-1">
                {Array.from({ length: totalPages }, (_, i) => i + 1).map(
                  (page) => (
                    <Button
                      key={page}
                      variant={currentPage === page ? "default" : "outline"}
                      size="sm"
                      onClick={() => setCurrentPage(page)}
                      className="w-8 h-8 p-0"
                    >
                      {page}
                    </Button>
                  )
                )}
              </div>
              <Button
                variant="outline"
                size="sm"
                onClick={() =>
                  setCurrentPage((prev) => Math.min(prev + 1, totalPages))
                }
                disabled={currentPage === totalPages}
              >
                Next
                <ChevronRight className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
