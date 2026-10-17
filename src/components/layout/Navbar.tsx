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
            ? 'bg-[#FAF7F2]/95 backdrop-blur-md border-b border-[#E8E0D4] py-3.5 shadow-[0_4px_20px_-5px_rgba(44,35,24,0.08)]'
            : 'bg-[#FAF7F2] border-b border-[#E8E0D4] py-5'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            {/* Mobile Menu Button */}
            <div className="flex items-center lg:hidden">
              <button
                type="button"
                onClick={() => setIsMobileMenuOpen(true)}
                className="p-2 text-[#3D3225] hover:text-[#1A1814] rounded-lg hover:bg-[#F0EBE3] transition-colors"
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
                <span className="font-display text-2xl sm:text-3xl font-black tracking-tight text-[#1A1814] transition-colors group-hover:text-[#3D3225]">
                  SOLE<span className="text-[#B87333] italic">VAULT</span>
                </span>
                <span className="w-1.5 h-1.5 rounded-full bg-[#B87333] mb-2 animate-pulse" />
              </Link>

              {/* Desktop Nav Links */}
              <nav className="hidden lg:flex items-center gap-1">
                <Link
                  href="/sneakers?sort=newest"
                  className={`px-3.5 py-2 text-xs font-mono-tag uppercase tracking-widest transition-colors rounded-full ${
                    pathname === '/sneakers' && !activeMegaMenu
                      ? 'text-[#B87333] bg-[#B87333]/5'
                      : 'text-[#3D3225] hover:text-[#1A1814] hover:bg-[#F0EBE3]'
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
                    className="flex items-center gap-1 px-3.5 py-2 text-xs font-mono-tag uppercase tracking-widest text-[#3D3225] hover:text-[#1A1814] hover:bg-[#F0EBE3] rounded-full transition-colors"
                  >
                    <span>Sneakers</span>
                    <ChevronDown className="w-3.5 h-3.5 opacity-60" />
                  </Link>

                  {/* Mega Menu Dropdown: Sneakers */}
                  {activeMegaMenu === 'sneakers' && (
                    <div className="absolute top-full left-0 w-[580px] p-6 bg-white border border-[#E8E0D4] rounded-2xl shadow-[0_20px_60px_-15px_rgba(44,35,24,0.12)] backdrop-blur-xl animate-in fade-in slide-in-from-top-2 duration-150">
                      <div className="grid grid-cols-2 gap-6">
                        <div>
                          <p className="font-mono-tag text-[11px] uppercase tracking-wider text-[#8C8275] mb-3 pb-1 border-b border-[#E8E0D4]">
                            By Silhouettes
                          </p>
                          <ul className="space-y-2">
                            {ALL_CATEGORIES.map((cat) => (
                              <li key={cat}>
                                <Link
                                  href={`/sneakers?category=${cat}`}
                                  className="flex items-center justify-between text-xs text-[#3D3225] hover:text-[#B87333] py-1 transition-colors group"
                                >
                                  <span>{cat} Icons</span>
                                  <ArrowRight className="w-3 h-3 opacity-0 group-hover:opacity-100 -translate-x-1 group-hover:translate-x-0 transition-all text-[#B87333]" />
                                </Link>
                              </li>
                            ))}
                          </ul>
                        </div>

                        <div className="bg-[#FAF7F2] p-4 rounded-xl border border-[#E8E0D4] flex flex-col justify-between">
                          <div>
                            <div className="flex items-center gap-1.5 text-[#B87333] text-xs font-mono-tag font-bold uppercase mb-1">
                              <Flame className="w-3.5 h-3.5" />
                              <span>Vault Selection</span>
                            </div>
                            <h4 className="font-display text-sm font-bold text-[#1A1814] italic">
                              Y2K Tech Runners & Retro Air
                            </h4>
                            <p className="text-[11px] text-[#8C8275] mt-1 leading-relaxed">
                              Explore metallic silver overlays, responsive segmented cushioning, and archival basketball staples.
                            </p>
                          </div>
                          <Link
                            href="/sneakers?featured=true"
                            className="mt-4 inline-flex items-center gap-1.5 text-xs font-mono-tag font-bold text-[#B87333] hover:underline"
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
                    className="flex items-center gap-1 px-3.5 py-2 text-xs font-mono-tag uppercase tracking-widest text-[#3D3225] hover:text-[#1A1814] hover:bg-[#F0EBE3] rounded-full transition-colors"
                  >
                    <span>Brands</span>
                    <ChevronDown className="w-3.5 h-3.5 opacity-60" />
                  </Link>

                  {/* Mega Menu Dropdown: Brands */}
                  {activeMegaMenu === 'brands' && (
                    <div className="absolute top-full left-0 w-[620px] p-6 bg-white border border-[#E8E0D4] rounded-2xl shadow-[0_20px_60px_-15px_rgba(44,35,24,0.12)] backdrop-blur-xl animate-in fade-in slide-in-from-top-2 duration-150">
                      <div className="flex items-center justify-between pb-3 mb-4 border-b border-[#E8E0D4]">
                        <span className="font-mono-tag text-xs uppercase tracking-wider text-[#8C8275]">
                          Curated Houses
                        </span>
                        <Link
                          href="/brands"
                          className="font-mono-tag text-xs text-[#B87333] hover:underline"
                        >
                          View All Brands &rarr;
                        </Link>
                      </div>

                      <div className="grid grid-cols-3 gap-3">
                        {ALL_BRANDS.map((brand) => (
                          <Link
                            key={brand}
                            href={`/sneakers?brand=${encodeURIComponent(brand)}`}
                            className="p-3 rounded-xl bg-[#FAF7F2] hover:bg-[#F0EBE3] border border-[#E8E0D4] hover:border-[#B87333]/30 transition-all group"
                          >
                            <p className="font-display text-sm font-bold text-[#1A1814] group-hover:text-[#B87333] transition-colors italic">
                              {brand}
                            </p>
                            <span className="text-[10px] font-mono-tag text-[#8C8275] uppercase tracking-wider">
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
                  className={`px-3.5 py-2 text-xs font-mono-tag uppercase tracking-widest transition-colors rounded-full ${
                    pathname === '/collections'
                      ? 'text-[#B87333] bg-[#B87333]/5'
                      : 'text-[#3D3225] hover:text-[#1A1814] hover:bg-[#F0EBE3]'
                  }`}
                >
                  Collections
                </Link>

                <Link
                  href="/sneakers?sale=true"
                  className="px-3.5 py-2 text-xs font-mono-tag uppercase tracking-widest text-[#C9A0A0] hover:text-red-500 hover:bg-red-50 rounded-full transition-colors flex items-center gap-1"
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
                className="p-2.5 text-[#3D3225] hover:text-[#B87333] rounded-full hover:bg-[#F0EBE3] transition-colors flex items-center gap-2 group"
                aria-label="Search catalog"
              >
                <Search className="w-5 h-5 transition-transform group-hover:scale-110" />
                <span className="hidden xl:inline font-mono-tag text-xs text-[#8C8275] group-hover:text-[#3D3225]">
                  Search [⌘K]
                </span>
              </button>

              {/* Wishlist Icon */}
              <Link
                href="/wishlist"
                className="relative p-2.5 text-[#3D3225] hover:text-[#1A1814] rounded-full hover:bg-[#F0EBE3] transition-colors group"
                aria-label={`Wishlist, ${wishlistCount} items`}
              >
                <Heart className="w-5 h-5 transition-transform group-hover:scale-110" />
                {wishlistCount > 0 && (
                  <span className="absolute top-1 right-1 min-w-[18px] h-[18px] px-1 bg-[#B87333] text-white font-mono-tag text-[10px] font-bold rounded-full flex items-center justify-center">
                    {wishlistCount}
                  </span>
                )}
              </Link>

              {/* Shopping Bag Button (Opens Cart Drawer) */}
              <button
                type="button"
                onClick={openCart}
                className="relative p-2.5 text-[#3D3225] hover:text-[#1A1814] rounded-full hover:bg-[#F0EBE3] transition-colors group"
                aria-label={`Shopping bag, ${cartCount} items`}
              >
                <ShoppingBag className="w-5 h-5 transition-transform group-hover:scale-110" />
                {cartCount > 0 && (
                  <span className="absolute top-1 right-1 min-w-[18px] h-[18px] px-1 bg-[#B87333] text-white font-mono-tag text-[10px] font-bold rounded-full flex items-center justify-center glow-copper-sm">
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
