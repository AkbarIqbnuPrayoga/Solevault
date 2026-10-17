'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { X, ChevronDown, ChevronRight, Search, Heart, Sparkles, ShieldCheck } from 'lucide-react';
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
      className="fixed inset-0 z-50 flex lg:hidden bg-[#1A1814]/60 backdrop-blur-sm animate-in fade-in duration-200"
      onClick={onClose}
    >
      <div
        className="w-[88%] max-w-md bg-[#FFFDF8] text-[#1A1814] h-full border-r border-[#E8E0D4] p-6 flex flex-col justify-between overflow-y-auto shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        <div>
          {/* Header */}
          <div className="flex items-center justify-between pb-5 border-b border-[#E8E0D4]">
            <Link href="/" onClick={onClose} className="group">
              <span className="font-serif text-2xl font-bold tracking-tight text-[#1A1814]">
                SOLE<span className="text-[#B87333] font-serif italic">VAULT</span>
              </span>
              <span className="block font-mono text-[9px] uppercase tracking-[0.25em] text-[#8C8275]">
                Curated Footwear House
              </span>
            </Link>
            <button
              onClick={onClose}
              className="p-2 text-[#8C8275] hover:text-[#1A1814] rounded-full hover:bg-[#F0EBE3] transition-colors"
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
            className="w-full mt-5 flex items-center justify-between p-3.5 rounded-full bg-[#FAF7F2] border border-[#E8E0D4] text-[#8C8275] hover:text-[#1A1814] hover:border-[#B87333] transition-all shadow-sm"
          >
            <div className="flex items-center gap-2.5 text-xs font-sans">
              <Search className="w-4 h-4 text-[#B87333]" />
              <span>Search silhouettes & brands...</span>
            </div>
            <span className="font-mono text-[10px] bg-[#F0EBE3] px-2 py-0.5 rounded-full text-[#8C8275]">⌘K</span>
          </button>

          {/* Navigation Links */}
          <nav className="mt-6 space-y-1">
            <Link
              href="/sneakers?sort=newest"
              onClick={onClose}
              className="flex items-center justify-between py-3.5 text-sm font-medium tracking-wide text-[#1A1814] hover:text-[#B87333] border-b border-[#F0EBE3] transition-colors"
            >
              <span className="flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-[#B87333]" />
                New Arrivals
              </span>
              <span className="text-[10px] font-mono uppercase bg-[#B87333]/10 text-[#B87333] px-2.5 py-0.5 rounded-full font-semibold">
                Drop
              </span>
            </Link>

            {/* Sneakers Accordion */}
            <div className="border-b border-[#F0EBE3]">
              <button
                type="button"
                onClick={() => setSneakersExpanded(!sneakersExpanded)}
                className="w-full flex items-center justify-between py-3.5 text-sm font-medium tracking-wide text-[#1A1814] hover:text-[#B87333] transition-colors"
              >
                <span>Sneakers Collection</span>
                <ChevronDown
                  className={`w-4 h-4 transition-transform duration-200 text-[#8C8275] ${
                    sneakersExpanded ? 'rotate-180 text-[#B87333]' : ''
                  }`}
                />
              </button>

              {sneakersExpanded && (
                <div className="pl-4 pb-3 space-y-2 border-l border-[#B87333]/40 ml-2 animate-in slide-in-from-top-1">
                  <Link
                    href="/sneakers"
                    onClick={onClose}
                    className="block text-xs font-semibold text-[#B87333] py-1"
                  >
                    View All Vault Sneakers &rarr;
                  </Link>
                  {ALL_CATEGORIES.map((cat) => (
                    <Link
                      key={cat}
                      href={`/sneakers?category=${cat}`}
                      onClick={onClose}
                      className="block text-xs text-[#8C8275] hover:text-[#1A1814] py-1 transition-colors"
                    >
                      {cat} Silhouettes
                    </Link>
                  ))}
                </div>
              )}
            </div>

            {/* Brands Accordion */}
            <div className="border-b border-[#F0EBE3]">
              <button
                type="button"
                onClick={() => setBrandsExpanded(!brandsExpanded)}
                className="w-full flex items-center justify-between py-3.5 text-sm font-medium tracking-wide text-[#1A1814] hover:text-[#B87333] transition-colors"
              >
                <span>Curated Houses</span>
                <ChevronDown
                  className={`w-4 h-4 transition-transform duration-200 text-[#8C8275] ${
                    brandsExpanded ? 'rotate-180 text-[#B87333]' : ''
                  }`}
                />
              </button>

              {brandsExpanded && (
                <div className="pl-4 pb-3 space-y-2 border-l border-[#B87333]/40 ml-2 animate-in slide-in-from-top-1">
                  <Link
                    href="/brands"
                    onClick={onClose}
                    className="block text-xs font-semibold text-[#B87333] py-1"
                  >
                    View All Houses & Heritage &rarr;
                  </Link>
                  {ALL_BRANDS.map((brand) => (
                    <Link
                      key={brand}
                      href={`/sneakers?brand=${encodeURIComponent(brand)}`}
                      onClick={onClose}
                      className="block text-xs text-[#8C8275] hover:text-[#1A1814] py-1 transition-colors"
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
              className="flex items-center justify-between py-3.5 text-sm font-medium tracking-wide text-[#1A1814] hover:text-[#B87333] border-b border-[#F0EBE3] transition-colors"
            >
              <span>Editorial Collections</span>
              <ChevronRight className="w-4 h-4 text-[#8C8275]" />
            </Link>

            <Link
              href="/sneakers?sale=true"
              onClick={onClose}
              className="flex items-center justify-between py-3.5 text-sm font-medium tracking-wide text-[#8B5A2B] hover:text-[#B87333] border-b border-[#F0EBE3] transition-colors"
            >
              <span>Curated Archive Sale</span>
              <span className="font-mono text-[10px] bg-[#B87333]/15 text-[#8B5A2B] px-2.5 py-0.5 rounded-full font-bold">
                UP TO 30% OFF
              </span>
            </Link>

            <Link
              href="/wishlist"
              onClick={onClose}
              className="flex items-center justify-between py-3.5 text-sm font-medium tracking-wide text-[#1A1814] hover:text-[#B87333] border-b border-[#F0EBE3] transition-colors"
            >
              <span>Saved Rotation</span>
              <Heart className="w-4 h-4 text-[#8C8275]" />
            </Link>

            <Link
              href="/about"
              onClick={onClose}
              className="flex items-center justify-between py-3.5 text-sm font-medium tracking-wide text-[#1A1814] hover:text-[#B87333] border-b border-[#F0EBE3] transition-colors"
            >
              <span>About SOLEVAULT</span>
              <ChevronRight className="w-4 h-4 text-[#8C8275]" />
            </Link>
          </nav>
        </div>

        {/* Footer info in drawer */}
        <div className="pt-6 border-t border-[#E8E0D4]">
          <div className="p-4 rounded-2xl bg-[#FAF7F2] border border-[#E8E0D4] text-xs">
            <div className="flex items-center gap-2 mb-1.5">
              <ShieldCheck className="w-4 h-4 text-[#B87333]" />
              <span className="text-[#1A1814] font-serif font-semibold tracking-wide block">
                Guaranteed Authentic
              </span>
            </div>
            <p className="text-[#8C8275] text-[11px] leading-relaxed">
              Every silhouette undergoes rigorous physical inspection and verification prior to dispatch.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
