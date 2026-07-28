"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { User, Eye, EyeOff, Loader2, CheckCircle } from "lucide-react";
import { useAuth } from "@/context/AuthContext";

export default function ProfilePage() {
    const router = useRouter();
    const { user, loading: authLoading, refreshUser } = useAuth();

    const [profile, setProfile] = useState(null);
    const [loading, setLoading] = useState(true);
    const [name, setName] = useState("");

    const [currentPassword, setCurrentPassword] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [showCurrent, setShowCurrent] = useState(false);
    const [showNew, setShowNew] = useState(false);

    const [submitting, setSubmitting] = useState(false);
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(null);

    useEffect(() => {
        if (!authLoading && !user) router.replace("/login");
    }, [user, authLoading, router]);

    useEffect(() => {
        if (!user) return;
        async function fetchProfile() {
            try {
                const res = await fetch("/api/profile");
                const data = await res.json();
                if (data.success) {
                    setProfile(data.user);
                    setName(data.user.name);
                }
            } finally {
                setLoading(false);
            }
        }
        fetchProfile();
    }, [user]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError(null);
        setSuccess(null);

        if (newPassword && newPassword !== confirmPassword) {
            setError("New passwords do not match.");
            return;
        }
        if (newPassword && newPassword.length < 6) {
            setError("New password must be at least 6 characters.");
            return;
        }

        setSubmitting(true);
        try {
            const payload = { name };
            if (newPassword) {
                payload.currentPassword = currentPassword;
                payload.newPassword = newPassword;
            }

            const res = await fetch("/api/profile", {
                method: "PATCH",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(payload),
            });
            const data = await res.json();

            if (!res.ok || !data.success) {
                setError(data.error || "Failed to update profile.");
                return;
            }

            setSuccess("Profile updated successfully.");
            setCurrentPassword("");
            setNewPassword("");
            setConfirmPassword("");
            refreshUser();
        } catch {
            setError("Something went wrong. Please try again.");
        } finally {
            setSubmitting(false);
        }
    };

    if (authLoading || !user || loading) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <Loader2 className="w-8 h-8 text-purple-400 animate-spin" />
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-linear-to-b from-slate-950 via-slate-900 to-slate-950 px-4 py-12">
            <div className="max-w-lg mx-auto">
                <div className="flex items-center gap-3 mb-8">
                    <div className="w-12 h-12 rounded-full bg-linear-to-br from-purple-500 to-pink-500 flex items-center justify-center">
                        <User className="w-6 h-6 text-white" />
                    </div>
                    <div>
                        <h1 className="text-2xl font-bold text-white">
                            My Profile
                        </h1>
                        <p className="text-slate-400 text-sm">
                            Manage your name and password
                        </p>
                    </div>
                </div>

                <Card className="bg-slate-800/50 border-slate-700 p-6 space-y-6">
                    <form onSubmit={handleSubmit} className="space-y-5">
                        <div>
                            <Label className="text-slate-300 mb-2 block">
                                Name
                            </Label>
                            <Input
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                className="bg-slate-700/50 border-slate-600 text-white"
                                required
                            />
                        </div>

                        <div>
                            <Label className="text-slate-300 mb-2 block">
                                Email / Phone
                            </Label>
                            <Input
                                value={profile?.email || ""}
                                disabled
                                className="bg-slate-800 border-slate-700 text-slate-400 cursor-not-allowed"
                            />
                            <p className="text-xs text-slate-500 mt-1">
                                Contact an admin to change your email or
                                phone number.
                            </p>
                        </div>

                        <div className="border-t border-slate-700 pt-5">
                            <p className="text-sm font-medium text-slate-300 mb-4">
                                Change Password
                            </p>

                            <div className="space-y-4">
                                <div>
                                    <Label className="text-slate-400 mb-2 block text-xs">
                                        Current Password
                                    </Label>
                                    <div className="relative">
                                        <Input
                                            type={
                                                showCurrent
                                                    ? "text"
                                                    : "password"
                                            }
                                            value={currentPassword}
                                            onChange={(e) =>
                                                setCurrentPassword(
                                                    e.target.value,
                                                )
                                            }
                                            className="bg-slate-700/50 border-slate-600 text-white pr-10"
                                            autoComplete="current-password"
                                        />
                                        <button
                                            type="button"
                                            onClick={() =>
                                                setShowCurrent(!showCurrent)
                                            }
                                            className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-200"
                                            tabIndex={-1}
                                        >
                                            {showCurrent ? (
                                                <EyeOff className="w-4 h-4" />
                                            ) : (
                                                <Eye className="w-4 h-4" />
                                            )}
                                        </button>
                                    </div>
                                </div>

                                <div>
                                    <Label className="text-slate-400 mb-2 block text-xs">
                                        New Password
                                    </Label>
                                    <div className="relative">
                                        <Input
                                            type={
                                                showNew ? "text" : "password"
                                            }
                                            value={newPassword}
                                            onChange={(e) =>
                                                setNewPassword(
                                                    e.target.value,
                                                )
                                            }
                                            className="bg-slate-700/50 border-slate-600 text-white pr-10"
                                            placeholder="Leave blank to keep current password"
                                            autoComplete="new-password"
                                        />
                                        <button
                                            type="button"
                                            onClick={() =>
                                                setShowNew(!showNew)
                                            }
                                            className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-200"
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

                                <div>
                                    <Label className="text-slate-400 mb-2 block text-xs">
                                        Confirm New Password
                                    </Label>
                                    <Input
                                        type={showNew ? "text" : "password"}
                                        value={confirmPassword}
                                        onChange={(e) =>
                                            setConfirmPassword(
                                                e.target.value,
                                            )
                                        }
                                        className="bg-slate-700/50 border-slate-600 text-white"
                                        autoComplete="new-password"
                                    />
                                </div>
                            </div>
                        </div>

                        {error && (
                            <div className="bg-red-900/20 border border-red-500/50 rounded-lg p-3 text-red-300 text-sm">
                                {error}
                            </div>
                        )}
                        {success && (
                            <div className="bg-green-900/20 border border-green-500/50 rounded-lg p-3 text-green-300 text-sm flex items-center gap-2">
                                <CheckCircle className="w-4 h-4" />
                                {success}
                            </div>
                        )}

                        <Button
                            type="submit"
                            disabled={submitting}
                            className="w-full bg-linear-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white h-11"
                        >
                            {submitting ? (
                                <Loader2 className="w-4 h-4 animate-spin" />
                            ) : (
                                "Save Changes"
                            )}
                        </Button>
                    </form>
                </Card>
            </div>
        </div>
    );
}
