'use client';

import React from 'react';
import Link from 'next/link';
import { ALL_BRANDS } from '@/data/products';
import { ArrowRight } from 'lucide-react';

export function BrandStrip() {
  return (
    <section id="featured-brands" className="py-12 bg-[#0c0c10] border-b border-zinc-800/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 pb-4 border-b border-zinc-800">
          <div>
            <span className="font-mono text-xs uppercase tracking-widest text-[#d4ff00]">
              CURATED HOUSES
            </span>
            <h2 className="font-display text-2xl sm:text-3xl font-black uppercase text-white tracking-tight mt-1">
              Select By Brand
            </h2>
          </div>
          <p className="text-xs font-mono text-zinc-500 mt-2 md:mt-0">
            Official archival silhouettes curated for contemporary rotation.
          </p>
        </div>

        {/* Responsive Brand Strip */}
        <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-2.5 sm:gap-3">
          {ALL_BRANDS.map((brand) => (
            <Link
              key={brand}
              href={`/sneakers?brand=${encodeURIComponent(brand)}`}
              className="group relative flex flex-col justify-between p-3.5 sm:p-4 bg-zinc-950/80 hover:bg-zinc-900 border border-zinc-800/80 hover:border-[#d4ff00]/60 rounded-xl transition-all duration-300 hover:-translate-y-1 hover:shadow-xl min-w-0 overflow-hidden"
            >
              <div className="flex justify-between items-center mb-5">
                <span className="font-mono text-[9px] uppercase tracking-widest text-zinc-500 group-hover:text-[#d4ff00] transition-colors">
                  HOUSE
                </span>
                <ArrowRight className="w-3.5 h-3.5 text-zinc-600 group-hover:text-[#d4ff00] group-hover:translate-x-0.5 transition-all flex-shrink-0" />
              </div>

              <div className="min-w-0 mt-auto">
                <div className="min-h-[36px] flex items-end">
                  <h3 className="font-display text-xs sm:text-sm lg:text-[12px] xl:text-[13px] 2xl:text-sm font-black uppercase text-white group-hover:text-[#d4ff00] transition-colors leading-tight break-words">
                    {brand}
                  </h3>
                </div>
                <span className="font-mono text-[10px] text-zinc-500 uppercase tracking-wider block mt-1.5">
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
