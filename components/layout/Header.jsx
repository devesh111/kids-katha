"use client";

import { useState } from "react";
import Link from "next/link";
import { Button } from "../ui/button";
import { Search, Menu, X } from "lucide-react";

const Header = () => {
    const [isOpen, setIsOpen] = useState(false);

    const closeDrawer = () => setIsOpen(false);

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
                                <Search />
                                Search
                            </Button>
                        </Link>
                        <Link href="/login">
                            <Button className="bg-linear-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white">
                                Login
                            </Button>
                        </Link>
                    </nav>

                    {/* Hamburger — mobile only */}
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

            {/* Drawer */}
            <div
                className={`fixed top-0 right-0 z-50 h-full w-72 bg-slate-900 border-l border-slate-800 shadow-2xl transform transition-transform duration-300 ease-in-out md:hidden ${
                    isOpen ? "translate-x-0" : "translate-x-full"
                }`}
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

                {/* Drawer Nav Items */}
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
                            className="w-full justify-start text-slate-300 hover:text-white hover:bg-slate-800 gap-2"
                        >
                            <Search size={16} />
                            Search
                        </Button>
                    </Link>

                    <div className="pt-3 mt-2 border-t border-slate-800">
                        <Link href="/login" onClick={closeDrawer}>
                            <Button className="w-full bg-linear-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white">
                                Login
                            </Button>
                        </Link>
                    </div>
                </nav>
            </div>
        </>
    );
};

export default Header;
