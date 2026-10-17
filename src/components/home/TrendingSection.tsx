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
    <section className="py-24 bg-[#FAF7F2] border-b border-[#E8E0D4]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 pb-6 border-b border-[#E8E0D4]">
          <div>
            <div className="flex items-center gap-2 text-[#B87333] text-xs font-mono-tag font-bold uppercase tracking-widest mb-2">
              <Flame className="w-4 h-4 fill-current text-[#D4955A]" />
              <span>HIGH ROTATION</span>
            </div>
            <h2 className="font-display text-3xl sm:text-4xl font-bold tracking-tight text-[#1A1814] italic">
              Trending Sneakers
            </h2>
          </div>

          {/* Category Filter Tabs */}
          <div className="flex items-center gap-2 overflow-x-auto mt-4 md:mt-0 pt-2 pb-1 scrollbar-none">
            <button
              onClick={() => setActiveCategory('all')}
              className={`px-5 py-2.5 rounded-full font-mono-tag text-xs uppercase tracking-wider transition-all flex-shrink-0 ${
                activeCategory === 'all'
                  ? 'bg-[#1A1814] text-white font-bold shadow-md'
                  : 'bg-[#F0EBE3] text-[#8C8275] hover:text-[#1A1814] border border-[#E8E0D4]'
              }`}
            >
              All Trending
            </button>
            {ALL_CATEGORIES.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-5 py-2.5 rounded-full font-mono-tag text-xs uppercase tracking-wider transition-all flex-shrink-0 ${
                  activeCategory === cat
                    ? 'bg-[#1A1814] text-white font-bold shadow-md'
                    : 'bg-[#F0EBE3] text-[#8C8275] hover:text-[#1A1814] border border-[#E8E0D4]'
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
        <div className="mt-16 flex justify-center">
          <Link
            href="/sneakers"
            className="px-10 py-4 bg-white hover:bg-[#F0EBE3] text-[#1A1814] hover:text-[#B87333] border border-[#C4B8A8] hover:border-[#B87333] font-mono-tag text-xs font-bold uppercase tracking-widest rounded-full flex items-center gap-3 transition-all duration-300 shadow-sm hover:shadow-lg group"
          >
            <span>VIEW ALL SNEAKERS ({PRODUCTS.length} PAIRS)</span>
            <ArrowRight className="w-4 h-4 text-[#B87333] group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

      </div>
    </section>
  );
}
