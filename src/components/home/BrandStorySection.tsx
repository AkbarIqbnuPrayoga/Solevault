'use client';

import React from 'react';
import Link from 'next/link';
import { ArrowRight, ShieldCheck, CheckCircle2, Compass } from 'lucide-react';
import { ImageWithFallback } from '@/components/ui/ImageWithFallback';

export function BrandStorySection() {
  return (
    <section className="py-24 bg-[#08080a] border-b border-zinc-800/80 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          
          {/* Left Column: Visual Collage */}
          <div className="lg:col-span-6 relative">
            <div className="relative aspect-[4/5] rounded-3xl overflow-hidden bg-zinc-950 border border-zinc-800 shadow-2xl">
              <ImageWithFallback
                src="https://images.unsplash.com/photo-1512374382149-233c42b6a83b?auto=format&fit=crop&w=1200&q=85"
                alt="SOLEVAULT brand story editorial"
                fill
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-cover object-center"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
              
              {/* Floating Badge */}
              <div className="absolute bottom-6 left-6 right-6 p-5 rounded-2xl bg-[#121217]/90 border border-zinc-800/80 backdrop-blur-md">
                <div className="flex items-center gap-3">
                  <div className="p-2.5 rounded-xl bg-[#d4ff00]/10 text-[#d4ff00]">
                    <ShieldCheck className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="font-mono text-xs font-bold uppercase text-white">
                      The Vault Authentication Promise
                    </h4>
                    <p className="text-[11px] text-zinc-400 mt-0.5">
                      Every pair undergoes UV stitching verification, boxed scent analysis, and structural inspection.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Overlapping Detail Card */}
            <div className="hidden sm:block absolute -top-6 -right-6 p-4 rounded-2xl bg-zinc-900 border border-zinc-700/80 shadow-2xl backdrop-blur-md max-w-[200px]">
              <span className="font-mono text-[10px] text-[#d4ff00] font-bold uppercase tracking-wider block">
                CURATED IN
              </span>
              <p className="font-display text-sm font-bold text-white mt-0.5 uppercase">
                TOKYO & LONDON
              </p>
              <span className="text-[10px] text-zinc-400 font-mono mt-1 block">
                GLOBAL STREET EDIT
              </span>
            </div>
          </div>

          {/* Right Column: Narrative Copy */}
          <div className="lg:col-span-6">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-zinc-900 border border-zinc-800 text-zinc-300 text-xs font-mono uppercase tracking-wider mb-6">
              <Compass className="w-3.5 h-3.5 text-[#d4ff00]" />
              <span>OUR MANIFESTO</span>
            </div>

            <h2 className="font-display text-4xl sm:text-5xl font-black uppercase text-white tracking-tighter leading-tight">
              MORE THAN A PAIR. <br />
              <span className="text-[#d4ff00]">IT&apos;S A STATEMENT.</span>
            </h2>

            <p className="mt-6 text-zinc-300 text-base leading-relaxed font-sans">
              At SOLEVAULT, we treat sneaker collecting as an architectural art form and a cultural dialect. We curate iconic silhouettes, everyday rotation essentials, and rare statement sneakers for every wardrobe philosophy.
            </p>

            <p className="mt-4 text-zinc-400 text-sm leading-relaxed font-sans">
              Whether you are hunting for archival 1985 Chicago high-tops, terrace-ready gum soles, or cutting-edge Japanese tech runners, each model in our vault has been hand-selected for its heritage, material integrity, and timeless street resonance.
            </p>

            {/* Pillar Bullets */}
            <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="p-4 rounded-xl bg-zinc-900/50 border border-zinc-800/80">
                <div className="flex items-center gap-2 mb-1.5">
                  <CheckCircle2 className="w-4 h-4 text-[#d4ff00]" />
                  <h4 className="font-mono text-xs font-bold uppercase text-white">
                    Uncompromising Curation
                  </h4>
                </div>
                <p className="text-xs text-zinc-400">
                  Zero generic fill. Only culturally significant footwear and verified classics.
                </p>
              </div>

              <div className="p-4 rounded-xl bg-zinc-900/50 border border-zinc-800/80">
                <div className="flex items-center gap-2 mb-1.5">
                  <CheckCircle2 className="w-4 h-4 text-[#d4ff00]" />
                  <h4 className="font-mono text-xs font-bold uppercase text-white">
                    Fair Transparent Access
                  </h4>
                </div>
                <p className="text-xs text-zinc-400">
                  Transparent market pricing, verified stock levels, and instant order tracking.
                </p>
              </div>
            </div>

            {/* Link to About */}
            <div className="mt-8 pt-6 border-t border-zinc-800">
              <Link
                href="/about"
                className="inline-flex items-center gap-2 font-mono text-xs font-bold uppercase tracking-wider text-[#d4ff00] hover:text-white transition-colors group"
              >
                <span>Read The Full Brand Story & Concept Spaces</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
