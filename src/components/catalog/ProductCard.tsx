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
      className="group relative flex flex-col bg-white border border-[#E8E0D4] hover:border-[#C4B8A8] rounded-2xl overflow-hidden transition-all duration-400 hover-lift"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Top Badges */}
      <div className="absolute top-3 left-3 z-10 flex flex-col gap-1.5 pointer-events-none">
        {product.sale && (
          <span className="inline-flex items-center gap-1 bg-[#1A1814] text-white font-mono-tag text-[10px] font-bold px-2.5 py-0.5 rounded-full shadow-sm uppercase tracking-wider">
            SALE
          </span>
        )}
        {product.trending && !product.sale && (
          <span className="inline-flex items-center gap-1 bg-white text-[#1A1814] font-mono-tag text-[10px] font-bold px-2.5 py-0.5 rounded-full shadow-sm uppercase tracking-wider border border-[#E8E0D4]">
            <Flame className="w-3 h-3 text-[#D4955A] fill-current" />
            TRENDING
          </span>
        )}
        {product.newArrival && (
          <span className="inline-flex items-center gap-1 bg-[#F0EBE3] text-[#3D3225] border border-[#E8E0D4] font-mono-tag text-[10px] font-semibold px-2.5 py-0.5 rounded-full backdrop-blur-sm uppercase tracking-wider">
            <Sparkles className="w-2.5 h-2.5 text-[#B87333]" />
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
            ? 'bg-red-50 text-red-400 border border-red-200 scale-110'
            : 'bg-white/80 text-[#8C8275] hover:text-[#1A1814] border border-[#E8E0D4] hover:bg-white backdrop-blur-sm'
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
        className="relative aspect-square w-full bg-[#F0EBE3] overflow-hidden block"
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
            className="flex-1 py-2.5 bg-[#1A1814] hover:bg-[#B87333] text-white font-mono-tag text-xs font-bold uppercase tracking-wider rounded-full flex items-center justify-center gap-1.5 shadow-lg transition-all duration-300 active:scale-95"
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
            className="p-2.5 bg-white/90 hover:bg-white text-[#1A1814] border border-[#E8E0D4] rounded-full backdrop-blur-sm transition-colors shadow-lg"
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
          <div className="flex items-center justify-between text-[11px] font-mono-tag text-[#8C8275] mb-1">
            <span className="text-[#B87333] uppercase tracking-wider font-bold">
              {product.brand}
            </span>
            <span className="text-[#C4B8A8]">{product.category}</span>
          </div>

          <Link href={`/product/${product.slug}`} className="block">
            <h3 className="font-display text-base font-bold text-[#1A1814] uppercase tracking-tight line-clamp-1 group-hover:text-[#B87333] transition-colors">
              {product.name}
            </h3>
          </Link>

          {/* Colorway details */}
          <div className="flex items-center justify-between mt-2 text-xs font-mono-tag">
            <div className="flex items-center gap-1.5">
              {product.availableColors.slice(0, 3).map((col) => (
                <span
                  key={col.name}
                  className="w-3 h-3 rounded-full border border-[#E8E0D4] inline-block shadow-sm"
                  style={{ backgroundColor: col.hex }}
                  title={col.name}
                />
              ))}
              {product.availableColors.length > 3 && (
                <span className="text-[10px] text-[#8C8275]">
                  +{product.availableColors.length - 3}
                </span>
              )}
            </div>
            <span className="text-[10px] text-[#C4B8A8]">
              {product.availableSizes.length} sizes
            </span>
          </div>
        </div>

        {/* Price & Mobile Actions */}
        <div className="mt-4 pt-3 border-t border-[#E8E0D4] flex items-center justify-between">
          <div className="flex items-baseline gap-2">
            <span className="font-mono-tag text-lg font-bold text-[#1A1814]">
              ${product.price}
            </span>
            {product.originalPrice && (
              <span className="font-mono-tag text-xs text-[#C4B8A8] line-through">
                ${product.originalPrice}
              </span>
            )}
          </div>

          {/* Mobile Quick Select Button */}
          <button
            type="button"
            onClick={handleQuickAdd}
            className="lg:hidden p-2 bg-[#1A1814] text-white rounded-full text-xs font-mono-tag font-bold flex items-center gap-1"
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
