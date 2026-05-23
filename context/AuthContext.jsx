"use client";

import {
    createContext,
    useContext,
    useEffect,
    useState,
    useCallback,
} from "react";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
    const [user, setUser] = useState(undefined); // undefined = loading, null = logged out
    const [loading, setLoading] = useState(true);

    // Try to refresh the access token using the refresh token cookie
    const tryRefresh = useCallback(async () => {
        try {
            const res = await fetch("/api/auth/refresh", { method: "POST" });
            if (!res.ok) return false;
            const data = await res.json();
            if (data.token) localStorage.setItem("kk_token", data.token);
            return data.success === true;
        } catch {
            return false;
        }
    }, []);

    const fetchUser = useCallback(async () => {
        try {
            let res = await fetch("/api/auth/me");

            // Access token expired — try refreshing silently
            if (res.status === 401) {
                const refreshed = await tryRefresh();
                if (refreshed) {
                    // Retry with the new access token
                    res = await fetch("/api/auth/me");
                }
            }

            const data = await res.json();
            setUser(data.success ? data.user : null);
        } catch {
            setUser(null);
        } finally {
            setLoading(false);
        }
    }, [tryRefresh]);

    useEffect(() => {
        fetchUser();
    }, [fetchUser]);

    // Auto-refresh every 13 minutes so the access token never actually expires
    // during an active session (access token lives 15 min, we refresh at 13)
    useEffect(() => {
        const interval = setInterval(
            async () => {
                const refreshed = await tryRefresh();
                if (!refreshed) {
                    // Refresh token also expired — session is over
                    setUser(null);
                    localStorage.removeItem("kk_token");
                }
            },
            13 * 60 * 1000,
        ); // every 13 minutes

        return () => clearInterval(interval);
    }, [tryRefresh]);

    const logout = useCallback(async () => {
        await fetch("/api/auth/logout", { method: "POST" });
        localStorage.removeItem("kk_token");
        setUser(null);
        window.location.href = "/";
    }, []);

    const refreshUser = useCallback(async () => {
        setLoading(true);
        await fetchUser();
    }, [fetchUser]);

    return (
        <AuthContext.Provider value={{ user, loading, logout, refreshUser }}>
            {children}
        </AuthContext.Provider>
    );
}

export function useAuth() {
    const ctx = useContext(AuthContext);
    if (!ctx) throw new Error("useAuth must be used inside AuthProvider");
    return ctx;
}
