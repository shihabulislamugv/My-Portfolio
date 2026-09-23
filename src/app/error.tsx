"use client";

import { useEffect } from "react";
import Link from "next/link";
import { RefreshCw, ArrowLeft } from "lucide-react";

export default function ErrorBoundary({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error("Application error boundary caught:", error);
  }, [error]);

  return (
    <main className="min-h-[80vh] flex items-center justify-center p-6 bg-[#f8f8f5]">
      <div className="max-w-xl w-full bg-white border-4 border-zinc-900 shadow-[12px_12px_0px_0px_rgba(24,24,27,1)] p-8 md:p-12 text-center space-y-6">
        <span className="px-3 py-1 bg-red-100 border border-red-300 text-red-700 text-xs font-black uppercase tracking-widest inline-block">
          System Notice
        </span>
        <h2 className="text-3xl md:text-5xl font-black text-zinc-900 uppercase tracking-tight">
          Page Notice
        </h2>
        <p className="text-zinc-600 font-medium text-base leading-relaxed">
          The page encountered a minor loading hiccup while connecting to background resources.
        </p>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
          <button
            onClick={() => reset()}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-4 bg-zinc-900 text-white font-black text-xs uppercase tracking-widest hover:bg-blue-600 transition-colors shadow-[4px_4px_0px_0px_rgba(37,99,235,1)]"
          >
            <RefreshCw size={16} />
            <span>Try Again</span>
          </button>
          <Link
            href="/"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-4 bg-white border-2 border-zinc-900 text-zinc-900 font-black text-xs uppercase tracking-widest hover:bg-zinc-100 transition-colors shadow-[4px_4px_0px_0px_rgba(24,24,27,1)]"
          >
            <ArrowLeft size={16} />
            <span>Return Home</span>
          </Link>
        </div>
      </div>
    </main>
  );
}
