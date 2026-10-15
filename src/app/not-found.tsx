import React from 'react';
import Link from 'next/link';
import { ArrowRight, Compass } from 'lucide-react';

export default function NotFound() {
  return (
    <div className="min-h-[75vh] bg-[#08080a] text-zinc-100 flex items-center justify-center px-4">
      <div className="max-w-md w-full text-center bg-[#101015] border border-zinc-800 p-8 sm:p-12 rounded-3xl shadow-2xl">
        <span className="font-mono text-xs uppercase tracking-widest text-[#d4ff00] font-bold">
          ERROR 404 // VAULT MISSING
        </span>
        <h1 className="font-display text-4xl sm:text-5xl font-black uppercase text-white mt-2 mb-4">
          Silhouette Not Found
        </h1>
        <p className="text-zinc-400 text-xs sm:text-sm font-sans mb-8 leading-relaxed">
          The requested archive page or sneaker model does not exist in the active repository.
        </p>
        <Link
          href="/sneakers"
          className="inline-flex items-center gap-2 px-8 py-4 bg-[#d4ff00] hover:bg-[#e2ff40] text-black font-mono text-xs font-bold uppercase tracking-widest rounded-xl transition-all shadow-md glow-lime-sm active:scale-95"
        >
          <span>RETURN TO SNEAKER VAULT</span>
          <ArrowRight className="w-4 h-4" />
        </Link>
      </div>
    </div>
  );
}
