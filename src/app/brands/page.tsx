import React from 'react';
import Link from 'next/link';
import { BRANDS } from '@/data/brands';
import { ArrowRight, Compass, Sparkles } from 'lucide-react';
import { ImageWithFallback } from '@/components/ui/ImageWithFallback';

export const metadata = {
  title: 'Curated Houses & Heritage Brands',
  description:
    'Explore the histories, iconic models, and cultural lineage of Nike, Jordan, Adidas, New Balance, ASICS, Puma, and Converse.',
};

export default function BrandsPage() {
  return (
    <div className="min-h-screen bg-[#08080a] text-zinc-100 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="border-b border-zinc-800 pb-8 mb-12">
          <div className="flex items-center gap-2 text-[#d4ff00] text-xs font-mono font-bold uppercase tracking-widest mb-2">
            <Compass className="w-4 h-4" />
            <span>CURATED FOOTWEAR HOUSES</span>
          </div>
          <h1 className="font-display text-4xl sm:text-6xl font-black uppercase tracking-tight text-white">
            Houses & Heritage
          </h1>
          <p className="mt-4 text-zinc-400 text-sm sm:text-base max-w-2xl font-sans leading-relaxed">
            The brands that forged sport history and anchored modern street culture. Explore archival silhouettes, signature cushioning innovations, and exclusive drops from our seven partner lineages.
          </p>
        </div>

        {/* Brands List / Grid */}
        <div className="space-y-8">
          {BRANDS.map((brand, idx) => {
            return (
              <div
                key={brand.slug}
                className="group rounded-3xl overflow-hidden bg-[#111116] border border-zinc-800 hover:border-zinc-700 transition-all duration-300 shadow-2xl grid grid-cols-1 lg:grid-cols-12"
              >
                {/* Brand Imagery */}
                <div className="lg:col-span-5 relative aspect-[16/9] lg:aspect-auto min-h-[260px] bg-zinc-950 overflow-hidden">
                  <ImageWithFallback
                    src={brand.heroImage}
                    alt={brand.name}
                    fill
                    sizes="(max-width: 1024px) 100vw, 40vw"
                    className="object-cover object-center group-hover:scale-105 transition-transform duration-700 ease-out"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t lg:bg-gradient-to-r from-black/80 via-transparent to-transparent" />
                  
                  <div className="absolute top-4 left-4 font-mono text-[10px] text-[#d4ff00] uppercase font-bold tracking-widest bg-black/70 px-3 py-1 rounded backdrop-blur-sm border border-zinc-800">
                    0{idx + 1} // {brand.founded}
                  </div>
                </div>

                {/* Brand Story & Link */}
                <div className="lg:col-span-7 p-6 sm:p-10 flex flex-col justify-between">
                  <div>
                    <div className="flex items-center justify-between text-xs font-mono text-zinc-500 mb-2">
                      <span>ORIGIN: {brand.origin.toUpperCase()}</span>
                      <span className="text-[#d4ff00]">{brand.featuredModel}</span>
                    </div>

                    <h2 className="font-display text-3xl sm:text-4xl font-black uppercase text-white tracking-tight">
                      {brand.name}
                    </h2>

                    <p className="text-xs font-mono text-[#d4ff00] uppercase tracking-wider mt-1 mb-4">
                      {brand.tagline}
                    </p>

                    <p className="text-zinc-300 text-xs sm:text-sm leading-relaxed font-sans">
                      {brand.description}
                    </p>
                  </div>

                  <div className="mt-8 pt-6 border-t border-zinc-800/80 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                    <span className="font-mono text-xs text-zinc-500">
                      Flagship models: {brand.featuredModel}
                    </span>

                    <Link
                      href={`/sneakers?brand=${encodeURIComponent(brand.name)}`}
                      className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-[#d4ff00] hover:bg-[#e2ff40] text-black font-mono text-xs font-bold uppercase tracking-wider rounded-xl transition-all shadow-md active:scale-95 flex-shrink-0"
                    >
                      <span>Explore {brand.name} Catalog</span>
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
