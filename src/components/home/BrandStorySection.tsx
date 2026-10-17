'use client';

import React from 'react';
import Link from 'next/link';
import { ArrowRight, ShieldCheck, CheckCircle2, Compass } from 'lucide-react';
import { ImageWithFallback } from '@/components/ui/ImageWithFallback';

export function BrandStorySection() {
  return (
    <section className="py-28 bg-[#FAF7F2] border-b border-[#E8E0D4] overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20 items-center">
          
          {/* Left Column: Visual Collage */}
          <div className="lg:col-span-6 relative">
            <div className="relative aspect-[4/5] rounded-[2rem] overflow-hidden bg-[#F0EBE3] border border-[#E8E0D4] shadow-[0_20px_60px_-15px_rgba(44,35,24,0.12)]">
              <ImageWithFallback
                src="https://images.unsplash.com/photo-1512374382149-233c42b6a83b?auto=format&fit=crop&w=1200&q=85"
                alt="SOLEVAULT brand story editorial"
                fill
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-cover object-center"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-white/60 via-transparent to-transparent" />
              
              {/* Floating Badge */}
              <div className="absolute bottom-6 left-6 right-6 p-5 rounded-2xl bg-white/90 border border-[#E8E0D4] backdrop-blur-md shadow-lg">
                <div className="flex items-center gap-3">
                  <div className="p-2.5 rounded-xl bg-[#B87333]/10 text-[#B87333]">
                    <ShieldCheck className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="font-mono-tag text-xs font-bold uppercase text-[#1A1814]">
                      The Vault Authentication Promise
                    </h4>
                    <p className="text-[11px] text-[#8C8275] mt-0.5">
                      Every pair undergoes UV stitching verification, boxed scent analysis, and structural inspection.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Overlapping Detail Card */}
            <div className="hidden sm:block absolute -top-6 -right-6 p-4 rounded-2xl bg-white border border-[#E8E0D4] shadow-[0_10px_40px_-10px_rgba(44,35,24,0.1)] backdrop-blur-md max-w-[200px]">
              <span className="font-mono-tag text-[10px] text-[#B87333] font-bold uppercase tracking-wider block">
                CURATED IN
              </span>
              <p className="font-display text-sm font-bold text-[#1A1814] mt-0.5 italic">
                Tokyo & London
              </p>
              <span className="text-[10px] text-[#8C8275] font-mono-tag mt-1 block">
                GLOBAL STREET EDIT
              </span>
            </div>
          </div>

          {/* Right Column: Narrative Copy */}
          <div className="lg:col-span-6">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#F0EBE3] border border-[#E8E0D4] text-[#8C8275] text-xs font-mono-tag uppercase tracking-wider mb-6">
              <Compass className="w-3.5 h-3.5 text-[#B87333]" />
              <span>OUR MANIFESTO</span>
            </div>

            <h2 className="font-display text-4xl sm:text-5xl font-bold text-[#1A1814] tracking-tight leading-tight">
              More Than A Pair. <br />
              <span className="text-[#B87333] italic">It&apos;s A Statement.</span>
            </h2>

            <p className="mt-6 text-[#3D3225] text-base leading-relaxed font-sans font-light">
              At SOLEVAULT, we treat sneaker collecting as an architectural art form and a cultural dialect. We curate iconic silhouettes, everyday rotation essentials, and rare statement sneakers for every wardrobe philosophy.
            </p>

            <p className="mt-4 text-[#8C8275] text-sm leading-relaxed font-sans font-light">
              Whether you are hunting for archival 1985 Chicago high-tops, terrace-ready gum soles, or cutting-edge Japanese tech runners, each model in our vault has been hand-selected for its heritage, material integrity, and timeless street resonance.
            </p>

            {/* Pillar Bullets */}
            <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="p-5 rounded-2xl bg-white border border-[#E8E0D4] shadow-sm">
                <div className="flex items-center gap-2 mb-2">
                  <CheckCircle2 className="w-4 h-4 text-[#B87333]" />
                  <h4 className="font-mono-tag text-xs font-bold uppercase text-[#1A1814]">
                    Uncompromising Curation
                  </h4>
                </div>
                <p className="text-xs text-[#8C8275] font-light leading-relaxed">
                  Zero generic fill. Only culturally significant footwear and verified classics.
                </p>
              </div>

              <div className="p-5 rounded-2xl bg-white border border-[#E8E0D4] shadow-sm">
                <div className="flex items-center gap-2 mb-2">
                  <CheckCircle2 className="w-4 h-4 text-[#B87333]" />
                  <h4 className="font-mono-tag text-xs font-bold uppercase text-[#1A1814]">
                    Fair Transparent Access
                  </h4>
                </div>
                <p className="text-xs text-[#8C8275] font-light leading-relaxed">
                  Transparent market pricing, verified stock levels, and instant order tracking.
                </p>
              </div>
            </div>

            {/* Link to About */}
            <div className="mt-8 pt-6 border-t border-[#E8E0D4]">
              <Link
                href="/about"
                className="inline-flex items-center gap-2 font-mono-tag text-xs font-bold uppercase tracking-wider text-[#B87333] hover:text-[#8B5A2B] transition-colors group"
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
