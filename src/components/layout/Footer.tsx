'use client';

import React from 'react';
import Link from 'next/link';
import { ArrowUpRight, ShieldCheck, Truck, RefreshCw, Lock } from 'lucide-react';
import { ALL_BRANDS } from '@/data/products';

export function Footer() {
  return (
    <footer className="bg-[#1A1814] border-t border-[#2C2318] pt-16 pb-12 text-[#C4B8A8]">
      {/* Value Badges Banner */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-14 border-b border-[#2C2318]">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          <div className="flex items-center gap-3.5">
            <div className="p-2.5 rounded-xl bg-[#2C2318] border border-[#3D3225] text-[#B87333]">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <h5 className="font-mono-tag text-xs font-bold uppercase text-white">
                100% Authenticity
              </h5>
              <p className="text-[11px] text-[#8C8275]">Multistage inspection</p>
            </div>
          </div>

          <div className="flex items-center gap-3.5">
            <div className="p-2.5 rounded-xl bg-[#2C2318] border border-[#3D3225] text-[#B87333]">
              <Truck className="w-5 h-5" />
            </div>
            <div>
              <h5 className="font-mono-tag text-xs font-bold uppercase text-white">
                Express Delivery
              </h5>
              <p className="text-[11px] text-[#8C8275]">Free over $200</p>
            </div>
          </div>

          <div className="flex items-center gap-3.5">
            <div className="p-2.5 rounded-xl bg-[#2C2318] border border-[#3D3225] text-[#B87333]">
              <RefreshCw className="w-5 h-5" />
            </div>
            <div>
              <h5 className="font-mono-tag text-xs font-bold uppercase text-white">
                30-Day Returns
              </h5>
              <p className="text-[11px] text-[#8C8275]">Hassle-free guarantee</p>
            </div>
          </div>

          <div className="flex items-center gap-3.5">
            <div className="p-2.5 rounded-xl bg-[#2C2318] border border-[#3D3225] text-[#B87333]">
              <Lock className="w-5 h-5" />
            </div>
            <div>
              <h5 className="font-mono-tag text-xs font-bold uppercase text-white">
                Secure Vault
              </h5>
              <p className="text-[11px] text-[#8C8275]">Encrypted checkout</p>
            </div>
          </div>
        </div>
      </div>

      {/* Main Links Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
        <div className="grid grid-cols-2 md:grid-cols-5 gap-8 lg:gap-12">
          {/* Col 1: Shop */}
          <div>
            <h4 className="font-mono-tag text-xs font-bold uppercase text-white tracking-wider mb-4">
              Catalog
            </h4>
            <ul className="space-y-2.5 text-xs font-mono-tag">
              <li>
                <Link href="/sneakers?sort=newest" className="hover:text-[#D4955A] transition-colors">
                  New Arrivals
                </Link>
              </li>
              <li>
                <Link href="/sneakers?category=Retro" className="hover:text-[#D4955A] transition-colors">
                  Retro Classics
                </Link>
              </li>
              <li>
                <Link href="/sneakers?category=Basketball" className="hover:text-[#D4955A] transition-colors">
                  Hardcourt Basketball
                </Link>
              </li>
              <li>
                <Link href="/sneakers?category=Running" className="hover:text-[#D4955A] transition-colors">
                  Tech Runners
                </Link>
              </li>
              <li>
                <Link href="/sneakers?category=Lifestyle" className="hover:text-[#D4955A] transition-colors">
                  Everyday Rotation
                </Link>
              </li>
              <li>
                <Link href="/sneakers?sale=true" className="text-[#C9A0A0] hover:text-red-400 transition-colors">
                  Vault Archive Sale
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 2: Brands */}
          <div>
            <h4 className="font-mono-tag text-xs font-bold uppercase text-white tracking-wider mb-4">
              Houses
            </h4>
            <ul className="space-y-2.5 text-xs font-mono-tag">
              {ALL_BRANDS.map((brand) => (
                <li key={brand}>
                  <Link
                    href={`/sneakers?brand=${encodeURIComponent(brand)}`}
                    className="hover:text-[#D4955A] transition-colors"
                  >
                    {brand}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 3: Editorial */}
          <div>
            <h4 className="font-mono-tag text-xs font-bold uppercase text-white tracking-wider mb-4">
              Editorial
            </h4>
            <ul className="space-y-2.5 text-xs font-mono-tag">
              <li>
                <Link href="/about" className="hover:text-[#D4955A] transition-colors">
                  About SOLEVAULT
                </Link>
              </li>
              <li>
                <Link href="/collections" className="hover:text-[#D4955A] transition-colors">
                  Curated Collections
                </Link>
              </li>
              <li>
                <Link href="/about#authenticity" className="hover:text-[#D4955A] transition-colors">
                  Authentication Process
                </Link>
              </li>
              <li>
                <Link href="/about#concept-stores" className="hover:text-[#D4955A] transition-colors">
                  Concept Destinations
                </Link>
              </li>
              <li>
                <Link href="/wishlist" className="hover:text-[#D4955A] transition-colors">
                  Saved Rotation
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 4: Support */}
          <div>
            <h4 className="font-mono-tag text-xs font-bold uppercase text-white tracking-wider mb-4">
              Client Care
            </h4>
            <ul className="space-y-2.5 text-xs font-mono-tag">
              <li>
                <span className="hover:text-[#D4955A] cursor-pointer">
                  Track Demo Order
                </span>
              </li>
              <li>
                <span className="hover:text-[#D4955A] cursor-pointer">
                  Shipping Specifications
                </span>
              </li>
              <li>
                <span className="hover:text-[#D4955A] cursor-pointer">
                  30-Day Exchange Protocol
                </span>
              </li>
              <li>
                <span className="hover:text-[#D4955A] cursor-pointer">
                  Footwear Size Conversion
                </span>
              </li>
              <li>
                <span className="hover:text-[#D4955A] cursor-pointer">
                  support@solevault.demo
                </span>
              </li>
            </ul>
          </div>

          {/* Col 5: Network */}
          <div className="col-span-2 md:col-span-1">
            <h4 className="font-mono-tag text-xs font-bold uppercase text-white tracking-wider mb-4">
              The Vault Network
            </h4>
            <p className="text-xs text-[#8C8275] mb-4 leading-relaxed">
              Curated drops, editorial essays, and preview links broadcast directly from the Tokyo and London studios.
            </p>
            <div className="flex items-center gap-3 text-xs font-mono-tag">
              <a
                href="#newsletter"
                className="inline-flex items-center gap-1 text-[#D4955A] hover:underline"
              >
                <span>Newsletter</span>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </a>
              <span className="text-[#3D3225]">·</span>
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noreferrer"
                className="hover:text-white transition-colors"
              >
                IG
              </a>
              <span className="text-[#3D3225]">·</span>
              <a
                href="https://x.com"
                target="_blank"
                rel="noreferrer"
                className="hover:text-white transition-colors"
              >
                X
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Giant SOLEVAULT Wordmark Visual Anchor */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 select-none overflow-hidden">
        <h2 className="font-display text-[15vw] font-black uppercase tracking-tighter text-[#2C2318]/60 leading-none text-center hover:text-[#2C2318] transition-colors italic">
          SOLE<span className="text-[#3D3225]/40">VAULT</span>
        </h2>
      </div>

      {/* Copyright & Demo Disclaimer */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 border-t border-[#2C2318] flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-mono-tag text-[#8C8275]">
        <div>
          © {new Date().getFullYear()} SOLEVAULT. All rights reserved. Built for sneaker enthusiasts.
        </div>
      </div>
    </footer>
  );
}
