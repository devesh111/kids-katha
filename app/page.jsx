import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Search, BookOpen, Headphones, Star } from "lucide-react";

/**
 * Home page for Kids Katha
 * Displays featured stories, categories, and call-to-action
 * Dark theme with purple/magenta/orange/teal color scheme
 */
export default function HomePage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950">
      {/* Header/Navigation */}
      <header className="sticky top-0 z-50 border-b border-slate-800 bg-slate-950/95 backdrop-blur">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center">
              <BookOpen className="w-6 h-6 text-white" />
            </div>
            <h1 className="text-2xl font-bold bg-gradient-to-r from-purple-400 via-pink-400 to-orange-400 bg-clip-text text-transparent">
              Kids Katha
            </h1>
          </div>
          <nav className="flex items-center gap-4">
            <Link href="/categories">
              <Button variant="ghost" className="text-slate-300 hover:text-white">
                Categories
              </Button>
            </Link>
            <Link href="/login">
              <Button className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700">
                Login
              </Button>
            </Link>
          </nav>
        </div>
      </header>

      {/* Hero Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="text-center space-y-6">
          <h2 className="text-5xl sm:text-6xl font-bold text-white leading-tight">
            Magical Stories for{" "}
            <span className="bg-gradient-to-r from-purple-400 via-pink-400 to-orange-400 bg-clip-text text-transparent">
              Every Child
            </span>
          </h2>
          <p className="text-xl text-slate-300 max-w-2xl mx-auto">
            Explore enchanting tales in English and Hindi. From Krishna Stories to Arabian Nights, discover stories that inspire and delight.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
            <Link href="/categories">
              <Button size="lg" className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white">
                <BookOpen className="w-5 h-5 mr-2" />
                Explore Stories
              </Button>
            </Link>
            <Link href="/pricing">
              <Button size="lg" variant="outline" className="border-slate-600 text-white hover:bg-slate-800">
                <Star className="w-5 h-5 mr-2" />
                Premium Plans
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <h3 className="text-3xl font-bold text-white mb-12 text-center">Why Kids Katha?</h3>
        <div className="grid md:grid-cols-3 gap-8">
          <Card className="bg-slate-800/50 border-slate-700 p-6 hover:border-purple-500/50 transition-colors">
            <Headphones className="w-12 h-12 text-purple-400 mb-4" />
            <h4 className="text-xl font-semibold text-white mb-2">Audio Stories</h4>
            <p className="text-slate-300">
              Professional narration in English and Hindi. Perfect for bedtime or learning.
            </p>
          </Card>
          <Card className="bg-slate-800/50 border-slate-700 p-6 hover:border-pink-500/50 transition-colors">
            <BookOpen className="w-12 h-12 text-pink-400 mb-4" />
            <h4 className="text-xl font-semibold text-white mb-2">Rich Collection</h4>
            <p className="text-slate-300">
              284+ stories across 5 categories. Krishna, Ramayana, Panchatantra, and more.
            </p>
          </Card>
          <Card className="bg-slate-800/50 border-slate-700 p-6 hover:border-orange-500/50 transition-colors">
            <Star className="w-12 h-12 text-orange-400 mb-4" />
            <h4 className="text-xl font-semibold text-white mb-2">Free & Premium</h4>
            <p className="text-slate-300">
              Start free with curated stories. Unlock premium content with a subscription.
            </p>
          </Card>
        </div>
      </section>

      {/* CTA Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="bg-gradient-to-r from-purple-900/50 to-pink-900/50 border border-purple-500/30 rounded-lg p-12 text-center">
          <h3 className="text-3xl font-bold text-white mb-4">Ready to Start?</h3>
          <p className="text-slate-300 mb-8 max-w-2xl mx-auto">
            Browse our free collection or subscribe for unlimited access to all premium stories.
          </p>
          <Link href="/categories">
            <Button size="lg" className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700">
              Start Exploring
            </Button>
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-slate-800 bg-slate-950 mt-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid md:grid-cols-4 gap-8 mb-8">
            <div>
              <h4 className="text-white font-semibold mb-4">Kids Katha</h4>
              <p className="text-slate-400 text-sm">Stories that inspire young minds.</p>
            </div>
            <div>
              <h4 className="text-white font-semibold mb-4">Quick Links</h4>
              <ul className="space-y-2 text-slate-400 text-sm">
                <li><Link href="/categories" className="hover:text-white">Categories</Link></li>
                <li><Link href="/pricing" className="hover:text-white">Pricing</Link></li>
                <li><Link href="/login" className="hover:text-white">Login</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="text-white font-semibold mb-4">Legal</h4>
              <ul className="space-y-2 text-slate-400 text-sm">
                <li><a href="#" className="hover:text-white">Privacy Policy</a></li>
                <li><a href="#" className="hover:text-white">Terms of Service</a></li>
              </ul>
            </div>
            <div>
              <h4 className="text-white font-semibold mb-4">Contact</h4>
              <p className="text-slate-400 text-sm">support@kidskatha.com</p>
            </div>
          </div>
          <div className="border-t border-slate-800 pt-8 text-center text-slate-400 text-sm">
            <p>&copy; 2026 Kids Katha. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
