'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useStore } from '@/store/useStore';
import {
  ShieldCheck,
  Truck,
  CreditCard,
  Lock,
  ArrowRight,
  ArrowLeft,
  CheckCircle2,
  AlertCircle,
  Tag,
  Sparkles,
  ShoppingBag,
  Info,
} from 'lucide-react';
import { ImageWithFallback } from '@/components/ui/ImageWithFallback';
import confetti from 'canvas-confetti';

interface FormData {
  email: string;
  phone: string;
  firstName: string;
  lastName: string;
  address: string;
  apt: string;
  city: string;
  state: string;
  zip: string;
  country: string;
  shippingMethod: 'standard' | 'express' | 'priority';
  cardNumber: string;
  cardExpiry: string;
  cardCvc: string;
}

export default function CheckoutPage() {
  const router = useRouter();
  const {
    cart,
    clearCart,
    discountCode,
    discountPercent,
    applyDiscount,
    removeDiscount,
    getCartSubtotal,
    getDiscountAmount,
    getCartTotal,
  } = useStore();

  const [mounted, setMounted] = useState(false);
  const [promoInput, setPromoInput] = useState('');
  const [promoError, setPromoError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [completedOrderNumber, setCompletedOrderNumber] = useState<string | null>(null);
  const [formErrors, setFormErrors] = useState<Record<string, string>>({});

  const [formData, setFormData] = useState<FormData>({
    email: '',
    phone: '',
    firstName: '',
    lastName: '',
    address: '',
    apt: '',
    city: '',
    state: '',
    zip: '',
    country: 'United States',
    shippingMethod: 'standard',
    cardNumber: '•••• •••• •••• 4242',
    cardExpiry: '12/28',
    cardCvc: '•••',
  });

  useEffect(() => {
    setMounted(true);
  }, []);

  const subtotal = getCartSubtotal();
  const discountAmount = getDiscountAmount();

  const shippingCost =
    formData.shippingMethod === 'standard'
      ? subtotal >= 200
        ? 0
        : 15
      : formData.shippingMethod === 'express'
      ? 25
      : 45;

  const orderTotal = Math.max(0, subtotal - discountAmount + shippingCost);

  // Quick fill helper for easy testing
  const handleQuickFill = () => {
    setFormData({
      email: 'alex.collector@solevault.demo',
      phone: '+1 (555) 234-5678',
      firstName: 'Alex',
      lastName: 'Vance',
      address: '742 Evergreen Terrace',
      apt: 'Suite 4B',
      city: 'Brooklyn',
      state: 'NY',
      zip: '11201',
      country: 'United States',
      shippingMethod: 'standard',
      cardNumber: '•••• •••• •••• 4242',
      cardExpiry: '12/28',
      cardCvc: '•••',
    });
    setFormErrors({});
  };

  const handleApplyPromo = (e: React.FormEvent) => {
    e.preventDefault();
    if (!promoInput.trim()) return;
    const res = applyDiscount(promoInput.trim());
    if (res.success) {
      setPromoError('');
      setPromoInput('');
    } else {
      setPromoError(res.message);
    }
  };

  const validateForm = () => {
    const errors: Record<string, string> = {};
    if (!formData.email || !formData.email.includes('@')) {
      errors.email = 'Valid email is required for receipt';
    }
    if (!formData.firstName.trim()) {
      errors.firstName = 'First name is required';
    }
    if (!formData.lastName.trim()) {
      errors.lastName = 'Last name is required';
    }
    if (!formData.address.trim()) {
      errors.address = 'Street address is required';
    }
    if (!formData.city.trim()) {
      errors.city = 'City is required';
    }
    if (!formData.zip.trim()) {
      errors.zip = 'Postal code is required';
    }
    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmitOrder = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);

    setTimeout(() => {
      const orderNum = `SV-${Math.floor(100000 + Math.random() * 900000)}`;
      setCompletedOrderNumber(orderNum);
      setIsSubmitting(false);

      // Trigger celebratory confetti in warm luxury tones
      try {
        confetti({
          particleCount: 100,
          spread: 70,
          origin: { y: 0.6 },
          colors: ['#B87333', '#D4955A', '#1A1814', '#FAF7F2'],
        });
      } catch (err) {
        // Safe fallback
      }

      // Clear the shopping bag
      clearCart();
    }, 1200);
  };

  if (!mounted) {
    return (
      <div className="min-h-screen bg-[#FAF7F2] flex items-center justify-center">
        <div className="font-mono text-xs uppercase tracking-widest text-[#B87333] animate-pulse">
          INITIALIZING SECURE CHECKOUT...
        </div>
      </div>
    );
  }

  // Order Confirmation State
  if (completedOrderNumber) {
    return (
      <div className="min-h-screen bg-[#FAF7F2] text-[#1A1814] py-16 px-4 sm:px-6 lg:px-8 flex items-center justify-center">
        <div className="max-w-xl w-full bg-white border border-[#E8E0D4] rounded-3xl p-8 sm:p-12 shadow-2xl text-center animate-in zoom-in-95 duration-300">
          <div className="w-16 h-16 rounded-full bg-[#B87333]/10 text-[#B87333] flex items-center justify-center mx-auto mb-6">
            <CheckCircle2 className="w-8 h-8" />
          </div>

          <span className="font-mono text-xs font-semibold uppercase tracking-widest text-[#B87333]">
            ORDER CONFIRMED // DEMONSTRATION
          </span>

          <h1 className="font-serif text-3xl sm:text-4xl font-bold text-[#1A1814] mt-1 mb-3">
            Order #{completedOrderNumber}
          </h1>

          <p className="text-[#8C8275] text-xs sm:text-sm font-sans mb-8 leading-relaxed">
            Thank you, {formData.firstName}. Your simulated order has been registered in the SOLEVAULT demonstration system. A mock tracking receipt has been sent to <span className="text-[#1A1814] font-mono font-medium">{formData.email}</span>.
          </p>

          <div className="p-5 rounded-2xl bg-[#FAF7F2] border border-[#E8E0D4] text-left text-xs mb-8 space-y-2.5">
            <div className="flex justify-between text-[#8C8275]">
              <span>Estimated Delivery:</span>
              <span className="text-[#1A1814] font-semibold">3-5 Business Days</span>
            </div>
            <div className="flex justify-between text-[#8C8275]">
              <span>Shipping Destination:</span>
              <span className="text-[#1A1814] truncate max-w-[200px] font-medium">
                {formData.city}, {formData.zip}
              </span>
            </div>
            <div className="flex justify-between text-[#8C8275]">
              <span>Authentication Status:</span>
              <span className="text-[#B87333] font-semibold">Passed 6-Point Inspection</span>
            </div>
            <div className="flex justify-between text-[#8C8275] pt-2 border-t border-[#E8E0D4]">
              <span>Simulated Total:</span>
              <span className="text-[#1A1814] font-bold font-mono">${orderTotal.toFixed(2)}</span>
            </div>
          </div>

          <div className="p-3.5 rounded-xl bg-[#FAF7F2] border border-[#E8E0D4] text-[11px] text-[#8C8275] mb-8 flex items-center gap-2.5 text-left">
            <Info className="w-4 h-4 text-[#B87333] flex-shrink-0" />
            <span>
              This is a frontend demonstration. No payment card was charged and no physical sneakers will be dispatched.
            </span>
          </div>

          <div className="flex flex-col sm:flex-row gap-3">
            <Link
              href="/sneakers"
              className="flex-1 py-4 bg-[#B87333] hover:bg-[#8B5A2B] text-white font-medium text-xs uppercase tracking-wider rounded-full transition-all shadow-md active:scale-95"
            >
              Continue Browsing Vault
            </Link>
            <Link
              href="/"
              className="py-4 px-6 bg-[#FAF7F2] hover:bg-[#F0EBE3] text-[#1A1814] font-sans text-xs font-medium uppercase tracking-wider rounded-full border border-[#E8E0D4] transition-colors"
            >
              Home
            </Link>
          </div>
        </div>
      </div>
    );
  }

  // If cart is empty and no order completed
  if (cart.length === 0) {
    return (
      <div className="min-h-screen bg-[#FAF7F2] text-[#1A1814] py-20 px-4 flex items-center justify-center">
        <div className="max-w-md w-full text-center bg-white border border-[#E8E0D4] p-8 sm:p-10 rounded-3xl shadow-sm">
          <ShoppingBag className="w-12 h-12 text-[#8C8275] mx-auto mb-4" />
          <h2 className="font-serif text-2xl font-bold text-[#1A1814] mb-2">
            Your Bag is Empty
          </h2>
          <p className="text-xs text-[#8C8275] mb-6">
            Add silhouettes to your vault bag before proceeding to checkout.
          </p>
          <Link
            href="/sneakers"
            className="inline-flex items-center gap-2 px-6 py-3.5 bg-[#B87333] hover:bg-[#8B5A2B] text-white font-medium text-xs uppercase tracking-wider rounded-full shadow-md transition-colors"
          >
            <span>Explore Collection</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#FAF7F2] text-[#1A1814] py-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-6 border-b border-[#E8E0D4] mb-8 gap-4">
          <div className="flex items-center gap-3">
            <Link
              href="/sneakers"
              className="p-2.5 rounded-full bg-white border border-[#E8E0D4] text-[#8C8275] hover:text-[#1A1814] transition-colors shadow-sm"
              aria-label="Back to catalog"
            >
              <ArrowLeft className="w-4 h-4" />
            </Link>
            <div>
              <span className="font-mono text-[11px] text-[#B87333] uppercase tracking-widest font-semibold">
                SECURE CHECKOUT // DEMONSTRATION
              </span>
              <h1 className="font-serif text-2xl sm:text-3xl font-bold text-[#1A1814]">
                Finalize Vault Dispatch
              </h1>
            </div>
          </div>

          <button
            type="button"
            onClick={handleQuickFill}
            className="px-4 py-2 rounded-full bg-white hover:bg-[#FAF7F2] border border-[#E8E0D4] text-xs font-mono text-[#B87333] hover:underline flex items-center gap-2 self-start sm:self-auto shadow-sm"
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span>1-Click Demo Fill</span>
          </button>
        </div>

        {/* 2-Column Checkout Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          
          {/* Left: Checkout Form */}
          <form onSubmit={handleSubmitOrder} className="lg:col-span-7 space-y-8">
            
            {/* Step 1: Contact Information */}
            <div className="p-6 sm:p-8 rounded-3xl bg-white border border-[#E8E0D4] shadow-sm">
              <h2 className="font-serif text-lg font-bold text-[#1A1814] mb-4 flex items-center gap-2.5">
                <span className="w-6 h-6 rounded-full bg-[#B87333] text-white font-mono text-xs font-bold flex items-center justify-center">
                  1
                </span>
                <span>Contact Information</span>
              </h2>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs font-sans">
                <div>
                  <label className="block text-[#8C8275] font-mono uppercase tracking-wider text-[11px] mb-1.5">
                    Email Address *
                  </label>
                  <input
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    placeholder="you@domain.com"
                    className="w-full bg-[#FAF7F2] border border-[#E8E0D4] text-[#1A1814] rounded-xl px-3.5 py-3 focus:border-[#B87333] focus:outline-none transition-colors"
                  />
                  {formErrors.email && (
                    <p className="mt-1 text-red-600 text-[11px] flex items-center gap-1">
                      <AlertCircle className="w-3 h-3" />
                      {formErrors.email}
                    </p>
                  )}
                </div>

                <div>
                  <label className="block text-[#8C8275] font-mono uppercase tracking-wider text-[11px] mb-1.5">
                    Phone (Delivery Updates)
                  </label>
                  <input
                    type="tel"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    placeholder="+1 (555) 000-0000"
                    className="w-full bg-[#FAF7F2] border border-[#E8E0D4] text-[#1A1814] rounded-xl px-3.5 py-3 focus:border-[#B87333] focus:outline-none transition-colors"
                  />
                </div>
              </div>
            </div>

            {/* Step 2: Shipping Destination */}
            <div className="p-6 sm:p-8 rounded-3xl bg-white border border-[#E8E0D4] shadow-sm">
              <h2 className="font-serif text-lg font-bold text-[#1A1814] mb-4 flex items-center gap-2.5">
                <span className="w-6 h-6 rounded-full bg-[#B87333] text-white font-mono text-xs font-bold flex items-center justify-center">
                  2
                </span>
                <span>Shipping Address</span>
              </h2>

              <div className="space-y-4 text-xs font-sans">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-[#8C8275] font-mono uppercase tracking-wider text-[11px] mb-1.5">
                      First Name *
                    </label>
                    <input
                      type="text"
                      value={formData.firstName}
                      onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
                      placeholder="Alex"
                      className="w-full bg-[#FAF7F2] border border-[#E8E0D4] text-[#1A1814] rounded-xl px-3.5 py-3 focus:border-[#B87333] focus:outline-none transition-colors"
                    />
                    {formErrors.firstName && (
                      <p className="mt-1 text-red-600 text-[11px]">{formErrors.firstName}</p>
                    )}
                  </div>
                  <div>
                    <label className="block text-[#8C8275] font-mono uppercase tracking-wider text-[11px] mb-1.5">
                      Last Name *
                    </label>
                    <input
                      type="text"
                      value={formData.lastName}
                      onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
                      placeholder="Vance"
                      className="w-full bg-[#FAF7F2] border border-[#E8E0D4] text-[#1A1814] rounded-xl px-3.5 py-3 focus:border-[#B87333] focus:outline-none transition-colors"
                    />
                    {formErrors.lastName && (
                      <p className="mt-1 text-red-600 text-[11px]">{formErrors.lastName}</p>
                    )}
                  </div>
                </div>

                <div>
                  <label className="block text-[#8C8275] font-mono uppercase tracking-wider text-[11px] mb-1.5">
                    Street Address *
                  </label>
                  <input
                    type="text"
                    value={formData.address}
                    onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                    placeholder="742 Evergreen Terrace"
                    className="w-full bg-[#FAF7F2] border border-[#E8E0D4] text-[#1A1814] rounded-xl px-3.5 py-3 focus:border-[#B87333] focus:outline-none transition-colors"
                  />
                  {formErrors.address && (
                    <p className="mt-1 text-red-600 text-[11px]">{formErrors.address}</p>
                  )}
                </div>

                <div className="grid grid-cols-3 gap-4">
                  <div>
                    <label className="block text-[#8C8275] font-mono uppercase tracking-wider text-[11px] mb-1.5">
                      City *
                    </label>
                    <input
                      type="text"
                      value={formData.city}
                      onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                      placeholder="Brooklyn"
                      className="w-full bg-[#FAF7F2] border border-[#E8E0D4] text-[#1A1814] rounded-xl px-3.5 py-3 focus:border-[#B87333] focus:outline-none transition-colors"
                    />
                    {formErrors.city && (
                      <p className="mt-1 text-red-600 text-[11px]">{formErrors.city}</p>
                    )}
                  </div>
                  <div>
                    <label className="block text-[#8C8275] font-mono uppercase tracking-wider text-[11px] mb-1.5">
                      State / Region
                    </label>
                    <input
                      type="text"
                      value={formData.state}
                      onChange={(e) => setFormData({ ...formData, state: e.target.value })}
                      placeholder="NY"
                      className="w-full bg-[#FAF7F2] border border-[#E8E0D4] text-[#1A1814] rounded-xl px-3.5 py-3 focus:border-[#B87333] focus:outline-none transition-colors"
                    />
                  </div>
                  <div>
                    <label className="block text-[#8C8275] font-mono uppercase tracking-wider text-[11px] mb-1.5">
                      Postal Code *
                    </label>
                    <input
                      type="text"
                      value={formData.zip}
                      onChange={(e) => setFormData({ ...formData, zip: e.target.value })}
                      placeholder="11201"
                      className="w-full bg-[#FAF7F2] border border-[#E8E0D4] text-[#1A1814] rounded-xl px-3.5 py-3 focus:border-[#B87333] focus:outline-none transition-colors"
                    />
                    {formErrors.zip && (
                      <p className="mt-1 text-red-600 text-[11px]">{formErrors.zip}</p>
                    )}
                  </div>
                </div>
              </div>
            </div>

            {/* Step 3: Shipping Method */}
            <div className="p-6 sm:p-8 rounded-3xl bg-white border border-[#E8E0D4] shadow-sm">
              <h2 className="font-serif text-lg font-bold text-[#1A1814] mb-4 flex items-center gap-2.5">
                <span className="w-6 h-6 rounded-full bg-[#B87333] text-white font-mono text-xs font-bold flex items-center justify-center">
                  3
                </span>
                <span>Delivery Method</span>
              </h2>

              <div className="space-y-3 font-sans text-xs">
                {/* Standard */}
                <label
                  onClick={() => setFormData({ ...formData, shippingMethod: 'standard' })}
                  className={`p-4 rounded-2xl border flex items-center justify-between cursor-pointer transition-all ${
                    formData.shippingMethod === 'standard'
                      ? 'bg-[#FAF7F2] border-[#B87333] shadow-sm ring-1 ring-[#B87333]/30'
                      : 'bg-white border-[#E8E0D4] hover:border-[#B87333]'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <div
                      className={`w-4 h-4 rounded-full border-2 flex items-center justify-center ${
                        formData.shippingMethod === 'standard'
                          ? 'border-[#B87333]'
                          : 'border-[#8C8275]'
                      }`}
                    >
                      {formData.shippingMethod === 'standard' && (
                        <div className="w-2 h-2 rounded-full bg-[#B87333]" />
                      )}
                    </div>
                    <div>
                      <span className="text-[#1A1814] font-semibold block">
                        Standard Tracked Ground
                      </span>
                      <span className="text-[#8C8275] text-[11px]">3-5 Business Days</span>
                    </div>
                  </div>
                  <span className="text-[#B87333] font-mono font-bold">
                    {subtotal >= 200 ? 'FREE' : '$15.00'}
                  </span>
                </label>

                {/* Express Priority Air */}
                <label
                  onClick={() => setFormData({ ...formData, shippingMethod: 'express' })}
                  className={`p-4 rounded-2xl border flex items-center justify-between cursor-pointer transition-all ${
                    formData.shippingMethod === 'express'
                      ? 'bg-[#FAF7F2] border-[#B87333] shadow-sm ring-1 ring-[#B87333]/30'
                      : 'bg-white border-[#E8E0D4] hover:border-[#B87333]'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <div
                      className={`w-4 h-4 rounded-full border-2 flex items-center justify-center ${
                        formData.shippingMethod === 'express'
                          ? 'border-[#B87333]'
                          : 'border-[#8C8275]'
                      }`}
                    >
                      {formData.shippingMethod === 'express' && (
                        <div className="w-2 h-2 rounded-full bg-[#B87333]" />
                      )}
                    </div>
                    <div>
                      <span className="text-[#1A1814] font-semibold block">
                        Express Priority Air
                      </span>
                      <span className="text-[#8C8275] text-[11px]">1-2 Business Days</span>
                    </div>
                  </div>
                  <span className="text-[#1A1814] font-mono font-bold">$25.00</span>
                </label>

                {/* VIP White-Glove */}
                <label
                  onClick={() => setFormData({ ...formData, shippingMethod: 'priority' })}
                  className={`p-4 rounded-2xl border flex items-center justify-between cursor-pointer transition-all ${
                    formData.shippingMethod === 'priority'
                      ? 'bg-[#FAF7F2] border-[#B87333] shadow-sm ring-1 ring-[#B87333]/30'
                      : 'bg-white border-[#E8E0D4] hover:border-[#B87333]'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <div
                      className={`w-4 h-4 rounded-full border-2 flex items-center justify-center ${
                        formData.shippingMethod === 'priority'
                          ? 'border-[#B87333]'
                          : 'border-[#8C8275]'
                      }`}
                    >
                      {formData.shippingMethod === 'priority' && (
                        <div className="w-2 h-2 rounded-full bg-[#B87333]" />
                      )}
                    </div>
                    <div>
                      <span className="text-[#1A1814] font-semibold block">
                        Vault VIP Courier Delivery
                      </span>
                      <span className="text-[#8C8275] text-[11px]">Next Flight Guaranteed</span>
                    </div>
                  </div>
                  <span className="text-[#1A1814] font-mono font-bold">$45.00</span>
                </label>
              </div>
            </div>

            {/* Step 4: Demo Payment Card Simulation */}
            <div className="p-6 sm:p-8 rounded-3xl bg-white border border-[#E8E0D4] shadow-sm">
              <div className="flex items-center justify-between mb-4">
                <h2 className="font-serif text-lg font-bold text-[#1A1814] flex items-center gap-2.5">
                  <span className="w-6 h-6 rounded-full bg-[#B87333] text-white font-mono text-xs font-bold flex items-center justify-center">
                    4
                  </span>
                  <span>Demonstration Payment</span>
                </h2>
                <div className="flex items-center gap-1.5 text-[11px] font-mono text-[#B87333] font-semibold">
                  <Lock className="w-3.5 h-3.5" />
                  <span>Simulated Mode</span>
                </div>
              </div>

              <div className="p-4 rounded-2xl bg-[#FAF7F2] border border-[#E8E0D4] text-xs font-mono text-[#8C8275] space-y-3">
                <div className="flex items-center justify-between">
                  <span>Card Token:</span>
                  <span className="text-[#1A1814] font-bold">{formData.cardNumber}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span>Simulated Expiry:</span>
                  <span className="text-[#1A1814]">{formData.cardExpiry}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span>Security Sandbox:</span>
                  <span className="text-[#B87333] font-semibold">Zero Live Charges Collected</span>
                </div>
              </div>
            </div>

            {/* Submit Order Button */}
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full py-4 px-6 bg-[#B87333] hover:bg-[#8B5A2B] text-white font-medium text-xs uppercase tracking-wider rounded-full flex items-center justify-center gap-2 shadow-lg transition-transform active:scale-[0.98] disabled:opacity-50"
            >
              {isSubmitting ? (
                <span>REGISTERING DEMO DISPATCH...</span>
              ) : (
                <>
                  <span>CONFIRM & PLACE DEMO ORDER (${orderTotal.toFixed(2)})</span>
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </button>
          </form>

          {/* Right: Order Summary Dossier */}
          <div className="lg:col-span-5 p-6 sm:p-8 rounded-3xl bg-white border border-[#E8E0D4] shadow-sm space-y-6">
            <h2 className="font-serif text-xl font-bold text-[#1A1814] pb-4 border-b border-[#E8E0D4]">
              Order Summary ({cart.length} items)
            </h2>

            {/* Item List */}
            <div className="divide-y divide-[#F0EBE3] max-h-80 overflow-y-auto pr-1">
              {cart.map((item) => (
                <div key={item.id} className="py-3.5 flex gap-3.5 items-center">
                  <div className="relative w-14 h-14 rounded-xl bg-[#FAF7F2] overflow-hidden flex-shrink-0 border border-[#E8E0D4]">
                    <ImageWithFallback
                      src={item.product.images[0]}
                      alt={item.product.name}
                      fill
                      sizes="56px"
                      className="object-cover"
                    />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h4 className="font-serif text-xs font-bold text-[#1A1814] truncate">
                      {item.product.name}
                    </h4>
                    <span className="font-mono text-[10px] text-[#8C8275]">
                      US {item.selectedSize} • Qty: {item.quantity}
                    </span>
                  </div>
                  <span className="font-mono text-xs font-semibold text-[#1A1814]">
                    ${(item.product.price * item.quantity).toFixed(2)}
                  </span>
                </div>
              ))}
            </div>

            {/* Promo Code Form */}
            <div className="pt-2">
              {discountCode ? (
                <div className="flex items-center justify-between p-3 rounded-2xl bg-[#B87333]/10 border border-[#B87333]/30 text-xs font-mono">
                  <div className="flex items-center gap-2 text-[#B87333] font-bold">
                    <Tag className="w-3.5 h-3.5" />
                    <span>{discountCode} ({discountPercent}% OFF)</span>
                  </div>
                  <button
                    onClick={removeDiscount}
                    className="text-[#8C8275] hover:text-[#1A1814] underline text-xs"
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
                    className="flex-1 bg-[#FAF7F2] border border-[#E8E0D4] rounded-full px-4 py-2.5 text-xs font-mono uppercase text-[#1A1814] placeholder-[#8C8275] focus:border-[#B87333] focus:outline-none"
                  />
                  <button
                    type="submit"
                    className="px-5 py-2.5 bg-[#FAF7F2] hover:bg-[#F0EBE3] border border-[#E8E0D4] text-[#1A1814] font-sans text-xs font-semibold uppercase tracking-wider rounded-full transition-colors"
                  >
                    Apply
                  </button>
                </form>
              )}

              {promoError && (
                <p className="mt-1.5 text-xs text-red-600 font-sans flex items-center gap-1">
                  <AlertCircle className="w-3 h-3" />
                  {promoError}
                </p>
              )}
            </div>

            {/* Financial Breakdown */}
            <div className="space-y-2.5 pt-4 border-t border-[#E8E0D4] font-sans text-xs">
              <div className="flex justify-between text-[#8C8275]">
                <span>Subtotal</span>
                <span className="font-mono text-[#1A1814] font-medium">${subtotal.toFixed(2)}</span>
              </div>
              {discountAmount > 0 && (
                <div className="flex justify-between text-[#B87333]">
                  <span>Discount ({discountPercent}%)</span>
                  <span className="font-mono font-medium">-${discountAmount.toFixed(2)}</span>
                </div>
              )}
              <div className="flex justify-between text-[#8C8275]">
                <span>Shipping ({formData.shippingMethod})</span>
                <span className="font-mono text-[#1A1814] font-medium">
                  {shippingCost === 0 ? 'FREE' : `$${shippingCost.toFixed(2)}`}
                </span>
              </div>
              <div className="flex justify-between text-base font-bold text-[#1A1814] pt-3 border-t border-[#E8E0D4]">
                <span className="font-serif">Order Total</span>
                <span className="font-mono text-[#B87333]">${orderTotal.toFixed(2)}</span>
              </div>
            </div>

            <div className="pt-2 flex items-center justify-center gap-2 text-[11px] font-mono text-[#8C8275]">
              <ShieldCheck className="w-3.5 h-3.5 text-[#B87333]" />
              <span>Multi-Stage Physical Verification Guarantee</span>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
