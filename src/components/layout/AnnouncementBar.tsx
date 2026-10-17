'use client';

import React, { useState } from 'react';
import { X, Sparkles, ArrowRight } from 'lucide-react';
import Link from 'next/link';

export function AnnouncementBar() {
  const [isDismissed, setIsDismissed] = useState(false);

  if (isDismissed) return null;

  return (
    <aside
      aria-label="Announcement"
      className="relative z-40 bg-[#1A1814] text-white py-2.5 px-4 text-xs font-mono-tag font-semibold tracking-wider uppercase"
    >
      <div className="max-w-7xl mx-auto flex items-center justify-between gap-4">
        {/* Left spacer for balance on desktop */}
        <div className="hidden md:flex items-center gap-1.5 opacity-70 text-[11px] text-[#C4B8A8]">
          <Sparkles className="w-3.5 h-3.5 text-[#B87333]" />
          <span>SS26 CURATED VAULT</span>
        </div>

        {/* Center message */}
        <div className="flex-1 flex items-center justify-center gap-2 text-center text-[11px] sm:text-xs text-[#F0EBE3]">
          <span>THE NEXT DROP IS HERE — DISCOVER YOUR NEXT ICON.</span>
          <Link
            href="/sneakers?sort=newest"
            className="hidden sm:inline-flex items-center gap-1 underline underline-offset-2 font-bold text-[#D4955A] hover:text-[#B87333] transition-colors"
          >
            <span>EXPLORE</span>
            <ArrowRight className="w-3 h-3" />
          </Link>
        </div>

        {/* Dismiss button */}
        <button
          onClick={() => setIsDismissed(true)}
          className="p-1 hover:bg-white/10 rounded-full transition-colors text-[#C4B8A8] hover:text-white"
          aria-label="Dismiss announcement"
        >
          <X className="w-3.5 h-3.5" />
        </button>
      </div>
    </aside>
  );
}
