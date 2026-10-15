'use client';

import React from 'react';
import Link from 'next/link';
import { PRODUCTS } from '@/data/products';
import { Sparkles, Calendar, ArrowRight, ShieldCheck } from 'lucide-react';
import { ImageWithFallback } from '@/components/ui/ImageWithFallback';
import { useStore } from '@/store/useStore';

export function NewDropsSection() {
  const { openQuickView } = useStore();
  const newDrops = PRODUCTS.filter((p) => p.newArrival).slice(0, 4);

  return (
    <section className="py-20 bg-[#0c0c10] border-b border-zinc-800/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-12 pb-6 border-b border-zinc-800">
          <div>
            <div className="flex items-center gap-2 text-[#d4ff00] text-xs font-mono font-bold uppercase tracking-widest mb-1">
              <Sparkles className="w-4 h-4" />
              <span>FRESH FROM THE VAULT</span>
            </div>
            <h2 className="font-display text-3xl sm:text-4xl font-black uppercase text-white tracking-tight">
              New Drops & Recent Releases
            </h2>
          </div>
          <Link
            href="/sneakers?sort=newest"
            className="mt-4 sm:mt-0 font-mono text-xs uppercase tracking-wider text-[#d4ff00] hover:underline flex items-center gap-1.5"
          >
            <span>View All Recent Drops</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        {/* New Drops Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {newDrops.map((drop) => {
            return (
              <div
                key={drop.id}
                className="group relative bg-[#131318] border border-zinc-800 hover:border-zinc-700 rounded-2xl overflow-hidden flex flex-col justify-between transition-all duration-300 hover:shadow-xl"
              >
                {/* Image & Status Tag */}
                <div className="relative aspect-square w-full bg-zinc-950 overflow-hidden">
                  <ImageWithFallback
                    src={drop.images[0]}
                    alt={drop.name}
                    fill
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                    className="object-cover object-center group-hover:scale-105 transition-transform duration-500"
                  />

                  {/* Drop Status Tag */}
                  <div className="absolute top-3 left-3 bg-[#d4ff00] text-black font-mono text-[10px] font-bold px-2.5 py-1 rounded uppercase tracking-wider shadow">
                    DROP ACTIVE
                  </div>

                  {/* Release Date Chip */}
                  <div className="absolute bottom-3 left-3 bg-black/70 backdrop-blur-sm text-zinc-300 font-mono text-[10px] px-2.5 py-1 rounded border border-zinc-800 flex items-center gap-1.5">
                    <Calendar className="w-3 h-3 text-[#d4ff00]" />
                    <span>{drop.releaseDate}</span>
                  </div>
                </div>

                {/* Details */}
                <div className="p-5 flex flex-col justify-between flex-1">
                  <div>
                    <div className="flex items-center justify-between text-xs font-mono mb-1">
                      <span className="text-[#d4ff00] uppercase font-bold tracking-wider">
                        {drop.brand}
                      </span>
                      <span className="text-zinc-500">{drop.category}</span>
                    </div>

                    <Link href={`/product/${drop.slug}`}>
                      <h3 className="font-display text-base font-bold text-white uppercase truncate hover:text-[#d4ff00] transition-colors">
                        {drop.name}
                      </h3>
                    </Link>

                    <p className="text-xs text-zinc-400 line-clamp-2 mt-2 leading-relaxed">
                      {drop.description}
                    </p>
                  </div>

                  <div className="mt-5 pt-3 border-t border-zinc-800/80 flex items-center justify-between">
                    <div>
                      <span className="font-mono text-lg font-bold text-white block">
                        ${drop.price}
                      </span>
                      <span className="font-mono text-[10px] text-zinc-500">
                        {drop.stockQuantity} pairs remaining
                      </span>
                    </div>

                    <button
                      type="button"
                      onClick={() => openQuickView(drop)}
                      className="px-3.5 py-2 bg-zinc-800 hover:bg-[#d4ff00] text-white hover:text-black font-mono text-xs font-bold uppercase rounded-lg transition-colors"
                    >
                      Quick Cop
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
