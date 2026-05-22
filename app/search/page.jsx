"use client";

import { useEffect, useState, useCallback, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { useSearchParams, useRouter } from "next/navigation";
import {
    BookOpen,
    Loader2,
    Search,
    X,
    Filter,
    PlayCircle,
    ChevronDown,
    ChevronUp,
} from "lucide-react";
import { Button } from "@/components/ui/button";

export default function SearchPage() {
    const router = useRouter();
    const searchParams = useSearchParams();

    const [query, setQuery] = useState(searchParams.get("q") || "");
    const [selectedCategory, setSelectedCategory] = useState(
        searchParams.get("category") || "",
    );
    const [selectedSubcategory, setSelectedSubcategory] = useState(
        searchParams.get("subcategory") || "",
    );
    const [selectedLanguage, setSelectedLanguage] = useState(
        searchParams.get("language") || "",
    );

    const [results, setResults] = useState([]);
    const [filters, setFilters] = useState({
        categories: [],
        subcategories: [],
        languages: [],
    });
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [searched, setSearched] = useState(false);
    const [sidebarOpen, setSidebarOpen] = useState(false);

    const inputRef = useRef(null);

    // Filtered subcategories based on selected category
    const visibleSubcategories = selectedCategory
        ? filters.subcategories.filter(
              (s) => String(s.category_id) === String(selectedCategory),
          )
        : filters.subcategories;

    const buildUrl = useCallback((q, cat, sub, lang) => {
        const p = new URLSearchParams();
        if (q) p.set("q", q);
        if (cat) p.set("category", cat);
        if (sub) p.set("subcategory", sub);
        if (lang) p.set("language", lang);
        return `/search?${p.toString()}`;
    }, []);

    const fetchResults = useCallback(async (q, cat, sub, lang) => {
        setLoading(true);
        setError(null);
        setSearched(true);
        try {
            const params = new URLSearchParams();
            if (q) params.set("q", q);
            if (cat) params.set("category", cat);
            if (sub) params.set("subcategory", sub);
            if (lang) params.set("language", lang);
            const res = await fetch(`/api/search?${params.toString()}`);
            if (!res.ok) throw new Error("Search failed");
            const json = await res.json();
            if (!json.success) throw new Error(json.error);
            setResults(json.results || []);
            setFilters(
                json.filters || {
                    categories: [],
                    subcategories: [],
                    languages: [],
                },
            );
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    }, []);

    // Initial fetch on mount (even empty to populate filters)
    useEffect(() => {
        const q = searchParams.get("q") || "";
        const cat = searchParams.get("category") || "";
        const sub = searchParams.get("subcategory") || "";
        const lang = searchParams.get("language") || "";
        setQuery(q);
        setSelectedCategory(cat);
        setSelectedSubcategory(sub);
        setSelectedLanguage(lang);
        fetchResults(q, cat, sub, lang);
    }, []); // eslint-disable-line

    const handleSearch = useCallback(
        (e) => {
            e?.preventDefault();
            router.push(
                buildUrl(
                    query,
                    selectedCategory,
                    selectedSubcategory,
                    selectedLanguage,
                ),
            );
            fetchResults(
                query,
                selectedCategory,
                selectedSubcategory,
                selectedLanguage,
            );
        },
        [
            query,
            selectedCategory,
            selectedSubcategory,
            selectedLanguage,
            router,
            buildUrl,
            fetchResults,
        ],
    );

    const handleFilter = useCallback(
        (cat, sub, lang) => {
            router.push(buildUrl(query, cat, sub, lang));
            fetchResults(query, cat, sub, lang);
        },
        [query, router, buildUrl, fetchResults],
    );

    const clearFilters = () => {
        setSelectedCategory("");
        setSelectedSubcategory("");
        setSelectedLanguage("");
        router.push(buildUrl(query, "", "", ""));
        fetchResults(query, "", "", "");
    };

    const hasActiveFilters =
        selectedCategory || selectedSubcategory || selectedLanguage;

    return (
        <div className="min-h-screen bg-linear-to-b from-slate-950 via-slate-900 to-slate-950">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                <div className="flex gap-8">
                    {/* ── Sidebar Filters ─────────────────────────────────────── */}
                    <aside className="hidden lg:block w-64 shrink-0">
                        <FilterPanel
                            filters={filters}
                            visibleSubcategories={visibleSubcategories}
                            selectedCategory={selectedCategory}
                            selectedSubcategory={selectedSubcategory}
                            selectedLanguage={selectedLanguage}
                            hasActiveFilters={hasActiveFilters}
                            onCategoryChange={(val) => {
                                setSelectedCategory(val);
                                setSelectedSubcategory("");
                                handleFilter(val, "", selectedLanguage);
                            }}
                            onSubcategoryChange={(val) => {
                                setSelectedSubcategory(val);
                                handleFilter(
                                    selectedCategory,
                                    val,
                                    selectedLanguage,
                                );
                            }}
                            onLanguageChange={(val) => {
                                setSelectedLanguage(val);
                                handleFilter(
                                    selectedCategory,
                                    selectedSubcategory,
                                    val,
                                );
                            }}
                            onClear={clearFilters}
                        />
                    </aside>

                    {/* ── Results ─────────────────────────────────────────────── */}
                    <div className="flex-1 min-w-0">
                        {/* Search bar */}
                        <form onSubmit={handleSearch} className="mb-8">
                            <div className="relative">
                                <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                                <input
                                    ref={inputRef}
                                    type="text"
                                    value={query}
                                    onChange={(e) => setQuery(e.target.value)}
                                    placeholder="Search stories, categories..."
                                    className="w-full bg-slate-800 border border-slate-700 rounded-xl pl-12 pr-28 py-2 md:py-3.5 text-white placeholder-slate-500 focus:outline-none focus:border-purple-500 transition-colors text-sm md:text-base"
                                />
                                <Button
                                    type="submit"
                                    className="absolute right-2 top-1/2 -translate-y-1/2 bg-linear-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white text-xs md:text-sm"
                                >
                                    Search
                                </Button>
                            </div>
                        </form>
                        {/* Mobile filter toggle */}
                        <div className="lg:hidden mb-4">
                            <Button
                                variant="outline"
                                className="border-slate-700 text-slate-300 hover:text-white hover:border-purple-500"
                                onClick={() => setSidebarOpen(!sidebarOpen)}
                            >
                                <Filter className="w-4 h-4 mr-2" />
                                Filters
                                {hasActiveFilters && (
                                    <span className="ml-2 w-2 h-2 rounded-full bg-purple-500 inline-block" />
                                )}
                                {sidebarOpen ? (
                                    <ChevronUp className="w-4 h-4 ml-2" />
                                ) : (
                                    <ChevronDown className="w-4 h-4 ml-2" />
                                )}
                            </Button>
                            {sidebarOpen && (
                                <div className="mt-3 bg-slate-800 border border-slate-700 rounded-xl p-4">
                                    <FilterPanel
                                        filters={filters}
                                        visibleSubcategories={
                                            visibleSubcategories
                                        }
                                        selectedCategory={selectedCategory}
                                        selectedSubcategory={
                                            selectedSubcategory
                                        }
                                        selectedLanguage={selectedLanguage}
                                        hasActiveFilters={hasActiveFilters}
                                        onCategoryChange={(val) => {
                                            setSelectedCategory(val);
                                            setSelectedSubcategory("");
                                            handleFilter(
                                                val,
                                                "",
                                                selectedLanguage,
                                            );
                                            setSidebarOpen(false);
                                        }}
                                        onSubcategoryChange={(val) => {
                                            setSelectedSubcategory(val);
                                            handleFilter(
                                                selectedCategory,
                                                val,
                                                selectedLanguage,
                                            );
                                        }}
                                        onLanguageChange={(val) => {
                                            setSelectedLanguage(val);
                                            handleFilter(
                                                selectedCategory,
                                                selectedSubcategory,
                                                val,
                                            );
                                        }}
                                        onClear={clearFilters}
                                    />
                                </div>
                            )}
                        </div>

                        {/* Results header */}
                        <div className="flex items-center justify-between mb-6">
                            <div>
                                <h2 className="text-xl font-bold text-white">
                                    {searched
                                        ? `${results.length} result${results.length !== 1 ? "s" : ""}`
                                        : "Search Results"}
                                    {query && (
                                        <span className="text-slate-400 font-normal text-base ml-2">
                                            for "{query}"
                                        </span>
                                    )}
                                </h2>
                                {hasActiveFilters && (
                                    <div className="flex items-center gap-2 mt-1 flex-wrap">
                                        <span className="text-xs text-slate-500">
                                            Filtered by:
                                        </span>
                                        {selectedCategory && (
                                            <FilterTag
                                                label={
                                                    filters.categories.find(
                                                        (c) =>
                                                            String(c.id) ===
                                                            String(
                                                                selectedCategory,
                                                            ),
                                                    )?.name || selectedCategory
                                                }
                                                onRemove={() => {
                                                    setSelectedCategory("");
                                                    setSelectedSubcategory("");
                                                    handleFilter(
                                                        "",
                                                        "",
                                                        selectedLanguage,
                                                    );
                                                }}
                                            />
                                        )}
                                        {selectedSubcategory && (
                                            <FilterTag
                                                label={
                                                    filters.subcategories.find(
                                                        (s) =>
                                                            String(s.id) ===
                                                            String(
                                                                selectedSubcategory,
                                                            ),
                                                    )?.name ||
                                                    selectedSubcategory
                                                }
                                                onRemove={() => {
                                                    setSelectedSubcategory("");
                                                    handleFilter(
                                                        selectedCategory,
                                                        "",
                                                        selectedLanguage,
                                                    );
                                                }}
                                            />
                                        )}
                                        {selectedLanguage && (
                                            <FilterTag
                                                label={selectedLanguage}
                                                onRemove={() => {
                                                    setSelectedLanguage("");
                                                    handleFilter(
                                                        selectedCategory,
                                                        selectedSubcategory,
                                                        "",
                                                    );
                                                }}
                                            />
                                        )}
                                    </div>
                                )}
                            </div>
                        </div>

                        {loading && (
                            <div className="flex items-center justify-center py-32">
                                <Loader2 className="w-8 h-8 text-purple-400 animate-spin" />
                                <span className="ml-3 text-slate-300">
                                    Searching...
                                </span>
                            </div>
                        )}

                        {error && !loading && (
                            <div className="bg-red-900/20 border border-red-500/50 rounded-lg p-6 text-red-300">
                                <p>Error: {error}</p>
                            </div>
                        )}

                        {!loading &&
                            !error &&
                            searched &&
                            results.length === 0 && (
                                <div className="text-center py-32">
                                    <Search className="w-16 h-16 text-slate-600 mx-auto mb-4" />
                                    <p className="text-slate-300 text-lg font-medium mb-1">
                                        No stories found
                                    </p>
                                    <p className="text-slate-500 text-sm">
                                        Try a different search term or remove
                                        some filters
                                    </p>
                                </div>
                            )}

                        {!loading && results.length > 0 && (
                            <div className="grid grid-cols-2 xl:grid-cols-3 gap-5">
                                {results.map((story) => (
                                    <StoryCard key={story.id} story={story} />
                                ))}
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}

// ── Sub-components ─────────────────────────────────────────────────────────

function FilterPanel({
    filters,
    visibleSubcategories,
    selectedCategory,
    selectedSubcategory,
    selectedLanguage,
    hasActiveFilters,
    onCategoryChange,
    onSubcategoryChange,
    onLanguageChange,
    onClear,
}) {
    return (
        <div className="space-y-6">
            {hasActiveFilters && (
                <button
                    onClick={onClear}
                    className="text-xs text-purple-400 hover:text-purple-300 flex items-center gap-1"
                >
                    <X className="w-3 h-3" /> Clear all filters
                </button>
            )}

            {/* Category filter */}
            <div>
                <h4 className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-3">
                    Category
                </h4>
                <div className="space-y-1">
                    <FilterOption
                        label="All Categories"
                        selected={!selectedCategory}
                        onClick={() => onCategoryChange("")}
                    />
                    {filters.categories.map((cat) => (
                        <FilterOption
                            key={cat.id}
                            label={cat.name}
                            selected={
                                String(selectedCategory) === String(cat.id)
                            }
                            onClick={() => onCategoryChange(String(cat.id))}
                        />
                    ))}
                </div>
            </div>

            {/* Subcategory filter */}
            {visibleSubcategories.length > 0 && (
                <div>
                    <h4 className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-3">
                        Subcategory
                    </h4>
                    <div className="space-y-1">
                        <FilterOption
                            label="All Subcategories"
                            selected={!selectedSubcategory}
                            onClick={() => onSubcategoryChange("")}
                        />
                        {visibleSubcategories.map((sub) => (
                            <FilterOption
                                key={sub.id}
                                label={sub.name}
                                selected={
                                    String(selectedSubcategory) ===
                                    String(sub.id)
                                }
                                onClick={() =>
                                    onSubcategoryChange(String(sub.id))
                                }
                            />
                        ))}
                    </div>
                </div>
            )}

            {/* Language filter */}
            {filters.languages.length > 0 && (
                <div>
                    <h4 className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-3">
                        Language
                    </h4>
                    <div className="space-y-1">
                        <FilterOption
                            label="All Languages"
                            selected={!selectedLanguage}
                            onClick={() => onLanguageChange("")}
                        />
                        {filters.languages.map((lang) => (
                            <FilterOption
                                key={lang.id}
                                label={lang.language_name}
                                selected={
                                    selectedLanguage === lang.language_name
                                }
                                onClick={() =>
                                    onLanguageChange(lang.language_name)
                                }
                            />
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
}

function FilterOption({ label, selected, onClick }) {
    return (
        <button
            onClick={onClick}
            className={`w-full text-left px-3 py-1.5 rounded-lg text-sm transition-colors ${
                selected
                    ? "bg-purple-600/30 text-purple-300 font-medium"
                    : "text-slate-400 hover:text-white hover:bg-slate-700/50"
            }`}
        >
            {label}
        </button>
    );
}

function FilterTag({ label, onRemove }) {
    return (
        <span className="inline-flex items-center gap-1 bg-purple-500/20 text-purple-300 text-xs px-2 py-0.5 rounded-full">
            {label}
            <button onClick={onRemove} className="hover:text-white">
                <X className="w-3 h-3" />
            </button>
        </span>
    );
}

function StoryCard({ story }) {
    return (
        <div className="bg-slate-800/50 border border-slate-700 rounded-xl overflow-hidden hover:border-purple-500/60 transition-all hover:shadow-lg hover:shadow-purple-500/10 hover:-translate-y-1 duration-200 group">
            <div className="relative aspect-video w-full bg-slate-700">
                {story.imageUrl ? (
                    <img
                        src={story.imageUrl}
                        alt={story.title}
                        className="object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                ) : (
                    <div className="absolute inset-0 flex items-center justify-center bg-linear-to-br from-purple-900/40 to-pink-900/40">
                        <BookOpen className="w-10 h-10 text-slate-500" />
                    </div>
                )}
                <div className="absolute inset-0 bg-linear-to-t from-slate-900/70 to-transparent" />
                {story.isTopPick && (
                    <span className="absolute top-2 left-2 bg-yellow-500 text-slate-900 text-xs font-bold px-2 py-0.5 rounded-full">
                        ⭐ Top Pick
                    </span>
                )}
            </div>
            <div className="p-4">
                <p className="text-xs text-slate-500 mb-1">
                    {story.category_name} › {story.subcategory_name}
                </p>
                <h4 className="text-white font-semibold text-sm mb-3 line-clamp-2 leading-snug">
                    {story.title}
                </h4>
                <Link href={`/stories/${story.id}`}>
                    <Button
                        size="sm"
                        className="w-full bg-linear-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white text-xs flex items-center gap-1.5"
                    >
                        <PlayCircle className="w-3.5 h-3.5" />
                        Listen Now
                    </Button>
                </Link>
            </div>
        </div>
    );
}
