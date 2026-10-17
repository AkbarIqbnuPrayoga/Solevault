'use client';

import React from 'react';
import Link from 'next/link';
import { ALL_BRANDS } from '@/data/products';
import { ArrowRight } from 'lucide-react';

export function BrandStrip() {
  return (
    <section id="featured-brands" className="py-16 bg-white border-b border-[#E8E0D4]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 pb-4 border-b border-[#E8E0D4]">
          <div>
            <span className="font-mono-tag text-xs uppercase tracking-widest text-[#B87333]">
              CURATED HOUSES
            </span>
            <h2 className="font-display text-2xl sm:text-3xl font-bold text-[#1A1814] tracking-tight mt-1 italic">
              Select By Brand
            </h2>
          </div>
          <p className="text-xs font-mono-tag text-[#8C8275] mt-2 md:mt-0">
            Official archival silhouettes curated for contemporary rotation.
          </p>
        </div>

        {/* Responsive Brand Strip */}
        <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-3">
          {ALL_BRANDS.map((brand) => (
            <Link
              key={brand}
              href={`/sneakers?brand=${encodeURIComponent(brand)}`}
              className="group relative flex flex-col justify-between p-4 sm:p-5 bg-[#FAF7F2] hover:bg-[#F0EBE3] border border-[#E8E0D4] hover:border-[#B87333]/40 rounded-2xl transition-all duration-300 hover-lift min-w-0 overflow-hidden"
            >
              <div className="flex justify-between items-center mb-5">
                <span className="font-mono-tag text-[9px] uppercase tracking-widest text-[#C4B8A8] group-hover:text-[#B87333] transition-colors">
                  HOUSE
                </span>
                <ArrowRight className="w-3.5 h-3.5 text-[#C4B8A8] group-hover:text-[#B87333] group-hover:translate-x-0.5 transition-all flex-shrink-0" />
              </div>

              <div className="min-w-0 mt-auto">
                <div className="min-h-[36px] flex items-end">
                  <h3 className="font-display text-xs sm:text-sm lg:text-[12px] xl:text-[13px] 2xl:text-sm font-bold text-[#1A1814] group-hover:text-[#B87333] transition-colors leading-tight break-words italic">
                    {brand}
                  </h3>
                </div>
                <span className="font-mono-tag text-[10px] text-[#8C8275] uppercase tracking-wider block mt-1.5">
                  Explore Drops
                </span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
