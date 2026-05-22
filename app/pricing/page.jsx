"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { BookOpen, Check } from "lucide-react";

/**
 * Pricing page
 * Displays subscription plans and features
 */
export default function PricingPage() {
    const plans = [
        {
            name: "Free",
            price: "₹0",
            period: "Forever",
            description: "Perfect for trying out Kids Katha",
            features: [
                "Access to 4 free stories",
                "English and Hindi audio",
                "Save listening progress",
                "Mobile friendly",
            ],
            cta: "Get Started",
            highlighted: false,
        },
        {
            name: "Monthly",
            price: "₹99",
            period: "per month",
            description: "Unlimited access for one month",
            features: [
                "All 284+ stories",
                "English and Hindi audio",
                "Save listening progress",
                "Offline downloads",
                "Ad-free experience",
                "Family sharing (up to 4 users)",
            ],
            cta: "Subscribe Now",
            highlighted: true,
        },
        {
            name: "Yearly",
            price: "₹999",
            period: "per year",
            description: "Best value - save 16%",
            features: [
                "All 284+ stories",
                "English and Hindi audio",
                "Save listening progress",
                "Offline downloads",
                "Ad-free experience",
                "Family sharing (up to 4 users)",
                "Priority support",
            ],
            cta: "Subscribe Now",
            highlighted: false,
        },
    ];

    return (
        <div className="min-h-screen bg-linear-to-b from-slate-950 via-slate-900 to-slate-950">
            {/* Main Content */}
            <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
                {/* Header */}
                <div className="text-center mb-16">
                    <h2 className="text-5xl font-bold text-white mb-4">
                        Simple, Transparent Pricing
                    </h2>
                    <p className="text-xl text-slate-300 max-w-2xl mx-auto">
                        Choose the perfect plan for your family. Start free,
                        upgrade anytime.
                    </p>
                </div>

                {/* Pricing Cards */}
                <div className="grid md:grid-cols-3 gap-8 mb-16">
                    {plans.map((plan) => (
                        <Card
                            key={plan.name}
                            className={`relative overflow-visible p-8 transition-all ${
                                plan.highlighted
                                    ? "bg-linear-to-br from-purple-900/50 to-pink-900/50 border-purple-500/50 shadow-lg shadow-purple-500/20 md:scale-105"
                                    : "bg-slate-800/50 border-slate-700"
                            }`}
                        >
                            {plan.highlighted && (
                                <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-10">
                                    <span className="bg-linear-to-r from-purple-500 to-pink-500 text-white px-4 py-1 rounded-full text-sm font-semibold">
                                        Most Popular
                                    </span>
                                </div>
                            )}

                            <h3 className="text-2xl font-bold text-white">
                                {plan.name}
                            </h3>
                            <p className="text-slate-400 text-sm">
                                {plan.description}
                            </p>

                            <div className="mb-0">
                                <span className="text-4xl font-bold text-white">
                                    {plan.price}
                                </span>
                                <span className="text-slate-400 ml-2">
                                    {plan.period}
                                </span>
                            </div>

                            <Button
                                className={`w-full mb-2 text-white ${
                                    plan.highlighted
                                        ? "bg-linear-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700"
                                        : "bg-slate-700 hover:bg-slate-600"
                                }`}
                            >
                                {plan.cta}
                            </Button>

                            <div className="space-y-4">
                                {plan.features.map((feature) => (
                                    <div
                                        key={feature}
                                        className="flex items-start gap-3"
                                    >
                                        <Check className="w-5 h-5 text-green-400 shrink-0 mt-0.5" />
                                        <span className="text-slate-300">
                                            {feature}
                                        </span>
                                    </div>
                                ))}
                            </div>
                        </Card>
                    ))}
                </div>

                {/* FAQ Section */}
                <div className="bg-slate-800/30 border border-slate-700 rounded-lg p-12">
                    <h3 className="text-3xl font-bold text-white mb-8 text-center">
                        Frequently Asked Questions
                    </h3>
                    <div className="grid md:grid-cols-2 gap-8">
                        <div>
                            <h4 className="text-lg font-semibold text-white mb-2">
                                Can I cancel anytime?
                            </h4>
                            <p className="text-slate-400">
                                Yes! You can cancel your subscription at any
                                time. No questions asked.
                            </p>
                        </div>
                        <div>
                            <h4 className="text-lg font-semibold text-white mb-2">
                                Is there a free trial?
                            </h4>
                            <p className="text-slate-400">
                                Yes! Start with our free plan and upgrade
                                whenever you're ready.
                            </p>
                        </div>
                        <div>
                            <h4 className="text-lg font-semibold text-white mb-2">
                                Can I share with family?
                            </h4>
                            <p className="text-slate-400">
                                Absolutely! Premium plans include family sharing
                                for up to 4 users.
                            </p>
                        </div>
                        <div>
                            <h4 className="text-lg font-semibold text-white mb-2">
                                What payment methods do you accept?
                            </h4>
                            <p className="text-slate-400">
                                We accept all major credit cards, debit cards,
                                and digital wallets.
                            </p>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
}
