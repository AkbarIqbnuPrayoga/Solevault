'use client';

import React from 'react';
import Link from 'next/link';
import { ArrowUpRight, ShieldCheck, Truck, RefreshCw, Lock } from 'lucide-react';
import { ALL_BRANDS } from '@/data/products';

export function Footer() {
  return (
    <footer className="bg-[#060608] border-t border-[#1e1e24] pt-16 pb-12 text-zinc-400">
      {/* Value Badges Banner */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-14 border-b border-zinc-800/80">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          <div className="flex items-center gap-3.5">
            <div className="p-2.5 rounded-lg bg-zinc-900 border border-zinc-800 text-[#d4ff00]">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <h5 className="font-mono text-xs font-bold uppercase text-white">
                100% Authenticity
              </h5>
              <p className="text-[11px] text-zinc-500">Multistage inspection</p>
            </div>
          </div>

          <div className="flex items-center gap-3.5">
            <div className="p-2.5 rounded-lg bg-zinc-900 border border-zinc-800 text-[#d4ff00]">
              <Truck className="w-5 h-5" />
            </div>
            <div>
              <h5 className="font-mono text-xs font-bold uppercase text-white">
                Express Delivery
              </h5>
              <p className="text-[11px] text-zinc-500">Free over $200</p>
            </div>
          </div>

          <div className="flex items-center gap-3.5">
            <div className="p-2.5 rounded-lg bg-zinc-900 border border-zinc-800 text-[#d4ff00]">
              <RefreshCw className="w-5 h-5" />
            </div>
            <div>
              <h5 className="font-mono text-xs font-bold uppercase text-white">
                30-Day Returns
              </h5>
              <p className="text-[11px] text-zinc-500">Hassle-free guarantee</p>
            </div>
          </div>

          <div className="flex items-center gap-3.5">
            <div className="p-2.5 rounded-lg bg-zinc-900 border border-zinc-800 text-[#d4ff00]">
              <Lock className="w-5 h-5" />
            </div>
            <div>
              <h5 className="font-mono text-xs font-bold uppercase text-white">
                Secure Vault
              </h5>
              <p className="text-[11px] text-zinc-500">Encrypted checkout</p>
            </div>
          </div>
        </div>
      </div>

      {/* Main Links Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
        <div className="grid grid-cols-2 md:grid-cols-5 gap-8 lg:gap-12">
          {/* Col 1: Shop */}
          <div>
            <h4 className="font-mono text-xs font-bold uppercase text-white tracking-wider mb-4">
              Catalog
            </h4>
            <ul className="space-y-2.5 text-xs font-mono">
              <li>
                <Link href="/sneakers?sort=newest" className="hover:text-[#d4ff00] transition-colors">
                  New Arrivals
                </Link>
              </li>
              <li>
                <Link href="/sneakers?category=Retro" className="hover:text-[#d4ff00] transition-colors">
                  Retro Classics
                </Link>
              </li>
              <li>
                <Link href="/sneakers?category=Basketball" className="hover:text-[#d4ff00] transition-colors">
                  Hardcourt Basketball
                </Link>
              </li>
              <li>
                <Link href="/sneakers?category=Running" className="hover:text-[#d4ff00] transition-colors">
                  Tech Runners
                </Link>
              </li>
              <li>
                <Link href="/sneakers?category=Lifestyle" className="hover:text-[#d4ff00] transition-colors">
                  Everyday Rotation
                </Link>
              </li>
              <li>
                <Link href="/sneakers?sale=true" className="text-red-400 hover:text-red-300 transition-colors">
                  Vault Archive Sale
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 2: Brands */}
          <div>
            <h4 className="font-mono text-xs font-bold uppercase text-white tracking-wider mb-4">
              Houses
            </h4>
            <ul className="space-y-2.5 text-xs font-mono">
              {ALL_BRANDS.map((brand) => (
                <li key={brand}>
                  <Link
                    href={`/sneakers?brand=${encodeURIComponent(brand)}`}
                    className="hover:text-[#d4ff00] transition-colors"
                  >
                    {brand}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 3: Editorial */}
          <div>
            <h4 className="font-mono text-xs font-bold uppercase text-white tracking-wider mb-4">
              Editorial
            </h4>
            <ul className="space-y-2.5 text-xs font-mono">
              <li>
                <Link href="/about" className="hover:text-[#d4ff00] transition-colors">
                  About SOLEVAULT
                </Link>
              </li>
              <li>
                <Link href="/collections" className="hover:text-[#d4ff00] transition-colors">
                  Curated Collections
                </Link>
              </li>
              <li>
                <Link href="/about#authenticity" className="hover:text-[#d4ff00] transition-colors">
                  Authentication Process
                </Link>
              </li>
              <li>
                <Link href="/about#concept-stores" className="hover:text-[#d4ff00] transition-colors">
                  Concept Destinations
                </Link>
              </li>
              <li>
                <Link href="/wishlist" className="hover:text-[#d4ff00] transition-colors">
                  Saved Rotation
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 4: Support */}
          <div>
            <h4 className="font-mono text-xs font-bold uppercase text-white tracking-wider mb-4">
              Client Care
            </h4>
            <ul className="space-y-2.5 text-xs font-mono">
              <li>
                <span className="hover:text-[#d4ff00] cursor-pointer">
                  Track Demo Order
                </span>
              </li>
              <li>
                <span className="hover:text-[#d4ff00] cursor-pointer">
                  Shipping Specifications
                </span>
              </li>
              <li>
                <span className="hover:text-[#d4ff00] cursor-pointer">
                  30-Day Exchange Protocol
                </span>
              </li>
              <li>
                <span className="hover:text-[#d4ff00] cursor-pointer">
                  Footwear Size Conversion
                </span>
              </li>
              <li>
                <span className="hover:text-[#d4ff00] cursor-pointer">
                  support@solevault.demo
                </span>
              </li>
            </ul>
          </div>

          {/* Col 5: Streetwear Newsletter summary & socials */}
          <div className="col-span-2 md:col-span-1">
            <h4 className="font-mono text-xs font-bold uppercase text-white tracking-wider mb-4">
              The Vault Network
            </h4>
            <p className="text-xs text-zinc-400 mb-4 leading-relaxed">
              Curated drops, editorial essays, and preview links broadcast directly from the Tokyo and London studios.
            </p>
            <div className="flex items-center gap-3 text-xs font-mono">
              <a
                href="#newsletter"
                className="inline-flex items-center gap-1 text-[#d4ff00] hover:underline"
              >
                <span>Newsletter</span>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </a>
              <span className="text-zinc-700">•</span>
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noreferrer"
                className="hover:text-white transition-colors"
              >
                IG
              </a>
              <span className="text-zinc-700">•</span>
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
        <h2 className="font-display text-[15vw] font-black uppercase tracking-tighter text-zinc-900/50 leading-none text-center hover:text-zinc-900/80 transition-colors">
          SOLE<span className="text-zinc-800">VAULT</span>
        </h2>
      </div>

      {/* Copyright & Demo Disclaimer */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 border-t border-zinc-800/60 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-mono text-zinc-500">
        <div>
          © {new Date().getFullYear()} SOLEVAULT. All rights reserved. Built for sneaker enthusiasts.
        </div>
        <div className="flex items-center gap-4 text-[11px]">
          <span>Demonstration E-Commerce Experience</span>
          <span>•</span>
          <span className="text-zinc-400">Deployed with Vercel</span>
        </div>
      </div>
    </footer>
  );
}
