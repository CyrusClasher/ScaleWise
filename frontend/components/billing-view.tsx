"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { CreditCard, Plus, Zap, TrendingUp, Calendar } from "lucide-react";

export function BillingView() {
  const [showPaymentModal, setShowPaymentModal] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState("");

  const creditPlans = [
    { credits: 1000, price: 49, popular: false },
    { credits: 5000, price: 199, popular: true },
    { credits: 10000, price: 349, popular: false },
    { credits: 25000, price: 799, popular: false },
  ];

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Billing & Credits</h1>
      </div>

      {/* Current Balance */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="md:col-span-2">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Zap className="h-5 w-5 text-yellow-500" />
              <span>Current Balance</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <div className="text-4xl font-bold">2,450</div>
                  <div className="text-muted-foreground">Credits Remaining</div>
                </div>
                <Badge className="bg-green-500/10 text-green-600 dark:text-green-400">
                  Active
                </Badge>
              </div>
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span>Usage this month</span>
                  <span>1,550 / 4,000 credits</span>
                </div>
                <Progress value={38.75} className="h-2" />
              </div>
              <div className="grid grid-cols-2 gap-4 pt-4">
                <div className="text-center p-3 rounded-lg bg-muted/50">
                  <div className="text-2xl font-bold text-blue-500">127</div>
                  <div className="text-sm text-muted-foreground">
                    Forecasts Run
                  </div>
                </div>
                <div className="text-center p-3 rounded-lg bg-muted/50">
                  <div className="text-2xl font-bold text-purple-500">12.2</div>
                  <div className="text-sm text-muted-foreground">
                    Avg Credits/Forecast
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <TrendingUp className="h-5 w-5 text-green-500" />
              <span>Usage Trend</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="text-center">
                <div className="text-2xl font-bold text-green-500">+23%</div>
                <div className="text-sm text-muted-foreground">
                  vs last month
                </div>
              </div>
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span>This month</span>
                  <span>1,550</span>
                </div>
                <div className="flex justify-between text-sm text-muted-foreground">
                  <span>Last month</span>
                  <span>1,260</span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Credit Plans */}
      <Card>
        <CardHeader>
          <CardTitle>Buy More Credits</CardTitle>
          <p className="text-muted-foreground">
            Choose a credit package that fits your forecasting needs
          </p>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {creditPlans.map((plan) => (
              <Card
                key={plan.credits}
                className={`relative cursor-pointer transition-all hover:shadow-lg ${
                  plan.popular ? "ring-2 ring-indigo-500 shadow-lg" : ""
                }`}
                onClick={() => setSelectedPlan(plan.credits.toString())}
              >
                {plan.popular && (
                  <Badge className="absolute -top-2 left-1/2 transform -translate-x-1/2 bg-indigo-500">
                    Most Popular
                  </Badge>
                )}
                <CardContent className="p-6 text-center">
                  <div className="text-3xl font-bold">
                    {plan.credits.toLocaleString()}
                  </div>
                  <div className="text-sm text-muted-foreground mb-4">
                    Credits
                  </div>
                  <div className="text-2xl font-bold text-green-500">
                    ${plan.price}
                  </div>
                  <div className="text-sm text-muted-foreground mb-4">
                    ${((plan.price / plan.credits) * 1000).toFixed(2)}/1K
                    credits
                  </div>
                  <Dialog
                    open={showPaymentModal}
                    onOpenChange={setShowPaymentModal}
                  >
                    <DialogTrigger asChild>
                      <Button
                        className="w-full"
                        variant={plan.popular ? "default" : "outline"}
                        onClick={() => setSelectedPlan(plan.credits.toString())}
                      >
                        <Plus className="w-4 h-4 mr-2" />
                        Buy Credits
                      </Button>
                    </DialogTrigger>
                    <DialogContent>
                      <DialogHeader>
                        <DialogTitle>Purchase Credits</DialogTitle>
                        <DialogDescription>
                          {selectedPlan
                            ? `You're about to purchase ${parseInt(
                                selectedPlan
                              ).toLocaleString()} credits.`
                            : "Select a plan to continue."}
                        </DialogDescription>
                        {/* <DialogDescription>
                          You&rsquo;re about to purchase{" "}
                          {plan.credits.toLocaleString()} credits for $
                          {plan.price}
                        </DialogDescription> */}
                      </DialogHeader>
                      <div className="space-y-4">
                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <Label htmlFor="card-number">Card Number</Label>
                            <Input
                              id="card-number"
                              placeholder="1234 5678 9012 3456"
                            />
                          </div>
                          <div>
                            <Label htmlFor="expiry">Expiry</Label>
                            <Input id="expiry" placeholder="MM/YY" />
                          </div>
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <Label htmlFor="cvc">CVC</Label>
                            <Input id="cvc" placeholder="123" />
                          </div>
                          <div>
                            <Label htmlFor="zip">ZIP Code</Label>
                            <Input id="zip" placeholder="12345" />
                          </div>
                        </div>
                        <Button className="w-full bg-gradient-to-r from-indigo-500 to-cyan-500">
                          <CreditCard className="w-4 h-4 mr-2" />
                          Complete Purchase
                        </Button>
                      </div>
                    </DialogContent>
                  </Dialog>
                </CardContent>
              </Card>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Billing History */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Calendar className="h-5 w-5" />
            <span>Recent Transactions</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {[
              {
                date: "2024-01-15",
                description: "5,000 Credits Purchase",
                amount: "$199.00",
                status: "Completed",
              },
              {
                date: "2024-01-01",
                description: "1,000 Credits Purchase",
                amount: "$49.00",
                status: "Completed",
              },
              {
                date: "2023-12-15",
                description: "10,000 Credits Purchase",
                amount: "$349.00",
                status: "Completed",
              },
            ].map((transaction, index) => (
              <div
                key={index}
                className="flex items-center justify-between p-4 rounded-lg border"
              >
                <div>
                  <div className="font-medium">{transaction.description}</div>
                  <div className="text-sm text-muted-foreground">
                    {transaction.date}
                  </div>
                </div>
                <div className="text-right">
                  <div className="font-medium">{transaction.amount}</div>
                  <Badge
                    variant="secondary"
                    className="bg-green-500/10 text-green-600 dark:text-green-400"
                  >
                    {transaction.status}
                  </Badge>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
