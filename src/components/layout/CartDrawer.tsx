'use client';

import React, { useState } from 'react';
import { useStore } from '@/store/useStore';
import {
  X,
  ShoppingBag,
  Plus,
  Minus,
  Trash2,
  Tag,
  ArrowRight,
  ShieldCheck,
  CheckCircle2,
  AlertCircle,
} from 'lucide-react';
import Link from 'next/link';
import { ImageWithFallback } from '@/components/ui/ImageWithFallback';

export function CartDrawer() {
  const {
    cart,
    isCartOpen,
    closeCart,
    removeFromCart,
    updateQuantity,
    discountCode,
    discountPercent,
    applyDiscount,
    removeDiscount,
    getCartSubtotal,
    getDiscountAmount,
    getCartTotal,
  } = useStore();

  const [promoInput, setPromoInput] = useState('');
  const [promoError, setPromoError] = useState('');

  if (!isCartOpen) return null;

  const subtotal = getCartSubtotal();
  const discountAmount = getDiscountAmount();
  const finalTotal = getCartTotal();
  const freeShippingThreshold = 200;
  const progressToFreeShipping = Math.min(
    100,
    (subtotal / freeShippingThreshold) * 100
  );
  const remainingForFreeShipping = Math.max(0, freeShippingThreshold - subtotal);

  const handleApplyPromo = (e: React.FormEvent) => {
    e.preventDefault();
    if (!promoInput.trim()) return;

    const res = applyDiscount(promoInput);
    if (!res.success) {
      setPromoError(res.message);
    } else {
      setPromoError('');
      setPromoInput('');
    }
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="cart-drawer-title"
      className="fixed inset-0 z-50 flex justify-end bg-black/40 backdrop-blur-sm animate-in fade-in duration-200"
      onClick={closeCart}
    >
      <div
        className="w-full max-w-md bg-[#FAF7F2] h-full border-l border-[#E8E0D4] p-6 flex flex-col justify-between overflow-y-auto animate-in slide-in-from-right duration-300"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between pb-5 border-b border-[#E8E0D4]">
          <div className="flex items-center gap-2.5">
            <ShoppingBag className="w-5 h-5 text-[#B87333]" />
            <h2 id="cart-drawer-title" className="font-display text-lg font-bold text-[#1A1814] italic">
              Vault Bag ({cart.length})
            </h2>
          </div>
          <button
            onClick={closeCart}
            className="p-2 text-[#8C8275] hover:text-[#1A1814] rounded-full hover:bg-[#F0EBE3] transition-colors"
            aria-label="Close cart"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Free Shipping Progress Indicator */}
        <div className="my-4 p-3 rounded-xl bg-white border border-[#E8E0D4]">
          <div className="flex items-center justify-between text-xs font-mono-tag mb-2">
            <span className="text-[#3D3225]">
              {remainingForFreeShipping === 0 ? (
                <span className="text-[#B87333] font-bold flex items-center gap-1">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  Unlocked Free Express Shipping
                </span>
              ) : (
                <span>
                  Add <strong className="text-[#1A1814]">${remainingForFreeShipping.toFixed(0)}</strong> for Free Express
                </span>
              )}
            </span>
            <span className="text-[#8C8275]">{progressToFreeShipping.toFixed(0)}%</span>
          </div>
          <div className="w-full h-1.5 bg-[#E8E0D4] rounded-full overflow-hidden">
            <div
              className="h-full bg-[#B87333] transition-all duration-300 rounded-full"
              style={{ width: `${progressToFreeShipping}%` }}
            />
          </div>
        </div>

        {/* Cart Items List or Empty State */}
        <div className="flex-1 overflow-y-auto pr-1 my-2 divide-y divide-[#E8E0D4]">
          {cart.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center text-center py-12">
              <div className="w-16 h-16 rounded-full bg-[#F0EBE3] border border-[#E8E0D4] flex items-center justify-center text-[#C4B8A8] mb-4">
                <ShoppingBag className="w-8 h-8" />
              </div>
              <h3 className="font-display text-lg font-bold text-[#1A1814] mb-1 italic">
                Your Vault Is Empty
              </h3>
              <p className="text-xs text-[#8C8275] max-w-xs mb-6 font-light">
                Discover limited drops, iconic retro silhouettes, and modern tech runners to complete your rotation.
              </p>
              <button
                onClick={closeCart}
                className="px-6 py-3 bg-[#1A1814] hover:bg-[#B87333] text-white font-mono-tag text-xs font-bold uppercase tracking-wider rounded-full transition-colors"
              >
                Explore Sneakers
              </button>
            </div>
          ) : (
            cart.map((item) => {
              const lineTotal = item.product.price * item.quantity;

              return (
                <div key={item.id} className="py-4 flex gap-4 items-start">
                  {/* Thumbnail */}
                  <div className="relative w-20 h-20 rounded-xl overflow-hidden bg-[#F0EBE3] border border-[#E8E0D4] flex-shrink-0">
                    <ImageWithFallback
                      src={item.product.images[0]}
                      alt={item.product.name}
                      fill
                      sizes="80px"
                      className="object-cover"
                    />
                  </div>

                  {/* Info */}
                  <div className="flex-1 min-w-0">
                    <span className="font-mono-tag text-[10px] uppercase tracking-wider text-[#B87333] block">
                      {item.product.brand}
                    </span>
                    <h4 className="font-display text-sm font-bold text-[#1A1814] uppercase truncate">
                      {item.product.name}
                    </h4>

                    <div className="flex items-center gap-2 mt-1 text-xs font-mono-tag text-[#8C8275]">
                      <span>Size: US {item.selectedSize}</span>
                      <span>·</span>
                      <span>{item.selectedColor}</span>
                    </div>

                    <div className="flex items-center justify-between mt-3">
                      {/* Quantity Selector */}
                      <div className="flex items-center border border-[#E8E0D4] rounded-full bg-white">
                        <button
                          type="button"
                          onClick={() => updateQuantity(item.id, -1)}
                          className="p-1.5 hover:text-[#B87333] text-[#8C8275] transition-colors"
                          aria-label="Decrease quantity"
                        >
                          <Minus className="w-3.5 h-3.5" />
                        </button>
                        <span className="px-2.5 font-mono-tag text-xs text-[#1A1814]">
                          {item.quantity}
                        </span>
                        <button
                          type="button"
                          onClick={() => updateQuantity(item.id, 1)}
                          className="p-1.5 hover:text-[#B87333] text-[#8C8275] transition-colors"
                          aria-label="Increase quantity"
                        >
                          <Plus className="w-3.5 h-3.5" />
                        </button>
                      </div>

                      {/* Price and delete */}
                      <div className="flex items-center gap-3">
                        <span className="font-mono-tag text-sm font-bold text-[#1A1814]">
                          ${lineTotal}
                        </span>
                        <button
                          type="button"
                          onClick={() => removeFromCart(item.id)}
                          className="text-[#C4B8A8] hover:text-red-400 transition-colors"
                          aria-label="Remove item"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })
          )}
        </div>

        {/* Footer Summary & Checkout */}
        {cart.length > 0 && (
          <div className="pt-4 border-t border-[#E8E0D4] space-y-4">
            {/* Promo code accordion */}
            <div>
              {discountCode ? (
                <div className="flex items-center justify-between p-2.5 rounded-xl bg-[#B87333]/10 border border-[#B87333]/20 text-xs">
                  <div className="flex items-center gap-2">
                    <Tag className="w-3.5 h-3.5 text-[#B87333]" />
                    <span className="font-mono-tag text-[#B87333] font-bold">
                      {discountCode} ({discountPercent}% OFF)
                    </span>
                  </div>
                  <button
                    type="button"
                    onClick={removeDiscount}
                    className="text-[#8C8275] hover:text-[#1A1814] font-mono-tag text-xs underline"
                  >
                    Remove
                  </button>
                </div>
              ) : (
                <form onSubmit={handleApplyPromo} className="flex gap-2">
                  <input
                    type="text"
                    value={promoInput}
                    onChange={(e) => {
                      setPromoInput(e.target.value);
                      setPromoError('');
                    }}
                    placeholder="PROMO CODE (e.g. VAULT10)"
                    className="flex-1 bg-white border border-[#E8E0D4] rounded-full px-4 py-2 text-xs font-mono-tag uppercase text-[#1A1814] placeholder-[#C4B8A8] focus:border-[#B87333] focus:outline-none"
                  />
                  <button
                    type="submit"
                    className="px-4 py-2 bg-[#F0EBE3] hover:bg-[#E8E0D4] text-[#1A1814] font-mono-tag text-xs uppercase tracking-wider rounded-full transition-colors"
                  >
                    Apply
                  </button>
                </form>
              )}

              {promoError && (
                <p className="mt-1.5 text-xs text-red-400 flex items-center gap-1 font-mono-tag">
                  <AlertCircle className="w-3 h-3" />
                  {promoError}
                </p>
              )}
            </div>

            {/* Price Calculations */}
            <div className="space-y-1.5 text-xs font-mono-tag">
              <div className="flex justify-between text-[#8C8275]">
                <span>Subtotal</span>
                <span>${subtotal.toFixed(2)}</span>
              </div>
              {discountAmount > 0 && (
                <div className="flex justify-between text-[#B87333]">
                  <span>Discount ({discountPercent}%)</span>
                  <span>-${discountAmount.toFixed(2)}</span>
                </div>
              )}
              <div className="flex justify-between text-[#8C8275]">
                <span>Estimated Shipping</span>
                <span>
                  {remainingForFreeShipping === 0 ? 'FREE' : '$15.00'}
                </span>
              </div>
              <div className="flex justify-between text-base font-bold text-[#1A1814] pt-2 border-t border-[#E8E0D4]">
                <span>Total</span>
                <span>${(finalTotal + (remainingForFreeShipping === 0 ? 0 : 15)).toFixed(2)}</span>
              </div>
            </div>

            {/* Checkout Action */}
            <div className="space-y-2">
              <Link
                href="/checkout"
                onClick={closeCart}
                className="w-full py-3.5 bg-[#1A1814] hover:bg-[#B87333] text-white font-mono-tag font-bold text-xs uppercase tracking-wider rounded-full flex items-center justify-center gap-2 transition-all duration-300 active:scale-[0.98] glow-copper-sm"
              >
                <span>Proceed to Checkout</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
              <button
                type="button"
                onClick={closeCart}
                className="w-full py-2.5 text-[#8C8275] hover:text-[#1A1814] font-mono-tag text-xs uppercase tracking-wider transition-colors"
              >
                Continue Browsing
              </button>
            </div>

            <div className="flex items-center justify-center gap-2 text-[11px] font-mono-tag text-[#8C8275] pt-1">
              <ShieldCheck className="w-3.5 h-3.5 text-[#B87333]" />
              <span>Authenticity & Verified Escrow Guarantee</span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
