"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
    BookOpen,
    Eye,
    EyeOff,
    Loader2,
    CheckCircle,
    ArrowLeft,
} from "lucide-react";
import { useAuth } from "@/context/AuthContext";

/**
 * Forgot Password page
 * Step 1 — Enter email or phone → verify account exists
 * Step 2 — Enter new password + confirm → reset in DB
 * (OTP bypassed for now, can be added later between steps)
 */
export default function ForgotPasswordPage() {
    const router = useRouter();
    const { user, loading } = useAuth();

    // Redirect to home if already logged in
    useEffect(() => {
        if (!loading && user) router.replace("/");
    }, [user, loading, router]);

    // step: "identify" | "reset" | "done"
    const [step, setStep] = useState("identify");

    const [identifier, setIdentifier] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [showNew, setShowNew] = useState(false);
    const [showConfirm, setShowConfirm] = useState(false);

    const [submitting, setSubmitting] = useState(false);
    const [error, setError] = useState(null);

    // ── Step 1: check account exists ─────────────────────────────────
    const handleIdentify = async (e) => {
        e.preventDefault();
        setError(null);
        setSubmitting(true);

        try {
            // Lightweight check — attempt reset with a dummy payload just to see
            // if the account exists. We use a pre-check endpoint pattern:
            // send identifier only, server returns 404 if not found, 200 if found.
            const res = await fetch("/api/auth/reset-password", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    identifier,
                    newPassword: "__preflight__",
                    confirmPassword: "__preflight__",
                }),
            });

            const data = await res.json();

            // 404 = user not found
            if (res.status === 404) {
                setError(data.error);
                return;
            }

            // Any other non-400 validation error means the account exists
            // (400 here means "password too short" which means account was found)
            if (res.status === 404) {
                setError(data.error);
                return;
            }

            // Account exists — move to password reset step
            setStep("reset");
        } catch {
            setError("Something went wrong. Please try again.");
        } finally {
            setSubmitting(false);
        }
    };

    // ── Step 2: reset password ────────────────────────────────────────
    const handleReset = async (e) => {
        e.preventDefault();
        setError(null);

        if (newPassword.length < 6) {
            setError("Password must be at least 6 characters.");
            return;
        }
        if (newPassword !== confirmPassword) {
            setError("Passwords do not match.");
            return;
        }

        setSubmitting(true);

        try {
            const res = await fetch("/api/auth/reset-password", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    identifier,
                    newPassword,
                    confirmPassword,
                }),
            });

            const data = await res.json();

            if (!res.ok || !data.success) {
                setError(data.error || "Reset failed. Please try again.");
                return;
            }

            setStep("done");
        } catch {
            setError("Something went wrong. Please try again.");
        } finally {
            setSubmitting(false);
        }
    };

    if (loading || user) return null;

    return (
        <div className="min-h-screen bg-linear-to-b from-slate-950 via-slate-900 to-slate-950 flex flex-col">
            {/* Header */}
            <header className="border-b border-slate-800 bg-slate-950/95">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
                    <Link href="/" className="flex items-center gap-2 w-fit">
                        <div className="w-10 h-10 rounded-full bg-linear-to-br from-purple-500 to-pink-500 flex items-center justify-center">
                            <BookOpen className="w-6 h-6 text-white" />
                        </div>
                        <h1 className="text-2xl font-bold bg-linear-to-r from-purple-400 via-pink-400 to-orange-400 bg-clip-text text-transparent">
                            Kids Katha
                        </h1>
                    </Link>
                </div>
            </header>

            <main className="flex-1 flex items-center justify-center px-4 py-12">
                <Card className="w-full max-w-md bg-slate-800/50 border-slate-700 p-8">
                    {/* ── Step 1: Enter email / phone ── */}
                    {step === "identify" && (
                        <>
                            <div className="mb-8">
                                <h2 className="text-3xl font-bold text-white mb-2">
                                    Forgot Password
                                </h2>
                                <p className="text-slate-400">
                                    Enter your email or phone number and we'll
                                    let you reset your password.
                                </p>
                            </div>

                            <form
                                onSubmit={handleIdentify}
                                className="space-y-5"
                            >
                                <div>
                                    <label className="block text-sm font-medium text-slate-300 mb-2">
                                        Email or Phone Number
                                    </label>
                                    <Input
                                        type="text"
                                        value={identifier}
                                        onChange={(e) =>
                                            setIdentifier(e.target.value)
                                        }
                                        placeholder="you@example.com or 9876543210"
                                        className="bg-slate-700/50 border-slate-600 text-white placeholder:text-slate-500 focus:border-purple-500"
                                        required
                                        autoFocus
                                    />
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
                                            Checking...
                                        </span>
                                    ) : (
                                        "Continue"
                                    )}
                                </Button>
                            </form>

                            <div className="mt-6 text-center">
                                <Link
                                    href="/login"
                                    className="text-sm text-slate-400 hover:text-slate-300 flex items-center justify-center gap-1 transition-colors"
                                >
                                    <ArrowLeft className="w-3.5 h-3.5" /> Back
                                    to Login
                                </Link>
                            </div>
                        </>
                    )}

                    {/* ── Step 2: New password ── */}
                    {step === "reset" && (
                        <>
                            <div className="mb-8">
                                <h2 className="text-3xl font-bold text-white mb-2">
                                    Reset Password
                                </h2>
                                <p className="text-slate-400">
                                    Set a new password for{" "}
                                    <span className="text-purple-300 font-medium">
                                        {identifier}
                                    </span>
                                </p>
                            </div>

                            <form onSubmit={handleReset} className="space-y-5">
                                {/* New password */}
                                <div>
                                    <label className="block text-sm font-medium text-slate-300 mb-2">
                                        New Password
                                    </label>
                                    <div className="relative">
                                        <Input
                                            type={showNew ? "text" : "password"}
                                            value={newPassword}
                                            onChange={(e) =>
                                                setNewPassword(e.target.value)
                                            }
                                            placeholder="At least 6 characters"
                                            className="bg-slate-700/50 border-slate-600 text-white placeholder:text-slate-500 focus:border-purple-500 pr-10"
                                            required
                                            autoFocus
                                        />
                                        <button
                                            type="button"
                                            onClick={() => setShowNew(!showNew)}
                                            className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-200 transition-colors"
                                            tabIndex={-1}
                                        >
                                            {showNew ? (
                                                <EyeOff className="w-4 h-4" />
                                            ) : (
                                                <Eye className="w-4 h-4" />
                                            )}
                                        </button>
                                    </div>
                                </div>

                                {/* Confirm password */}
                                <div>
                                    <label className="block text-sm font-medium text-slate-300 mb-2">
                                        Confirm New Password
                                    </label>
                                    <div className="relative">
                                        <Input
                                            type={
                                                showConfirm
                                                    ? "text"
                                                    : "password"
                                            }
                                            value={confirmPassword}
                                            onChange={(e) =>
                                                setConfirmPassword(
                                                    e.target.value,
                                                )
                                            }
                                            placeholder="Re-enter your new password"
                                            className="bg-slate-700/50 border-slate-600 text-white placeholder:text-slate-500 focus:border-purple-500 pr-10"
                                            required
                                        />
                                        <button
                                            type="button"
                                            onClick={() =>
                                                setShowConfirm(!showConfirm)
                                            }
                                            className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-200 transition-colors"
                                            tabIndex={-1}
                                        >
                                            {showConfirm ? (
                                                <EyeOff className="w-4 h-4" />
                                            ) : (
                                                <Eye className="w-4 h-4" />
                                            )}
                                        </button>
                                    </div>
                                </div>

                                {/* Password match indicator */}
                                {confirmPassword.length > 0 && (
                                    <p
                                        className={`text-xs ${newPassword === confirmPassword ? "text-green-400" : "text-red-400"}`}
                                    >
                                        {newPassword === confirmPassword
                                            ? "✓ Passwords match"
                                            : "✗ Passwords do not match"}
                                    </p>
                                )}

                                {error && (
                                    <div className="bg-red-900/20 border border-red-500/50 rounded-lg p-3 text-red-300 text-sm">
                                        {error}
                                    </div>
                                )}

                                <Button
                                    type="submit"
                                    disabled={
                                        submitting ||
                                        newPassword !== confirmPassword ||
                                        newPassword.length < 6
                                    }
                                    className="w-full bg-linear-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white h-11 text-base disabled:opacity-50"
                                >
                                    {submitting ? (
                                        <span className="flex items-center gap-2">
                                            <Loader2 className="w-4 h-4 animate-spin" />{" "}
                                            Resetting...
                                        </span>
                                    ) : (
                                        "Reset Password"
                                    )}
                                </Button>
                            </form>

                            <div className="mt-4 text-center">
                                <button
                                    onClick={() => {
                                        setStep("identify");
                                        setError(null);
                                    }}
                                    className="text-sm text-slate-400 hover:text-slate-300 flex items-center justify-center gap-1 transition-colors mx-auto"
                                >
                                    <ArrowLeft className="w-3.5 h-3.5" /> Change
                                    email / phone
                                </button>
                            </div>
                        </>
                    )}

                    {/* ── Step 3: Success ── */}
                    {step === "done" && (
                        <div className="text-center py-4">
                            <div className="w-16 h-16 rounded-full bg-green-500/20 flex items-center justify-center mx-auto mb-5">
                                <CheckCircle className="w-8 h-8 text-green-400" />
                            </div>
                            <h2 className="text-2xl font-bold text-white mb-2">
                                Password Reset!
                            </h2>
                            <p className="text-slate-400 mb-8">
                                Your password has been updated successfully. You
                                can now log in with your new password.
                            </p>
                            <Button
                                onClick={() => router.push("/login")}
                                className="w-full bg-linear-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white h-11 text-base"
                            >
                                Go to Login
                            </Button>
                        </div>
                    )}
                </Card>
            </main>
        </div>
    );
}
