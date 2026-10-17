import React from 'react';
import Link from 'next/link';
import { BRANDS } from '@/data/brands';
import { ArrowRight, Compass, Sparkles } from 'lucide-react';
import { ImageWithFallback } from '@/components/ui/ImageWithFallback';

export const metadata = {
  title: 'Curated Houses & Heritage Brands | SOLEVAULT',
  description:
    'Explore the histories, iconic models, and cultural lineage of Nike, Jordan, Adidas, New Balance, ASICS, Puma, and Converse.',
};

export default function BrandsPage() {
  return (
    <div className="min-h-screen bg-[#FAF7F2] text-[#1A1814] py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="border-b border-[#E8E0D4] pb-8 mb-12">
          <div className="flex items-center gap-2 text-[#B87333] text-xs font-mono font-semibold uppercase tracking-widest mb-2">
            <Compass className="w-4 h-4" />
            <span>CURATED FOOTWEAR HOUSES</span>
          </div>
          <h1 className="font-serif text-4xl sm:text-6xl font-bold text-[#1A1814] tracking-tight">
            Houses & <span className="italic text-[#B87333]">Heritage</span>
          </h1>
          <p className="mt-4 text-[#8C8275] text-sm sm:text-base max-w-2xl font-sans leading-relaxed">
            The brands that forged sport history and anchored modern street culture. Explore archival silhouettes, signature cushioning innovations, and exclusive drops from our seven partner lineages.
          </p>
        </div>

        {/* Brands List / Grid */}
        <div className="space-y-8">
          {BRANDS.map((brand, idx) => {
            return (
              <div
                key={brand.slug}
                className="group rounded-3xl overflow-hidden bg-white border border-[#E8E0D4] hover:border-[#B87333]/50 transition-all duration-300 shadow-sm hover:shadow-xl grid grid-cols-1 lg:grid-cols-12"
              >
                {/* Brand Imagery */}
                <div className="lg:col-span-5 relative aspect-[16/9] lg:aspect-auto min-h-[280px] bg-[#FAF7F2] overflow-hidden">
                  <ImageWithFallback
                    src={brand.heroImage}
                    alt={brand.name}
                    fill
                    sizes="(max-width: 1024px) 100vw, 40vw"
                    className="object-cover object-center group-hover:scale-105 transition-transform duration-700 ease-out"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t lg:bg-gradient-to-r from-black/40 via-transparent to-transparent" />
                  
                  <div className="absolute top-4 left-4 font-mono text-[10px] text-white uppercase font-bold tracking-widest bg-[#1A1814]/80 px-3 py-1 rounded-full backdrop-blur-sm border border-white/20">
                    0{idx + 1} // Est. {brand.founded}
                  </div>
                </div>

                {/* Brand Story & Link */}
                <div className="lg:col-span-7 p-6 sm:p-10 flex flex-col justify-between">
                  <div>
                    <div className="flex items-center justify-between text-xs font-mono text-[#8C8275] mb-2">
                      <span>ORIGIN: {brand.origin.toUpperCase()}</span>
                      <span className="text-[#B87333] font-semibold">{brand.featuredModel}</span>
                    </div>

                    <h2 className="font-serif text-3xl sm:text-4xl font-bold text-[#1A1814] tracking-tight">
                      {brand.name}
                    </h2>

                    <p className="text-xs font-mono text-[#B87333] uppercase tracking-wider mt-1 mb-4 font-semibold">
                      {brand.tagline}
                    </p>

                    <p className="text-[#8C8275] text-xs sm:text-sm leading-relaxed font-sans">
                      {brand.description}
                    </p>
                  </div>

                  <div className="mt-8 pt-6 border-t border-[#E8E0D4] flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                    <span className="font-mono text-xs text-[#8C8275]">
                      Flagship models: {brand.featuredModel}
                    </span>

                    <Link
                      href={`/sneakers?brand=${encodeURIComponent(brand.name)}`}
                      className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-[#B87333] hover:bg-[#8B5A2B] text-white font-medium text-xs uppercase tracking-wider rounded-full transition-all shadow-md active:scale-95 flex-shrink-0"
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
