import React from 'react';
import Link from 'next/link';
import { COLLECTIONS } from '@/data/collections';
import { ArrowRight, Sparkles, Layers } from 'lucide-react';
import { ImageWithFallback } from '@/components/ui/ImageWithFallback';

export const metadata = {
  title: 'Curated Drops & Editorial Collections | SOLEVAULT',
  description:
    'Discover curated seasonal drops from SOLEVAULT: from Y2K tech runner archives to vintage terrace gum soles and hardwood royalty.',
};

export default function CollectionsPage() {
  return (
    <div className="min-h-screen bg-[#FAF7F2] text-[#1A1814] py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="border-b border-[#E8E0D4] pb-8 mb-12">
          <div className="flex items-center gap-2 text-[#B87333] text-xs font-mono font-semibold uppercase tracking-widest mb-2">
            <Layers className="w-4 h-4" />
            <span>SEASONAL EDITORIAL DROPS</span>
          </div>
          <h1 className="font-serif text-4xl sm:text-6xl font-bold text-[#1A1814] tracking-tight">
            Curated <span className="italic text-[#B87333]">Collections</span>
          </h1>
          <p className="mt-4 text-[#8C8275] text-sm sm:text-base max-w-2xl font-sans leading-relaxed">
            Every collection tells an architectural and cultural story. Discover silhouettes unified by aesthetic movements, historic athletic moments, and iconic subcultures.
          </p>
        </div>

        {/* Collections Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {COLLECTIONS.map((col) => {
            const filterUrl = col.category
              ? `/sneakers?category=${col.category}`
              : '/sneakers?featured=true';

            return (
              <div
                key={col.id}
                className="group relative rounded-3xl overflow-hidden bg-white border border-[#E8E0D4] hover:border-[#B87333]/50 transition-all duration-300 shadow-sm hover:shadow-xl flex flex-col justify-between"
              >
                {/* Visual Imagery */}
                <div className="relative aspect-[16/10] w-full bg-[#FAF7F2] overflow-hidden">
                  <ImageWithFallback
                    src={col.image}
                    alt={col.title}
                    fill
                    sizes="(max-width: 768px) 100vw, 50vw"
                    className="object-cover object-center group-hover:scale-105 transition-transform duration-700 ease-out"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                  
                  <div className="absolute top-4 left-4 font-mono text-[10px] text-white font-bold uppercase tracking-widest bg-[#1A1814]/80 px-3 py-1 rounded-full backdrop-blur-sm border border-white/20">
                    {col.tag}
                  </div>
                </div>

                {/* Content */}
                <div className="p-8 flex flex-col justify-between flex-1">
                  <div>
                    <span className="font-mono text-xs uppercase tracking-widest text-[#B87333] font-semibold block mb-1">
                      {col.subtitle}
                    </span>
                    <h2 className="font-serif text-2xl sm:text-3xl font-bold text-[#1A1814] tracking-tight">
                      {col.title}
                    </h2>
                    <p className="text-[#8C8275] text-xs sm:text-sm mt-3 leading-relaxed font-sans">
                      {col.description}
                    </p>
                  </div>

                  <div className="mt-8 pt-6 border-t border-[#E8E0D4]">
                    <Link
                      href={filterUrl}
                      className="inline-flex items-center gap-2 px-6 py-3.5 bg-[#FAF7F2] hover:bg-[#B87333] text-[#1A1814] hover:text-white font-sans text-xs font-semibold uppercase tracking-wider rounded-full transition-all shadow-sm group-hover:bg-[#B87333] group-hover:text-white"
                    >
                      <span>Explore Collection</span>
                      <ArrowRight className="w-4 h-4" />
                    </Link>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </div>
  );
}
