'use client';

import React from 'react';
import { useStore } from '@/store/useStore';
import { X, Ruler, Check } from 'lucide-react';

export function SizeGuideModal() {
  const { isSizeGuideOpen, closeSizeGuide } = useStore();

  if (!isSizeGuideOpen) return null;

  const sizeChart = [
    { usMen: '7.0', usWomen: '8.5', uk: '6.0', eu: '40.0', cm: '25.0' },
    { usMen: '7.5', usWomen: '9.0', uk: '6.5', eu: '40.5', cm: '25.5' },
    { usMen: '8.0', usWomen: '9.5', uk: '7.0', eu: '41.0', cm: '26.0' },
    { usMen: '8.5', usWomen: '10.0', uk: '7.5', eu: '42.0', cm: '26.5' },
    { usMen: '9.0', usWomen: '10.5', uk: '8.0', eu: '42.5', cm: '27.0' },
    { usMen: '9.5', usWomen: '11.0', uk: '8.5', eu: '43.0', cm: '27.5' },
    { usMen: '10.0', usWomen: '11.5', uk: '9.0', eu: '44.0', cm: '28.0' },
    { usMen: '10.5', usWomen: '12.0', uk: '9.5', eu: '44.5', cm: '28.5' },
    { usMen: '11.0', usWomen: '12.5', uk: '10.0', eu: '45.0', cm: '29.0' },
    { usMen: '11.5', usWomen: '13.0', uk: '10.5', eu: '45.5', cm: '29.5' },
    { usMen: '12.0', usWomen: '13.5', uk: '11.0', eu: '46.0', cm: '30.0' },
    { usMen: '13.0', usWomen: '14.5', uk: '12.0', eu: '47.5', cm: '31.0' },
  ];

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="size-guide-title"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in duration-200"
    >
      <div
        className="relative w-full max-w-2xl bg-[#111115] border border-zinc-800 rounded-2xl shadow-2xl overflow-hidden p-6 sm:p-8"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between pb-6 border-b border-zinc-800">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-lg bg-[#d4ff00]/10 text-[#d4ff00]">
              <Ruler className="w-5 h-5" />
            </div>
            <div>
              <h2 id="size-guide-title" className="font-display text-xl font-bold uppercase tracking-tight text-white">
                Sizing & Fit Specification
              </h2>
              <p className="text-xs text-zinc-400 font-mono">
                INTERNATIONAL CONVERSION MATRIX
              </p>
            </div>
          </div>
          <button
            onClick={closeSizeGuide}
            className="p-2 text-zinc-400 hover:text-white rounded-lg hover:bg-zinc-800/60 transition-colors"
            aria-label="Close size guide"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Fit recommendations */}
        <div className="my-5 p-4 rounded-xl bg-zinc-900/80 border border-zinc-800/80 flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
          <div className="flex items-start gap-2.5">
            <Check className="w-4 h-4 text-[#d4ff00] mt-0.5 flex-shrink-0" />
            <p className="text-xs text-zinc-300 leading-relaxed">
              <strong className="text-white">True to Size:</strong> Most Jordan, Nike, and ASICS models fit true to size. For Adidas Samba and Gazelle, wide-foot wearers often size up by 0.5.
            </p>
          </div>
        </div>

        {/* Matrix table */}
        <div className="overflow-x-auto max-h-[380px] overflow-y-auto rounded-lg border border-zinc-800">
          <table className="w-full text-left text-xs font-mono">
            <thead className="bg-zinc-900 sticky top-0 text-zinc-400 uppercase tracking-wider border-b border-zinc-800">
              <tr>
                <th className="py-3 px-4 text-[#d4ff00] font-bold">US Men</th>
                <th className="py-3 px-4">US Women</th>
                <th className="py-3 px-4">UK</th>
                <th className="py-3 px-4">EU</th>
                <th className="py-3 px-4">CM Length</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-zinc-800/60 text-zinc-300">
              {sizeChart.map((row) => (
                <tr key={row.usMen} className="hover:bg-zinc-800/30 transition-colors">
                  <td className="py-3 px-4 font-bold text-white">{row.usMen}</td>
                  <td className="py-3 px-4">{row.usWomen}</td>
                  <td className="py-3 px-4">{row.uk}</td>
                  <td className="py-3 px-4">{row.eu}</td>
                  <td className="py-3 px-4 text-zinc-400">{row.cm} cm</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="mt-6 flex justify-end">
          <button
            onClick={closeSizeGuide}
            className="px-6 py-2.5 bg-zinc-800 hover:bg-zinc-700 text-white font-mono text-xs uppercase tracking-wider rounded-lg transition-colors"
          >
            Close Guide
          </button>
        </div>
      </div>
    </div>
  );
}
