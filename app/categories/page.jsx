"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { BookOpen, Loader2 } from "lucide-react";
import { categoryImageUrl } from "@/lib/media";

/**
 * Categories page
 * Displays all story categories with story counts
 * Users can click to browse stories in each category
 */
export default function CategoriesPage() {
    const [categories, setCategories] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    // Fetch categories on component mount
    useEffect(() => {
        async function fetchCategories() {
            try {
                const response = await fetch("/api/categories");
                if (!response.ok) throw new Error("Failed to fetch categories");
                const data = await response.json();
                console.log(data);
                setCategories(data.categories || []);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        }

        fetchCategories();
    }, []);

    return (
        <div className="min-h-screen bg-linear-to-b from-slate-950 via-slate-900 to-slate-950">
            {/* Main Content */}
            <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                <div className="mb-12">
                    <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
                        Story Categories
                    </h2>
                    <p className="text-slate-300 text-sm md:text-lg">
                        Explore our collection of stories organized by category
                    </p>
                </div>

                {/* Loading State */}
                {loading && (
                    <div className="flex items-center justify-center py-20">
                        <Loader2 className="w-8 h-8 text-purple-400 animate-spin" />
                        <span className="ml-3 text-slate-300">
                            Loading categories...
                        </span>
                    </div>
                )}

                {/* Error State */}
                {error && (
                    <div className="bg-red-900/20 border border-red-500/50 rounded-lg p-6 text-red-300">
                        <p>Error loading categories: {error}</p>
                    </div>
                )}

                {/* Categories Grid */}
                {!loading && !error && (
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
                        {categories.map((category) => (
                            <Link
                                key={category.id}
                                href={`/categories/${category.id}`}
                            >
                                <Card className="bg-slate-800/50 border-slate-700 hover:border-purple-500/50 transition-all hover:shadow-lg hover:shadow-purple-500/20 cursor-pointer h-full p-0">
                                    <img
                                        src={categoryImageUrl(category.image)}
                                        className="object-cover"
                                        alt={category.name}
                                    />
                                    <div className="px-2 md:px-6 pb-6">
                                        <div className="flex items-start justify-between mb-4">
                                            <div className="w-7 h-7 md:w-12 md:h-12 rounded-lg bg-linear-to-br from-purple-500 to-pink-500 flex items-center justify-center">
                                                <BookOpen className="w-3 h-3 md:w-6 md:h-6 text-white" />
                                            </div>
                                            <span className="bg-purple-500/20 text-purple-300 px-3 py-1 rounded-full text-xs md:text-sm font-medium">
                                                {category.story_count} stories
                                            </span>
                                        </div>
                                        <h3 className="text-lg md:text-xl font-semibold text-white mb-2">
                                            {category.name}
                                        </h3>
                                        <p className="text-slate-400 text-xs md:text-sm">
                                            Explore {category.story_count}{" "}
                                            amazing stories in this category
                                        </p>
                                    </div>
                                </Card>
                            </Link>
                        ))}
                    </div>
                )}

                {/* Empty State */}
                {!loading && !error && categories.length === 0 && (
                    <div className="text-center py-20">
                        <BookOpen className="w-16 h-16 text-slate-600 mx-auto mb-4" />
                        <p className="text-slate-400 text-lg">
                            No categories found
                        </p>
                    </div>
                )}
            </main>
        </div>
    );
}
