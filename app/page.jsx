import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Search, BookOpen, Headphones, Star } from "lucide-react";

export default function HomePage() {
    return (
        <main className="min-h-screen bg-linear-to-b from-slate-950 via-slate-900 to-slate-950">
            {/* Hero Section */}
            <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 md:py-20">
                <div className="flex flex-col md:flex-row gap-15 md:gap-3">
                    <div className="text-left space-y-6">
                        <h2 className="text-4xl sm:text-6xl font-bold text-white leading-tight">
                            Audio Stories for{" "}
                            <span className="bg-linear-to-r from-purple-400 via-pink-400 to-orange-400 bg-clip-text text-transparent">
                                Every Child
                            </span>
                        </h2>
                        <p className="text-sm md:text-xl text-slate-300 max-w-2xl mx-auto">
                            Explore enchanting tales in English and Hindi. From
                            Krishna Stories to Arabian Nights, discover stories
                            that inspire and delight. 
                        </p>
                        <div className="flex flex-col sm:flex-row gap-4 justify-start pt-4">
                            <Link href="/categories">
                                <Button
                                    size="lg"
                                    className="bg-linear-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white"
                                >
                                    <BookOpen className="w-5 h-5 mr-2" />
                                    Explore Stories
                                </Button>
                            </Link>
                        </div>
                    </div>
                    <div className="flex items-center justify-center">
                        <img
                            src="images/home-page-hero-img.webp"
                            className="w-full"
                        />
                    </div>
                </div>
            </section>

            {/* Features Section */}
            <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
                <h3 className="text-3xl font-bold text-white mb-12 text-center">
                    Why Kids Katha?
                </h3>
                <div className="grid md:grid-cols-3 gap-8">
                    <Card className="bg-slate-800/50 border-slate-700 p-6 hover:border-purple-500/50 transition-colors">
                        <Headphones className="w-12 h-12 text-purple-400 mb-4" />
                        <h4 className="text-xl font-semibold text-white mb-2">
                            Audio Stories
                        </h4>
                        <p className="text-slate-300">
                            Professional narration in English and Hindi. Perfect
                            for bedtime or learning.
                        </p>
                    </Card>
                    <Card className="bg-slate-800/50 border-slate-700 p-6 hover:border-pink-500/50 transition-colors">
                        <BookOpen className="w-12 h-12 text-pink-400 mb-4" />
                        <h4 className="text-xl font-semibold text-white mb-2">
                            Rich Collection
                        </h4>
                        <p className="text-slate-300">
                            344+ stories across 5 categories. Krishna, Ramayana,
                            Panchatantra, and more.
                        </p>
                    </Card>
                    <Card className="bg-slate-800/50 border-slate-700 p-6 hover:border-orange-500/50 transition-colors">
                        <Star className="w-12 h-12 text-orange-400 mb-4" />
                        <h4 className="text-xl font-semibold text-white mb-2">
                            Free & Premium
                        </h4>
                        <p className="text-slate-300">
                            Start free with curated stories. Unlock premium
                            content with a subscription.
                        </p>
                    </Card>
                </div>
            </section>

            {/* CTA Section */}
            <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
                <div className="bg-linear-to-r from-purple-900/50 to-pink-900/50 border border-purple-500/30 rounded-lg p-12 text-center">
                    <h3 className="text-3xl font-bold text-white mb-4">
                        Ready to Start?
                    </h3>
                    <p className="text-slate-300 mb-8 max-w-2xl mx-auto">
                        Browse our free collection or subscribe for unlimited
                        access to all premium stories.
                    </p>
                    <Link href="/categories">
                        <Button
                            size="lg"
                            className="text-white bg-linear-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700"
                        >
                            Start Exploring
                        </Button>
                    </Link>
                </div>
            </section>
        </main>
    );
}
