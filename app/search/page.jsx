"use client";

import { useEffect, useState, useCallback, useRef, Suspense } from "react";
import Link from "next/link";
import { useSearchParams, useRouter } from "next/navigation";
import {
    BookOpen,
    Loader2,
    Search,
    X,
    PlayCircle,
    ChevronRight,
} from "lucide-react";
import { Button } from "@/components/ui/button";

// ─── Constants ───
const DEBOUNCE_MS = 400; // search fires 400ms after user stops typing

// ─── Main content (needs Suspense because of useSearchParams) ──
function SearchContent() {
    const router = useRouter();
    const searchParams = useSearchParams();

    // Filter state
    const [query, setQuery] = useState(searchParams.get("q") || "");
    const [selectedCategories, setSelectedCategories] = useState(() => {
        const c = searchParams.get("category");
        return c ? c.split(",").filter(Boolean) : [];
    });
    const [selectedSubcategories, setSelectedSubcategories] = useState(() => {
        const s = searchParams.get("subcategory");
        return s ? s.split(",").filter(Boolean) : [];
    });
    const [selectedLanguage, setSelectedLanguage] = useState(
        searchParams.get("language") || "",
    );

    // Tree expand state — which categories are expanded in the tree
    const [expandedCategories, setExpandedCategories] = useState({});

    // Filter data
    const [filters, setFilters] = useState({
        categories: [],
        subcategories: [],
        languages: [],
    });
    const [filtersLoaded, setFiltersLoaded] = useState(false);

    // Results + pagination
    const [results, setResults] = useState([]);
    const [total, setTotal] = useState(0);
    const [hasMore, setHasMore] = useState(false);
    const [offset, setOffset] = useState(0);

    // UI state
    const [loading, setLoading] = useState(false);
    const [loadingMore, setLoadingMore] = useState(false);
    const [error, setError] = useState(null);
    const [searched, setSearched] = useState(false);

    // Refs
    const debounceRef = useRef(null);
    const sentinelRef = useRef(null); // bottom sentinel for infinite scroll
    const observerRef = useRef(null);

    // ── URL sync ──
    const buildParams = useCallback((q, cats, subs, lang) => {
        const p = new URLSearchParams();
        if (q) p.set("q", q);
        if (cats.length) p.set("category", cats.join(","));
        if (subs.length) p.set("subcategory", subs.join(","));
        if (lang) p.set("language", lang);
        return p.toString();
    }, []);

    // ── Fetch first page ───
    const fetchFirst = useCallback(async (q, cats, subs, lang) => {
        setLoading(true);
        setError(null);
        setSearched(true);
        setResults([]);
        setOffset(0);
        setHasMore(false);

        try {
            const p = new URLSearchParams();
            if (q) p.set("q", q);
            if (cats.length) p.set("category", cats.join(","));
            if (subs.length) p.set("subcategory", subs.join(","));
            if (lang) p.set("language", lang);
            p.set("offset", "0");

            const res = await fetch(`/api/search?${p.toString()}`);
            if (!res.ok) throw new Error("Search failed");
            const json = await res.json();
            if (!json.success) throw new Error(json.error);

            setResults(json.results || []);
            setTotal(json.total || 0);
            setHasMore(json.hasMore || false);
            setOffset((json.results || []).length);

            // Filters only come on first page
            if (json.filters) {
                setFilters(json.filters);
                setFiltersLoaded(true);
                // Auto-expand categories that have selected subcategories
                if (subs.length > 0 && json.filters.subcategories?.length) {
                    const expanded = {};
                    subs.forEach((subId) => {
                        const sub = json.filters.subcategories.find(
                            (s) => String(s.id) === String(subId),
                        );
                        if (sub) expanded[sub.category_id] = true;
                    });
                    setExpandedCategories((prev) => ({ ...prev, ...expanded }));
                }
            }
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    }, []);

    // ── Fetch next page (infinite scroll) ───
    const fetchMore = useCallback(async () => {
        if (loadingMore || !hasMore) return;
        setLoadingMore(true);

        try {
            const p = new URLSearchParams();
            if (query) p.set("q", query);
            if (selectedCategories.length)
                p.set("category", selectedCategories.join(","));
            if (selectedSubcategories.length)
                p.set("subcategory", selectedSubcategories.join(","));
            if (selectedLanguage) p.set("language", selectedLanguage);
            p.set("offset", String(offset));

            const res = await fetch(`/api/search?${p.toString()}`);
            if (!res.ok) throw new Error("Failed");
            const json = await res.json();
            if (!json.success) throw new Error(json.error);

            setResults((prev) => [...prev, ...(json.results || [])]);
            setHasMore(json.hasMore || false);
            setOffset((prev) => prev + (json.results || []).length);
        } catch {
            // silently fail on pagination errors
        } finally {
            setLoadingMore(false);
        }
    }, [
        loadingMore,
        hasMore,
        query,
        selectedCategories,
        selectedSubcategories,
        selectedLanguage,
        offset,
    ]);

    // ── Debounced search on typing ──
    const triggerSearch = useCallback(
        (q, cats, subs, lang) => {
            clearTimeout(debounceRef.current);
            debounceRef.current = setTimeout(() => {
                router.replace(`/search?${buildParams(q, cats, subs, lang)}`, {
                    scroll: false,
                });
                fetchFirst(q, cats, subs, lang);
            }, DEBOUNCE_MS);
        },
        [router, buildParams, fetchFirst],
    );

    // ── Initial load ──
    useEffect(() => {
        fetchFirst(
            searchParams.get("q") || "",
            (searchParams.get("category") || "").split(",").filter(Boolean),
            (searchParams.get("subcategory") || "").split(",").filter(Boolean),
            searchParams.get("language") || "",
        );
    }, []); // eslint-disable-line

    // ── Infinite scroll observer ──
    useEffect(() => {
        if (observerRef.current) observerRef.current.disconnect();
        observerRef.current = new IntersectionObserver(
            (entries) => {
                if (
                    entries[0].isIntersecting &&
                    hasMore &&
                    !loadingMore &&
                    !loading
                ) {
                    fetchMore();
                }
            },
            { rootMargin: "200px" },
        );
        if (sentinelRef.current)
            observerRef.current.observe(sentinelRef.current);
        return () => observerRef.current?.disconnect();
    }, [hasMore, loadingMore, loading, fetchMore]);

    // ── Filter handlers ────
    const handleQueryChange = (e) => {
        const val = e.target.value;
        setQuery(val);
        triggerSearch(
            val,
            selectedCategories,
            selectedSubcategories,
            selectedLanguage,
        );
    };

    const toggleCategory = (catId) => {
        const id = String(catId);
        const next = selectedCategories.includes(id)
            ? selectedCategories.filter((c) => c !== id)
            : [...selectedCategories, id];

        // Deselect subcategories that belong to deselected category
        const nextSubs = next.includes(id)
            ? selectedSubcategories
            : selectedSubcategories.filter((subId) => {
                  const sub = filters.subcategories.find(
                      (s) => String(s.id) === subId,
                  );
                  return sub ? next.includes(String(sub.category_id)) : true;
              });

        setSelectedCategories(next);
        setSelectedSubcategories(nextSubs);
        triggerSearch(query, next, nextSubs, selectedLanguage);
    };

    const toggleSubcategory = (subId) => {
        const id = String(subId);
        const next = selectedSubcategories.includes(id)
            ? selectedSubcategories.filter((s) => s !== id)
            : [...selectedSubcategories, id];
        setSelectedSubcategories(next);
        triggerSearch(query, selectedCategories, next, selectedLanguage);
    };

    const handleLanguage = (lang) => {
        const next = selectedLanguage === lang ? "" : lang;
        setSelectedLanguage(next);
        triggerSearch(query, selectedCategories, selectedSubcategories, next);
    };

    const clearAll = () => {
        setQuery("");
        setSelectedCategories([]);
        setSelectedSubcategories([]);
        setSelectedLanguage("");
        clearTimeout(debounceRef.current);
        router.replace("/search", { scroll: false });
        fetchFirst("", [], [], "");
    };

    const hasActiveFilters =
        selectedCategories.length > 0 ||
        selectedSubcategories.length > 0 ||
        selectedLanguage;

    // Subcategories grouped by category for tree view
    const subsByCategory = filters.subcategories.reduce((acc, sub) => {
        const key = String(sub.category_id);
        if (!acc[key]) acc[key] = [];
        acc[key].push(sub);
        return acc;
    }, {});

    return (
        <div className="min-h-screen bg-linear-to-b from-slate-950 via-slate-900 to-slate-950">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                <div className="flex gap-6 items-start">
                    {/* ── Sticky Sidebar ──── */}
                    <aside className="hidden lg:flex flex-col w-64 shrink-0 sticky top-20 max-h-[calc(100vh-6rem)]">
                        <div className="bg-slate-800/50 border border-slate-700 rounded-xl flex flex-col overflow-hidden">
                            {/* Sidebar header */}
                            <div className="flex items-center justify-between px-4 py-3 border-b border-slate-700 shrink-0">
                                <h3 className="text-sm font-semibold text-white">
                                    Filters
                                </h3>
                                {hasActiveFilters && (
                                    <button
                                        onClick={clearAll}
                                        className="text-xs text-purple-400 hover:text-purple-300 flex items-center gap-1 transition-colors"
                                    >
                                        <X className="w-3 h-3" /> Clear all
                                    </button>
                                )}
                            </div>

                            {/* Scrollable filter body */}
                            <div className="overflow-y-auto flex-1 p-4 space-y-5 scrollbar-thin scrollbar-thumb-slate-600 scrollbar-track-transparent">
                                {/* ── Category tree ── */}
                                <div>
                                    <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">
                                        Categories
                                    </p>

                                    {/* Fixed height box with scroll */}
                                    <div className="max-h-72 overflow-y-auto pr-1 space-y-0.5 scrollbar-thin scrollbar-thumb-slate-600 scrollbar-track-transparent">
                                        {filters.categories.map((cat) => {
                                            const subs =
                                                subsByCategory[
                                                    String(cat.id)
                                                ] || [];
                                            const catSelected =
                                                selectedCategories.includes(
                                                    String(cat.id),
                                                );
                                            const isExpanded =
                                                expandedCategories[cat.id];
                                            const hasSelectedSub = subs.some(
                                                (s) =>
                                                    selectedSubcategories.includes(
                                                        String(s.id),
                                                    ),
                                            );

                                            return (
                                                <div key={cat.id}>
                                                    {/* Category row */}
                                                    <div className="flex items-center gap-1 group">
                                                        {/* Expand/collapse arrow */}
                                                        <button
                                                            onClick={() =>
                                                                setExpandedCategories(
                                                                    (prev) => ({
                                                                        ...prev,
                                                                        [cat.id]:
                                                                            !prev[
                                                                                cat
                                                                                    .id
                                                                            ],
                                                                    }),
                                                                )
                                                            }
                                                            className={`p-0.5 rounded transition-colors shrink-0 ${
                                                                subs.length > 0
                                                                    ? "text-slate-400 hover:text-white"
                                                                    : "text-transparent pointer-events-none"
                                                            }`}
                                                        >
                                                            <ChevronRight
                                                                className={`w-3.5 h-3.5 transition-transform ${
                                                                    isExpanded
                                                                        ? "rotate-90"
                                                                        : ""
                                                                }`}
                                                            />
                                                        </button>

                                                        {/* Checkbox + label */}
                                                        <label className="flex items-center gap-2 flex-1 py-1 px-1.5 rounded-lg cursor-pointer hover:bg-slate-700/50 transition-colors">
                                                            <input
                                                                type="checkbox"
                                                                checked={
                                                                    catSelected
                                                                }
                                                                onChange={() =>
                                                                    toggleCategory(
                                                                        cat.id,
                                                                    )
                                                                }
                                                                className="w-3.5 h-3.5 rounded border-slate-500 accent-purple-500 cursor-pointer shrink-0"
                                                            />
                                                            <span
                                                                className={`text-sm leading-tight ${
                                                                    catSelected ||
                                                                    hasSelectedSub
                                                                        ? "text-white font-medium"
                                                                        : "text-slate-300"
                                                                }`}
                                                            >
                                                                {cat.name}
                                                            </span>
                                                        </label>
                                                    </div>

                                                    {/* Subcategory children */}
                                                    {isExpanded &&
                                                        subs.length > 0 && (
                                                            <div className="ml-5 mt-0.5 space-y-0.5 border-l border-slate-700 pl-3">
                                                                {subs.map(
                                                                    (sub) => {
                                                                        const subSelected =
                                                                            selectedSubcategories.includes(
                                                                                String(
                                                                                    sub.id,
                                                                                ),
                                                                            );
                                                                        return (
                                                                            <label
                                                                                key={
                                                                                    sub.id
                                                                                }
                                                                                className="flex items-center gap-2 py-1 px-1.5 rounded-lg cursor-pointer hover:bg-slate-700/50 transition-colors"
                                                                            >
                                                                                <input
                                                                                    type="checkbox"
                                                                                    checked={
                                                                                        subSelected
                                                                                    }
                                                                                    onChange={() =>
                                                                                        toggleSubcategory(
                                                                                            sub.id,
                                                                                        )
                                                                                    }
                                                                                    className="w-3.5 h-3.5 rounded border-slate-500 accent-pink-500 cursor-pointer shrink-0"
                                                                                />
                                                                                <span
                                                                                    className={`text-sm leading-tight ${
                                                                                        subSelected
                                                                                            ? "text-white font-medium"
                                                                                            : "text-slate-400"
                                                                                    }`}
                                                                                >
                                                                                    {
                                                                                        sub.name
                                                                                    }
                                                                                </span>
                                                                            </label>
                                                                        );
                                                                    },
                                                                )}
                                                            </div>
                                                        )}
                                                </div>
                                            );
                                        })}
                                    </div>
                                </div>

                                {/* ── Language filter ── */}
                                {filters.languages.length > 0 && (
                                    <div>
                                        <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">
                                            Language
                                        </p>
                                        <div className="space-y-0.5">
                                            {filters.languages.map((lang) => {
                                                const sel =
                                                    selectedLanguage ===
                                                    lang.language_name;
                                                return (
                                                    <label
                                                        key={lang.id}
                                                        className="flex items-center gap-2 py-1 px-1.5 rounded-lg cursor-pointer hover:bg-slate-700/50 transition-colors"
                                                    >
                                                        <input
                                                            type="checkbox"
                                                            checked={sel}
                                                            onChange={() =>
                                                                handleLanguage(
                                                                    lang.language_name,
                                                                )
                                                            }
                                                            className="w-3.5 h-3.5 rounded border-slate-500 accent-purple-500 cursor-pointer shrink-0"
                                                        />
                                                        <span
                                                            className={`text-sm ${sel ? "text-white font-medium" : "text-slate-400"}`}
                                                        >
                                                            {lang.language_name}
                                                        </span>
                                                    </label>
                                                );
                                            })}
                                        </div>
                                    </div>
                                )}
                            </div>
                        </div>
                    </aside>

                    {/* ── Results area ── */}
                    <div className="flex-1 min-w-0">
                        {/* Search input */}
                        <div className="relative mb-6">
                            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400 pointer-events-none" />
                            {loading && (
                                <Loader2 className="absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 text-purple-400 animate-spin" />
                            )}
                            <input
                                type="text"
                                value={query}
                                onChange={handleQueryChange}
                                placeholder="Search stories, categories..."
                                className="w-full bg-slate-800 border border-slate-700 rounded-xl pl-12 pr-12 py-3.5 text-white placeholder-slate-500 focus:outline-none focus:border-purple-500 transition-colors"
                            />
                        </div>

                        {/* Active filter tags */}
                        {hasActiveFilters && (
                            <div className="flex items-center gap-2 mb-4 flex-wrap">
                                <span className="text-xs text-slate-500">
                                    Filtered by:
                                </span>
                                {selectedCategories.map((catId) => {
                                    const cat = filters.categories.find(
                                        (c) => String(c.id) === catId,
                                    );
                                    return cat ? (
                                        <FilterTag
                                            key={catId}
                                            label={cat.name}
                                            onRemove={() =>
                                                toggleCategory(catId)
                                            }
                                        />
                                    ) : null;
                                })}
                                {selectedSubcategories.map((subId) => {
                                    const sub = filters.subcategories.find(
                                        (s) => String(s.id) === subId,
                                    );
                                    return sub ? (
                                        <FilterTag
                                            key={subId}
                                            label={sub.name}
                                            onRemove={() =>
                                                toggleSubcategory(subId)
                                            }
                                        />
                                    ) : null;
                                })}
                                {selectedLanguage && (
                                    <FilterTag
                                        label={selectedLanguage}
                                        onRemove={() =>
                                            handleLanguage(selectedLanguage)
                                        }
                                    />
                                )}
                            </div>
                        )}

                        {/* Results count */}
                        {searched && !loading && (
                            <p className="text-sm text-slate-400 mb-5">
                                {total} result{total !== 1 ? "s" : ""}
                                {query && (
                                    <span className="text-slate-500">
                                        {" "}
                                        for "
                                        <span className="text-slate-300">
                                            {query}
                                        </span>
                                        "
                                    </span>
                                )}
                            </p>
                        )}

                        {/* Initial loading */}
                        {loading && (
                            <div className="flex items-center justify-center py-32">
                                <Loader2 className="w-8 h-8 text-purple-400 animate-spin" />
                                <span className="ml-3 text-slate-300">
                                    Searching...
                                </span>
                            </div>
                        )}

                        {/* Error */}
                        {error && !loading && (
                            <div className="bg-red-900/20 border border-red-500/50 rounded-lg p-6 text-red-300">
                                <p>Error: {error}</p>
                            </div>
                        )}

                        {/* Empty state */}
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

                        {/* Results grid */}
                        {!loading && results.length > 0 && (
                            <div className="grid grid-cols-2 xl:grid-cols-3 gap-5">
                                {results.map((story) => (
                                    <StoryCard key={story.id} story={story} />
                                ))}
                            </div>
                        )}

                        {/* Infinite scroll sentinel */}
                        <div ref={sentinelRef} className="h-4" />

                        {/* Load more spinner */}
                        {loadingMore && (
                            <div className="flex items-center justify-center py-8">
                                <Loader2 className="w-6 h-6 text-purple-400 animate-spin" />
                                <span className="ml-2 text-slate-400 text-sm">
                                    Loading more...
                                </span>
                            </div>
                        )}

                        {/* End of results */}
                        {!hasMore && results.length > 0 && !loadingMore && (
                            <p className="text-center text-slate-600 text-xs py-6">
                                — All {total} results shown —
                            </p>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}

// ─── Story Card ────
function StoryCard({ story }) {
    return (
        <div className="bg-slate-800/50 border border-slate-700 rounded-xl overflow-hidden hover:border-purple-500/60 transition-all hover:shadow-lg hover:shadow-purple-500/10 hover:-translate-y-1 duration-200 group">
            <div className="relative aspect-video w-full bg-slate-700">
                {story.imageUrl ? (
                    <img
                        src={story.imageUrl}
                        alt={story.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
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
                    {story.category_name} {">"} {story.subcategory_name}
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

// ─── Filter tag chip ───
function FilterTag({ label, onRemove }) {
    return (
        <span className="inline-flex items-center gap-1 bg-purple-500/20 text-purple-300 text-xs px-2 py-0.5 rounded-full">
            {label}
            <button
                onClick={onRemove}
                className="hover:text-white transition-colors"
            >
                <X className="w-3 h-3" />
            </button>
        </span>
    );
}

// ─── Page export with Suspense boundary ───
export default function SearchPage() {
    return (
        <Suspense
            fallback={
                <div className="min-h-screen bg-linear-to-b from-slate-950 via-slate-900 to-slate-950 flex items-center justify-center">
                    <Loader2 className="w-8 h-8 text-purple-400 animate-spin" />
                    <span className="ml-3 text-slate-300">Loading...</span>
                </div>
            }
        >
            <SearchContent />
        </Suspense>
    );
}
