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
    <div className="min-h-screen bg-[#FAF7F2] text-[#1A1814] py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Breadcrumb Navigation */}
        <nav aria-label="Breadcrumb" className="flex items-center gap-2 text-xs font-sans text-[#8C8275] mb-8">
          <Link href="/" className="hover:text-[#1A1814] transition-colors">
            Home
          </Link>
          <span>/</span>
          <Link href="/sneakers" className="hover:text-[#1A1814] transition-colors">
            Sneakers
          </Link>
          <span>/</span>
          <Link
            href={`/sneakers?brand=${encodeURIComponent(product.brand)}`}
            className="hover:text-[#1A1814] transition-colors text-[#B87333] font-medium"
          >
            {product.brand}
          </Link>
          <span>/</span>
          <span className="text-[#1A1814] truncate max-w-xs font-medium">{product.name}</span>
        </nav>

        {/* Main Product Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          
          {/* Left: Gallery (Thumbnails + Main Image View) */}
          <div className="lg:col-span-7 space-y-4">
            {/* Main Stage */}
            <div className="relative aspect-square w-full rounded-3xl overflow-hidden bg-white border border-[#E8E0D4] p-8 flex items-center justify-center shadow-sm">
              
              {/* Badges */}
              <div className="absolute top-6 left-6 z-10 flex flex-col gap-2">
                {product.sale && (
                  <span className="bg-[#B87333] text-white font-mono text-xs font-bold px-3 py-1 uppercase tracking-wider rounded-full shadow-sm">
                    VAULT SALE
                  </span>
                )}
                {product.newArrival && (
                  <span className="bg-[#1A1814] text-white font-mono text-xs font-bold px-3 py-1 uppercase tracking-wider rounded-full shadow-sm">
                    NEW ARRIVAL
                  </span>
                )}
                {product.featured && (
                  <span className="bg-[#FAF7F2] text-[#B87333] border border-[#B87333]/30 font-mono text-xs font-bold px-3 py-1 uppercase tracking-wider rounded-full shadow-sm">
                    ARCHIVE ICON
                  </span>
                )}
              </div>

              {/* SKU tag */}
              <div className="absolute top-6 right-6 z-10 font-mono text-xs text-[#8C8275] uppercase tracking-widest">
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
                  className="object-contain p-4 drop-shadow-[0_15px_25px_rgba(44,35,24,0.15)] transition-all duration-300"
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
                    className={`relative w-24 h-24 rounded-2xl overflow-hidden bg-white border transition-all flex-shrink-0 ${
                      selectedImageIndex === idx
                        ? 'border-[#B87333] ring-2 ring-[#B87333]/30 shadow-md scale-[1.02]'
                        : 'border-[#E8E0D4] opacity-70 hover:opacity-100'
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
            <div className="p-6 rounded-3xl bg-white border border-[#E8E0D4] shadow-sm mt-6">
              <span className="font-mono text-xs uppercase tracking-widest text-[#B87333] font-bold block mb-2">
                ARCHIVAL HERITAGE & DESIGN DOSSIER
              </span>
              <p className="text-xs sm:text-sm text-[#8C8275] leading-relaxed font-sans">
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
                  className="text-[#B87333] font-semibold uppercase tracking-widest hover:underline"
                >
                  {product.brand}
                </Link>
                <span className="text-[#8C8275]">{product.gender}&apos;s • {product.category}</span>
              </div>

              {/* Title */}
              <h1 className="font-serif text-3xl sm:text-4xl font-bold text-[#1A1814] tracking-tight leading-tight">
                {product.name}
              </h1>

              {/* Pricing */}
              <div className="flex items-baseline gap-4 my-4">
                <span className="font-mono text-3xl font-bold text-[#1A1814]">
                  ${product.price}
                </span>
                {product.originalPrice && (
                  <div className="flex items-center gap-2">
                    <span className="font-mono text-base text-[#8C8275] line-through">
                      ${product.originalPrice}
                    </span>
                    <span className="font-mono text-xs font-bold text-[#8B5A2B] bg-[#B87333]/15 px-2.5 py-0.5 rounded-full border border-[#B87333]/30">
                      SAVE ${(product.originalPrice - product.price).toFixed(0)}
                    </span>
                  </div>
                )}
              </div>

              {/* Stock Status Indicator */}
              <div className="flex items-center gap-2 mb-6 text-xs font-sans">
                {product.stockQuantity < 10 ? (
                  <span className="text-amber-700 bg-amber-50 border border-amber-200 px-3 py-1 rounded-full flex items-center gap-1.5 font-medium">
                    <Flame className="w-3.5 h-3.5 fill-current text-amber-600" />
                    Limited Stock: Only {product.stockQuantity} pairs remaining
                  </span>
                ) : (
                  <span className="text-emerald-800 bg-emerald-50 border border-emerald-200 px-3 py-1 rounded-full flex items-center gap-1.5 font-medium">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                    Verified In Stock ({product.stockQuantity} pairs authenticated)
                  </span>
                )}
              </div>

              {/* Description */}
              <p className="text-[#8C8275] text-xs sm:text-sm leading-relaxed mb-6 font-sans">
                {product.description}
              </p>

              {/* Colorway Selector */}
              {product.availableColors.length > 0 && (
                <div className="mb-6">
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-mono text-xs text-[#8C8275] uppercase tracking-wider">
                      Colorway
                    </span>
                    <span className="font-sans text-xs text-[#1A1814] font-medium">
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
                            ? 'border-[#B87333] scale-110 shadow-md ring-2 ring-[#B87333]/20'
                            : 'border-[#E8E0D4] hover:scale-105'
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
                  <span className="font-mono text-xs text-[#8C8275] uppercase tracking-wider">
                    Select Size (US Men)
                  </span>
                  <button
                    type="button"
                    onClick={openSizeGuide}
                    className="font-sans text-xs text-[#B87333] hover:underline flex items-center gap-1 font-medium"
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
                            ? 'border-[#E8E0D4] bg-[#FAF7F2] text-[#8C8275]/40 line-through cursor-not-allowed'
                            : isSelected
                            ? 'border-[#B87333] bg-[#B87333] text-white font-bold shadow-md'
                            : 'border-[#E8E0D4] bg-white text-[#1A1814] hover:border-[#B87333]'
                        }`}
                      >
                        US {size}
                      </button>
                    );
                  })}
                </div>

                {errorMsg && (
                  <div className="flex items-center gap-2 mt-3 text-xs text-red-600 font-sans">
                    <AlertCircle className="w-4 h-4 flex-shrink-0" />
                    <span>{errorMsg}</span>
                  </div>
                )}
              </div>

              {/* Quantity Picker */}
              <div className="flex items-center gap-4 mb-6">
                <span className="font-mono text-xs text-[#8C8275] uppercase tracking-wider">
                  Quantity
                </span>
                <div className="flex items-center border border-[#E8E0D4] rounded-full bg-white p-1 shadow-sm">
                  <button
                    type="button"
                    onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                    className="p-1.5 hover:text-[#B87333] text-[#8C8275] transition-colors rounded-full hover:bg-[#FAF7F2]"
                    aria-label="Decrease quantity"
                  >
                    <Minus className="w-3.5 h-3.5" />
                  </button>
                  <span className="px-4 font-mono text-xs font-bold text-[#1A1814]">
                    {quantity}
                  </span>
                  <button
                    type="button"
                    onClick={() => setQuantity((q) => Math.min(product.stockQuantity, q + 1))}
                    className="p-1.5 hover:text-[#B87333] text-[#8C8275] transition-colors rounded-full hover:bg-[#FAF7F2]"
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
                  className="flex-1 py-4 px-6 bg-[#B87333] hover:bg-[#8B5A2B] text-white font-medium text-xs rounded-full flex items-center justify-center gap-2.5 transition-all shadow-md hover:scale-[1.01] active:scale-[0.98]"
                >
                  <ShoppingBag className="w-4 h-4" />
                  <span>ADD TO VAULT BAG</span>
                </button>

                <button
                  type="button"
                  onClick={() => toggleWishlist(product)}
                  className={`p-4 rounded-full border transition-all ${
                    isWishlisted
                      ? 'border-red-400 bg-red-50 text-red-500'
                      : 'border-[#E8E0D4] hover:border-[#B87333] text-[#8C8275] hover:text-[#1A1814] bg-white shadow-sm'
                  }`}
                  aria-label="Add to wishlist"
                >
                  <Heart className={`w-5 h-5 ${isWishlisted ? 'fill-current' : ''}`} />
                </button>
              </div>

              {/* Guarantees Matrix */}
              <div className="grid grid-cols-3 gap-3 p-4 rounded-2xl bg-white border border-[#E8E0D4] mb-8 text-center text-[11px] shadow-sm">
                <div className="flex flex-col items-center">
                  <ShieldCheck className="w-4 h-4 text-[#B87333] mb-1" />
                  <span className="text-[#1A1814] font-medium">100% Authentic</span>
                  <span className="text-[#8C8275] text-[10px]">Verified Pair</span>
                </div>
                <div className="flex flex-col items-center border-x border-[#E8E0D4]">
                  <Truck className="w-4 h-4 text-[#B87333] mb-1" />
                  <span className="text-[#1A1814] font-medium">Express Courier</span>
                  <span className="text-[#8C8275] text-[10px]">Tracked Delivery</span>
                </div>
                <div className="flex flex-col items-center">
                  <RotateCcw className="w-4 h-4 text-[#B87333] mb-1" />
                  <span className="text-[#1A1814] font-medium">30-Day Return</span>
                  <span className="text-[#8C8275] text-[10px]">Complimentary</span>
                </div>
              </div>

              {/* Accordions */}
              <div className="border-t border-[#E8E0D4] divide-y divide-[#E8E0D4] text-xs">
                
                {/* Specs */}
                <div>
                  <button
                    onClick={() => toggleAccordion('specs')}
                    className="w-full py-4 flex items-center justify-between text-left text-[#1A1814] hover:text-[#B87333] transition-colors"
                  >
                    <span className="font-serif font-bold text-sm">
                      Material Specifications & Construction
                    </span>
                    <ChevronDown
                      className={`w-4 h-4 transition-transform duration-200 text-[#8C8275] ${
                        activeAccordion === 'specs' ? 'rotate-180 text-[#B87333]' : ''
                      }`}
                    />
                  </button>
                  {activeAccordion === 'specs' && (
                    <div className="pb-4 space-y-2 text-[#8C8275] font-sans text-xs animate-in slide-in-from-top-1">
                      <p><strong className="text-[#1A1814]">Upper:</strong> {product.specs.upperMaterial}</p>
                      <p><strong className="text-[#1A1814]">Outsole:</strong> {product.specs.soleMaterial}</p>
                      <p><strong className="text-[#1A1814]">Cushioning Technology:</strong> {product.specs.cushioning}</p>
                      <p><strong className="text-[#1A1814]">Country of Manufacture:</strong> {product.specs.origin}</p>
                    </div>
                  )}
                </div>

                {/* Shipping & Delivery */}
                <div>
                  <button
                    onClick={() => toggleAccordion('shipping')}
                    className="w-full py-4 flex items-center justify-between text-left text-[#1A1814] hover:text-[#B87333] transition-colors"
                  >
                    <span className="font-serif font-bold text-sm">
                      Shipping & Return Protocol
                    </span>
                    <ChevronDown
                      className={`w-4 h-4 transition-transform duration-200 text-[#8C8275] ${
                        activeAccordion === 'shipping' ? 'rotate-180 text-[#B87333]' : ''
                      }`}
                    />
                  </button>
                  {activeAccordion === 'shipping' && (
                    <div className="pb-4 text-[#8C8275] font-sans text-xs leading-relaxed space-y-2 animate-in slide-in-from-top-1">
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
                    className="w-full py-4 flex items-center justify-between text-left text-[#1A1814] hover:text-[#B87333] transition-colors"
                  >
                    <span className="font-serif font-bold text-sm">
                      Multi-Stage Verification Guarantee
                    </span>
                    <ChevronDown
                      className={`w-4 h-4 transition-transform duration-200 text-[#8C8275] ${
                        activeAccordion === 'auth' ? 'rotate-180 text-[#B87333]' : ''
                      }`}
                    />
                  </button>
                  {activeAccordion === 'auth' && (
                    <div className="pb-4 text-[#8C8275] font-sans text-xs leading-relaxed space-y-2 animate-in slide-in-from-top-1">
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
          <div className="mt-24 pt-12 border-t border-[#E8E0D4]">
            <div className="flex items-center justify-between mb-8">
              <div>
                <span className="font-mono text-xs uppercase tracking-widest text-[#B87333] font-semibold">
                  SIMILAR ARCHIVES
                </span>
                <h3 className="font-serif text-2xl sm:text-3xl font-bold text-[#1A1814] tracking-tight mt-1">
                  You Might Also Covet
                </h3>
              </div>
              <Link
                href={`/sneakers?brand=${encodeURIComponent(product.brand)}`}
                className="font-sans text-xs text-[#B87333] hover:underline flex items-center gap-1 font-medium"
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
          <div className="mt-20 pt-12 border-t border-[#E8E0D4]">
            <div className="mb-6">
              <span className="font-mono text-xs uppercase tracking-widest text-[#8C8275]">
                SESSION MEMORY
              </span>
              <h3 className="font-serif text-xl sm:text-2xl font-bold text-[#1A1814] tracking-tight mt-1">
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
                    className="group p-3 rounded-2xl bg-white border border-[#E8E0D4] hover:border-[#B87333] transition-all flex flex-col justify-between shadow-sm hover:shadow-md"
                  >
                    <div className="relative aspect-square w-full rounded-xl overflow-hidden bg-[#FAF7F2] mb-2 border border-[#E8E0D4]/60">
                      <ImageWithFallback
                        src={recent.images[0]}
                        alt={recent.name}
                        fill
                        sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 16vw"
                        className="object-cover group-hover:scale-105 transition-transform"
                      />
                    </div>
                    <div>
                      <span className="font-mono text-[9px] text-[#B87333] font-semibold uppercase block truncate">
                        {recent.brand}
                      </span>
                      <p className="font-serif text-xs font-bold text-[#1A1814] truncate group-hover:text-[#B87333] transition-colors">
                        {recent.name}
                      </p>
                      <span className="font-mono text-[11px] font-semibold text-[#8C8275]">
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
