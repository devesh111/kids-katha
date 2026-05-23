"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { BookOpen, Eye, EyeOff, Loader2 } from "lucide-react";
import { useAuth } from "@/context/AuthContext";

export default function LoginPage() {
    const router = useRouter();
    const { user, loading, refreshUser } = useAuth();

    const [identifier, setIdentifier] = useState("");
    const [password, setPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [submitting, setSubmitting] = useState(false);
    const [error, setError] = useState(null);

    // Redirect to home if already logged in
    useEffect(() => {
        if (!loading && user) {
            router.replace("/");
        }
    }, [user, loading, router]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setSubmitting(true);
        setError(null);

        try {
            const res = await fetch("/api/auth/login", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ identifier, password }),
            });

            const data = await res.json();

            if (!res.ok || !data.success) {
                setError(data.error || "Login failed. Please try again.");
                return;
            }

            if (data.token) localStorage.setItem("kk_token", data.token);

            // Refresh auth context so header updates immediately
            await refreshUser();
            router.replace("/");
        } catch {
            setError("Something went wrong. Please try again.");
        } finally {
            setSubmitting(false);
        }
    };

    // Show nothing while checking auth (prevents flash of login form)
    if (loading || user) return null;

    return (
        <div className="min-h-screen bg-linear-to-b from-slate-950 via-slate-900 to-slate-950 flex flex-col">
            <main className="flex-1 flex items-center justify-center px-4 py-12">
                <Card className="w-full max-w-md bg-slate-800/50 border-slate-700 p-8">
                    <div className="mb-8">
                        <h2 className="text-3xl font-bold text-white mb-2">
                            Welcome Back
                        </h2>
                        <p className="text-slate-400">
                            Sign in to your Kids Katha account
                        </p>
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-5">
                        <div>
                            <label className="block text-sm font-medium text-slate-300 mb-2">
                                Email or Phone Number
                            </label>
                            <Input
                                type="text"
                                value={identifier}
                                onChange={(e) => setIdentifier(e.target.value)}
                                placeholder="you@example.com or 9876543210"
                                className="bg-slate-700/50 border-slate-600 text-white placeholder:text-slate-500 focus:border-purple-500"
                                required
                                autoComplete="username"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-slate-300 mb-2">
                                Password
                            </label>
                            <div className="relative">
                                <Input
                                    type={showPassword ? "text" : "password"}
                                    value={password}
                                    onChange={(e) =>
                                        setPassword(e.target.value)
                                    }
                                    placeholder="••••••••"
                                    className="bg-slate-700/50 border-slate-600 text-white placeholder:text-slate-500 focus:border-purple-500 pr-10"
                                    required
                                    autoComplete="current-password"
                                />
                                <button
                                    type="button"
                                    onClick={() =>
                                        setShowPassword(!showPassword)
                                    }
                                    className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-200 transition-colors"
                                    tabIndex={-1}
                                >
                                    {showPassword ? (
                                        <EyeOff className="w-4 h-4" />
                                    ) : (
                                        <Eye className="w-4 h-4" />
                                    )}
                                </button>
                            </div>
                        </div>

                        {error && (
                            <div className="bg-red-900/20 border border-red-500/50 rounded-lg p-3 text-red-300 text-sm">
                                {error}
                            </div>
                        )}

                        <Button
                            type="submit"
                            disabled={submitting}
                            className="w-full bg-linear-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white h-11 text-base"
                        >
                            {submitting ? (
                                <span className="flex items-center gap-2">
                                    <Loader2 className="w-4 h-4 animate-spin" />{" "}
                                    Signing in...
                                </span>
                            ) : (
                                "Sign In"
                            )}
                        </Button>
                    </form>

                    <div className="mt-6 text-center">
                        <Link
                            href="/forgot-password"
                            className="text-sm text-slate-400 hover:text-slate-300 transition-colors"
                        >
                            Forgot password?
                        </Link>
                    </div>
                </Card>
            </main>
        </div>
    );
}
