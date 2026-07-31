"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import Link from "next/link";
import Image from "next/image";
import {
    BookOpen,
    Loader2,
    ChevronRight,
    Home,
    Play,
    Pause,
    SkipBack,
    SkipForward,
    Volume2,
    VolumeX,
    Globe,
    Clock,
    Star,
    Tag,
    Languages,
    Lock,
    SeparatorHorizontal,
    Minus,
} from "lucide-react";
import { Button } from "@/components/ui/button";

function getSavedPosition(storyId) {
    if (typeof window === "undefined") return 0;
    try {
        return (
            parseFloat(localStorage.getItem(`kk_pos_${storyId}`) || "0") || 0
        );
    } catch {
        return 0;
    }
}
function savePosition(storyId, time) {
    if (typeof window === "undefined") return;
    try {
        localStorage.setItem(`kk_pos_${storyId}`, String(time));
    } catch {}
}
function fmt(seconds) {
    if (!seconds || isNaN(seconds)) return "0:00";
    const m = Math.floor(seconds / 60);
    const s = Math.floor(seconds % 60);
    return `${m}:${s.toString().padStart(2, "0")}`;
}

export default function StoryPage({ params }) {
    const [storyId, setStoryId] = useState(null);
    const [story, setStory] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const audioRef = useRef(null);
    const [selectedLang, setSelectedLang] = useState(null);
    const [isPlaying, setIsPlaying] = useState(false);
    const [currentTime, setCurrentTime] = useState(0);
    const [duration, setDuration] = useState(0);
    const [volume, setVolume] = useState(1);
    const [muted, setMuted] = useState(false);
    const [audioLoading, setAudioLoading] = useState(false);

    const mediaUrl = process.env.NEXT_PUBLIC_MEDIA_BASE_URL;
    const audioFileDir = mediaUrl + "uploads/mp3/";

    // Track pending seek time across language switches
    const pendingSeekRef = useRef(null);
    // Track whether we should resume playing after src change
    const shouldPlayRef = useRef(false);

    useEffect(() => {
        params.then(({ storyId }) => setStoryId(storyId));
    }, [params]);

    useEffect(() => {
        if (!storyId) return;
        async function fetchStory() {
            try {
                const res = await fetch(`/api/stories/${storyId}`);

                if (!res.ok) {
                    throw new Error("Failed to fetch story");
                }
                const json = await res.json();
                console.log(json);
                if (!json.success) {
                    throw new Error(json.error);
                }
                setStory(json.story);
                if (json.story.audio?.length > 0) {
                    setSelectedLang(json.story.audio[0].language);
                }
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        }
        fetchStory();
    }, [storyId]);

    const currentTrack = story?.audio?.find((a) => a.language === selectedLang);

    // When src changes on the audio element, restore position and resume if needed
    const handleLoadedMetadata = useCallback(() => {
        const audio = audioRef.current;
        if (!audio) return;
        setAudioLoading(false);
        setDuration(audio.duration);

        const target = pendingSeekRef.current ?? getSavedPosition(storyId);
        if (target > 0 && target < audio.duration) {
            audio.currentTime = target;
            setCurrentTime(target);
        }
        pendingSeekRef.current = null;

        if (shouldPlayRef.current) {
            audio.play().catch(() => {});
        }
    }, [storyId]);

    const handleTimeUpdate = useCallback(() => {
        const audio = audioRef.current;
        if (!audio) return;
        setCurrentTime(audio.currentTime);
        // Save position every ~5 seconds
        if (
            storyId &&
            Math.floor(audio.currentTime) % 5 === 0 &&
            audio.currentTime > 0
        ) {
            savePosition(storyId, audio.currentTime);
        }
    }, [storyId]);

    const handleEnded = useCallback(() => {
        setIsPlaying(false);
        shouldPlayRef.current = false;
        if (storyId) savePosition(storyId, 0);
    }, [storyId]);

    const handleCanPlay = useCallback(() => {
        setAudioLoading(false);
    }, []);

    const handleWaiting = useCallback(() => {
        setAudioLoading(true);
    }, []);

    // Language switch — save current time, mark to resume, switch src
    const handleLanguageSwitch = useCallback(
        (lang) => {
            const audio = audioRef.current;
            if (lang === selectedLang) return;
            pendingSeekRef.current = audio ? audio.currentTime : 0;
            shouldPlayRef.current = audio ? !audio.paused : false;
            if (audio && !audio.paused) audio.pause();
            setAudioLoading(true);
            setSelectedLang(lang);
        },
        [selectedLang],
    );

    const togglePlay = useCallback(async () => {
        const audio = audioRef.current;
        if (!audio) return;
        if (audio.paused) {
            await audio.play();
            shouldPlayRef.current = true;
            setIsPlaying(true);
        } else {
            audio.pause();
            shouldPlayRef.current = false;
            if (storyId) savePosition(storyId, audio.currentTime);
            setIsPlaying(false);
        }
    }, [storyId]);

    const seek = useCallback(
        (e) => {
            const audio = audioRef.current;
            if (!audio || !duration) return;
            const rect = e.currentTarget.getBoundingClientRect();
            const ratio = Math.min(
                1,
                Math.max(0, (e.clientX - rect.left) / rect.width),
            );
            const newTime = ratio * duration;
            audio.currentTime = newTime;
            setCurrentTime(newTime);
        },
        [duration],
    );

    const skip = useCallback((delta) => {
        const audio = audioRef.current;
        if (!audio) return;
        const newTime = Math.max(
            0,
            Math.min(audio.duration || 0, audio.currentTime + delta),
        );
        audio.currentTime = newTime;
        setCurrentTime(newTime);
    }, []);

    const changeVolume = useCallback((e) => {
        const val = parseFloat(e.target.value);
        setVolume(val);
        if (audioRef.current) {
            audioRef.current.volume = val;
            audioRef.current.muted = val === 0;
        }
        setMuted(val === 0);
    }, []);

    const toggleMute = useCallback(() => {
        const audio = audioRef.current;
        if (!audio) return;
        audio.muted = !audio.muted;
        setMuted(audio.muted);
    }, []);

    const progressPct = duration > 0 ? (currentTime / duration) * 100 : 0;

    return (
        <div className="min-h-screen bg-linear-to-b from-slate-950 via-slate-900 to-slate-950">
            {/* Single persistent audio element — always mounted, src swaps on lang change */}
            <audio
                ref={audioRef}
                src={audioFileDir + currentTrack?.audioUrl || undefined}
                preload="metadata"
                onLoadedMetadata={handleLoadedMetadata}
                onTimeUpdate={handleTimeUpdate}
                onEnded={handleEnded}
                onPlay={() => setIsPlaying(true)}
                onPause={() => setIsPlaying(false)}
                onCanPlay={handleCanPlay}
                onWaiting={handleWaiting}
            />
            {loading && (
                <div className="flex items-center justify-center py-40">
                    <Loader2 className="w-8 h-8 text-purple-400 animate-spin" />
                    <span className="ml-3 text-slate-300">
                        Loading story...
                    </span>
                </div>
            )}

            {error && (
                <div className="max-w-7xl mx-auto px-4 py-20">
                    <div className="bg-red-900/20 border border-red-500/50 rounded-lg p-6 text-red-300">
                        <p>Error: {error}</p>
                    </div>
                </div>
            )}

            {story && (
                <>
                    {/* Hero Banner */}
                    <div className="relative w-full h-72 md:h-96 overflow-hidden">
                        {story.imageUrl ? (
                            <img
                                src={story.imageUrl}
                                alt={story.title}
                                className="object-cover"
                            />
                        ) : (
                            <div className="absolute inset-0 bg-linear-to-br from-purple-900 via-pink-900 to-slate-900" />
                        )}
                        <div className="absolute inset-0 bg-linear-to-t from-slate-950 via-slate-950/50 to-transparent" />
                        <div className="absolute bottom-0 left-0 right-0 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-10">
                            <nav className="flex items-center gap-2 text-xs text-slate-100 mb-3 flex-wrap">
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
                                <Link
                                    href={`/categories/${story.category.id}`}
                                    className="hover:text-white"
                                >
                                    {story.category.name}
                                </Link>
                                <ChevronRight className="w-3 h-3" />
                                <Link
                                    href={`/categories/${story.category.id}/${story.subcategory.id}`}
                                    className="hover:text-white"
                                >
                                    {story.subcategory.name}
                                </Link>
                                <ChevronRight className="w-3 h-3" />
                                <span className="text-white truncate max-w-xs">
                                    {story.title}
                                </span>
                            </nav>
                            <h2 className="text-2xl md:text-5xl font-bold text-white drop-shadow-lg">
                                {story.title}
                            </h2>
                        </div>
                    </div>

                    <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
                        {/* Audio Player */}
                        {story.access?.canPlay && story.audio?.length > 0 ? (
                            <div className="bg-slate-800/70 border border-slate-700 rounded-2xl p-6 shadow-xl">
                                {/* Language switcher */}
                                {story.audio.length > 1 && (
                                    <div className="mb-5">
                                        <p className="text-xs text-slate-400 mb-2 flex items-center gap-1">
                                            <Languages className="w-3.5 h-3.5" />{" "}
                                            Switch Language
                                        </p>
                                        <div className="flex flex-wrap gap-2">
                                            {story.audio.map((track) => (
                                                <button
                                                    key={track.language}
                                                    onClick={() =>
                                                        handleLanguageSwitch(
                                                            track.language,
                                                        )
                                                    }
                                                    className={`px-3 py-1 rounded-full text-sm font-medium border transition-all ${
                                                        selectedLang ===
                                                        track.language
                                                            ? "bg-purple-600 border-purple-500 text-white"
                                                            : "bg-slate-700/50 border-slate-600 text-slate-300 hover:border-purple-500"
                                                    }`}
                                                >
                                                    <Globe className="w-3 h-3 inline mr-1" />
                                                    {track.language}
                                                </button>
                                            ))}
                                        </div>
                                    </div>
                                )}

                                {/* Progress bar */}
                                <div
                                    className="relative h-2 bg-slate-700 rounded-full mb-2 cursor-pointer group"
                                    onClick={seek}
                                >
                                    <div
                                        className="h-full bg-linear-to-r from-purple-500 to-pink-500 rounded-full"
                                        style={{ width: `${progressPct}%` }}
                                    />
                                    <div
                                        className="absolute top-1/2 -translate-y-1/2 w-4 h-4 bg-white rounded-full shadow-md opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none"
                                        style={{
                                            left: `calc(${progressPct}% - 8px)`,
                                        }}
                                    />
                                </div>
                                <div className="flex justify-between text-xs text-slate-500 mb-5">
                                    <span>{fmt(currentTime)}</span>
                                    <span>{fmt(duration)}</span>
                                </div>

                                {/* Controls */}
                                <div className="flex items-center justify-center gap-4">
                                    <button
                                        onClick={() => skip(-10)}
                                        className="text-slate-400 hover:text-white transition-colors p-2"
                                        title="Back 10s"
                                    >
                                        <SkipBack className="w-5 h-5" />
                                    </button>

                                    <button
                                        onClick={togglePlay}
                                        disabled={audioLoading}
                                        className="w-14 h-14 rounded-full bg-linear-to-br from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white flex items-center justify-center shadow-lg hover:shadow-purple-500/40 transition-all disabled:opacity-50"
                                    >
                                        {audioLoading ? (
                                            <Loader2 className="w-6 h-6 animate-spin" />
                                        ) : isPlaying ? (
                                            <Pause className="w-6 h-6" />
                                        ) : (
                                            <Play className="w-6 h-6 ml-0.5" />
                                        )}
                                    </button>

                                    <button
                                        onClick={() => skip(10)}
                                        className="text-slate-400 hover:text-white transition-colors p-2"
                                        title="Forward 10s"
                                    >
                                        <SkipForward className="w-5 h-5" />
                                    </button>

                                    <div className="flex items-center gap-2 ml-4">
                                        <button
                                            onClick={toggleMute}
                                            className="text-slate-400 hover:text-white transition-colors"
                                        >
                                            {muted ? (
                                                <VolumeX className="w-4 h-4" />
                                            ) : (
                                                <Volume2 className="w-4 h-4" />
                                            )}
                                        </button>
                                        <input
                                            type="range"
                                            min="0"
                                            max="1"
                                            step="0.05"
                                            value={muted ? 0 : volume}
                                            onChange={changeVolume}
                                            className="w-20 h-1 accent-purple-500"
                                        />
                                    </div>
                                </div>
                            </div>
                        ) : (
                            <div className="bg-slate-800/50 border border-slate-700 rounded-2xl p-8 text-center">
                                {/* <Lock className="w-12 h-12 text-slate-500 mx-auto mb-3" /> */}
                                <p className="text-white font-semibold text-lg mb-1">
                                    🔒 Premium Story
                                </p>
                                <p className="text-slate-400 mb-3 text-lg">
                                    This story is available for premium members.
                                </p>
                                <div className="flex flex-col gap-3 mx-auto items-center justify-center my-3">
                                    <p className="text-slate-400 text-base">
                                        Already a member?
                                    </p>
                                    <Link href="/login">
                                        <Button className="bg-linear-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white">
                                            Sign In
                                        </Button>
                                    </Link>
                                </div>
                                <Minus className="mx-auto" />
                                <div>
                                    <p className="text-slate-400 text-base">Not a member yet?</p>
                                    <p className="text-slate-100 mt-5 text-xl">Become a Premium Member and enjoy unlimited access to all stories.</p>
                                    <img src="/images/payment-qr.jpeg" className="w-full lg:w-1/2 mx-auto mt-10 py-4 px-3 bg-[#0B1327] rounded-sm" />
                                    <p className="text-slate-100">Scan any UPI app</p>
                                </div>
                            </div>
                        )}

                        {/* Meta */}
                        <div className="grid sm:grid-cols-2 gap-4">
                            <MetaCard
                                icon={
                                    <Tag className="w-4 h-4 text-purple-400" />
                                }
                                label="Category"
                            >
                                <Link
                                    href={`/categories/${story.category.id}`}
                                    className="text-purple-300 hover:text-purple-200"
                                >
                                    {story.category.name}
                                </Link>
                            </MetaCard>
                            <MetaCard
                                icon={<Tag className="w-4 h-4 text-pink-400" />}
                                label="Subcategory"
                            >
                                <Link
                                    href={`/categories/${story.category.id}/${story.subcategory.id}`}
                                    className="text-pink-300 hover:text-pink-200"
                                >
                                    {story.subcategory.name}
                                </Link>
                            </MetaCard>
                            {story.isTopPick && (
                                <MetaCard
                                    icon={
                                        <Star className="w-4 h-4 text-yellow-400" />
                                    }
                                    label="Featured"
                                >
                                    <span className="text-yellow-300">
                                        Top Pick
                                    </span>
                                </MetaCard>
                            )}
                            {story.audio?.length > 0 && (
                                <MetaCard
                                    icon={
                                        <Globe className="w-4 h-4 text-blue-400" />
                                    }
                                    label="Available Languages"
                                >
                                    <span className="text-slate-300">
                                        {story.audio
                                            .map((a) => a.language)
                                            .join(", ")}
                                    </span>
                                </MetaCard>
                            )}
                            <MetaCard
                                icon={
                                    <Clock className="w-4 h-4 text-green-400" />
                                }
                                label="Added On"
                            >
                                <span className="text-slate-300">
                                    {new Date(
                                        story.createdAt,
                                    ).toLocaleDateString("en-IN", {
                                        year: "numeric",
                                        month: "long",
                                        day: "numeric",
                                    })}
                                </span>
                            </MetaCard>
                        </div>

                        {/* Description */}
                        {story.description && (
                            <div className="bg-slate-800/40 border border-slate-700 rounded-2xl p-6">
                                <h3 className="text-lg font-semibold text-white mb-3">
                                    About this Story
                                </h3>
                                <p className="text-slate-300 leading-relaxed whitespace-pre-line">
                                    {story.description}
                                </p>
                            </div>
                        )}
                    </main>
                </>
            )}
        </div>
    );
}

function MetaCard({ icon, label, children }) {
    return (
        <div className="bg-slate-800/40 border border-slate-700 rounded-xl p-4 flex items-start gap-3">
            <div className="mt-0.5">{icon}</div>
            <div>
                <p className="text-xs text-slate-500 mb-0.5">{label}</p>
                <div className="text-sm font-medium">{children}</div>
            </div>
        </div>
    );
}
