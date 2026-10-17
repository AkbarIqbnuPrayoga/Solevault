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
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#1A1814]/70 backdrop-blur-md animate-in fade-in duration-200"
      onClick={closeQuickView}
    >
      <div
        className="relative w-full max-w-4xl bg-[#FFFDF8] border border-[#E8E0D4] rounded-3xl shadow-2xl overflow-hidden grid grid-cols-1 md:grid-cols-2 max-h-[90vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={closeQuickView}
          className="absolute top-4 right-4 z-20 p-2.5 rounded-full bg-white/80 text-[#8C8275] hover:text-[#1A1814] border border-[#E8E0D4] backdrop-blur-sm transition-colors shadow-sm"
          aria-label="Close modal"
        >
          <X className="w-4 h-4" />
        </button>

        {/* Product Imagery */}
        <div className="relative bg-[#FAF7F2] flex flex-col justify-between p-6 md:p-8 border-b md:border-b-0 md:border-r border-[#E8E0D4]">
          <div className="relative aspect-square w-full rounded-2xl overflow-hidden bg-white border border-[#E8E0D4] shadow-sm">
            <ImageWithFallback
              src={product.images[selectedImageIndex] || product.images[0]}
              alt={product.name}
              fill
              sizes="(max-width: 768px) 100vw, 500px"
              className="object-cover object-center transition-all duration-300"
            />
            {product.sale && (
              <span className="absolute top-3 left-3 bg-[#B87333] text-white font-mono text-[10px] font-bold px-3 py-1 uppercase tracking-wider rounded-full shadow-sm">
                SALE ARCHIVE
              </span>
            )}
            {product.newArrival && (
              <span className="absolute top-3 left-3 bg-[#1A1814] text-white font-mono text-[10px] font-bold px-3 py-1 uppercase tracking-wider rounded-full shadow-sm">
                NEW ARRIVAL
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
                  className={`relative w-16 h-16 rounded-xl overflow-hidden border transition-all ${
                    selectedImageIndex === idx
                      ? 'border-[#B87333] ring-2 ring-[#B87333]/30 scale-105'
                      : 'border-[#E8E0D4] opacity-70 hover:opacity-100 bg-white'
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
              <span className="font-mono text-xs uppercase tracking-widest text-[#B87333] font-semibold">
                {product.brand}
              </span>
              <span className="font-mono text-[11px] text-[#8C8275]">
                SKU: {product.sku}
              </span>
            </div>

            <h2 id="quickview-title" className="font-serif text-2xl sm:text-3xl font-bold text-[#1A1814] leading-tight">
              {product.name}
            </h2>

            <div className="flex items-baseline gap-3 my-3">
              <span className="font-mono text-2xl font-bold text-[#1A1814]">
                ${product.price}
              </span>
              {product.originalPrice && (
                <span className="font-mono text-sm text-[#8C8275] line-through">
                  ${product.originalPrice}
                </span>
              )}
            </div>

            <p className="text-[#8C8275] text-xs leading-relaxed line-clamp-3 mb-6">
              {product.description}
            </p>

            {/* Color selector */}
            {product.availableColors.length > 0 && (
              <div className="mb-5">
                <label className="block font-mono text-xs text-[#8C8275] uppercase tracking-wider mb-2">
                  Colorway: <span className="text-[#1A1814] font-medium font-sans">{selectedColor.name}</span>
                </label>
                <div className="flex gap-2">
                  {product.availableColors.map((col, idx) => (
                    <button
                      key={col.name}
                      onClick={() => setSelectedColorIndex(idx)}
                      className={`w-7 h-7 rounded-full border-2 transition-all ${
                        selectedColorIndex === idx
                          ? 'border-[#B87333] scale-110 shadow-md ring-2 ring-[#B87333]/20'
                          : 'border-[#E8E0D4] hover:scale-105'
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
                <label className="font-mono text-xs text-[#8C8275] uppercase tracking-wider">
                  Select Size (US Men)
                </label>
                <button
                  type="button"
                  onClick={openSizeGuide}
                  className="font-mono text-[11px] text-[#B87333] hover:underline font-medium"
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
                      className={`py-2 text-xs font-mono rounded-lg border transition-all ${
                        isOutOfStock
                          ? 'border-[#E8E0D4] text-[#8C8275]/40 line-through cursor-not-allowed bg-[#FAF7F2]'
                          : isSelected
                          ? 'border-[#B87333] bg-[#B87333] text-white font-bold shadow-sm'
                          : 'border-[#E8E0D4] hover:border-[#B87333] text-[#1A1814] bg-[#FAF7F2] hover:bg-white'
                      }`}
                    >
                      {size}
                    </button>
                  );
                })}
              </div>

              {errorMsg && (
                <div className="flex items-center gap-1.5 mt-2.5 text-xs text-red-600">
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
                className="flex-1 py-3.5 px-6 bg-[#B87333] hover:bg-[#8B5A2B] text-white font-medium text-xs rounded-full flex items-center justify-center gap-2 transition-all shadow-md hover:scale-[1.01] active:scale-[0.98]"
              >
                <ShoppingBag className="w-4 h-4" />
                Add to Vault Bag
              </button>

              {/* Wishlist Toggle */}
              <button
                type="button"
                onClick={() => toggleWishlist(product)}
                className={`p-3.5 rounded-full border transition-all ${
                  isWishlisted
                    ? 'border-red-400 bg-red-50 text-red-500'
                    : 'border-[#E8E0D4] hover:border-[#B87333] text-[#8C8275] hover:text-[#1A1814] bg-[#FAF7F2]'
                }`}
                aria-label="Save to wishlist"
              >
                <Heart className={`w-4 h-4 ${isWishlisted ? 'fill-current' : ''}`} />
              </button>
            </div>

            <div className="mt-4 pt-4 border-t border-[#F0EBE3] flex items-center justify-between text-xs">
              <span className="text-[#8C8275] font-mono text-[11px]">
                {product.stockQuantity} pairs remaining in vault
              </span>
              <Link
                href={`/product/${product.slug}`}
                onClick={closeQuickView}
                className="inline-flex items-center gap-1 font-mono text-xs text-[#B87333] hover:underline font-semibold"
              >
                Full Dossier
                <ArrowUpRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
