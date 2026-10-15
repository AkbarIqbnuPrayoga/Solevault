'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { X, ChevronDown, ChevronRight, Search, Heart, Sparkles, ArrowRight } from 'lucide-react';
import { ALL_BRANDS, ALL_CATEGORIES } from '@/data/products';
import { useStore } from '@/store/useStore';

interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
}

export function MobileMenu({ isOpen, onClose }: MobileMenuProps) {
  const { setSearchOpen } = useStore();
  const [sneakersExpanded, setSneakersExpanded] = useState(false);
  const [brandsExpanded, setBrandsExpanded] = useState(false);

  if (!isOpen) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      className="fixed inset-0 z-50 flex lg:hidden bg-black/80 backdrop-blur-md animate-in fade-in duration-200"
      onClick={onClose}
    >
      <div
        className="w-[85%] max-w-md bg-[#0d0d10] h-full border-r border-zinc-800 p-6 flex flex-col justify-between overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        <div>
          {/* Header */}
          <div className="flex items-center justify-between pb-5 border-b border-zinc-800">
            <span className="font-display text-xl font-black tracking-tighter text-white">
              SOLE<span className="text-[#d4ff00]">VAULT</span>
            </span>
            <button
              onClick={onClose}
              className="p-2 text-zinc-400 hover:text-white rounded-lg hover:bg-zinc-800/60 transition-colors"
              aria-label="Close menu"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Search Trigger */}
          <button
            onClick={() => {
              onClose();
              setSearchOpen(true);
            }}
            className="w-full mt-4 flex items-center justify-between p-3 rounded-lg bg-zinc-900 border border-zinc-800 text-zinc-400 hover:text-white transition-colors"
          >
            <div className="flex items-center gap-2 text-xs font-mono">
              <Search className="w-4 h-4 text-[#d4ff00]" />
              <span>Search silhouettes & brands...</span>
            </div>
            <span className="font-mono text-[10px] text-zinc-600">⌘K</span>
          </button>

          {/* Navigation Links */}
          <nav className="mt-6 space-y-1">
            <Link
              href="/sneakers?sort=newest"
              onClick={onClose}
              className="flex items-center justify-between py-3 text-sm font-mono uppercase tracking-wider text-zinc-200 hover:text-[#d4ff00] border-b border-zinc-900 transition-colors"
            >
              <span>New Arrivals</span>
              <Sparkles className="w-3.5 h-3.5 text-[#d4ff00]" />
            </Link>

            {/* Sneakers Accordion */}
            <div className="border-b border-zinc-900">
              <button
                type="button"
                onClick={() => setSneakersExpanded(!sneakersExpanded)}
                className="w-full flex items-center justify-between py-3 text-sm font-mono uppercase tracking-wider text-zinc-200 hover:text-[#d4ff00] transition-colors"
              >
                <span>Sneakers</span>
                <ChevronDown
                  className={`w-4 h-4 transition-transform duration-200 ${
                    sneakersExpanded ? 'rotate-180 text-[#d4ff00]' : ''
                  }`}
                />
              </button>

              {sneakersExpanded && (
                <div className="pl-4 pb-3 space-y-2 border-l-2 border-zinc-800 ml-2 animate-in slide-in-from-top-1">
                  <Link
                    href="/sneakers"
                    onClick={onClose}
                    className="block text-xs font-mono text-[#d4ff00] py-1"
                  >
                    All Sneakers &rarr;
                  </Link>
                  {ALL_CATEGORIES.map((cat) => (
                    <Link
                      key={cat}
                      href={`/sneakers?category=${cat}`}
                      onClick={onClose}
                      className="block text-xs font-mono text-zinc-400 hover:text-white py-1"
                    >
                      {cat} Silhouettes
                    </Link>
                  ))}
                </div>
              )}
            </div>

            {/* Brands Accordion */}
            <div className="border-b border-zinc-900">
              <button
                type="button"
                onClick={() => setBrandsExpanded(!brandsExpanded)}
                className="w-full flex items-center justify-between py-3 text-sm font-mono uppercase tracking-wider text-zinc-200 hover:text-[#d4ff00] transition-colors"
              >
                <span>Brands</span>
                <ChevronDown
                  className={`w-4 h-4 transition-transform duration-200 ${
                    brandsExpanded ? 'rotate-180 text-[#d4ff00]' : ''
                  }`}
                />
              </button>

              {brandsExpanded && (
                <div className="pl-4 pb-3 space-y-2 border-l-2 border-zinc-800 ml-2 animate-in slide-in-from-top-1">
                  <Link
                    href="/brands"
                    onClick={onClose}
                    className="block text-xs font-mono text-[#d4ff00] py-1"
                  >
                    View All Houses &rarr;
                  </Link>
                  {ALL_BRANDS.map((brand) => (
                    <Link
                      key={brand}
                      href={`/sneakers?brand=${encodeURIComponent(brand)}`}
                      onClick={onClose}
                      className="block text-xs font-mono text-zinc-400 hover:text-white py-1"
                    >
                      {brand}
                    </Link>
                  ))}
                </div>
              )}
            </div>

            <Link
              href="/collections"
              onClick={onClose}
              className="flex items-center justify-between py-3 text-sm font-mono uppercase tracking-wider text-zinc-200 hover:text-[#d4ff00] border-b border-zinc-900 transition-colors"
            >
              <span>Collections</span>
              <ChevronRight className="w-4 h-4 text-zinc-600" />
            </Link>

            <Link
              href="/sneakers?sale=true"
              onClick={onClose}
              className="flex items-center justify-between py-3 text-sm font-mono uppercase tracking-wider text-red-400 hover:text-red-300 border-b border-zinc-900 transition-colors"
            >
              <span>Sale & Archive Offers</span>
              <span className="font-mono text-[10px] bg-red-500/20 text-red-400 px-2 py-0.5 rounded">
                UP TO 30%
              </span>
            </Link>

            <Link
              href="/wishlist"
              onClick={onClose}
              className="flex items-center justify-between py-3 text-sm font-mono uppercase tracking-wider text-zinc-200 hover:text-[#d4ff00] border-b border-zinc-900 transition-colors"
            >
              <span>My Wishlist</span>
              <Heart className="w-4 h-4 text-zinc-500" />
            </Link>

            <Link
              href="/about"
              onClick={onClose}
              className="flex items-center justify-between py-3 text-sm font-mono uppercase tracking-wider text-zinc-200 hover:text-[#d4ff00] border-b border-zinc-900 transition-colors"
            >
              <span>About SOLEVAULT</span>
              <ChevronRight className="w-4 h-4 text-zinc-600" />
            </Link>
          </nav>
        </div>

        {/* Footer info in drawer */}
        <div className="pt-6 border-t border-zinc-800">
          <div className="p-3 rounded-lg bg-zinc-900/60 border border-zinc-800 text-xs">
            <span className="text-[#d4ff00] font-mono font-bold block mb-1">
              GUARANTEED AUTHENTIC
            </span>
            <p className="text-zinc-400 text-[11px] leading-relaxed">
              Every sneaker is inspected and verified before dispatch.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
