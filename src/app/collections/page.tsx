import React from 'react';
import Link from 'next/link';
import { COLLECTIONS } from '@/data/collections';
import { ArrowRight, Sparkles, Layers } from 'lucide-react';
import { ImageWithFallback } from '@/components/ui/ImageWithFallback';

export const metadata = {
  title: 'Curated Drops & Editorial Collections',
  description:
    'Discover curated seasonal drops from SOLEVAULT: from Y2K tech runner archives to vintage terrace gum soles and hardwood royalty.',
};

export default function CollectionsPage() {
  return (
    <div className="min-h-screen bg-[#08080a] text-zinc-100 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="border-b border-zinc-800 pb-8 mb-12">
          <div className="flex items-center gap-2 text-[#d4ff00] text-xs font-mono font-bold uppercase tracking-widest mb-2">
            <Layers className="w-4 h-4" />
            <span>SEASONAL EDITORIAL DROPS</span>
          </div>
          <h1 className="font-display text-4xl sm:text-6xl font-black uppercase tracking-tight text-white">
            Curated Collections
          </h1>
          <p className="mt-4 text-zinc-400 text-sm sm:text-base max-w-2xl font-sans leading-relaxed">
            Every collection tells an architectural and cultural story. Discover silhouettes unified by aesthetic movements, historic moments, and subcultural movements.
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
                className="group relative rounded-3xl overflow-hidden bg-[#101015] border border-zinc-800 hover:border-zinc-700 transition-all duration-300 shadow-2xl flex flex-col justify-between"
              >
                {/* Visual Imagery */}
                <div className="relative aspect-[16/10] w-full bg-zinc-950 overflow-hidden">
                  <ImageWithFallback
                    src={col.image}
                    alt={col.title}
                    fill
                    sizes="(max-width: 768px) 100vw, 50vw"
                    className="object-cover object-center group-hover:scale-105 transition-transform duration-700 ease-out"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent" />
                  
                  <div className="absolute top-4 left-4 font-mono text-[10px] text-[#d4ff00] font-bold uppercase tracking-widest bg-black/70 px-3 py-1 rounded backdrop-blur-sm border border-zinc-800">
                    {col.tag}
                  </div>
                </div>

                {/* Content */}
                <div className="p-8 flex flex-col justify-between flex-1">
                  <div>
                    <span className="font-mono text-xs uppercase tracking-widest text-[#d4ff00] font-bold block mb-1">
                      {col.subtitle}
                    </span>
                    <h2 className="font-display text-2xl sm:text-3xl font-black uppercase text-white tracking-tight">
                      {col.title}
                    </h2>
                    <p className="text-zinc-400 text-xs sm:text-sm mt-3 leading-relaxed font-sans">
                      {col.description}
                    </p>
                  </div>

                  <div className="mt-8 pt-6 border-t border-zinc-800/80">
                    <Link
                      href={filterUrl}
                      className="inline-flex items-center gap-2 px-6 py-3.5 bg-zinc-900 hover:bg-[#d4ff00] text-white hover:text-black font-mono text-xs font-bold uppercase tracking-widest rounded-xl transition-all shadow-md group-hover:bg-[#d4ff00] group-hover:text-black"
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
