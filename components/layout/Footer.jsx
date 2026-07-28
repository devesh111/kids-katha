"use client";

import Link from "next/link";
import React from "react";
import { usePathname } from "next/navigation";
import BackToTop from "./BackToTop";

const Footer = () => {
    const pathname = usePathname();

    // Admin dashboard doesn't use the public site footer
    if (pathname?.startsWith("/admin")) return null;

    return (
        <footer className="border-t border-slate-800 bg-slate-950 mt-20">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                <div className="grid md:grid-cols-4 gap-8 mb-8">
                    <div>
                        <h4 className="text-white font-semibold mb-4">
                            Kids Katha
                        </h4>
                        <p className="text-slate-400 text-sm">
                            Stories that inspire young minds.
                        </p>
                    </div>
                    <div>
                        <h4 className="text-white font-semibold mb-4">
                            Quick Links
                        </h4>
                        <ul className="space-y-2 text-slate-400 text-sm">
                            <li>
                                <Link
                                    href="/categories"
                                    className="hover:text-white"
                                >
                                    Categories
                                </Link>
                            </li>
                            <li>
                                <Link
                                    href="/login"
                                    className="hover:text-white"
                                >
                                    Login
                                </Link>
                            </li>
                        </ul>
                    </div>
                    <div>
                        <h4 className="text-white font-semibold mb-4">Legal</h4>
                        <ul className="space-y-2 text-slate-400 text-sm">
                            <li>
                                <a
                                    href="/privacy-policy"
                                    className="hover:text-white"
                                >
                                    Privacy Policy
                                </a>
                            </li>
                            <li>
                                <a href="/terms" className="hover:text-white">
                                    Terms of Service
                                </a>
                            </li>
                        </ul>
                    </div>
                    <div>
                        <h4 className="text-white font-semibold mb-4">
                            Contact
                        </h4>
                        <p className="text-slate-400 text-sm">
                            <a href="mailto:info@kidskatha.com">
                                info@kidskatha.com
                            </a>
                        </p>
                    </div>
                </div>
                <div className="border-t border-slate-800 pt-8 text-center text-slate-400 text-sm">
                    <p>&copy; 2026 Kids Katha. All rights reserved.</p>
                </div>
            </div>
            <BackToTop />
        </footer>
    );
};

export default Footer;
