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
      <div className="min-h-[70vh] bg-[#08080a] flex items-center justify-center">
        <div className="font-mono text-xs uppercase tracking-widest text-[#d4ff00] animate-pulse">
          INITIALIZING VAULT WISHLIST...
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#08080a] text-zinc-100 py-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between pb-6 border-b border-zinc-800 mb-8">
          <div>
            <div className="flex items-center gap-2 text-[#d4ff00] text-xs font-mono font-bold uppercase tracking-widest mb-1.5">
              <Heart className="w-4 h-4 fill-current text-red-500" />
              <span>SAVED ROTATION</span>
            </div>
            <h1 className="font-display text-3xl sm:text-5xl font-black uppercase tracking-tight text-white">
              My Wishlist ({wishlist.length})
            </h1>
          </div>

          {wishlist.length > 0 && (
            <button
              onClick={clearWishlist}
              className="mt-4 sm:mt-0 font-mono text-xs text-zinc-400 hover:text-red-400 flex items-center gap-1.5 transition-colors"
            >
              <Trash2 className="w-3.5 h-3.5" />
              <span>Clear Entire Wishlist</span>
            </button>
          )}
        </div>

        {/* Wishlist Items Grid or Empty State */}
        {wishlist.length === 0 ? (
          <div className="py-20 text-center bg-[#0d0d12] border border-zinc-800 rounded-3xl max-w-2xl mx-auto p-8 shadow-xl">
            <div className="w-20 h-20 rounded-full bg-zinc-900 border border-zinc-800 flex items-center justify-center text-zinc-600 mx-auto mb-6">
              <Heart className="w-10 h-10 stroke-[1.5]" />
            </div>
            <h2 className="font-display text-2xl sm:text-3xl font-black uppercase text-white mb-2">
              No Silhouettes Saved Yet
            </h2>
            <p className="text-zinc-400 text-xs sm:text-sm max-w-md mx-auto mb-8 font-sans leading-relaxed">
              Explore our curated archive of Nike, Jordan, Adidas, ASICS, and New Balance silhouettes. Save your favorites to track stock and size availability.
            </p>
            <Link
              href="/sneakers"
              className="inline-flex items-center gap-2 px-8 py-4 bg-[#d4ff00] hover:bg-[#e2ff40] text-black font-mono text-xs font-bold uppercase tracking-widest rounded-xl transition-all shadow-lg glow-lime-sm active:scale-95"
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
                className="group relative flex flex-col bg-[#121217] border border-zinc-800 hover:border-zinc-700 rounded-2xl overflow-hidden transition-all duration-300 hover:shadow-xl hover:-translate-y-1"
              >
                {/* Remove button */}
                <button
                  onClick={() => removeFromWishlist(product.id)}
                  className="absolute top-3 right-3 z-10 p-2 rounded-full bg-black/60 text-zinc-400 hover:text-red-400 hover:bg-black/90 border border-zinc-800 backdrop-blur-sm transition-colors"
                  aria-label="Remove from wishlist"
                >
                  <Trash2 className="w-4 h-4" />
                </button>

                {/* Image */}
                <Link
                  href={`/product/${product.slug}`}
                  className="relative aspect-square w-full bg-zinc-950 overflow-hidden block"
                >
                  <ImageWithFallback
                    src={product.images[0]}
                    alt={product.name}
                    fill
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                    className="object-cover object-center group-hover:scale-105 transition-transform duration-500"
                  />
                  {product.sale && (
                    <span className="absolute top-3 left-3 bg-[#d4ff00] text-black font-mono text-[10px] font-bold px-2 py-0.5 rounded uppercase">
                      SALE
                    </span>
                  )}
                </Link>

                {/* Details & Actions */}
                <div className="p-5 flex flex-col justify-between flex-1">
                  <div>
                    <span className="font-mono text-xs uppercase tracking-wider text-[#d4ff00] font-bold block mb-1">
                      {product.brand} • {product.category}
                    </span>
                    <Link href={`/product/${product.slug}`}>
                      <h3 className="font-display text-base font-bold text-white uppercase truncate hover:text-[#d4ff00] transition-colors">
                        {product.name}
                      </h3>
                    </Link>
                    <span className="font-mono text-lg font-bold text-white block mt-2">
                      ${product.price}
                    </span>
                  </div>

                  <div className="mt-5 pt-3 border-t border-zinc-800 flex items-center gap-2">
                    <button
                      onClick={() => openQuickView(product)}
                      className="flex-1 py-2.5 px-3 bg-[#d4ff00] hover:bg-[#e2ff40] text-black font-mono text-xs font-bold uppercase tracking-wider rounded-lg flex items-center justify-center gap-1.5 transition-transform active:scale-95"
                    >
                      <ShoppingBag className="w-3.5 h-3.5" />
                      <span>Select Size</span>
                    </button>
                    <Link
                      href={`/product/${product.slug}`}
                      className="p-2.5 rounded-lg border border-zinc-800 text-zinc-400 hover:text-white hover:bg-zinc-800 transition-colors"
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
