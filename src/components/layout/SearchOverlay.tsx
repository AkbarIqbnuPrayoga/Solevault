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
      className="fixed inset-0 z-50 flex flex-col bg-black/85 backdrop-blur-md animate-in fade-in duration-200"
      onClick={() => setSearchOpen(false)}
    >
      <div
        className="w-full max-w-4xl mx-auto mt-6 sm:mt-12 p-4 sm:p-6 bg-[#0f0f13] border border-zinc-800 rounded-2xl shadow-2xl overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Search Input Bar */}
        <div className="relative flex items-center border-b border-zinc-800 pb-4">
          <Search className="w-5 h-5 text-[#d4ff00] mr-3" />
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
            className="flex-1 bg-transparent text-white placeholder-zinc-500 font-sans text-base sm:text-lg focus:outline-none"
          />
          {query && (
            <button
              onClick={() => setQuery('')}
              className="p-1 text-zinc-400 hover:text-white mr-2"
              aria-label="Clear search input"
            >
              <X className="w-4 h-4" />
            </button>
          )}
          <button
            onClick={() => setSearchOpen(false)}
            className="px-2.5 py-1 rounded bg-zinc-800 text-zinc-400 hover:text-white font-mono text-xs uppercase tracking-wider"
          >
            ESC
          </button>
        </div>

        {/* Popular Tags Strip */}
        <div className="py-3 flex items-center gap-2 overflow-x-auto border-b border-zinc-900 text-xs font-mono">
          <span className="text-zinc-500 flex items-center gap-1 flex-shrink-0">
            <Tag className="w-3 h-3 text-[#d4ff00]" />
            Trending:
          </span>
          {popularTags.map((tag) => (
            <button
              key={tag}
              onClick={() => handleTagClick(tag)}
              className="px-2.5 py-1 rounded-full bg-zinc-900 hover:bg-zinc-800 border border-zinc-800 hover:border-[#d4ff00]/40 text-zinc-300 hover:text-white transition-colors flex-shrink-0"
            >
              {tag}
            </button>
          ))}
        </div>

        {/* Results Area */}
        <div className="max-h-[60vh] overflow-y-auto py-4">
          {trimmed ? (
            matchedProducts.length > 0 ? (
              <div className="space-y-2">
                <p className="font-mono text-xs uppercase tracking-wider text-zinc-500 mb-3">
                  Found {matchedProducts.length} matching silhouettes
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {matchedProducts.map((product) => (
                    <Link
                      key={product.id}
                      href={`/product/${product.slug}`}
                      onClick={() => handleSelectProduct(product)}
                      className="flex items-center gap-3.5 p-3 rounded-xl bg-zinc-900/60 hover:bg-zinc-800/80 border border-zinc-800 hover:border-[#d4ff00]/50 transition-all group"
                    >
                      <div className="relative w-16 h-16 rounded-lg bg-zinc-950 overflow-hidden flex-shrink-0 border border-zinc-800">
                        <ImageWithFallback
                          src={product.images[0]}
                          alt={product.name}
                          fill
                          sizes="64px"
                          className="object-cover group-hover:scale-105 transition-transform"
                        />
                      </div>
                      <div className="flex-1 min-w-0">
                        <span className="font-mono text-[10px] text-[#d4ff00] uppercase tracking-wider block">
                          {product.brand} • {product.category}
                        </span>
                        <h4 className="font-display text-sm font-bold text-white uppercase truncate group-hover:text-[#d4ff00] transition-colors">
                          {product.name}
                        </h4>
                        <span className="font-mono text-xs font-bold text-zinc-300">
                          ${product.price}
                        </span>
                      </div>
                      <ArrowRight className="w-4 h-4 text-zinc-600 group-hover:text-[#d4ff00] group-hover:translate-x-1 transition-all" />
                    </Link>
                  ))}
                </div>
              </div>
            ) : (
              <div className="py-12 text-center">
                <p className="font-display text-lg uppercase text-white mb-2">
                  No Silhouettes Found For &ldquo;{query}&rdquo;
                </p>
                <p className="text-xs text-zinc-400 max-w-sm mx-auto mb-4">
                  Try searching for Nike, Jordan, Samba, 9060, or browse our curated catalog.
                </p>
                <Link
                  href="/sneakers"
                  onClick={() => setSearchOpen(false)}
                  className="inline-flex items-center gap-2 px-5 py-2.5 bg-[#d4ff00] text-black font-mono text-xs uppercase font-bold rounded-lg"
                >
                  <span>Browse Full Catalog</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            )
          ) : (
            /* Recent searches state */
            <div className="space-y-4">
              {recentSearches.length > 0 && (
                <div>
                  <div className="flex items-center justify-between pb-2 mb-2 border-b border-zinc-900">
                    <span className="font-mono text-xs uppercase tracking-wider text-zinc-500 flex items-center gap-1.5">
                      <Clock className="w-3.5 h-3.5" />
                      Recent Searches
                    </span>
                    <button
                      onClick={clearRecentSearches}
                      className="font-mono text-[11px] text-zinc-500 hover:text-white transition-colors"
                    >
                      Clear
                    </button>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {recentSearches.map((term) => (
                      <div
                        key={term}
                        className="flex items-center gap-1.5 pl-3 pr-2 py-1.5 rounded-lg bg-zinc-900 border border-zinc-800 text-xs font-mono text-zinc-300"
                      >
                        <button
                          onClick={() => handleTagClick(term)}
                          className="hover:text-white"
                        >
                          {term}
                        </button>
                        <button
                          onClick={() => removeRecentSearch(term)}
                          className="text-zinc-600 hover:text-zinc-300 p-0.5"
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
                <p className="font-mono text-xs uppercase tracking-wider text-zinc-500 mb-3 flex items-center gap-1.5">
                  <Sparkles className="w-3.5 h-3.5 text-[#d4ff00]" />
                  Curator Recommended Drops
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  {PRODUCTS.slice(0, 3).map((product) => (
                    <Link
                      key={product.id}
                      href={`/product/${product.slug}`}
                      onClick={() => handleSelectProduct(product)}
                      className="p-3 rounded-xl bg-zinc-900/40 hover:bg-zinc-800/60 border border-zinc-800/80 transition-colors group flex items-center gap-3"
                    >
                      <div className="relative w-12 h-12 rounded bg-zinc-950 overflow-hidden flex-shrink-0">
                        <ImageWithFallback
                          src={product.images[0]}
                          alt={product.name}
                          fill
                          sizes="48px"
                          className="object-cover"
                        />
                      </div>
                      <div className="min-w-0">
                        <span className="font-mono text-[10px] text-[#d4ff00] block truncate">
                          {product.brand}
                        </span>
                        <p className="font-display text-xs font-bold text-white uppercase truncate group-hover:text-[#d4ff00] transition-colors">
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
