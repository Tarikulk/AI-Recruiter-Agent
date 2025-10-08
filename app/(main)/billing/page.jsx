"use client"

import React, { useState } from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import { Check } from "lucide-react";
import PayButton from "./_components/PayButton";

const plans = [
  {
    id: "starter",
    name: "Starter",
    tagline: "For individuals getting started",
    monthly: 9,
    yearly: 84, // 2 months free
    features: [
      "1 workspace",
      "Basic analytics",
      "Email support",
    ],
  },
  {
    id: "pro",
    name: "Pro",
    tagline: "For growing teams",
    monthly: 24,
    yearly: 240, // 2 months free
    recommended: true,
    features: [
      "Up to 10 workspaces",
      "Advanced analytics & reports",
      "Priority email support",
      "SSO & provisioning",
    ],
  },
  {
    id: "enterprise",
    name: "Enterprise",
    tagline: "Custom plan for large orgs",
    monthly: 99,
    yearly: 990, // example
    features: [
      "Unlimited workspaces",
      "Dedicated account manager",
      "Custom SLAs",
      "Onboarding + training",
    ],
  },
];

export default function Billing() {
  const [billingYearly, setBillingYearly] = useState(false);

  return (
    <div className="min-h-screen bg-slate-50 py-16 px-6 md:px-12">
      <div className="mx-auto max-w-6xl">
        <div className="text-center">
          <h1 className="text-4xl font-extrabold tracking-tight sm:text-5xl">
            Simple pricing, predictable growth
          </h1>
          <p className="mt-4 max-w-2xl mx-auto text-slate-600">
            Pick the plan that fits your team. Switch between monthly and yearly billing to
            see discounted pricing.
          </p>

          <div className="mt-6 inline-flex items-center gap-3 rounded-full bg-white/40 p-2">
            <span className="text-sm text-slate-600">Monthly</span>
            <Switch
              checked={billingYearly}
              onCheckedChange={(val) => setBillingYearly(Boolean(val))}
              className="relative"
            />
            <span className="text-sm font-medium">Yearly — save up to 2 months</span>
          </div>
        </div>

        <div className="mt-12 grid gap-6 md:grid-cols-3">
          {plans.map((plan) => (
            <Card key={plan.id} className={`overflow-visible relative p-0 shadow-lg`}>
              {plan.recommended && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                  <Badge className="uppercase tracking-wide">Most Popular</Badge>
                </div>
              )}

              <CardHeader className="p-6 pt-8 text-center">
                <CardTitle className="mb-1 text-xl">{plan.name}</CardTitle>
                <p className="text-sm text-slate-600">{plan.tagline}</p>
              </CardHeader>

              <CardContent className="p-6">
                <div className="flex items-baseline justify-center gap-2">
                  <span className="text-3xl font-bold">
                    ${billingYearly ? plan.yearly : plan.monthly}
                  </span>
                  <span className="text-sm text-slate-500">/ {billingYearly ? "yr" : "mo"}</span>
                </div>

                <ul className="mt-6 space-y-3">
                  {plan.features.map((f) => (
                    <li key={f} className="flex items-start gap-3">
                      <span className="mt-1">
                        <Check className="h-4 w-4" />
                      </span>
                      <span className="text-sm text-slate-700">{f}</span>
                    </li>
                  ))}
                </ul>

                <div className="mt-6 flex flex-col gap-3">
                  {plan.id === "enterprise" ? (
                    <Button variant="outline" className="w-full">Contact sales</Button>
                  ) : (
                    <Button className="w-full">Start {plan.name}</Button>
                  )}

                  <Button variant="ghost" className="w-full">Compare features</Button>
                </div>

  

                <PayButton amount={5} credits={50} />

                <p className="mt-4 text-center text-xs text-slate-500">
                  No credit card required. Cancel anytime.
                </p>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="mt-12 bg-gradient-to-r from-white to-slate-50 rounded-lg p-6">
          <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            <div>
              <h3 className="text-lg font-semibold">Have special requirements?</h3>
              <p className="text-sm text-slate-600">We can create a custom plan for your team.</p>
            </div>
            <div className="flex gap-3">
              <Button variant="ghost">Speak with sales</Button>
              <Button>Request a demo</Button>
            </div>
          </div>
        </div>

        <div className="mt-8 text-center text-sm text-slate-500">
          <p>
            All prices are in USD. Taxes may apply where required. For academic and non-profit
            discounts please contact sales.
          </p>
        </div>
      </div>
    </div>
  );
}
