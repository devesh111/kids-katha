"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { BookOpen, Loader2, ChevronRight, Home, Layers } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function CategoryPage({ params }) {
    const [categoryId, setCategoryId] = useState(null);
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        FileList;
        params.then(({ categoryId }) => setCategoryId(categoryId));
    }, [params]);

    useEffect(() => {
        if (!categoryId) return;
        async function fetchData() {
            try {
                const res = await fetch(`/api/categories/${categoryId}`);
                if (!res.ok) {
                    throw new Error("Failed to fetch category");
                }
                const json = await res.json();
                console.log(json);
                if (!json.success) {
                    throw new Error(json.error);
                }
                setData(json);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        }
        fetchData();
    }, [categoryId]);

    return (
        <div className="min-h-screen bg-linear-to-b from-slate-950 via-slate-900 to-slate-950">
            {/* Loading */}
            {loading && (
                <div className="flex items-center justify-center py-40">
                    <Loader2 className="w-8 h-8 text-purple-400 animate-spin" />
                    <span className="ml-3 text-slate-300">
                        Loading category...
                    </span>
                </div>
            )}

            {/* Error */}
            {error && (
                <div className="max-w-7xl mx-auto px-4 py-20">
                    <div className="bg-red-900/20 border border-red-500/50 rounded-lg p-6 text-red-300">
                        <p>Error: {error}</p>
                    </div>
                </div>
            )}

            {data && (
                <>
                    {/* Hero Banner */}
                    <div className="relative w-full h-72 md:h-120 overflow-hidden">
                        {data.category.imageUrl ? (
                            <img
                                src={data.category.imageUrl}
                                alt={data.category.name}
                                className="object-cover object-[0px_-25px] md:object-[0px_-100px]"
                            />
                        ) : (
                            <div className="absolute inset-0 bg-linear-to-br from-purple-900 via-pink-900 to-slate-900" />
                        )}
                        {/* Overlay gradient */}
                        <div className="absolute inset-0 bg-linear-to-t from-slate-950 via-slate-950/60 to-transparent" />
                        {/* Content */}
                        <div className="absolute bottom-0 left-0 right-0 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-10">
                            {/* Breadcrumb */}
                            <nav className="flex items-center gap-2 text-sm text-slate-100 mb-4">
                                <Link
                                    href="/"
                                    className="hover:text-white flex items-center gap-1"
                                >
                                    <Home className="w-3 h-3" /> Home
                                </Link>
                                <ChevronRight className="w-3 h-3" />
                                <Link
                                    href="/categories"
                                    className="hover:text-white"
                                >
                                    Categories
                                </Link>
                                <ChevronRight className="w-3 h-3" />
                                <span className="text-white">
                                    {data.category.name}
                                </span>
                            </nav>
                            <h2 className="text-3xl md:text-5xl font-bold text-white mb-2">
                                {data.category.name}
                            </h2>
                            <p className="text-slate-300 text-sm md:text-lg ">
                                {data.subcategories.length} subcategories to
                                explore
                            </p>
                        </div>
                    </div>

                    {/* Subcategories */}
                    <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-2 md:py-12">
                        <div className="mb-8">
                            <h3 className="text-2xl font-bold text-white mb-1">
                                Subcategories
                            </h3>
                            <p className="text-slate-400 text-sm md:text-base">
                                Browse stories by subcategory
                            </p>
                        </div>

                        {data.subcategories.length === 0 ? (
                            <div className="text-center py-20">
                                <Layers className="w-16 h-16 text-slate-600 mx-auto mb-4" />
                                <p className="text-slate-400 text-lg">
                                    No subcategories found
                                </p>
                            </div>
                        ) : (
                            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
                                {data.subcategories.map((sub) => (
                                    <Link
                                        key={sub.id}
                                        href={`/categories/${data.category.id}/${sub.id}`}
                                        className="group block"
                                    >
                                        <div className="bg-slate-800/50 border border-slate-700 rounded-xl overflow-hidden hover:border-purple-500/60 transition-all hover:shadow-lg hover:shadow-purple-500/10 hover:-translate-y-1 duration-200">
                                            {/* Card image */}
                                            <div className="relative aspect-video w-full bg-slate-700">
                                                {sub.imageUrl ? (
                                                    <img
                                                        src={sub.imageUrl}
                                                        alt={sub.name}
                                                        className="object-cover group-hover:scale-105 transition-transform duration-300"
                                                    />
                                                ) : (
                                                    <div className="absolute inset-0 flex items-center justify-center bg-linear-to-br from-purple-900/40 to-pink-900/40">
                                                        <Layers className="w-10 h-10 text-slate-500" />
                                                    </div>
                                                )}
                                                <div className="absolute inset-0 bg-linear-to-t from-slate-900/70 to-transparent" />
                                            </div>
                                            {/* Card body */}
                                            <div className="p-4">
                                                <h4 className="text-white font-semibold text-base mb-3 line-clamp-2 leading-snug">
                                                    {sub.name}
                                                </h4>
                                                <Button
                                                    size="sm"
                                                    className="w-full bg-linear-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white text-xs"
                                                >
                                                    Explore Stories
                                                </Button>
                                            </div>
                                        </div>
                                    </Link>
                                ))}
                            </div>
                        )}
                    </main>
                </>
            )}
        </div>
    );
}
