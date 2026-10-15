'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { ArrowRight, Sparkles, ChevronDown, Flame, Shield, ArrowUpRight } from 'lucide-react';
import { ImageWithFallback } from '@/components/ui/ImageWithFallback';

export function HeroSection() {
  const heroSneakers = [
    {
      name: 'Air Max 95 OG "Neon"',
      brand: 'Nike',
      price: '$185',
      sku: 'NK-AM95-NEON',
      image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=1400&q=85',
      tag: 'HERO DROP',
      slug: 'nike-air-max-95-og-neon',
    },
    {
      name: 'Air Jordan 1 High "Chicago"',
      brand: 'Jordan',
      price: '$190',
      sku: 'DZ5485-612',
      image: 'https://images.unsplash.com/photo-1584735935682-2f2b69dff9d2?auto=format&fit=crop&w=1400&q=85',
      tag: 'OG GRAIL',
      slug: 'jordan-1-retro-high-og-chicago',
    },
    {
      name: '9060 "Rain Cloud"',
      brand: 'New Balance',
      price: '$150',
      sku: 'U9060ECA',
      image: 'https://images.unsplash.com/photo-1539185441755-769473a23570?auto=format&fit=crop&w=1400&q=85',
      tag: 'Y2K TECH',
      slug: 'new-balance-9060-rain-cloud',
    },
  ];

  const [activeIndex, setActiveIndex] = useState(0);
  const currentSneaker = heroSneakers[activeIndex];

  return (
    <section className="relative min-h-[92vh] flex flex-col justify-between overflow-hidden bg-[#08080a] border-b border-zinc-800/80 bg-grid-pattern pt-8 pb-12">
      {/* Subtle radial ambient neon glow */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[700px] h-[500px] bg-[#d4ff00]/[0.05] blur-[140px] pointer-events-none rounded-full" />

      {/* Top Editorial Bar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full pt-4">
        <div className="flex items-center justify-between text-xs font-mono border-b border-zinc-800/60 pb-3">
          <div className="flex items-center gap-2 text-[#d4ff00]">
            <Sparkles className="w-3.5 h-3.5" />
            <span className="font-bold tracking-widest uppercase">SPRING / SUMMER 2026 ARCHIVE</span>
          </div>
          <div className="hidden sm:flex items-center gap-4 text-zinc-500">
            <span>TOKYO</span>
            <span>•</span>
            <span>LONDON</span>
            <span>•</span>
            <span>NEW YORK</span>
          </div>
        </div>
      </div>

      {/* Main Hero Content Area */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full py-8 md:py-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          
          {/* Left Editorial Copy */}
          <div className="lg:col-span-6 z-10 flex flex-col justify-center">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-zinc-900 border border-zinc-800 text-zinc-300 text-xs font-mono uppercase tracking-wider w-fit mb-6">
              <span className="w-2 h-2 rounded-full bg-[#d4ff00] animate-pulse" />
              <span>THE CURATED ROTATION DROPS</span>
            </div>

            <h1 className="font-display text-5xl sm:text-7xl xl:text-8xl font-black uppercase tracking-tighter text-white leading-[0.92]">
              STEP INTO <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-zinc-200 to-zinc-500">
                YOUR NEXT
              </span> <br />
              <span className="text-[#d4ff00] glow-lime-text">ERA.</span>
            </h1>

            <p className="mt-6 text-zinc-400 text-base sm:text-lg max-w-lg leading-relaxed font-sans font-normal">
              Iconic silhouettes. New-season essentials. Sneakers that define your rotation.
            </p>

            {/* CTAs */}
            <div className="mt-8 flex flex-col sm:flex-row items-stretch sm:items-center gap-4">
              <Link
                href="/sneakers"
                className="px-8 py-4 bg-[#d4ff00] hover:bg-[#e2ff40] text-black font-mono text-xs font-bold uppercase tracking-widest rounded-xl flex items-center justify-center gap-3 transition-transform active:scale-95 glow-lime"
              >
                <span>EXPLORE COLLECTION</span>
                <ArrowRight className="w-4 h-4" />
              </Link>

              <Link
                href="/sneakers?sort=newest"
                className="px-8 py-4 bg-zinc-900/90 hover:bg-zinc-800 text-white border border-zinc-700/80 font-mono text-xs font-bold uppercase tracking-widest rounded-xl flex items-center justify-center gap-3 transition-colors backdrop-blur-sm"
              >
                <span>SHOP NEW DROPS</span>
                <Sparkles className="w-4 h-4 text-[#d4ff00]" />
              </Link>
            </div>

            {/* Micro Stats */}
            <div className="mt-12 pt-6 border-t border-zinc-800/60 grid grid-cols-3 gap-6 font-mono text-xs">
              <div>
                <span className="text-xl sm:text-2xl font-bold text-white font-display block">
                  100%
                </span>
                <span className="text-zinc-500 uppercase tracking-wider text-[11px]">
                  Verified Authentic
                </span>
              </div>
              <div>
                <span className="text-xl sm:text-2xl font-bold text-white font-display block">
                  7
                </span>
                <span className="text-zinc-500 uppercase tracking-wider text-[11px]">
                  Curated Houses
                </span>
              </div>
              <div>
                <span className="text-xl sm:text-2xl font-bold text-[#d4ff00] font-display block">
                  SS26
                </span>
                <span className="text-zinc-500 uppercase tracking-wider text-[11px]">
                  Active Vault
                </span>
              </div>
            </div>
          </div>

          {/* Right Editorial Focal Sneaker Showcase */}
          <div className="lg:col-span-6 relative flex flex-col items-center justify-center">
            {/* Visual Frame */}
            <div className="relative w-full aspect-[4/3] sm:aspect-square max-w-lg rounded-3xl overflow-hidden bg-gradient-to-b from-zinc-900/80 to-[#0e0e13] border border-zinc-800 p-4 shadow-2xl flex items-center justify-center">
              
              {/* Corner Watermarks */}
              <div className="absolute top-4 left-4 z-10 font-mono text-[10px] text-zinc-500 uppercase tracking-widest">
                ARCHIVE REF // {currentSneaker.sku}
              </div>
              <div className="absolute top-4 right-4 z-10 font-mono text-[10px] text-[#d4ff00] font-bold uppercase tracking-widest bg-[#d4ff00]/10 px-2 py-0.5 rounded border border-[#d4ff00]/30">
                {currentSneaker.tag}
              </div>

              {/* Sneaker Image */}
              <div className="relative w-full h-full transform hover:scale-105 transition-transform duration-500">
                <ImageWithFallback
                  src={currentSneaker.image}
                  alt={currentSneaker.name}
                  fill
                  priority
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  className="object-contain p-4 drop-shadow-[0_25px_35px_rgba(0,0,0,0.85)]"
                />
              </div>

              {/* Bottom Sneaker Details Card */}
              <div className="absolute inset-x-4 bottom-4 p-4 rounded-2xl bg-zinc-950/85 border border-zinc-800 backdrop-blur-md flex items-center justify-between">
                <div>
                  <span className="text-[#d4ff00] font-mono text-[10px] uppercase tracking-wider font-bold block">
                    {currentSneaker.brand}
                  </span>
                  <h3 className="font-display text-sm sm:text-base font-bold text-white uppercase truncate">
                    {currentSneaker.name}
                  </h3>
                  <span className="font-mono text-sm font-bold text-zinc-300">
                    {currentSneaker.price}
                  </span>
                </div>

                <Link
                  href={`/product/${currentSneaker.slug}`}
                  className="p-3 bg-[#d4ff00] hover:bg-[#e2ff40] text-black rounded-xl transition-transform active:scale-90"
                  aria-label={`View ${currentSneaker.name}`}
                >
                  <ArrowUpRight className="w-5 h-5" />
                </Link>
              </div>
            </div>

            {/* Sneaker Switcher Tabs */}
            <div className="flex flex-wrap items-center justify-center gap-2.5 mt-5">
              {heroSneakers.map((snk, idx) => (
                <button
                  key={snk.name}
                  onClick={() => setActiveIndex(idx)}
                  className={`px-3 py-1.5 rounded-lg font-mono text-xs transition-all ${
                    activeIndex === idx
                      ? 'bg-[#d4ff00] text-black font-bold shadow-md shadow-[#d4ff00]/20'
                      : 'bg-zinc-900 text-zinc-400 hover:text-white border border-zinc-800'
                  }`}
                >
                  0{idx + 1} // {snk.brand}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Animated Scrolling Indicator */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full flex justify-center pt-4">
        <a
          href="#featured-brands"
          className="flex flex-col items-center gap-1.5 text-zinc-500 hover:text-[#d4ff00] transition-colors group"
          aria-label="Scroll to featured brands"
        >
          <span className="font-mono text-[10px] uppercase tracking-widest group-hover:text-white">
            SCROLL TO EXPLORE
          </span>
          <ChevronDown className="w-4 h-4 animate-bounce" />
        </a>
      </div>
    </section>
  );
}
