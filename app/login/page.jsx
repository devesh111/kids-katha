"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { BookOpen } from "lucide-react";
import { useState } from "react";

/**
 * Login page
 * Allows users to authenticate with email and password
 * Stores JWT tokens in HTTP-only cookies
 */
export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      // TODO: Implement login API endpoint
      // const response = await fetch("/api/auth/login", {
      //   method: "POST",
      //   headers: { "Content-Type": "application/json" },
      //   body: JSON.stringify({ email, password }),
      // });
      // if (!response.ok) throw new Error("Login failed");
      // Redirect to dashboard
      // window.location.href = "/account";
      alert("Login functionality coming soon!");
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950 flex flex-col">
      {/* Header */}
      <header className="border-b border-slate-800 bg-slate-950/95 backdrop-blur">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center">
              <BookOpen className="w-6 h-6 text-white" />
            </div>
            <h1 className="text-2xl font-bold bg-gradient-to-r from-purple-400 via-pink-400 to-orange-400 bg-clip-text text-transparent">
              Kids Katha
            </h1>
          </Link>
          <Link href="/">
            <Button variant="ghost" className="text-slate-300 hover:text-white">
              Back to Home
            </Button>
          </Link>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 flex items-center justify-center px-4 py-12">
        <Card className="w-full max-w-md bg-slate-800/50 border-slate-700 p-8">
          <h2 className="text-3xl font-bold text-white mb-2">Welcome Back</h2>
          <p className="text-slate-400 mb-8">Sign in to your Kids Katha account</p>

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Email Input */}
            <div>
              <label className="block text-sm font-medium text-slate-300 mb-2">
                Email Address
              </label>
              <Input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@example.com"
                className="bg-slate-700/50 border-slate-600 text-white placeholder:text-slate-500"
                required
              />
            </div>

            {/* Password Input */}
            <div>
              <label className="block text-sm font-medium text-slate-300 mb-2">
                Password
              </label>
              <Input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="bg-slate-700/50 border-slate-600 text-white placeholder:text-slate-500"
                required
              />
            </div>

            {/* Error Message */}
            {error && (
              <div className="bg-red-900/20 border border-red-500/50 rounded p-3 text-red-300 text-sm">
                {error}
              </div>
            )}

            {/* Submit Button */}
            <Button
              type="submit"
              disabled={loading}
              className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white"
            >
              {loading ? "Signing in..." : "Sign In"}
            </Button>
          </form>

          {/* Links */}
          <div className="mt-6 space-y-3 text-center text-sm">
            <p className="text-slate-400">
              Don't have an account?{" "}
              <Link href="/register" className="text-purple-400 hover:text-purple-300">
                Sign up
              </Link>
            </p>
            <p>
              <Link href="/forgot-password" className="text-slate-400 hover:text-slate-300">
                Forgot password?
              </Link>
            </p>
          </div>
        </Card>
      </main>
    </div>
  );
}
