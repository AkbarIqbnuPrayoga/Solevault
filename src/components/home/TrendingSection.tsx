'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { PRODUCTS, ALL_CATEGORIES } from '@/data/products';
import { ProductCard } from '@/components/catalog/ProductCard';
import { ArrowRight, Flame } from 'lucide-react';
import { ProductCategory } from '@/types';

export function TrendingSection() {
  const [activeCategory, setActiveCategory] = useState<string>('all');

  // Filter products by category or get trending products (at least 8)
  const filteredProducts = activeCategory === 'all'
    ? PRODUCTS.filter((p) => p.trending || p.featured).slice(0, 8)
    : PRODUCTS.filter((p) => p.category === activeCategory).slice(0, 8);

  // Ensure we always have at least 8 items
  const displayProducts = filteredProducts.length >= 8
    ? filteredProducts
    : PRODUCTS.slice(0, 8);

  return (
    <section className="py-20 bg-[#08080a] border-b border-zinc-800/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 pb-6 border-b border-zinc-800">
          <div>
            <div className="flex items-center gap-2 text-[#d4ff00] text-xs font-mono font-bold uppercase tracking-widest mb-1.5">
              <Flame className="w-4 h-4 fill-current text-red-500" />
              <span>HIGH ROTATION</span>
            </div>
            <h2 className="font-display text-3xl sm:text-4xl font-black uppercase tracking-tight text-white">
              Trending Sneakers
            </h2>
          </div>

          {/* Category Filter Tabs */}
          <div className="flex items-center gap-2 overflow-x-auto mt-4 md:mt-0 pt-2 pb-1 scrollbar-none">
            <button
              onClick={() => setActiveCategory('all')}
              className={`px-4 py-2 rounded-lg font-mono text-xs uppercase tracking-wider transition-all flex-shrink-0 ${
                activeCategory === 'all'
                  ? 'bg-[#d4ff00] text-black font-bold shadow-md shadow-[#d4ff00]/20'
                  : 'bg-zinc-900 text-zinc-400 hover:text-white border border-zinc-800'
              }`}
            >
              All Trending
            </button>
            {ALL_CATEGORIES.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-4 py-2 rounded-lg font-mono text-xs uppercase tracking-wider transition-all flex-shrink-0 ${
                  activeCategory === cat
                    ? 'bg-[#d4ff00] text-black font-bold shadow-md shadow-[#d4ff00]/20'
                    : 'bg-zinc-900 text-zinc-400 hover:text-white border border-zinc-800'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* 8-Product Responsive Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {displayProducts.map((product, idx) => (
            <ProductCard key={product.id} product={product} priority={idx < 4} />
          ))}
        </div>

        {/* View All Sneakers CTA */}
        <div className="mt-14 flex justify-center">
          <Link
            href="/sneakers"
            className="px-10 py-4 bg-zinc-900 hover:bg-zinc-800 text-white hover:text-[#d4ff00] border border-zinc-700/80 hover:border-[#d4ff00]/50 font-mono text-xs font-bold uppercase tracking-widest rounded-xl flex items-center gap-3 transition-all duration-200 shadow-xl group"
          >
            <span>VIEW ALL SNEAKERS ({PRODUCTS.length} PAIRS)</span>
            <ArrowRight className="w-4 h-4 text-[#d4ff00] group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

      </div>
    </section>
  );
}
