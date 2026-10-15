'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Product } from '@/types';
import { useStore } from '@/store/useStore';
import { Heart, Eye, ShoppingBag, Sparkles, Flame } from 'lucide-react';
import { ImageWithFallback } from '@/components/ui/ImageWithFallback';

interface ProductCardProps {
  product: Product;
  priority?: boolean;
}

export function ProductCard({ product, priority = false }: ProductCardProps) {
  const { isInWishlist, toggleWishlist, openQuickView, addToCart } = useStore();
  const [isHovered, setIsHovered] = useState(false);
  const isWishlisted = isInWishlist(product.id);

  const hasSecondary = product.images.length > 1;
  const displayImage = isHovered && hasSecondary ? product.images[1] : product.images[0];

  const handleQuickAdd = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    // If multiple sizes, open Quick View so the user can select their size
    openQuickView(product);
  };

  const handleToggleWishlist = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    toggleWishlist(product);
  };

  return (
    <div
      className="group relative flex flex-col bg-[#121216] border border-[#22222a] hover:border-[#383844] rounded-2xl overflow-hidden transition-all duration-300 hover:shadow-xl hover:-translate-y-1"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Top Badges */}
      <div className="absolute top-3 left-3 z-10 flex flex-col gap-1.5 pointer-events-none">
        {product.sale && (
          <span className="inline-flex items-center gap-1 bg-[#d4ff00] text-black font-mono text-[10px] font-bold px-2.5 py-0.5 rounded shadow-sm uppercase tracking-wider">
            SALE
          </span>
        )}
        {product.trending && !product.sale && (
          <span className="inline-flex items-center gap-1 bg-white text-black font-mono text-[10px] font-bold px-2.5 py-0.5 rounded shadow-sm uppercase tracking-wider">
            <Flame className="w-3 h-3 text-red-500 fill-current" />
            TRENDING
          </span>
        )}
        {product.newArrival && (
          <span className="inline-flex items-center gap-1 bg-zinc-800/90 text-zinc-200 border border-zinc-700 font-mono text-[10px] font-semibold px-2 py-0.5 rounded backdrop-blur-sm uppercase tracking-wider">
            <Sparkles className="w-2.5 h-2.5 text-[#d4ff00]" />
            NEW DROP
          </span>
        )}
      </div>

      {/* Wishlist Button (Top Right) */}
      <button
        type="button"
        onClick={handleToggleWishlist}
        className={`absolute top-3 right-3 z-10 p-2.5 rounded-full transition-all duration-200 ${
          isWishlisted
            ? 'bg-red-500/20 text-red-400 border border-red-500/50 scale-110'
            : 'bg-black/40 text-zinc-400 hover:text-white border border-white/10 hover:bg-black/70 backdrop-blur-sm'
        }`}
        aria-label={isWishlisted ? 'Remove from wishlist' : 'Add to wishlist'}
      >
        <Heart
          className={`w-4 h-4 transition-transform ${
            isWishlisted ? 'fill-current scale-110 text-red-400' : 'hover:scale-110'
          }`}
        />
      </button>

      {/* Product Image Stage */}
      <Link
        href={`/product/${product.slug}`}
        className="relative aspect-square w-full bg-zinc-950 overflow-hidden block"
      >
        <ImageWithFallback
          src={displayImage}
          alt={product.name}
          fill
          priority={priority}
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
          className="object-cover object-center transition-all duration-500 ease-out group-hover:scale-105"
        />

        {/* Desktop Quick Actions Overlay (Slide in on hover) */}
        <div className="hidden lg:flex absolute inset-x-3 bottom-3 gap-2 opacity-0 group-hover:opacity-100 transition-all duration-200 transform translate-y-2 group-hover:translate-y-0">
          <button
            type="button"
            onClick={handleQuickAdd}
            className="flex-1 py-2.5 bg-[#d4ff00] hover:bg-[#e2ff40] text-black font-mono text-xs font-bold uppercase tracking-wider rounded-lg flex items-center justify-center gap-1.5 shadow-lg glow-lime-sm transition-transform active:scale-95"
          >
            <ShoppingBag className="w-3.5 h-3.5" />
            <span>Quick Select</span>
          </button>
          <button
            type="button"
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              openQuickView(product);
            }}
            className="p-2.5 bg-zinc-900/90 hover:bg-zinc-800 text-white border border-zinc-700/80 rounded-lg backdrop-blur-sm transition-colors"
            title="Inspect Sneaker"
            aria-label="Quick inspect"
          >
            <Eye className="w-4 h-4" />
          </button>
        </div>
      </Link>

      {/* Product Information */}
      <div className="p-4 sm:p-5 flex flex-col flex-1 justify-between">
        <div>
          <div className="flex items-center justify-between text-[11px] font-mono text-zinc-400 mb-1">
            <span className="text-[#d4ff00] uppercase tracking-wider font-bold">
              {product.brand}
            </span>
            <span className="text-zinc-500">{product.category}</span>
          </div>

          <Link href={`/product/${product.slug}`} className="block group-hover:underline">
            <h3 className="font-display text-base font-bold text-white uppercase tracking-tight line-clamp-1">
              {product.name}
            </h3>
          </Link>

          {/* Colorway details */}
          <div className="flex items-center justify-between mt-2 text-xs font-mono">
            <div className="flex items-center gap-1.5">
              {product.availableColors.slice(0, 3).map((col) => (
                <span
                  key={col.name}
                  className="w-2.5 h-2.5 rounded-full border border-zinc-700 inline-block"
                  style={{ backgroundColor: col.hex }}
                  title={col.name}
                />
              ))}
              {product.availableColors.length > 3 && (
                <span className="text-[10px] text-zinc-500">
                  +{product.availableColors.length - 3}
                </span>
              )}
            </div>
            <span className="text-[10px] text-zinc-500">
              {product.availableSizes.length} sizes
            </span>
          </div>
        </div>

        {/* Price & Mobile Actions */}
        <div className="mt-4 pt-3 border-t border-zinc-800/80 flex items-center justify-between">
          <div className="flex items-baseline gap-2">
            <span className="font-mono text-lg font-bold text-white">
              ${product.price}
            </span>
            {product.originalPrice && (
              <span className="font-mono text-xs text-zinc-500 line-through">
                ${product.originalPrice}
              </span>
            )}
          </div>

          {/* Mobile Quick Select Button */}
          <button
            type="button"
            onClick={handleQuickAdd}
            className="lg:hidden p-2 bg-[#d4ff00] text-black rounded-lg text-xs font-mono font-bold flex items-center gap-1"
            aria-label="Select size"
          >
            <ShoppingBag className="w-3.5 h-3.5" />
            <span>Select</span>
          </button>
        </div>
      </div>
    </div>
  );
}
