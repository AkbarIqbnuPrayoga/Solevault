'use client';

import React, { useState, useEffect, useRef } from 'react';
import { useStore } from '@/store/useStore';
import { PRODUCTS } from '@/data/products';
import { Product } from '@/types';
import { Search, X, Clock, ArrowRight, Sparkles, Tag } from 'lucide-react';
import Link from 'next/link';
import { ImageWithFallback } from '@/components/ui/ImageWithFallback';

export function SearchOverlay() {
  const {
    isSearchOpen,
    setSearchOpen,
    recentSearches,
    addRecentSearch,
    removeRecentSearch,
    clearRecentSearches,
  } = useStore();

  const [query, setQuery] = useState('');
  const [debouncedQuery, setDebouncedQuery] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);

  // Suggested quick tags
  const popularTags = [
    'Jordan',
    'Samba',
    '9060',
    'Kayano',
    'Air Max',
    'Retro',
    'Running',
  ];

  // Focus on open
  useEffect(() => {
    if (isSearchOpen) {
      setTimeout(() => {
        inputRef.current?.focus();
      }, 50);
    } else {
      setQuery('');
      setDebouncedQuery('');
    }
  }, [isSearchOpen]);

  // Debounce input
  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedQuery(query);
    }, 200);
    return () => clearTimeout(handler);
  }, [query]);

  // Close on Escape
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isSearchOpen) {
        setSearchOpen(false);
      }
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        setSearchOpen(!isSearchOpen);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isSearchOpen, setSearchOpen]);

  if (!isSearchOpen) return null;

  // Search matching algorithm
  const trimmed = debouncedQuery.trim().toLowerCase();
  const matchedProducts: Product[] = trimmed
    ? PRODUCTS.filter((p) => {
        return (
          p.name.toLowerCase().includes(trimmed) ||
          p.brand.toLowerCase().includes(trimmed) ||
          p.category.toLowerCase().includes(trimmed) ||
          p.availableColors.some((c) => c.name.toLowerCase().includes(trimmed)) ||
          p.tags.some((t) => t.toLowerCase().includes(trimmed))
        );
      }).slice(0, 8)
    : [];

  const handleSelectProduct = (p: Product) => {
    addRecentSearch(p.name);
    setSearchOpen(false);
  };

  const handleTagClick = (tag: string) => {
    setQuery(tag);
    addRecentSearch(tag);
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="search-dialog-title"
      className="fixed inset-0 z-50 flex flex-col bg-[#1A1814]/70 backdrop-blur-md animate-in fade-in duration-200"
      onClick={() => setSearchOpen(false)}
    >
      <div
        className="w-full max-w-4xl mx-auto mt-6 sm:mt-14 p-5 sm:p-7 bg-[#FFFDF8] border border-[#E8E0D4] rounded-3xl shadow-2xl overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Search Input Bar */}
        <div className="relative flex items-center border-b border-[#E8E0D4] pb-5">
          <Search className="w-5 h-5 text-[#B87333] mr-3.5 flex-shrink-0" />
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter' && query.trim()) {
                addRecentSearch(query.trim());
              }
            }}
            placeholder="Search by silhouette, brand (Nike, Jordan, ASICS), or colorway..."
            className="flex-1 bg-transparent text-[#1A1814] placeholder-[#8C8275] font-sans text-base sm:text-lg focus:outline-none"
          />
          {query && (
            <button
              onClick={() => setQuery('')}
              className="p-1.5 text-[#8C8275] hover:text-[#1A1814] rounded-full hover:bg-[#F0EBE3] mr-2"
              aria-label="Clear search input"
            >
              <X className="w-4 h-4" />
            </button>
          )}
          <button
            onClick={() => setSearchOpen(false)}
            className="px-3 py-1.5 rounded-full bg-[#FAF7F2] border border-[#E8E0D4] text-[#8C8275] hover:text-[#1A1814] hover:border-[#B87333] font-mono text-xs uppercase tracking-wider transition-colors"
          >
            ESC
          </button>
        </div>

        {/* Popular Tags Strip */}
        <div className="py-3.5 flex items-center gap-2 overflow-x-auto border-b border-[#F0EBE3] text-xs">
          <span className="text-[#8C8275] flex items-center gap-1.5 flex-shrink-0 font-medium">
            <Tag className="w-3.5 h-3.5 text-[#B87333]" />
            Trending Tags:
          </span>
          {popularTags.map((tag) => (
            <button
              key={tag}
              onClick={() => handleTagClick(tag)}
              className="px-3 py-1 rounded-full bg-[#FAF7F2] hover:bg-[#F0EBE3] border border-[#E8E0D4] hover:border-[#B87333] text-[#1A1814] font-medium transition-colors flex-shrink-0 text-xs"
            >
              {tag}
            </button>
          ))}
        </div>

        {/* Results Area */}
        <div className="max-h-[60vh] overflow-y-auto py-5 pr-1">
          {trimmed ? (
            matchedProducts.length > 0 ? (
              <div className="space-y-3">
                <p className="font-mono text-[11px] uppercase tracking-wider text-[#8C8275]">
                  Found {matchedProducts.length} matching silhouettes
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                  {matchedProducts.map((product) => (
                    <Link
                      key={product.id}
                      href={`/product/${product.slug}`}
                      onClick={() => handleSelectProduct(product)}
                      className="flex items-center gap-3.5 p-3 rounded-2xl bg-[#FAF7F2] hover:bg-[#F0EBE3] border border-[#E8E0D4] hover:border-[#B87333] transition-all group shadow-sm hover:shadow-md"
                    >
                      <div className="relative w-16 h-16 rounded-xl bg-white overflow-hidden flex-shrink-0 border border-[#E8E0D4]">
                        <ImageWithFallback
                          src={product.images[0]}
                          alt={product.name}
                          fill
                          sizes="64px"
                          className="object-cover group-hover:scale-105 transition-transform"
                        />
                      </div>
                      <div className="flex-1 min-w-0">
                        <span className="font-mono text-[10px] text-[#B87333] uppercase tracking-wider block font-semibold">
                          {product.brand} • {product.category}
                        </span>
                        <h4 className="font-serif text-sm font-bold text-[#1A1814] truncate group-hover:text-[#B87333] transition-colors">
                          {product.name}
                        </h4>
                        <span className="font-mono text-xs font-semibold text-[#8C8275]">
                          ${product.price}
                        </span>
                      </div>
                      <ArrowRight className="w-4 h-4 text-[#8C8275] group-hover:text-[#B87333] group-hover:translate-x-1 transition-all" />
                    </Link>
                  ))}
                </div>
              </div>
            ) : (
              <div className="py-12 text-center">
                <p className="font-serif text-xl font-bold text-[#1A1814] mb-2">
                  No Silhouettes Found For &ldquo;{query}&rdquo;
                </p>
                <p className="text-xs text-[#8C8275] max-w-sm mx-auto mb-6">
                  Try searching for Nike, Jordan, Samba, 9060, or browse our curated archive collection.
                </p>
                <Link
                  href="/sneakers"
                  onClick={() => setSearchOpen(false)}
                  className="inline-flex items-center gap-2 px-6 py-3 bg-[#B87333] hover:bg-[#8B5A2B] text-white font-medium text-xs rounded-full shadow-md transition-all hover:scale-[1.02]"
                >
                  <span>Browse Full Collection</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            )
          ) : (
            /* Recent searches & recommendations */
            <div className="space-y-6">
              {recentSearches.length > 0 && (
                <div>
                  <div className="flex items-center justify-between pb-2 mb-2 border-b border-[#F0EBE3]">
                    <span className="font-mono text-[11px] uppercase tracking-wider text-[#8C8275] flex items-center gap-1.5 font-semibold">
                      <Clock className="w-3.5 h-3.5 text-[#B87333]" />
                      Recent Searches
                    </span>
                    <button
                      onClick={clearRecentSearches}
                      className="font-mono text-[11px] text-[#8C8275] hover:text-[#B87333] transition-colors"
                    >
                      Clear
                    </button>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {recentSearches.map((term) => (
                      <div
                        key={term}
                        className="flex items-center gap-1.5 pl-3 pr-2 py-1.5 rounded-full bg-[#FAF7F2] border border-[#E8E0D4] text-xs text-[#1A1814]"
                      >
                        <button
                          onClick={() => handleTagClick(term)}
                          className="hover:text-[#B87333] transition-colors"
                        >
                          {term}
                        </button>
                        <button
                          onClick={() => removeRecentSearch(term)}
                          className="text-[#8C8275] hover:text-red-500 p-0.5 rounded-full"
                          aria-label={`Remove ${term}`}
                        >
                          <X className="w-3 h-3" />
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Quick Picks */}
              <div>
                <p className="font-mono text-[11px] uppercase tracking-wider text-[#8C8275] mb-3 flex items-center gap-1.5 font-semibold">
                  <Sparkles className="w-3.5 h-3.5 text-[#B87333]" />
                  Curator Recommended Drops
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3.5">
                  {PRODUCTS.slice(0, 3).map((product) => (
                    <Link
                      key={product.id}
                      href={`/product/${product.slug}`}
                      onClick={() => handleSelectProduct(product)}
                      className="p-3.5 rounded-2xl bg-[#FAF7F2] hover:bg-[#F0EBE3] border border-[#E8E0D4] hover:border-[#B87333] transition-all group flex items-center gap-3.5 shadow-sm hover:shadow-md"
                    >
                      <div className="relative w-12 h-12 rounded-xl bg-white overflow-hidden flex-shrink-0 border border-[#E8E0D4]">
                        <ImageWithFallback
                          src={product.images[0]}
                          alt={product.name}
                          fill
                          sizes="48px"
                          className="object-cover"
                        />
                      </div>
                      <div className="min-w-0">
                        <span className="font-mono text-[10px] text-[#B87333] font-semibold block truncate">
                          {product.brand}
                        </span>
                        <p className="font-serif text-xs font-bold text-[#1A1814] truncate group-hover:text-[#B87333] transition-colors">
                          {product.name}
                        </p>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
