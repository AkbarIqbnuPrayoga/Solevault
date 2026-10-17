'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useStore } from '@/store/useStore';
import { Heart, Trash2, ShoppingBag, ArrowRight, Sparkles } from 'lucide-react';
import { ImageWithFallback } from '@/components/ui/ImageWithFallback';

export default function WishlistPage() {
  const { wishlist, removeFromWishlist, clearWishlist, openQuickView } = useStore();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <div className="min-h-[70vh] bg-[#FAF7F2] flex items-center justify-center">
        <div className="font-mono text-xs uppercase tracking-widest text-[#B87333] animate-pulse">
          INITIALIZING SAVED ROTATION...
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#FAF7F2] text-[#1A1814] py-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between pb-6 border-b border-[#E8E0D4] mb-8">
          <div>
            <div className="flex items-center gap-2 text-[#B87333] text-xs font-mono font-semibold uppercase tracking-widest mb-1.5">
              <Heart className="w-4 h-4 fill-current text-red-500" />
              <span>SAVED ROTATION</span>
            </div>
            <h1 className="font-serif text-3xl sm:text-5xl font-bold text-[#1A1814] tracking-tight">
              My Wishlist <span className="font-sans text-2xl font-normal text-[#8C8275]">({wishlist.length})</span>
            </h1>
          </div>

          {wishlist.length > 0 && (
            <button
              onClick={clearWishlist}
              className="mt-4 sm:mt-0 font-sans text-xs text-[#8C8275] hover:text-red-600 flex items-center gap-1.5 transition-colors font-medium"
            >
              <Trash2 className="w-3.5 h-3.5" />
              <span>Clear Entire Wishlist</span>
            </button>
          )}
        </div>

        {/* Wishlist Items Grid or Empty State */}
        {wishlist.length === 0 ? (
          <div className="py-20 text-center bg-white border border-[#E8E0D4] rounded-3xl max-w-2xl mx-auto p-8 sm:p-12 shadow-sm">
            <div className="w-20 h-20 rounded-full bg-[#FAF7F2] border border-[#E8E0D4] flex items-center justify-center text-[#8C8275] mx-auto mb-6">
              <Heart className="w-10 h-10 stroke-[1.5]" />
            </div>
            <h2 className="font-serif text-2xl sm:text-3xl font-bold text-[#1A1814] mb-2">
              No Silhouettes Saved Yet
            </h2>
            <p className="text-[#8C8275] text-xs sm:text-sm max-w-md mx-auto mb-8 font-sans leading-relaxed">
              Explore our curated archive of Nike, Jordan, Adidas, ASICS, and New Balance silhouettes. Save your favorites to track stock and size availability.
            </p>
            <Link
              href="/sneakers"
              className="inline-flex items-center gap-2 px-8 py-4 bg-[#B87333] hover:bg-[#8B5A2B] text-white font-medium text-xs uppercase tracking-wider rounded-full transition-all shadow-md active:scale-95"
            >
              <span>EXPLORE SNEAKER ARCHIVE</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {wishlist.map((product) => (
              <div
                key={product.id}
                className="group relative flex flex-col bg-white border border-[#E8E0D4] hover:border-[#B87333]/50 rounded-3xl overflow-hidden transition-all duration-300 hover:shadow-xl hover:-translate-y-1 shadow-sm"
              >
                {/* Remove button */}
                <button
                  onClick={() => removeFromWishlist(product.id)}
                  className="absolute top-3.5 right-3.5 z-10 p-2.5 rounded-full bg-white/80 text-[#8C8275] hover:text-red-500 hover:bg-white border border-[#E8E0D4] backdrop-blur-sm transition-colors shadow-sm"
                  aria-label="Remove from wishlist"
                >
                  <Trash2 className="w-4 h-4" />
                </button>

                {/* Image */}
                <Link
                  href={`/product/${product.slug}`}
                  className="relative aspect-square w-full bg-[#FAF7F2] overflow-hidden block"
                >
                  <ImageWithFallback
                    src={product.images[0]}
                    alt={product.name}
                    fill
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                    className="object-cover object-center group-hover:scale-105 transition-transform duration-500"
                  />
                  {product.sale && (
                    <span className="absolute top-3.5 left-3.5 bg-[#B87333] text-white font-mono text-[10px] font-bold px-3 py-1 rounded-full uppercase shadow-sm">
                      SALE
                    </span>
                  )}
                </Link>

                {/* Details & Actions */}
                <div className="p-6 flex flex-col justify-between flex-1">
                  <div>
                    <span className="font-mono text-xs uppercase tracking-wider text-[#B87333] font-semibold block mb-1">
                      {product.brand} • {product.category}
                    </span>
                    <Link href={`/product/${product.slug}`}>
                      <h3 className="font-serif text-base font-bold text-[#1A1814] truncate hover:text-[#B87333] transition-colors">
                        {product.name}
                      </h3>
                    </Link>
                    <span className="font-mono text-lg font-bold text-[#1A1814] block mt-2">
                      ${product.price}
                    </span>
                  </div>

                  <div className="mt-6 pt-4 border-t border-[#F0EBE3] flex items-center gap-2">
                    <button
                      onClick={() => openQuickView(product)}
                      className="flex-1 py-3 px-4 bg-[#B87333] hover:bg-[#8B5A2B] text-white font-medium text-xs rounded-full flex items-center justify-center gap-1.5 transition-transform active:scale-95 shadow-sm"
                    >
                      <ShoppingBag className="w-3.5 h-3.5" />
                      <span>Select Size</span>
                    </button>
                    <Link
                      href={`/product/${product.slug}`}
                      className="p-3 rounded-full border border-[#E8E0D4] text-[#8C8275] hover:text-[#1A1814] hover:bg-[#FAF7F2] transition-colors"
                      title="Inspect"
                    >
                      <Sparkles className="w-4 h-4" />
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

      </div>
    </div>
  );
}
