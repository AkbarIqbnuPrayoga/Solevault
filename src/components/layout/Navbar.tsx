'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useStore } from '@/store/useStore';
import {
  Search,
  Heart,
  ShoppingBag,
  Menu,
  X,
  ChevronDown,
  ArrowRight,
  Flame,
  Layers,
} from 'lucide-react';
import { ALL_BRANDS, ALL_CATEGORIES } from '@/data/products';
import { MobileMenu } from './MobileMenu';

export function Navbar() {
  const pathname = usePathname();
  const {
    openCart,
    getCartCount,
    getWishlistCount,
    setSearchOpen,
  } = useStore();

  const [isScrolled, setIsScrolled] = useState(false);
  const [activeMegaMenu, setActiveMegaMenu] = useState<'sneakers' | 'brands' | null>(null);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const cartCount = mounted ? getCartCount() : 0;
  const wishlistCount = mounted ? getWishlistCount() : 0;

  return (
    <>
      <header
        className={`sticky top-0 z-30 transition-all duration-300 ${
          isScrolled
            ? 'bg-[#08080a]/95 backdrop-blur-md border-b border-[#242429] py-3.5 shadow-2xl'
            : 'bg-[#08080a] border-b border-[#1c1c22] py-5'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            {/* Mobile Menu Button */}
            <div className="flex items-center lg:hidden">
              <button
                type="button"
                onClick={() => setIsMobileMenuOpen(true)}
                className="p-2 text-zinc-300 hover:text-white rounded-lg hover:bg-zinc-800/60 transition-colors"
                aria-label="Open mobile navigation"
              >
                <Menu className="w-6 h-6" />
              </button>
            </div>

            {/* Logo */}
            <div className="flex items-center gap-8">
              <Link
                href="/"
                className="group flex items-center gap-1.5 focus:outline-none"
              >
                <span className="font-display text-2xl sm:text-3xl font-black tracking-tighter text-white transition-colors group-hover:text-zinc-200">
                  SOLE<span className="text-[#d4ff00]">VAULT</span>
                </span>
                <span className="w-1.5 h-1.5 rounded-full bg-[#d4ff00] mb-2 animate-pulse" />
              </Link>

              {/* Desktop Nav Links */}
              <nav className="hidden lg:flex items-center gap-1">
                <Link
                  href="/sneakers?sort=newest"
                  className={`px-3.5 py-2 text-xs font-mono uppercase tracking-widest transition-colors rounded-md ${
                    pathname === '/sneakers' && !activeMegaMenu
                      ? 'text-[#d4ff00]'
                      : 'text-zinc-300 hover:text-white hover:bg-zinc-900/60'
                  }`}
                >
                  New Arrivals
                </Link>

                {/* Sneakers Mega-Menu Trigger */}
                <div
                  className="relative"
                  onMouseEnter={() => setActiveMegaMenu('sneakers')}
                  onMouseLeave={() => setActiveMegaMenu(null)}
                >
                  <Link
                    href="/sneakers"
                    className="flex items-center gap-1 px-3.5 py-2 text-xs font-mono uppercase tracking-widest text-zinc-300 hover:text-white hover:bg-zinc-900/60 rounded-md transition-colors"
                  >
                    <span>Sneakers</span>
                    <ChevronDown className="w-3.5 h-3.5 opacity-60" />
                  </Link>

                  {/* Mega Menu Dropdown: Sneakers */}
                  {activeMegaMenu === 'sneakers' && (
                    <div className="absolute top-full left-0 w-[580px] p-6 bg-[#0f0f13] border border-zinc-800 rounded-xl shadow-2xl backdrop-blur-xl animate-in fade-in slide-in-from-top-2 duration-150">
                      <div className="grid grid-cols-2 gap-6">
                        <div>
                          <p className="font-mono text-[11px] uppercase tracking-wider text-zinc-500 mb-3 pb-1 border-b border-zinc-800">
                            By Silhouettes
                          </p>
                          <ul className="space-y-2">
                            {ALL_CATEGORIES.map((cat) => (
                              <li key={cat}>
                                <Link
                                  href={`/sneakers?category=${cat}`}
                                  className="flex items-center justify-between text-xs text-zinc-300 hover:text-[#d4ff00] py-1 transition-colors group"
                                >
                                  <span>{cat} Icons</span>
                                  <ArrowRight className="w-3 h-3 opacity-0 group-hover:opacity-100 -translate-x-1 group-hover:translate-x-0 transition-all text-[#d4ff00]" />
                                </Link>
                              </li>
                            ))}
                          </ul>
                        </div>

                        <div className="bg-zinc-900/70 p-4 rounded-lg border border-zinc-800/80 flex flex-col justify-between">
                          <div>
                            <div className="flex items-center gap-1.5 text-[#d4ff00] text-xs font-mono font-bold uppercase mb-1">
                              <Flame className="w-3.5 h-3.5" />
                              <span>Vault Selection</span>
                            </div>
                            <h4 className="font-display text-sm font-bold text-white uppercase">
                              Y2K Tech Runners & Retro Air
                            </h4>
                            <p className="text-[11px] text-zinc-400 mt-1 leading-relaxed">
                              Explore metallic silver overlays, responsive segmented cushioning, and archival basketball staples.
                            </p>
                          </div>
                          <Link
                            href="/sneakers?featured=true"
                            className="mt-4 inline-flex items-center gap-1.5 text-xs font-mono font-bold text-[#d4ff00] hover:underline"
                          >
                            <span>Browse Vault Icons</span>
                            <ArrowRight className="w-3.5 h-3.5" />
                          </Link>
                        </div>
                      </div>
                    </div>
                  )}
                </div>

                {/* Brands Mega-Menu Trigger */}
                <div
                  className="relative"
                  onMouseEnter={() => setActiveMegaMenu('brands')}
                  onMouseLeave={() => setActiveMegaMenu(null)}
                >
                  <Link
                    href="/brands"
                    className="flex items-center gap-1 px-3.5 py-2 text-xs font-mono uppercase tracking-widest text-zinc-300 hover:text-white hover:bg-zinc-900/60 rounded-md transition-colors"
                  >
                    <span>Brands</span>
                    <ChevronDown className="w-3.5 h-3.5 opacity-60" />
                  </Link>

                  {/* Mega Menu Dropdown: Brands */}
                  {activeMegaMenu === 'brands' && (
                    <div className="absolute top-full left-0 w-[620px] p-6 bg-[#0f0f13] border border-zinc-800 rounded-xl shadow-2xl backdrop-blur-xl animate-in fade-in slide-in-from-top-2 duration-150">
                      <div className="flex items-center justify-between pb-3 mb-4 border-b border-zinc-800">
                        <span className="font-mono text-xs uppercase tracking-wider text-zinc-400">
                          Curated Houses
                        </span>
                        <Link
                          href="/brands"
                          className="font-mono text-xs text-[#d4ff00] hover:underline"
                        >
                          View All Brands &rarr;
                        </Link>
                      </div>

                      <div className="grid grid-cols-3 gap-3">
                        {ALL_BRANDS.map((brand) => (
                          <Link
                            key={brand}
                            href={`/sneakers?brand=${encodeURIComponent(brand)}`}
                            className="p-3 rounded-lg bg-zinc-900/60 hover:bg-zinc-800/80 border border-zinc-800/80 hover:border-[#d4ff00]/40 transition-all group"
                          >
                            <p className="font-display text-sm font-bold text-white group-hover:text-[#d4ff00] transition-colors">
                              {brand}
                            </p>
                            <span className="text-[10px] font-mono text-zinc-500 uppercase tracking-wider">
                              Shop Archives
                            </span>
                          </Link>
                        ))}
                      </div>
                    </div>
                  )}
                </div>

                <Link
                  href="/collections"
                  className={`px-3.5 py-2 text-xs font-mono uppercase tracking-widest transition-colors rounded-md ${
                    pathname === '/collections'
                      ? 'text-[#d4ff00]'
                      : 'text-zinc-300 hover:text-white hover:bg-zinc-900/60'
                  }`}
                >
                  Collections
                </Link>

                <Link
                  href="/sneakers?sale=true"
                  className="px-3.5 py-2 text-xs font-mono uppercase tracking-widest text-red-400 hover:text-red-300 hover:bg-red-950/20 rounded-md transition-colors flex items-center gap-1"
                >
                  <span>Sale</span>
                  <span className="w-1.5 h-1.5 rounded-full bg-red-400 animate-ping" />
                </Link>
              </nav>
            </div>

            {/* Right Action Icons */}
            <div className="flex items-center gap-2 sm:gap-3">
              {/* Search Trigger */}
              <button
                type="button"
                onClick={() => setSearchOpen(true)}
                className="p-2.5 text-zinc-300 hover:text-[#d4ff00] rounded-lg hover:bg-zinc-900/80 transition-colors flex items-center gap-2 group"
                aria-label="Search catalog"
              >
                <Search className="w-5 h-5 transition-transform group-hover:scale-110" />
                <span className="hidden xl:inline font-mono text-xs text-zinc-500 group-hover:text-zinc-300">
                  Search [⌘K]
                </span>
              </button>

              {/* Wishlist Icon */}
              <Link
                href="/wishlist"
                className="relative p-2.5 text-zinc-300 hover:text-white rounded-lg hover:bg-zinc-900/80 transition-colors group"
                aria-label={`Wishlist, ${wishlistCount} items`}
              >
                <Heart className="w-5 h-5 transition-transform group-hover:scale-110" />
                {wishlistCount > 0 && (
                  <span className="absolute top-1 right-1 min-w-[18px] h-[18px] px-1 bg-[#d4ff00] text-black font-mono text-[10px] font-bold rounded-full flex items-center justify-center">
                    {wishlistCount}
                  </span>
                )}
              </Link>

              {/* Shopping Bag Button (Opens Cart Drawer) */}
              <button
                type="button"
                onClick={openCart}
                className="relative p-2.5 text-zinc-300 hover:text-white rounded-lg hover:bg-zinc-900/80 transition-colors group"
                aria-label={`Shopping bag, ${cartCount} items`}
              >
                <ShoppingBag className="w-5 h-5 transition-transform group-hover:scale-110" />
                {cartCount > 0 && (
                  <span className="absolute top-1 right-1 min-w-[18px] h-[18px] px-1 bg-[#d4ff00] text-black font-mono text-[10px] font-bold rounded-full flex items-center justify-center glow-lime-sm">
                    {cartCount}
                  </span>
                )}
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Mobile Drawer Menu */}
      <MobileMenu
        isOpen={isMobileMenuOpen}
        onClose={() => setIsMobileMenuOpen(false)}
      />
    </>
  );
}
