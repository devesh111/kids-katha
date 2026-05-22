"use client";

import Link from "next/link";
import { Button } from "../ui/button";
import { Search } from "lucide-react";

const Header = () => {
    return (
        <header className="sticky top-0 z-50 border-b border-slate-800 bg-slate-950/95 backdrop-blur">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
                <Link href="/" className="flex items-center gap-2">
                    <img src="/images/logo.png" className="w-10 h-10" />
                    <h1 className="text-2xl font-bold bg-linear-to-r from-purple-400 via-pink-400 to-orange-400 bg-clip-text text-transparent">
                        Kids कथा
                    </h1>
                </Link>
                <nav className="flex items-center gap-4">
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
            </div>
        </header>
    );
};

export default Header;
