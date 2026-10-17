import React from 'react';
import Link from 'next/link';
import { ArrowRight, Compass } from 'lucide-react';

export default function NotFound() {
  return (
    <div className="min-h-[75vh] bg-[#FAF7F2] text-[#1A1814] flex items-center justify-center px-4">
      <div className="max-w-md w-full text-center bg-white border border-[#E8E0D4] p-8 sm:p-12 rounded-3xl shadow-xl">
        <span className="font-mono text-xs uppercase tracking-widest text-[#B87333] font-semibold">
          ERROR 404 // VAULT ARCHIVE
        </span>
        <h1 className="font-serif text-3xl sm:text-4xl font-bold text-[#1A1814] mt-2 mb-4">
          Silhouette Not Found
        </h1>
        <p className="text-[#8C8275] text-xs sm:text-sm font-sans mb-8 leading-relaxed">
          The requested archive page or sneaker model does not exist in the active SOLEVAULT repository.
        </p>
        <Link
          href="/sneakers"
          className="inline-flex items-center gap-2 px-8 py-4 bg-[#B87333] hover:bg-[#8B5A2B] text-white font-medium text-xs uppercase tracking-wider rounded-full transition-all shadow-md active:scale-95"
        >
          <span>RETURN TO SNEAKER VAULT</span>
          <ArrowRight className="w-4 h-4" />
        </Link>
      </div>
    </div>
  );
}
