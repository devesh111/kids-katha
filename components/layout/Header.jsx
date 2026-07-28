"use client";

import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Button } from "../ui/button";
import { Search, Menu, X, User, LogOut, ChevronDown } from "lucide-react";
import { useAuth } from "@/context/AuthContext";

const Header = () => {
    const { user, loading, logout } = useAuth();
    const [isOpen, setIsOpen] = useState(false); // mobile drawer
    const [dropdownOpen, setDropdownOpen] = useState(false); // user dropdown
    const dropdownRef = useRef(null);
    const pathname = usePathname();

    // Admin dashboard has its own header — don't show the public one there
    if (pathname?.startsWith("/admin")) return null;

    const closeDrawer = () => setIsOpen(false);

    // Close dropdown on outside click
    useEffect(() => {
        function handleClickOutside(e) {
            if (
                dropdownRef.current &&
                !dropdownRef.current.contains(e.target)
            ) {
                setDropdownOpen(false);
            }
        }
        document.addEventListener("mousedown", handleClickOutside);
        return () =>
            document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    // Shorten display identifier — show only first part of email or phone
    const displayIdentifier = user?.email
        ? user.email.length > 22
            ? user.email.slice(0, 22) + "…"
            : user.email
        : "";

    const UserDropdown = () => (
        <div ref={dropdownRef} className="relative">
            <button
                onClick={() => setDropdownOpen(!dropdownOpen)}
                className="flex items-center gap-2 bg-slate-800 hover:bg-slate-700 border border-slate-700 hover:border-purple-500 rounded-full pl-1 pr-3 py-1 transition-all"
            >
                {/* Avatar */}
                <div className="w-7 h-7 rounded-full bg-linear-to-br from-purple-500 to-pink-500 flex items-center justify-center shrink-0">
                    <User className="w-4 h-4 text-white" />
                </div>
                <span className="text-sm text-slate-300 max-w-30 truncate">
                    {user.name}
                </span>
                <ChevronDown
                    className={`w-3.5 h-3.5 text-slate-400 transition-transform ${dropdownOpen ? "rotate-180" : ""}`}
                />
            </button>

            {/* Dropdown panel */}
            {dropdownOpen && (
                <div className="absolute right-0 mt-2 w-64 bg-slate-900 border border-slate-700 rounded-xl shadow-xl z-50 overflow-hidden">
                    {/* User info */}
                    <div className="px-4 py-3 border-b border-slate-800">
                        <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-full bg-linear-to-br from-purple-500 to-pink-500 flex items-center justify-center shrink-0">
                                <User className="w-5 h-5 text-white" />
                            </div>
                            <div className="min-w-0">
                                <p className="text-white font-semibold text-sm truncate">
                                    {user.name}
                                </p>
                                <p className="text-slate-400 text-xs truncate">
                                    {user.email}
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* Menu items */}
                    <div className="p-2 flex flex-col gap-1">
                        <Link
                            href="/profile"
                            onClick={() => setDropdownOpen(false)}
                            className="flex items-center gap-2 px-3 py-2 text-sm text-slate-300 hover:text-white hover:bg-slate-800 rounded-lg transition-colors"
                        >
                            <User className="w-4 h-4" />
                            My Profile
                        </Link>
                        <button
                            onClick={() => {
                                setDropdownOpen(false);
                                logout();
                            }}
                            className="flex items-center gap-2 px-3 py-2 text-sm bg-linear-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white rounded-full transition-colors justify-center"
                        >
                            <LogOut className="w-4 h-4" />
                            Logout
                        </button>
                    </div>
                </div>
            )}
        </div>
    );

    return (
        <>
            <header className="sticky top-0 z-50 border-b border-slate-800 bg-slate-950/95 backdrop-blur">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
                    {/* Logo */}
                    <Link href="/" className="flex items-center gap-2">
                        <img src="/images/logo.png" className="w-10 h-10" />
                        <h1 className="text-2xl font-bold bg-linear-to-r from-purple-400 via-pink-400 to-orange-400 bg-clip-text text-transparent">
                            Kids कथा
                        </h1>
                    </Link>

                    {/* Desktop Nav */}
                    <nav className="hidden md:flex items-center gap-4">
                        <Link href="/">
                            <Button
                                variant="ghost"
                                className="text-slate-300 hover:text-white"
                            >
                                Home
                            </Button>
                        </Link>
                        <Link href="/categories">
                            <Button
                                variant="ghost"
                                className="text-slate-300 hover:text-white"
                            >
                                Categories
                            </Button>
                        </Link>
                        <Link href="/search">
                            <Button
                                variant="ghost"
                                className="text-slate-300 hover:text-white"
                            >
                                <Search className="w-4 h-4 mr-1" />
                                Search
                            </Button>
                        </Link>

                        {/* Auth area */}
                        {!loading &&
                            (user ? (
                                <UserDropdown />
                            ) : (
                                <Link href="/login">
                                    <Button className="bg-linear-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white">
                                        Login
                                    </Button>
                                </Link>
                            ))}
                    </nav>

                    {/* Hamburger — mobile */}
                    <button
                        className="md:hidden text-slate-300 hover:text-white transition-colors p-1"
                        onClick={() => setIsOpen(true)}
                        aria-label="Open menu"
                    >
                        <Menu size={26} />
                    </button>
                </div>
            </header>

            {/* Backdrop */}
            {isOpen && (
                <div
                    className="fixed inset-0 z-40 bg-black/60 backdrop-blur-sm md:hidden"
                    onClick={closeDrawer}
                />
            )}

            {/* Mobile Drawer */}
            <div
                className={`fixed top-0 right-0 z-50 h-full w-72 bg-slate-900 border-l border-slate-800 shadow-2xl transform transition-transform duration-300 ease-in-out md:hidden ${isOpen ? "translate-x-0" : "translate-x-full"}`}
            >
                {/* Drawer Header */}
                <div className="flex items-center justify-between px-5 py-4 border-b border-slate-800">
                    <Link
                        href="/"
                        className="flex items-center gap-2"
                        onClick={closeDrawer}
                    >
                        <img src="/images/logo.png" className="w-8 h-8" />
                        <span className="text-lg font-bold bg-linear-to-r from-purple-400 via-pink-400 to-orange-400 bg-clip-text text-transparent">
                            Kids कथा
                        </span>
                    </Link>
                    <button
                        onClick={closeDrawer}
                        className="text-slate-400 hover:text-white transition-colors p-1"
                        aria-label="Close menu"
                    >
                        <X size={22} />
                    </button>
                </div>

                {/* Drawer Nav */}
                <nav className="flex flex-col p-4 gap-1">
                    <Link href="/" onClick={closeDrawer}>
                        <Button
                            variant="ghost"
                            className="w-full justify-start text-slate-300 hover:text-white hover:bg-slate-800"
                        >
                            Home
                        </Button>
                    </Link>
                    <Link href="/categories" onClick={closeDrawer}>
                        <Button
                            variant="ghost"
                            className="w-full justify-start text-slate-300 hover:text-white hover:bg-slate-800"
                        >
                            Categories
                        </Button>
                    </Link>
                    <Link href="/search" onClick={closeDrawer}>
                        <Button
                            variant="ghost"
                            className="w-full justify-start text-slate-300 hover:text-white hover:bg-slate-800 gap-2 mt-2"
                        >
                            <Search size={16} />
                            Search
                        </Button>
                    </Link>

                    <div className="pt-3 mt-2 border-t border-slate-800">
                        {!loading &&
                            (user ? (
                                <>
                                    {/* Mobile user info */}
                                    <div className="flex items-center gap-3 px-3 py-3 mb-2 bg-slate-800/50 rounded-lg">
                                        <div className="w-9 h-9 rounded-full bg-linear-to-br from-purple-500 to-pink-500 flex items-center justify-center shrink-0">
                                            <User className="w-4 h-4 text-white" />
                                        </div>
                                        <div className="min-w-0">
                                            <p className="text-white text-sm font-semibold truncate">
                                                {user.name}
                                            </p>
                                            <p className="text-slate-400 text-xs truncate">
                                                {user.email}
                                            </p>
                                        </div>
                                    </div>
                                    <Link
                                        href="/profile"
                                        onClick={closeDrawer}
                                    >
                                        <Button
                                            variant="ghost"
                                            className="w-full justify-start text-slate-300 hover:text-white hover:bg-slate-800 gap-2"
                                        >
                                            <User size={16} />
                                            My Profile
                                        </Button>
                                    </Link>
                                    <button
                                        onClick={() => {
                                            closeDrawer();
                                            logout();
                                        }}
                                        className="w-full flex items-center gap-2 px-3 py-2.5 text-sm bg-linear-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white rounded-full transition-colors mt-2"
                                    >
                                        <LogOut className="w-4 h-4" />
                                        Logout
                                    </button>
                                </>
                            ) : (
                                <Link href="/login" onClick={closeDrawer}>
                                    <Button className="w-full bg-linear-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white">
                                        Login
                                    </Button>
                                </Link>
                            ))}
                    </div>
                </nav>
            </div>
        </>
    );
};

export default Header;
