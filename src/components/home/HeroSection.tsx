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
    <section className="relative min-h-[92vh] flex flex-col justify-between overflow-hidden bg-[#FAF7F2] border-b border-[#E8E0D4] pt-8 pb-12">
      {/* Subtle warm radial glow */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[700px] h-[500px] bg-[#B87333]/[0.06] blur-[160px] pointer-events-none rounded-full" />
      <div className="absolute bottom-0 right-0 w-[400px] h-[400px] bg-[#C9A0A0]/[0.05] blur-[120px] pointer-events-none rounded-full" />

      {/* Top Editorial Bar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full pt-4">
        <div className="flex items-center justify-between text-xs font-mono-tag border-b border-[#E8E0D4] pb-3">
          <div className="flex items-center gap-2 text-[#B87333]">
            <Sparkles className="w-3.5 h-3.5" />
            <span className="font-bold tracking-widest uppercase">SPRING / SUMMER 2026 ARCHIVE</span>
          </div>
          <div className="hidden sm:flex items-center gap-4 text-[#8C8275]">
            <span>TOKYO</span>
            <span className="text-[#C4B8A8]">·</span>
            <span>LONDON</span>
            <span className="text-[#C4B8A8]">·</span>
            <span>NEW YORK</span>
          </div>
        </div>
      </div>

      {/* Main Hero Content Area */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full py-8 md:py-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-16 items-center">
          
          {/* Left Editorial Copy */}
          <div className="lg:col-span-6 z-10 flex flex-col justify-center">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#F0EBE3] border border-[#E8E0D4] text-[#8C8275] text-xs font-mono-tag uppercase tracking-wider w-fit mb-6">
              <span className="w-2 h-2 rounded-full bg-[#B87333] animate-pulse" />
              <span>THE CURATED ROTATION DROPS</span>
            </div>

            <h1 className="font-display text-5xl sm:text-7xl xl:text-[5.5rem] font-black uppercase tracking-tight text-[#1A1814] leading-[0.95]">
              Step Into <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#1A1814] via-[#3D3225] to-[#8C8275]">
                Your Next
              </span> <br />
              <span className="text-[#B87333] italic font-display">Era.</span>
            </h1>

            <p className="mt-6 text-[#8C8275] text-base sm:text-lg max-w-lg leading-relaxed font-sans font-light">
              Iconic silhouettes. New-season essentials. Sneakers that define your rotation.
            </p>

            {/* CTAs */}
            <div className="mt-8 flex flex-col sm:flex-row items-stretch sm:items-center gap-4">
              <Link
                href="/sneakers"
                className="px-8 py-4 bg-[#1A1814] hover:bg-[#2C2318] text-white font-mono-tag text-xs font-bold uppercase tracking-widest rounded-full flex items-center justify-center gap-3 transition-all duration-300 hover:shadow-[0_8px_30px_-8px_rgba(26,24,20,0.35)] active:scale-95"
              >
                <span>EXPLORE COLLECTION</span>
                <ArrowRight className="w-4 h-4" />
              </Link>

              <Link
                href="/sneakers?sort=newest"
                className="px-8 py-4 bg-transparent hover:bg-[#F0EBE3] text-[#1A1814] border border-[#C4B8A8] hover:border-[#B87333] font-mono-tag text-xs font-bold uppercase tracking-widest rounded-full flex items-center justify-center gap-3 transition-all duration-300"
              >
                <span>SHOP NEW DROPS</span>
                <Sparkles className="w-4 h-4 text-[#B87333]" />
              </Link>
            </div>

            {/* Micro Stats */}
            <div className="mt-12 pt-6 border-t border-[#E8E0D4] grid grid-cols-3 gap-6 font-mono-tag text-xs">
              <div>
                <span className="text-xl sm:text-2xl font-bold text-[#1A1814] font-display block">
                  100%
                </span>
                <span className="text-[#8C8275] uppercase tracking-wider text-[11px]">
                  Verified Authentic
                </span>
              </div>
              <div>
                <span className="text-xl sm:text-2xl font-bold text-[#1A1814] font-display block">
                  7
                </span>
                <span className="text-[#8C8275] uppercase tracking-wider text-[11px]">
                  Curated Houses
                </span>
              </div>
              <div>
                <span className="text-xl sm:text-2xl font-bold text-[#B87333] font-display block">
                  SS26
                </span>
                <span className="text-[#8C8275] uppercase tracking-wider text-[11px]">
                  Active Vault
                </span>
              </div>
            </div>
          </div>

          {/* Right Editorial Focal Sneaker Showcase */}
          <div className="lg:col-span-6 relative flex flex-col items-center justify-center">
            {/* Visual Frame */}
            <div className="relative w-full aspect-[4/3] sm:aspect-square max-w-lg rounded-[2rem] overflow-hidden bg-gradient-to-b from-[#F0EBE3] to-[#E8E0D4] border border-[#E8E0D4] p-4 shadow-[0_20px_60px_-15px_rgba(44,35,24,0.12)] flex items-center justify-center">
              
              {/* Corner Watermarks */}
              <div className="absolute top-4 left-4 z-10 font-mono-tag text-[10px] text-[#8C8275] uppercase tracking-widest">
                ARCHIVE REF // {currentSneaker.sku}
              </div>
              <div className="absolute top-4 right-4 z-10 font-mono-tag text-[10px] text-[#B87333] font-bold uppercase tracking-widest bg-[#B87333]/10 px-2 py-0.5 rounded-full border border-[#B87333]/25">
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
                  className="object-contain p-4 drop-shadow-[0_25px_35px_rgba(44,35,24,0.25)]"
                />
              </div>

              {/* Bottom Sneaker Details Card */}
              <div className="absolute inset-x-4 bottom-4 p-4 rounded-2xl bg-white/90 border border-[#E8E0D4] backdrop-blur-md flex items-center justify-between shadow-lg">
                <div>
                  <span className="text-[#B87333] font-mono-tag text-[10px] uppercase tracking-wider font-bold block">
                    {currentSneaker.brand}
                  </span>
                  <h3 className="font-display text-sm sm:text-base font-bold text-[#1A1814] uppercase truncate">
                    {currentSneaker.name}
                  </h3>
                  <span className="font-mono-tag text-sm font-bold text-[#3D3225]">
                    {currentSneaker.price}
                  </span>
                </div>

                <Link
                  href={`/product/${currentSneaker.slug}`}
                  className="p-3 bg-[#1A1814] hover:bg-[#B87333] text-white rounded-full transition-all duration-300 active:scale-90"
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
                  className={`px-4 py-2 rounded-full font-mono-tag text-xs transition-all duration-300 ${
                    activeIndex === idx
                      ? 'bg-[#1A1814] text-white font-bold shadow-md'
                      : 'bg-[#F0EBE3] text-[#8C8275] hover:text-[#1A1814] border border-[#E8E0D4] hover:border-[#C4B8A8]'
                  }`}
                >
                  0{idx + 1} · {snk.brand}
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
          className="flex flex-col items-center gap-1.5 text-[#8C8275] hover:text-[#B87333] transition-colors group"
          aria-label="Scroll to featured brands"
        >
          <span className="font-mono-tag text-[10px] uppercase tracking-widest group-hover:text-[#1A1814]">
            SCROLL TO EXPLORE
          </span>
          <ChevronDown className="w-4 h-4 animate-bounce" />
        </a>
      </div>
    </section>
  );
}
