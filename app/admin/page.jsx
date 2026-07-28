"use client";

import { useState, useEffect, useCallback } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card } from "@/components/ui/card";
import {
    Table,
    TableHeader,
    TableBody,
    TableHead,
    TableRow,
    TableCell,
} from "@/components/ui/table";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogFooter,
    DialogTrigger,
} from "@/components/ui/dialog";
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import {
    Search,
    Plus,
    Pencil,
    Trash2,
    Loader2,
    RefreshCcw,
    LogOut,
    Copy,
    Check,
} from "lucide-react";
import { useAdminAuth } from "@/context/AdminAuthContext";
import { generatePassword } from "@/lib/password";

export default function AdminDashboardPage() {
    const router = useRouter();
    const { admin, loading: authLoading, logout } = useAdminAuth();

    const [users, setUsers] = useState([]);
    const [loadingUsers, setLoadingUsers] = useState(true);
    const [query, setQuery] = useState("");
    const [error, setError] = useState(null);

    // Add-user dialog state
    const [addOpen, setAddOpen] = useState(false);
    const [addForm, setAddForm] = useState({ name: "", email: "", password: "" });
    const [addSubmitting, setAddSubmitting] = useState(false);
    const [addError, setAddError] = useState(null);
    const [copied, setCopied] = useState(false);

    // Edit-user dialog state
    const [editUser, setEditUser] = useState(null); // user object or null
    const [editForm, setEditForm] = useState({ name: "", email: "", password: "" });
    const [editSubmitting, setEditSubmitting] = useState(false);
    const [editError, setEditError] = useState(null);

    const [deletingId, setDeletingId] = useState(null);

    useEffect(() => {
        if (!authLoading && !admin) router.replace("/admin/login");
    }, [admin, authLoading, router]);

    const fetchUsers = useCallback(async (q) => {
        setLoadingUsers(true);
        setError(null);
        try {
            const url = q
                ? `/api/admin/users?q=${encodeURIComponent(q)}`
                : "/api/admin/users";
            const res = await fetch(url);
            const data = await res.json();
            if (!res.ok || !data.success) {
                if (res.status === 401) {
                    router.replace("/admin/login");
                    return;
                }
                throw new Error(data.error || "Failed to load users.");
            }
            setUsers(data.users);
        } catch (err) {
            setError(err.message);
        } finally {
            setLoadingUsers(false);
        }
    }, [router]);

    useEffect(() => {
        if (admin) fetchUsers();
    }, [admin, fetchUsers]);

    const handleSearchSubmit = (e) => {
        e.preventDefault();
        fetchUsers(query);
    };

    // ── Add user ─────────────────────────────────────────────
    const openAddDialog = () => {
        setAddForm({ name: "", email: "", password: generatePassword() });
        setAddError(null);
        setCopied(false);
        setAddOpen(true);
    };

    const handleAddSubmit = async (e) => {
        e.preventDefault();
        setAddSubmitting(true);
        setAddError(null);
        try {
            const res = await fetch("/api/admin/users", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(addForm),
            });
            const data = await res.json();
            if (!res.ok || !data.success) {
                throw new Error(data.error || "Failed to create user.");
            }
            setAddOpen(false);
            fetchUsers(query);
        } catch (err) {
            setAddError(err.message);
        } finally {
            setAddSubmitting(false);
        }
    };

    const copyPassword = async () => {
        try {
            await navigator.clipboard.writeText(addForm.password);
            setCopied(true);
            setTimeout(() => setCopied(false), 1500);
        } catch {}
    };

    // ── Edit user ────────────────────────────────────────────
    const openEditDialog = (user) => {
        setEditUser(user);
        setEditForm({ name: user.name, email: user.email, password: "" });
        setEditError(null);
    };

    const handleEditSubmit = async (e) => {
        e.preventDefault();
        setEditSubmitting(true);
        setEditError(null);
        try {
            const payload = {
                name: editForm.name,
                email: editForm.email,
            };
            if (editForm.password.trim()) {
                payload.password = editForm.password.trim();
            }
            const res = await fetch(`/api/admin/users/${editUser.id}`, {
                method: "PATCH",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(payload),
            });
            const data = await res.json();
            if (!res.ok || !data.success) {
                throw new Error(data.error || "Failed to update user.");
            }
            setEditUser(null);
            fetchUsers(query);
        } catch (err) {
            setEditError(err.message);
        } finally {
            setEditSubmitting(false);
        }
    };

    // ── Delete user ──────────────────────────────────────────
    const handleDelete = async (id) => {
        setDeletingId(id);
        try {
            const res = await fetch(`/api/admin/users/${id}`, {
                method: "DELETE",
            });
            const data = await res.json();
            if (!res.ok || !data.success) {
                throw new Error(data.error || "Failed to delete user.");
            }
            setUsers((prev) => prev.filter((u) => u.id !== id));
        } catch (err) {
            setError(err.message);
        } finally {
            setDeletingId(null);
        }
    };

    if (authLoading || !admin) return null;

    return (
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
            {/* Header */}
            <div className="flex flex-wrap items-center justify-between gap-4 mb-8">
                <div>
                    <h1 className="text-2xl font-bold text-white">
                        Admin Dashboard
                    </h1>
                    <p className="text-slate-400 text-sm">
                        Signed in as{" "}
                        <span className="text-purple-300">
                            {admin.username}
                        </span>
                    </p>
                </div>
                <Button
                    onClick={logout}
                    variant="ghost"
                    className="text-slate-300 hover:text-white gap-2"
                >
                    <LogOut className="w-4 h-4" />
                    Logout
                </Button>
            </div>

            <Card className="bg-slate-900 border-slate-800 p-6">
                <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
                    <h2 className="text-lg font-semibold text-white">
                        Users
                    </h2>
                    <div className="flex items-center gap-2">
                        <form
                            onSubmit={handleSearchSubmit}
                            className="flex items-center gap-2"
                        >
                            <div className="relative">
                                <Search className="w-4 h-4 text-slate-500 absolute left-3 top-1/2 -translate-y-1/2" />
                                <Input
                                    value={query}
                                    onChange={(e) =>
                                        setQuery(e.target.value)
                                    }
                                    placeholder="Search name or email/phone"
                                    className="bg-slate-800 border-slate-700 text-white pl-9 w-64"
                                />
                            </div>
                            <Button
                                type="submit"
                                variant="secondary"
                                className="bg-slate-800 hover:bg-slate-700 text-white"
                            >
                                Search
                            </Button>
                        </form>
                        <Button
                            variant="ghost"
                            onClick={() => fetchUsers(query)}
                            className="text-slate-300 hover:text-white"
                            title="Refresh"
                        >
                            <RefreshCcw className="w-4 h-4" />
                        </Button>
                        <Dialog open={addOpen} onOpenChange={setAddOpen}>
                            <DialogTrigger asChild>
                                <Button
                                    onClick={openAddDialog}
                                    className="bg-linear-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white gap-2"
                                >
                                    <Plus className="w-4 h-4" />
                                    Add User
                                </Button>
                            </DialogTrigger>
                            <DialogContent className="bg-slate-900 border-slate-800 text-white">
                                <DialogHeader>
                                    <DialogTitle>Add New User</DialogTitle>
                                </DialogHeader>
                                <form
                                    onSubmit={handleAddSubmit}
                                    className="space-y-4"
                                >
                                    <div>
                                        <Label className="text-slate-300 mb-2 block">
                                            Name
                                        </Label>
                                        <Input
                                            value={addForm.name}
                                            onChange={(e) =>
                                                setAddForm((f) => ({
                                                    ...f,
                                                    name: e.target.value,
                                                }))
                                            }
                                            className="bg-slate-800 border-slate-700 text-white"
                                            required
                                        />
                                    </div>
                                    <div>
                                        <Label className="text-slate-300 mb-2 block">
                                            Email or Phone
                                        </Label>
                                        <Input
                                            value={addForm.email}
                                            onChange={(e) =>
                                                setAddForm((f) => ({
                                                    ...f,
                                                    email: e.target.value,
                                                }))
                                            }
                                            className="bg-slate-800 border-slate-700 text-white"
                                            required
                                        />
                                    </div>
                                    <div>
                                        <Label className="text-slate-300 mb-2 block">
                                            Password
                                        </Label>
                                        <div className="flex gap-2">
                                            <Input
                                                value={addForm.password}
                                                onChange={(e) =>
                                                    setAddForm((f) => ({
                                                        ...f,
                                                        password:
                                                            e.target.value,
                                                    }))
                                                }
                                                className="bg-slate-800 border-slate-700 text-white font-mono"
                                                required
                                                minLength={6}
                                            />
                                            <Button
                                                type="button"
                                                variant="secondary"
                                                className="bg-slate-800 hover:bg-slate-700 text-white shrink-0"
                                                onClick={() =>
                                                    setAddForm((f) => ({
                                                        ...f,
                                                        password:
                                                            generatePassword(),
                                                    }))
                                                }
                                            >
                                                Generate
                                            </Button>
                                            <Button
                                                type="button"
                                                variant="secondary"
                                                className="bg-slate-800 hover:bg-slate-700 text-white shrink-0"
                                                onClick={copyPassword}
                                                title="Copy password"
                                            >
                                                {copied ? (
                                                    <Check className="w-4 h-4" />
                                                ) : (
                                                    <Copy className="w-4 h-4" />
                                                )}
                                            </Button>
                                        </div>
                                        <p className="text-xs text-slate-500 mt-1">
                                            Share this password with the
                                            user directly — it won't be
                                            shown again.
                                        </p>
                                    </div>

                                    {addError && (
                                        <div className="bg-red-900/20 border border-red-500/50 rounded-lg p-3 text-red-300 text-sm">
                                            {addError}
                                        </div>
                                    )}

                                    <DialogFooter>
                                        <Button
                                            type="submit"
                                            disabled={addSubmitting}
                                            className="bg-linear-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white"
                                        >
                                            {addSubmitting ? (
                                                <Loader2 className="w-4 h-4 animate-spin" />
                                            ) : (
                                                "Create User"
                                            )}
                                        </Button>
                                    </DialogFooter>
                                </form>
                            </DialogContent>
                        </Dialog>
                    </div>
                </div>

                {error && (
                    <div className="bg-red-900/20 border border-red-500/50 rounded-lg p-3 text-red-300 text-sm mb-4">
                        {error}
                    </div>
                )}

                {loadingUsers ? (
                    <div className="flex items-center justify-center py-16 text-slate-400">
                        <Loader2 className="w-5 h-5 animate-spin mr-2" />
                        Loading users...
                    </div>
                ) : users.length === 0 ? (
                    <p className="text-slate-400 text-center py-16">
                        No users found.
                    </p>
                ) : (
                    <Table>
                        <TableHeader>
                            <TableRow className="border-slate-800">
                                <TableHead className="text-slate-400">
                                    Name
                                </TableHead>
                                <TableHead className="text-slate-400">
                                    Email / Phone
                                </TableHead>
                                <TableHead className="text-slate-400">
                                    Joined
                                </TableHead>
                                <TableHead className="text-slate-400 text-right">
                                    Actions
                                </TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {users.map((u) => (
                                <TableRow
                                    key={u.id}
                                    className="border-slate-800"
                                >
                                    <TableCell className="text-white">
                                        {u.name}
                                    </TableCell>
                                    <TableCell className="text-slate-300">
                                        {u.email}
                                    </TableCell>
                                    <TableCell className="text-slate-400">
                                        {new Date(
                                            u.created_at,
                                        ).toLocaleDateString()}
                                    </TableCell>
                                    <TableCell className="text-right">
                                        <div className="flex justify-end gap-2">
                                            <Button
                                                size="sm"
                                                variant="ghost"
                                                onClick={() =>
                                                    openEditDialog(u)
                                                }
                                                className="text-slate-300 hover:text-white"
                                            >
                                                <Pencil className="w-4 h-4" />
                                            </Button>
                                            <AlertDialog>
                                                <AlertDialogTrigger asChild>
                                                    <Button
                                                        size="sm"
                                                        variant="ghost"
                                                        className="text-red-400 hover:text-red-300"
                                                    >
                                                        {deletingId ===
                                                        u.id ? (
                                                            <Loader2 className="w-4 h-4 animate-spin" />
                                                        ) : (
                                                            <Trash2 className="w-4 h-4" />
                                                        )}
                                                    </Button>
                                                </AlertDialogTrigger>
                                                <AlertDialogContent className="bg-slate-900 border-slate-800 text-white">
                                                    <AlertDialogHeader>
                                                        <AlertDialogTitle>
                                                            Delete this user?
                                                        </AlertDialogTitle>
                                                        <AlertDialogDescription className="text-slate-400">
                                                            This will
                                                            permanently
                                                            delete{" "}
                                                            <span className="text-white font-medium">
                                                                {u.name}
                                                            </span>{" "}
                                                            ({u.email}).
                                                            This cannot be
                                                            undone.
                                                        </AlertDialogDescription>
                                                    </AlertDialogHeader>
                                                    <AlertDialogFooter>
                                                        <AlertDialogCancel className="bg-slate-800 text-white hover:bg-slate-700 border-slate-700">
                                                            Cancel
                                                        </AlertDialogCancel>
                                                        <AlertDialogAction
                                                            onClick={() =>
                                                                handleDelete(
                                                                    u.id,
                                                                )
                                                            }
                                                            className="bg-red-600 hover:bg-red-700"
                                                        >
                                                            Delete
                                                        </AlertDialogAction>
                                                    </AlertDialogFooter>
                                                </AlertDialogContent>
                                            </AlertDialog>
                                        </div>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                )}
            </Card>

            {/* Edit user dialog */}
            <Dialog
                open={Boolean(editUser)}
                onOpenChange={(open) => !open && setEditUser(null)}
            >
                <DialogContent className="bg-slate-900 border-slate-800 text-white">
                    <DialogHeader>
                        <DialogTitle>Edit User</DialogTitle>
                    </DialogHeader>
                    {editUser && (
                        <form
                            onSubmit={handleEditSubmit}
                            className="space-y-4"
                        >
                            <div>
                                <Label className="text-slate-300 mb-2 block">
                                    Name
                                </Label>
                                <Input
                                    value={editForm.name}
                                    onChange={(e) =>
                                        setEditForm((f) => ({
                                            ...f,
                                            name: e.target.value,
                                        }))
                                    }
                                    className="bg-slate-800 border-slate-700 text-white"
                                    required
                                />
                            </div>
                            <div>
                                <Label className="text-slate-300 mb-2 block">
                                    Email or Phone
                                </Label>
                                <Input
                                    value={editForm.email}
                                    onChange={(e) =>
                                        setEditForm((f) => ({
                                            ...f,
                                            email: e.target.value,
                                        }))
                                    }
                                    className="bg-slate-800 border-slate-700 text-white"
                                    required
                                />
                            </div>
                            <div>
                                <Label className="text-slate-300 mb-2 block">
                                    New Password{" "}
                                    <span className="text-slate-500 font-normal">
                                        (leave blank to keep unchanged)
                                    </span>
                                </Label>
                                <div className="flex gap-2">
                                    <Input
                                        value={editForm.password}
                                        onChange={(e) =>
                                            setEditForm((f) => ({
                                                ...f,
                                                password: e.target.value,
                                            }))
                                        }
                                        className="bg-slate-800 border-slate-700 text-white font-mono"
                                        placeholder="••••••••"
                                        minLength={6}
                                    />
                                    <Button
                                        type="button"
                                        variant="secondary"
                                        className="bg-slate-800 hover:bg-slate-700 text-white shrink-0"
                                        onClick={() =>
                                            setEditForm((f) => ({
                                                ...f,
                                                password: generatePassword(),
                                            }))
                                        }
                                    >
                                        Generate
                                    </Button>
                                </div>
                            </div>

                            {editError && (
                                <div className="bg-red-900/20 border border-red-500/50 rounded-lg p-3 text-red-300 text-sm">
                                    {editError}
                                </div>
                            )}

                            <DialogFooter>
                                <Button
                                    type="submit"
                                    disabled={editSubmitting}
                                    className="bg-linear-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white"
                                >
                                    {editSubmitting ? (
                                        <Loader2 className="w-4 h-4 animate-spin" />
                                    ) : (
                                        "Save Changes"
                                    )}
                                </Button>
                            </DialogFooter>
                        </form>
                    )}
                </DialogContent>
            </Dialog>
        </div>
    );
}
