'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { Product } from '@/types';
import { useStore } from '@/store/useStore';
import {
  Heart,
  ShoppingBag,
  Ruler,
  ShieldCheck,
  Truck,
  RotateCcw,
  Sparkles,
  ChevronDown,
  CheckCircle2,
  AlertCircle,
  Plus,
  Minus,
  Layers,
  ArrowRight,
  Flame,
} from 'lucide-react';
import { ImageWithFallback } from '@/components/ui/ImageWithFallback';
import { ProductCard } from '@/components/catalog/ProductCard';

interface ProductDetailViewProps {
  product: Product;
  relatedProducts: Product[];
}

export function ProductDetailView({
  product,
  relatedProducts,
}: ProductDetailViewProps) {
  const {
    addToCart,
    openCart,
    isInWishlist,
    toggleWishlist,
    openSizeGuide,
    recentlyViewed,
    addRecentlyViewed,
  } = useStore();

  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [selectedSize, setSelectedSize] = useState<number | null>(null);
  const [selectedColorIndex, setSelectedColorIndex] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [errorMsg, setErrorMsg] = useState('');
  const [activeAccordion, setActiveAccordion] = useState<string | null>('specs');

  // Track recently viewed
  useEffect(() => {
    addRecentlyViewed(product);
  }, [product, addRecentlyViewed]);

  const isWishlisted = isInWishlist(product.id);
  const selectedColor = product.availableColors[selectedColorIndex] || {
    name: 'Standard',
  };

  const handleAddToCart = () => {
    if (!selectedSize) {
      setErrorMsg('Please select your footwear size before adding to bag.');
      return;
    }
    setErrorMsg('');
    const res = addToCart(product, selectedSize, selectedColor.name, quantity);
    if (res.success) {
      openCart();
    } else {
      setErrorMsg(res.message);
    }
  };

  const toggleAccordion = (section: string) => {
    setActiveAccordion(activeAccordion === section ? null : section);
  };

  return (
    <div className="min-h-screen bg-[#08080a] text-zinc-100 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Breadcrumb Navigation */}
        <nav aria-label="Breadcrumb" className="flex items-center gap-2 text-xs font-mono text-zinc-500 mb-8">
          <Link href="/" className="hover:text-white transition-colors">
            HOME
          </Link>
          <span>/</span>
          <Link href="/sneakers" className="hover:text-white transition-colors">
            SNEAKERS
          </Link>
          <span>/</span>
          <Link
            href={`/sneakers?brand=${encodeURIComponent(product.brand)}`}
            className="hover:text-white transition-colors text-[#d4ff00]"
          >
            {product.brand.toUpperCase()}
          </Link>
          <span>/</span>
          <span className="text-zinc-300 truncate max-w-xs">{product.name}</span>
        </nav>

        {/* Main Product Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          
          {/* Left: Gallery (Thumbnails + Main Image View) */}
          <div className="lg:col-span-7 space-y-4">
            {/* Main Stage */}
            <div className="relative aspect-square w-full rounded-3xl overflow-hidden bg-gradient-to-b from-[#131318] to-zinc-950 border border-zinc-800 p-6 flex items-center justify-center shadow-2xl">
              
              {/* Badges */}
              <div className="absolute top-6 left-6 z-10 flex flex-col gap-2">
                {product.sale && (
                  <span className="bg-[#d4ff00] text-black font-mono text-xs font-bold px-3 py-1 uppercase tracking-wider rounded shadow">
                    VAULT SALE
                  </span>
                )}
                {product.newArrival && (
                  <span className="bg-white text-black font-mono text-xs font-bold px-3 py-1 uppercase tracking-wider rounded shadow">
                    NEW DROP
                  </span>
                )}
                {product.featured && (
                  <span className="bg-zinc-800/80 text-[#d4ff00] border border-[#d4ff00]/40 font-mono text-xs font-bold px-3 py-1 uppercase tracking-wider rounded backdrop-blur-sm">
                    VAULT ICON
                  </span>
                )}
              </div>

              {/* SKU tag */}
              <div className="absolute top-6 right-6 z-10 font-mono text-xs text-zinc-500 uppercase tracking-widest">
                SKU // {product.sku}
              </div>

              {/* Focal Image */}
              <div className="relative w-full h-full">
                <ImageWithFallback
                  src={product.images[selectedImageIndex] || product.images[0]}
                  alt={`${product.name} - Angle ${selectedImageIndex + 1}`}
                  fill
                  priority
                  sizes="(max-width: 1024px) 100vw, 60vw"
                  className="object-contain p-4 drop-shadow-[0_20px_35px_rgba(0,0,0,0.85)] transition-all duration-300"
                />
              </div>
            </div>

            {/* Thumbnail Strip */}
            {product.images.length > 1 && (
              <div className="flex gap-3 overflow-x-auto pb-2">
                {product.images.map((img, idx) => (
                  <button
                    key={idx}
                    onClick={() => setSelectedImageIndex(idx)}
                    className={`relative w-24 h-24 rounded-2xl overflow-hidden bg-zinc-900 border transition-all flex-shrink-0 ${
                      selectedImageIndex === idx
                        ? 'border-[#d4ff00] ring-2 ring-[#d4ff00]/50'
                        : 'border-zinc-800 opacity-60 hover:opacity-100'
                    }`}
                  >
                    <ImageWithFallback
                      src={img}
                      alt={`${product.name} angle ${idx + 1}`}
                      fill
                      sizes="96px"
                      className="object-cover"
                    />
                  </button>
                ))}
              </div>
            )}

            {/* Heritage Story Callout */}
            <div className="p-6 rounded-2xl bg-zinc-900/40 border border-zinc-800/80 mt-6">
              <span className="font-mono text-xs uppercase tracking-widest text-[#d4ff00] font-bold block mb-1">
                ARCHIVAL HERITAGE
              </span>
              <p className="text-xs text-zinc-300 leading-relaxed font-sans">
                {product.story}
              </p>
            </div>
          </div>

          {/* Right: Purchasing Controls & Information */}
          <div className="lg:col-span-5 flex flex-col justify-between">
            <div>
              {/* Brand & Category */}
              <div className="flex items-center justify-between text-xs font-mono mb-2">
                <Link
                  href={`/sneakers?brand=${encodeURIComponent(product.brand)}`}
                  className="text-[#d4ff00] font-bold uppercase tracking-widest hover:underline"
                >
                  {product.brand}
                </Link>
                <span className="text-zinc-500">{product.gender}&apos;s • {product.category}</span>
              </div>

              {/* Title */}
              <h1 className="font-display text-3xl sm:text-4xl font-black uppercase text-white tracking-tight leading-tight">
                {product.name}
              </h1>

              {/* Pricing */}
              <div className="flex items-baseline gap-4 my-4">
                <span className="font-mono text-3xl font-bold text-white">
                  ${product.price}
                </span>
                {product.originalPrice && (
                  <div className="flex items-center gap-2">
                    <span className="font-mono text-base text-zinc-500 line-through">
                      ${product.originalPrice}
                    </span>
                    <span className="font-mono text-xs font-bold text-red-400 bg-red-950/40 px-2 py-0.5 rounded border border-red-800/50">
                      SAVE ${(product.originalPrice - product.price).toFixed(0)}
                    </span>
                  </div>
                )}
              </div>

              {/* Stock Status Indicator */}
              <div className="flex items-center gap-2 mb-6 text-xs font-mono">
                {product.stockQuantity < 10 ? (
                  <span className="text-amber-400 flex items-center gap-1.5 font-bold">
                    <Flame className="w-3.5 h-3.5 fill-current" />
                    Low Stock: Only {product.stockQuantity} pairs remain in vault
                  </span>
                ) : (
                  <span className="text-emerald-400 flex items-center gap-1.5">
                    <CheckCircle2 className="w-3.5 h-3.5" />
                    Verified In Stock ({product.stockQuantity} pairs ready to ship)
                  </span>
                )}
              </div>

              {/* Description */}
              <p className="text-zinc-300 text-xs sm:text-sm leading-relaxed mb-6 font-sans">
                {product.description}
              </p>

              {/* Colorway Selector */}
              {product.availableColors.length > 0 && (
                <div className="mb-6">
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-mono text-xs text-zinc-400 uppercase tracking-wider">
                      Colorway
                    </span>
                    <span className="font-mono text-xs text-white">
                      {selectedColor.name}
                    </span>
                  </div>
                  <div className="flex gap-2.5">
                    {product.availableColors.map((color, idx) => (
                      <button
                        key={color.name}
                        onClick={() => setSelectedColorIndex(idx)}
                        className={`w-8 h-8 rounded-full border-2 transition-transform ${
                          selectedColorIndex === idx
                            ? 'border-[#d4ff00] scale-110 shadow-lg shadow-[#d4ff00]/30'
                            : 'border-zinc-700 hover:scale-105'
                        }`}
                        style={{ backgroundColor: color.hex }}
                        title={color.name}
                        aria-label={`Select colorway ${color.name}`}
                      />
                    ))}
                  </div>
                </div>
              )}

              {/* Shoe Size Selector */}
              <div className="mb-6">
                <div className="flex items-center justify-between mb-2.5">
                  <span className="font-mono text-xs text-zinc-400 uppercase tracking-wider">
                    Select Size (US Men)
                  </span>
                  <button
                    type="button"
                    onClick={openSizeGuide}
                    className="font-mono text-xs text-[#d4ff00] hover:underline flex items-center gap-1"
                  >
                    <Ruler className="w-3.5 h-3.5" />
                    <span>Size & Fit Guide</span>
                  </button>
                </div>

                <div className="grid grid-cols-4 sm:grid-cols-6 gap-2">
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
                        className={`py-3 text-xs font-mono rounded-xl border transition-all ${
                          isOutOfStock
                            ? 'border-zinc-800/80 bg-zinc-900/30 text-zinc-600 line-through cursor-not-allowed'
                            : isSelected
                            ? 'border-[#d4ff00] bg-[#d4ff00] text-black font-bold shadow-lg shadow-[#d4ff00]/20'
                            : 'border-zinc-800 bg-zinc-900/60 text-zinc-200 hover:border-zinc-500'
                        }`}
                      >
                        US {size}
                      </button>
                    );
                  })}
                </div>

                {errorMsg && (
                  <div className="flex items-center gap-2 mt-3 text-xs text-red-400 font-mono">
                    <AlertCircle className="w-4 h-4 flex-shrink-0" />
                    <span>{errorMsg}</span>
                  </div>
                )}
              </div>

              {/* Quantity Picker */}
              <div className="flex items-center gap-4 mb-6">
                <span className="font-mono text-xs text-zinc-400 uppercase tracking-wider">
                  Quantity
                </span>
                <div className="flex items-center border border-zinc-800 rounded-xl bg-zinc-900/80 p-1">
                  <button
                    type="button"
                    onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                    className="p-1.5 hover:text-[#d4ff00] text-zinc-400 transition-colors"
                    aria-label="Decrease quantity"
                  >
                    <Minus className="w-3.5 h-3.5" />
                  </button>
                  <span className="px-4 font-mono text-xs font-bold text-white">
                    {quantity}
                  </span>
                  <button
                    type="button"
                    onClick={() => setQuantity((q) => Math.min(product.stockQuantity, q + 1))}
                    className="p-1.5 hover:text-[#d4ff00] text-zinc-400 transition-colors"
                    aria-label="Increase quantity"
                  >
                    <Plus className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>

              {/* Action Buttons: Add to Bag + Wishlist */}
              <div className="flex items-center gap-3 mb-8">
                <button
                  type="button"
                  onClick={handleAddToCart}
                  className="flex-1 py-4 px-6 bg-[#d4ff00] hover:bg-[#e2ff40] text-black font-mono font-bold text-xs uppercase tracking-widest rounded-xl flex items-center justify-center gap-2.5 transition-transform active:scale-[0.98] glow-lime"
                >
                  <ShoppingBag className="w-4 h-4" />
                  <span>ADD TO VAULT BAG</span>
                </button>

                <button
                  type="button"
                  onClick={() => toggleWishlist(product)}
                  className={`p-4 rounded-xl border transition-all ${
                    isWishlisted
                      ? 'border-red-500 bg-red-500/10 text-red-400'
                      : 'border-zinc-800 hover:border-zinc-600 text-zinc-400 hover:text-white bg-zinc-900/60'
                  }`}
                  aria-label="Add to wishlist"
                >
                  <Heart className={`w-5 h-5 ${isWishlisted ? 'fill-current' : ''}`} />
                </button>
              </div>

              {/* Guarantees Matrix */}
              <div className="grid grid-cols-3 gap-3 p-4 rounded-2xl bg-zinc-900/50 border border-zinc-800/80 mb-8 text-center text-[11px] font-mono">
                <div className="flex flex-col items-center">
                  <ShieldCheck className="w-4 h-4 text-[#d4ff00] mb-1" />
                  <span className="text-zinc-300 font-bold">100% Authentic</span>
                  <span className="text-zinc-500 text-[10px]">Verified Pair</span>
                </div>
                <div className="flex flex-col items-center border-x border-zinc-800">
                  <Truck className="w-4 h-4 text-[#d4ff00] mb-1" />
                  <span className="text-zinc-300 font-bold">Express Air</span>
                  <span className="text-zinc-500 text-[10px]">Tracked Delivery</span>
                </div>
                <div className="flex flex-col items-center">
                  <RotateCcw className="w-4 h-4 text-[#d4ff00] mb-1" />
                  <span className="text-zinc-300 font-bold">30-Day Return</span>
                  <span className="text-zinc-500 text-[10px]">Free Exchanges</span>
                </div>
              </div>

              {/* Accordions */}
              <div className="border-t border-zinc-800 divide-y divide-zinc-800 font-mono text-xs">
                
                {/* Specs */}
                <div>
                  <button
                    onClick={() => toggleAccordion('specs')}
                    className="w-full py-4 flex items-center justify-between text-left text-zinc-200 hover:text-[#d4ff00] transition-colors"
                  >
                    <span className="uppercase tracking-wider font-bold">
                      Material Specifications & Construction
                    </span>
                    <ChevronDown
                      className={`w-4 h-4 transition-transform duration-200 ${
                        activeAccordion === 'specs' ? 'rotate-180 text-[#d4ff00]' : ''
                      }`}
                    />
                  </button>
                  {activeAccordion === 'specs' && (
                    <div className="pb-4 space-y-2 text-zinc-400 font-sans text-xs animate-in slide-in-from-top-1">
                      <p><strong>Upper:</strong> {product.specs.upperMaterial}</p>
                      <p><strong>Outsole:</strong> {product.specs.soleMaterial}</p>
                      <p><strong>Cushioning Technology:</strong> {product.specs.cushioning}</p>
                      <p><strong>Country of Manufacture:</strong> {product.specs.origin}</p>
                    </div>
                  )}
                </div>

                {/* Shipping & Delivery */}
                <div>
                  <button
                    onClick={() => toggleAccordion('shipping')}
                    className="w-full py-4 flex items-center justify-between text-left text-zinc-200 hover:text-[#d4ff00] transition-colors"
                  >
                    <span className="uppercase tracking-wider font-bold">
                      Shipping & Return Protocol
                    </span>
                    <ChevronDown
                      className={`w-4 h-4 transition-transform duration-200 ${
                        activeAccordion === 'shipping' ? 'rotate-180 text-[#d4ff00]' : ''
                      }`}
                    />
                  </button>
                  {activeAccordion === 'shipping' && (
                    <div className="pb-4 text-zinc-400 font-sans text-xs leading-relaxed space-y-2 animate-in slide-in-from-top-1">
                      <p>
                        All vault orders are packaged with double-boxing and shipped with tamper-evident authentication seals within 24 hours of placement.
                      </p>
                      <p>
                        Free express delivery is included on all orders exceeding $200. Returns are accepted within 30 days in unworn condition with tags intact.
                      </p>
                    </div>
                  )}
                </div>

                {/* Authentication Guarantee */}
                <div>
                  <button
                    onClick={() => toggleAccordion('auth')}
                    className="w-full py-4 flex items-center justify-between text-left text-zinc-200 hover:text-[#d4ff00] transition-colors"
                  >
                    <span className="uppercase tracking-wider font-bold">
                      Multi-Stage Verification Guarantee
                    </span>
                    <ChevronDown
                      className={`w-4 h-4 transition-transform duration-200 ${
                        activeAccordion === 'auth' ? 'rotate-180 text-[#d4ff00]' : ''
                      }`}
                    />
                  </button>
                  {activeAccordion === 'auth' && (
                    <div className="pb-4 text-zinc-400 font-sans text-xs leading-relaxed space-y-2 animate-in slide-in-from-top-1">
                      <p>
                        Every sneaker in the SOLEVAULT repository has been physically authenticated by footwear specialists. We examine stitch density, box font kerning, midsole foam density, UV fluorescence, and internal factory SKU labels.
                      </p>
                    </div>
                  )}
                </div>

              </div>
            </div>
          </div>
        </div>

        {/* Related Products Grid */}
        {relatedProducts.length > 0 && (
          <div className="mt-24 pt-12 border-t border-zinc-800">
            <div className="flex items-center justify-between mb-8">
              <div>
                <span className="font-mono text-xs uppercase tracking-widest text-[#d4ff00]">
                  SIMILAR ARCHIVES
                </span>
                <h3 className="font-display text-2xl sm:text-3xl font-black uppercase text-white tracking-tight mt-1">
                  You Might Also Covet
                </h3>
              </div>
              <Link
                href={`/sneakers?brand=${encodeURIComponent(product.brand)}`}
                className="font-mono text-xs text-[#d4ff00] hover:underline flex items-center gap-1"
              >
                <span>More from {product.brand}</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {relatedProducts.slice(0, 4).map((rel) => (
                <ProductCard key={rel.id} product={rel} />
              ))}
            </div>
          </div>
        )}

        {/* Recently Viewed Grid */}
        {recentlyViewed.filter((p) => p.id !== product.id).length > 0 && (
          <div className="mt-20 pt-12 border-t border-zinc-800">
            <div className="mb-6">
              <span className="font-mono text-xs uppercase tracking-widest text-zinc-500">
                SESSION MEMORY
              </span>
              <h3 className="font-display text-xl sm:text-2xl font-black uppercase text-white tracking-tight mt-1">
                Recently Inspected Silhouettes
              </h3>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
              {recentlyViewed
                .filter((p) => p.id !== product.id)
                .slice(0, 6)
                .map((recent) => (
                  <Link
                    key={recent.id}
                    href={`/product/${recent.slug}`}
                    className="group p-3 rounded-xl bg-zinc-900/40 border border-zinc-800/80 hover:border-[#d4ff00]/50 transition-all flex flex-col justify-between"
                  >
                    <div className="relative aspect-square w-full rounded-lg overflow-hidden bg-zinc-950 mb-2">
                      <ImageWithFallback
                        src={recent.images[0]}
                        alt={recent.name}
                        fill
                        sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 16vw"
                        className="object-cover group-hover:scale-105 transition-transform"
                      />
                    </div>
                    <div>
                      <span className="font-mono text-[9px] text-[#d4ff00] uppercase block truncate">
                        {recent.brand}
                      </span>
                      <p className="font-display text-xs font-bold text-white uppercase truncate group-hover:text-[#d4ff00] transition-colors">
                        {recent.name}
                      </p>
                      <span className="font-mono text-[11px] font-bold text-zinc-300">
                        ${recent.price}
                      </span>
                    </div>
                  </Link>
                ))}
            </div>
          </div>
        )}

      </div>
    </div>
  );
}
