'use client';

import React, { useState } from 'react';
import { useStore } from '@/store/useStore';
import { X, Heart, ShoppingBag, ArrowUpRight, Check, AlertCircle } from 'lucide-react';
import Link from 'next/link';
import { ImageWithFallback } from './ImageWithFallback';

export function QuickViewModal() {
  const {
    quickViewProduct,
    closeQuickView,
    addToCart,
    openCart,
    toggleWishlist,
    isInWishlist,
    openSizeGuide,
  } = useStore();

  const [selectedSize, setSelectedSize] = useState<number | null>(null);
  const [selectedColorIndex, setSelectedColorIndex] = useState(0);
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [errorMsg, setErrorMsg] = useState('');

  if (!quickViewProduct) return null;

  const product = quickViewProduct;
  const isWishlisted = isInWishlist(product.id);
  const selectedColor = product.availableColors[selectedColorIndex] || {
    name: 'Standard',
  };

  const handleAddToCart = () => {
    if (!selectedSize) {
      setErrorMsg('Please choose your size first');
      return;
    }
    setErrorMsg('');
    const res = addToCart(
      product,
      selectedSize,
      selectedColor.name,
      quantity
    );
    if (res.success) {
      closeQuickView();
      openCart();
    } else {
      setErrorMsg(res.message);
    }
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="quickview-title"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-in fade-in duration-200"
      onClick={closeQuickView}
    >
      <div
        className="relative w-full max-w-4xl bg-[#111116] border border-zinc-800 rounded-2xl shadow-2xl overflow-hidden grid grid-cols-1 md:grid-cols-2 max-h-[90vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={closeQuickView}
          className="absolute top-4 right-4 z-20 p-2 rounded-full bg-zinc-900/80 text-zinc-400 hover:text-white border border-zinc-700/60 backdrop-blur-sm transition-colors"
          aria-label="Close modal"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Product Imagery */}
        <div className="relative bg-zinc-950 flex flex-col justify-between p-6 border-b md:border-b-0 md:border-r border-zinc-800">
          <div className="relative aspect-square w-full rounded-xl overflow-hidden bg-zinc-900 border border-zinc-800/80">
            <ImageWithFallback
              src={product.images[selectedImageIndex] || product.images[0]}
              alt={product.name}
              fill
              sizes="(max-width: 768px) 100vw, 500px"
              className="object-cover object-center transition-all duration-300"
            />
            {product.sale && (
              <span className="absolute top-3 left-3 bg-[#d4ff00] text-black font-mono text-[10px] font-bold px-2.5 py-1 uppercase tracking-wider rounded">
                SALE
              </span>
            )}
            {product.newArrival && (
              <span className="absolute top-3 left-3 bg-white text-black font-mono text-[10px] font-bold px-2.5 py-1 uppercase tracking-wider rounded">
                NEW DROP
              </span>
            )}
          </div>

          {/* Alternate Angles */}
          {product.images.length > 1 && (
            <div className="flex gap-2.5 mt-4">
              {product.images.map((img, idx) => (
                <button
                  key={idx}
                  onClick={() => setSelectedImageIndex(idx)}
                  className={`relative w-16 h-16 rounded-lg overflow-hidden border transition-all ${
                    selectedImageIndex === idx
                      ? 'border-[#d4ff00] ring-1 ring-[#d4ff00]'
                      : 'border-zinc-800 opacity-60 hover:opacity-100'
                  }`}
                >
                  <ImageWithFallback
                    src={img}
                    alt={`${product.name} view ${idx + 1}`}
                    fill
                    sizes="64px"
                    className="object-cover"
                  />
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Product Details & Selection */}
        <div className="p-6 md:p-8 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-2">
              <span className="font-mono text-xs uppercase tracking-widest text-[#d4ff00]">
                {product.brand}
              </span>
              <span className="font-mono text-[11px] text-zinc-500">
                SKU: {product.sku}
              </span>
            </div>

            <h2 id="quickview-title" className="font-display text-2xl font-black uppercase text-white leading-tight">
              {product.name}
            </h2>

            <div className="flex items-baseline gap-3 my-3">
              <span className="font-mono text-2xl font-bold text-white">
                ${product.price}
              </span>
              {product.originalPrice && (
                <span className="font-mono text-sm text-zinc-500 line-through">
                  ${product.originalPrice}
                </span>
              )}
            </div>

            <p className="text-zinc-400 text-xs leading-relaxed line-clamp-3 mb-6">
              {product.description}
            </p>

            {/* Color selector */}
            {product.availableColors.length > 0 && (
              <div className="mb-5">
                <label className="block font-mono text-xs text-zinc-400 uppercase tracking-wider mb-2">
                  Colorway: <span className="text-white font-sans">{selectedColor.name}</span>
                </label>
                <div className="flex gap-2">
                  {product.availableColors.map((col, idx) => (
                    <button
                      key={col.name}
                      onClick={() => setSelectedColorIndex(idx)}
                      className={`w-7 h-7 rounded-full border-2 transition-all ${
                        selectedColorIndex === idx
                          ? 'border-[#d4ff00] scale-110 shadow-lg shadow-[#d4ff00]/20'
                          : 'border-transparent hover:scale-105'
                      }`}
                      style={{ backgroundColor: col.hex }}
                      title={col.name}
                      aria-label={`Select color ${col.name}`}
                    />
                  ))}
                </div>
              </div>
            )}

            {/* Size selector */}
            <div className="mb-6">
              <div className="flex items-center justify-between mb-2">
                <label className="font-mono text-xs text-zinc-400 uppercase tracking-wider">
                  Select Size (US Men)
                </label>
                <button
                  type="button"
                  onClick={openSizeGuide}
                  className="font-mono text-[11px] text-[#d4ff00] hover:underline"
                >
                  Size Guide
                </button>
              </div>

              <div className="grid grid-cols-4 gap-2">
                {product.availableSizes.map((size) => {
                  const isOutOfStock = product.sizesOutOfStock.includes(size);
                  const isSelected = selectedSize === size;

                  return (
                    <button
                      key={size}
                      type="button"
                      disabled={isOutOfStock}
                      onClick={() => {
                        setSelectedSize(size);
                        setErrorMsg('');
                      }}
                      className={`py-2 text-xs font-mono rounded border transition-all ${
                        isOutOfStock
                          ? 'border-zinc-800 text-zinc-600 line-through cursor-not-allowed bg-zinc-900/40'
                          : isSelected
                          ? 'border-[#d4ff00] bg-[#d4ff00] text-black font-bold shadow-md shadow-[#d4ff00]/20'
                          : 'border-zinc-800 hover:border-zinc-500 text-zinc-300 bg-zinc-900/60'
                      }`}
                    >
                      {size}
                    </button>
                  );
                })}
              </div>

              {errorMsg && (
                <div className="flex items-center gap-1.5 mt-2.5 text-xs text-red-400">
                  <AlertCircle className="w-3.5 h-3.5 flex-shrink-0" />
                  <span>{errorMsg}</span>
                </div>
              )}
            </div>
          </div>

          <div>
            <div className="flex items-center gap-3">
              {/* Add to Bag */}
              <button
                type="button"
                onClick={handleAddToCart}
                className="flex-1 py-3.5 px-6 bg-[#d4ff00] hover:bg-[#e2ff40] text-black font-mono font-bold text-xs uppercase tracking-wider rounded-lg flex items-center justify-center gap-2 transition-transform active:scale-[0.98] glow-lime-sm"
              >
                <ShoppingBag className="w-4 h-4" />
                Add to Vault Bag
              </button>

              {/* Wishlist Toggle */}
              <button
                type="button"
                onClick={() => toggleWishlist(product)}
                className={`p-3.5 rounded-lg border transition-all ${
                  isWishlisted
                    ? 'border-red-500 bg-red-500/10 text-red-400'
                    : 'border-zinc-800 hover:border-zinc-600 text-zinc-400 hover:text-white bg-zinc-900/60'
                }`}
                aria-label="Save to wishlist"
              >
                <Heart className={`w-4 h-4 ${isWishlisted ? 'fill-current' : ''}`} />
              </button>
            </div>

            <div className="mt-4 pt-4 border-t border-zinc-800/80 flex items-center justify-between text-xs">
              <span className="text-zinc-500 font-mono">
                {product.stockQuantity} pairs remaining in vault
              </span>
              <Link
                href={`/product/${product.slug}`}
                onClick={closeQuickView}
                className="inline-flex items-center gap-1 font-mono text-[#d4ff00] hover:underline"
              >
                View Full Dossier
                <ArrowUpRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
