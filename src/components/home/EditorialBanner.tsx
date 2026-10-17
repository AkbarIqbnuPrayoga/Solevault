'use client';

import React from 'react';
import Link from 'next/link';
import { ArrowRight, Sparkles } from 'lucide-react';
import { ImageWithFallback } from '@/components/ui/ImageWithFallback';

export function EditorialBanner() {
  return (
    <section className="relative py-28 bg-[#F0EBE3] border-b border-[#E8E0D4] overflow-hidden">
      {/* Background Diagonal Pattern */}
      <div className="absolute inset-0 bg-diagonal-lines opacity-60 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="relative rounded-[2rem] overflow-hidden border border-[#E8E0D4] bg-white shadow-[0_20px_60px_-15px_rgba(44,35,24,0.1)]">
          
          <div className="grid grid-cols-1 lg:grid-cols-12 min-h-[500px]">
            {/* Left Campaign Imagery */}
            <div className="lg:col-span-7 relative min-h-[360px] lg:min-h-full overflow-hidden bg-[#F0EBE3]">
              <ImageWithFallback
                src="https://images.unsplash.com/photo-1552346154-21d32810aba3?auto=format&fit=crop&w=1400&q=85"
                alt="Built for the Streets editorial campaign"
                fill
                sizes="(max-width: 1024px) 100vw, 60vw"
                className="object-cover object-center transform hover:scale-105 transition-transform duration-700 ease-out"
              />
              <div className="absolute inset-0 bg-gradient-to-t lg:bg-gradient-to-r from-white/70 via-white/20 to-transparent" />
              
              <div className="absolute bottom-6 left-6 z-10 font-mono-tag text-[10px] text-[#8C8275] uppercase tracking-widest bg-white/80 px-3 py-1.5 rounded-full border border-[#E8E0D4] backdrop-blur-sm">
                CAMPAIGN // SS26 STREET WEARAGE
              </div>
            </div>

            {/* Right Campaign Copy & CTA */}
            <div className="lg:col-span-5 p-8 sm:p-12 lg:p-16 flex flex-col justify-between bg-white">
              <div>
                <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#B87333]/10 border border-[#B87333]/20 text-[#B87333] text-xs font-mono-tag font-bold uppercase tracking-wider mb-6">
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>EDITORIAL DROP 04</span>
                </div>

                <h2 className="font-display text-4xl sm:text-5xl font-bold text-[#1A1814] tracking-tight leading-[0.95]">
                  Built For <br />
                  <span className="text-[#B87333] italic">The Streets.</span>
                </h2>

                <p className="mt-6 text-[#8C8275] text-sm leading-relaxed font-sans font-light">
                  Crafted for the concrete. From low-profile terrace icons to high-cushioned Y2K tech runners, our SS26 curation explores the intersections between raw subculture and modern luxury.
                </p>

                <div className="mt-6 space-y-3 font-mono-tag text-xs text-[#3D3225]">
                  <div className="flex items-center gap-3">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#B87333]" />
                    <span>Selected premium full-grain leathers & vintage suedes</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#B87333]" />
                    <span>Archival color blocking engineered for rotation versatility</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#B87333]" />
                    <span>Limited allocations authenticated in-house</span>
                  </div>
                </div>
              </div>

              <div className="mt-10 pt-6 border-t border-[#E8E0D4]">
                <Link
                  href="/collections"
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-3 px-8 py-4 bg-[#1A1814] hover:bg-[#B87333] text-white font-mono-tag text-xs font-bold uppercase tracking-widest rounded-full transition-all duration-300 active:scale-95 glow-copper-sm"
                >
                  <span>DISCOVER THE COLLECTION</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
