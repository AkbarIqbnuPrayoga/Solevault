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
    <section className="py-24 bg-white border-b border-[#E8E0D4]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-14 pb-6 border-b border-[#E8E0D4]">
          <div>
            <div className="flex items-center gap-2 text-[#B87333] text-xs font-mono-tag font-bold uppercase tracking-widest mb-2">
              <Sparkles className="w-4 h-4" />
              <span>FRESH FROM THE VAULT</span>
            </div>
            <h2 className="font-display text-3xl sm:text-4xl font-bold text-[#1A1814] tracking-tight italic">
              New Drops & Recent Releases
            </h2>
          </div>
          <Link
            href="/sneakers?sort=newest"
            className="mt-4 sm:mt-0 font-mono-tag text-xs uppercase tracking-wider text-[#B87333] hover:text-[#8B5A2B] flex items-center gap-1.5 transition-colors"
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
                className="group relative bg-[#FAF7F2] border border-[#E8E0D4] hover:border-[#C4B8A8] rounded-2xl overflow-hidden flex flex-col justify-between transition-all duration-300 hover-lift"
              >
                {/* Image & Status Tag */}
                <div className="relative aspect-square w-full bg-[#F0EBE3] overflow-hidden rounded-t-2xl">
                  <ImageWithFallback
                    src={drop.images[0]}
                    alt={drop.name}
                    fill
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                    className="object-cover object-center group-hover:scale-105 transition-transform duration-500"
                  />

                  {/* Drop Status Tag */}
                  <div className="absolute top-3 left-3 bg-[#1A1814] text-white font-mono-tag text-[10px] font-bold px-3 py-1 rounded-full uppercase tracking-wider shadow">
                    DROP ACTIVE
                  </div>

                  {/* Release Date Chip */}
                  <div className="absolute bottom-3 left-3 bg-white/85 backdrop-blur-sm text-[#3D3225] font-mono-tag text-[10px] px-3 py-1 rounded-full border border-[#E8E0D4] flex items-center gap-1.5">
                    <Calendar className="w-3 h-3 text-[#B87333]" />
                    <span>{drop.releaseDate}</span>
                  </div>
                </div>

                {/* Details */}
                <div className="p-5 flex flex-col justify-between flex-1">
                  <div>
                    <div className="flex items-center justify-between text-xs font-mono-tag mb-1">
                      <span className="text-[#B87333] uppercase font-bold tracking-wider">
                        {drop.brand}
                      </span>
                      <span className="text-[#8C8275]">{drop.category}</span>
                    </div>

                    <Link href={`/product/${drop.slug}`}>
                      <h3 className="font-display text-base font-bold text-[#1A1814] uppercase truncate hover:text-[#B87333] transition-colors">
                        {drop.name}
                      </h3>
                    </Link>

                    <p className="text-xs text-[#8C8275] line-clamp-2 mt-2 leading-relaxed font-light">
                      {drop.description}
                    </p>
                  </div>

                  <div className="mt-5 pt-3 border-t border-[#E8E0D4] flex items-center justify-between">
                    <div>
                      <span className="font-mono-tag text-lg font-bold text-[#1A1814] block">
                        ${drop.price}
                      </span>
                      <span className="font-mono-tag text-[10px] text-[#8C8275]">
                        {drop.stockQuantity} pairs remaining
                      </span>
                    </div>

                    <button
                      type="button"
                      onClick={() => openQuickView(drop)}
                      className="px-4 py-2 bg-[#F0EBE3] hover:bg-[#1A1814] text-[#1A1814] hover:text-white font-mono-tag text-xs font-bold uppercase rounded-full transition-all duration-300"
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
