"use client";

import Link from "next/link";
import { BookOpen, ArrowLeft, ShieldQuestion } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

/**
 * Accounts on Kids Katha are created and managed manually by an admin
 * (there is no self-service registration). Because of that, self-service
 * password reset is intentionally disabled here — verifying "forgot
 * password" requests without OTP/email delivery would let anyone reset
 * someone else's password just by knowing their email/phone. Users
 * should contact an admin to have their password reset instead.
 */
export default function ForgotPasswordPage() {
    return (
        <div className="min-h-screen bg-linear-to-b from-slate-950 via-slate-900 to-slate-950 flex flex-col">
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
                <Card className="w-full max-w-md bg-slate-800/50 border-slate-700 p-8 text-center">
                    <div className="w-16 h-16 rounded-full bg-purple-500/20 flex items-center justify-center mx-auto mb-5">
                        <ShieldQuestion className="w-8 h-8 text-purple-300" />
                    </div>
                    <h2 className="text-2xl font-bold text-white mb-2">
                        Need a Password Reset?
                    </h2>
                    <p className="text-slate-400 mb-8">
                        Accounts on Kids Katha are set up by an admin, so
                        please reach out to the admin who gave you your
                        login details — they can reset your password for
                        you.
                    </p>
                    <Link href="/login">
                        <Button className="w-full bg-linear-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white h-11 text-base flex items-center justify-center gap-2">
                            <ArrowLeft className="w-4 h-4" /> Back to Login
                        </Button>
                    </Link>
                </Card>
            </main>
        </div>
    );
}
