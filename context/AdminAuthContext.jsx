"use client";

import {
    createContext,
    useContext,
    useEffect,
    useState,
    useCallback,
} from "react";

const AdminAuthContext = createContext(null);

export function AdminAuthProvider({ children }) {
    const [admin, setAdmin] = useState(undefined); // undefined = loading, null = logged out
    const [loading, setLoading] = useState(true);

    const fetchAdmin = useCallback(async () => {
        try {
            const res = await fetch("/api/admin/auth/me");
            const data = await res.json();
            setAdmin(data.success ? data.admin : null);
        } catch {
            setAdmin(null);
        } finally {
            setLoading(false);
        }
    }, []);

    useEffect(() => {
        fetchAdmin();
    }, [fetchAdmin]);

    const logout = useCallback(async () => {
        await fetch("/api/admin/auth/logout", { method: "POST" });
        setAdmin(null);
        window.location.href = "/admin/login";
    }, []);

    const refreshAdmin = useCallback(async () => {
        setLoading(true);
        await fetchAdmin();
    }, [fetchAdmin]);

    return (
        <AdminAuthContext.Provider
            value={{ admin, loading, logout, refreshAdmin }}
        >
            {children}
        </AdminAuthContext.Provider>
    );
}

export function useAdminAuth() {
    const ctx = useContext(AdminAuthContext);
    if (!ctx)
        throw new Error(
            "useAdminAuth must be used inside AdminAuthProvider",
        );
    return ctx;
}
