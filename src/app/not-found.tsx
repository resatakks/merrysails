import Link from "next/link";
import { Anchor } from "lucide-react";

export const metadata = {
  title: "Page Not Found",
  description: "The page you are looking for does not exist or has been moved.",
};

export default function NotFound() {
  return (
    <div className="min-h-screen bg-primary flex items-center justify-center px-4">
      <div className="text-center">
        <Anchor className="w-16 h-16 text-gold mx-auto mb-6" />
        <h1 className="text-6xl md:text-8xl font-bold text-white mb-4">404</h1>
        <h2 className="text-2xl text-white/80 mb-4">Page Not Found</h2>
        <p className="text-white/50 max-w-md mx-auto mb-8">
          The page you&apos;re looking for doesn&apos;t exist or has been moved.
          Getting lost on the Bosphorus is lovely — but not on the web!
        </p>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link
            href="/"
            className="bg-gold hover:bg-gold-hover text-white px-8 py-3 rounded-lg font-semibold transition-colors"
          >
            Back to Home
          </Link>
          <Link
            href="/cruises"
            className="border-2 border-white/30 text-white hover:bg-white/10 px-8 py-3 rounded-lg font-semibold transition-colors"
          >
            Explore Cruises
          </Link>
        </div>
      </div>
    </div>
  );
}
