"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import {
    BookOpen,
    Loader2,
    ChevronRight,
    Home,
    PlayCircle,
} from "lucide-react";
import { Button } from "@/components/ui/button";

export default function SubCategoryPage({ params }) {
    const [ids, setIds] = useState(null);
    const [data, setData] = useState(null);
    const [categoryData, setCategoryData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        params.then(setIds);
    }, [params]);

    useEffect(() => {
        if (!ids) return;
        const { categoryId, subcategoryId } = ids;

        async function fetchData() {
            try {
                const [subRes, catRes] = await Promise.all([
                    fetch(`/api/subcategories/${subcategoryId}`),
                    fetch(`/api/categories/${categoryId}`),
                ]);
                if (!subRes.ok) {
                    throw new Error("Failed to fetch subcategory");
                }
                const subJson = await subRes.json();
                if (!subJson.success) {
                    throw new Error(subJson.error);
                }
                setData(subJson);

                if (catRes.ok) {
                    const catJson = await catRes.json();
                    if (catJson.success) {
                        setCategoryData(catJson.category);
                    }
                }
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        }
        fetchData();
    }, [ids]);

    return (
        <div className="min-h-screen bg-linear-to-b from-slate-950 via-slate-900 to-slate-950">
            {loading && (
                <div className="flex items-center justify-center py-40">
                    <Loader2 className="w-8 h-8 text-purple-400 animate-spin" />
                    <span className="ml-3 text-slate-300">Loading...</span>
                </div>
            )}

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
                    <div className="relative w-full h-72 md:h-96 overflow-hidden">
                        {data.subcategory.imageUrl ? (
                            <img
                                src={data.subcategory.imageUrl}
                                alt={data.subcategory.name}
                                className="object-cover"
                            />
                        ) : (
                            <div className="absolute inset-0 bg-linear-to-br from-indigo-900 via-purple-900 to-slate-900" />
                        )}
                        <div className="absolute inset-0 bg-linear-to-t from-slate-950 via-slate-950/60 to-transparent" />
                        <div className="absolute bottom-0 left-0 right-0 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-10">
                            {/* Breadcrumb */}
                            <nav className="flex items-center gap-2 text-sm text-slate-400 mb-4 flex-wrap">
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
                                {categoryData && ids && (
                                    <>
                                        <ChevronRight className="w-3 h-3" />
                                        <Link
                                            href={`/categories/${ids.categoryId}`}
                                            className="hover:text-white"
                                        >
                                            {categoryData.name}
                                        </Link>
                                    </>
                                )}
                                <ChevronRight className="w-3 h-3" />
                                <span className="text-white">
                                    {data.subcategory.name}
                                </span>
                            </nav>
                            <h2 className="text-4xl md:text-5xl font-bold text-white mb-2">
                                {data.subcategory.name}
                            </h2>
                            <p className="text-slate-300 text-lg">
                                {data.stories.length}{" "}
                                {data.stories.length === 1
                                    ? "story"
                                    : "stories"}{" "}
                                available
                            </p>
                        </div>
                    </div>

                    {/* Stories List */}
                    <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                        <div className="mb-8">
                            <h3 className="text-2xl font-bold text-white mb-1">
                                Stories
                            </h3>
                            <p className="text-slate-400">
                                Click any story to start listening
                            </p>
                        </div>

                        {data.stories.length === 0 ? (
                            <div className="text-center py-20">
                                <BookOpen className="w-16 h-16 text-slate-600 mx-auto mb-4" />
                                <p className="text-slate-400 text-lg">
                                    No stories in this subcategory yet
                                </p>
                            </div>
                        ) : (
                            <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
                                {data.stories.map((story) => (
                                    <Link
                                        key={story.id}
                                        href={`/stories/${story.id}`}
                                        className="group block"
                                    >
                                        <div className="bg-slate-800/50 border border-slate-700 rounded-xl overflow-hidden hover:border-pink-500/60 transition-all hover:shadow-lg hover:shadow-pink-500/10 hover:-translate-y-1 duration-200">
                                            {/* Story image */}
                                            <div className="relative aspect-video w-full bg-slate-700">
                                                {story.imageUrl ? (
                                                    <img
                                                        src={story.imageUrl}
                                                        alt={story.title}
                                                        className="object-cover group-hover:scale-105 transition-transform duration-300"
                                                    />
                                                ) : (
                                                    <div className="absolute inset-0 flex items-center justify-center bg-linear-to-br from-pink-900/40 to-purple-900/40">
                                                        <BookOpen className="w-10 h-10 text-slate-500" />
                                                    </div>
                                                )}
                                                <div className="absolute inset-0 bg-linear-to-t from-slate-900/70 to-transparent" />
                                                {story.isTopPick && (
                                                    <span className="absolute top-2 right-2 bg-yellow-500 text-slate-900 text-xs font-bold px-2 py-0.5 rounded-full">
                                                        ⭐ Top Pick
                                                    </span>
                                                )}
                                            </div>
                                            {/* Card body */}
                                            <div className="p-4">
                                                <h4 className="text-white font-semibold text-sm mb-3 line-clamp-2 leading-snug">
                                                    {story.title}
                                                </h4>
                                                <Button
                                                    size="sm"
                                                    className="w-full bg-linear-to-r from-pink-600 to-purple-600 hover:from-pink-700 hover:to-purple-700 text-white text-xs flex items-center gap-1.5"
                                                >
                                                    <PlayCircle className="w-3.5 h-3.5" />
                                                    Listen Now
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
