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
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#1A1814]/70 backdrop-blur-sm animate-in fade-in duration-200"
      onClick={closeSizeGuide}
    >
      <div
        className="relative w-full max-w-2xl bg-[#FFFDF8] border border-[#E8E0D4] rounded-3xl shadow-2xl overflow-hidden p-6 sm:p-8"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between pb-5 border-b border-[#E8E0D4]">
          <div className="flex items-center gap-3">
            <div className="p-3 rounded-2xl bg-[#B87333]/10 text-[#B87333]">
              <Ruler className="w-5 h-5" />
            </div>
            <div>
              <h2 id="size-guide-title" className="font-serif text-xl sm:text-2xl font-bold text-[#1A1814]">
                Sizing & Fit Guide
              </h2>
              <p className="text-xs text-[#8C8275] font-mono">
                INTERNATIONAL CONVERSION MATRIX
              </p>
            </div>
          </div>
          <button
            onClick={closeSizeGuide}
            className="p-2 text-[#8C8275] hover:text-[#1A1814] rounded-full hover:bg-[#F0EBE3] transition-colors"
            aria-label="Close size guide"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Fit recommendations */}
        <div className="my-5 p-4 rounded-2xl bg-[#FAF7F2] border border-[#E8E0D4] flex items-start gap-3">
          <Check className="w-4 h-4 text-[#B87333] mt-0.5 flex-shrink-0" />
          <p className="text-xs text-[#1A1814] leading-relaxed">
            <strong className="text-[#1A1814] font-semibold">True to Size Advisory:</strong> Most Jordan, Nike, and ASICS models fit true to size. For Adidas Samba and Gazelle silhouettes, wide-foot wearers often size up by half a size.
          </p>
        </div>

        {/* Matrix table */}
        <div className="overflow-x-auto max-h-[380px] overflow-y-auto rounded-2xl border border-[#E8E0D4] bg-white">
          <table className="w-full text-left text-xs font-mono">
            <thead className="bg-[#FAF7F2] sticky top-0 text-[#8C8275] uppercase tracking-wider border-b border-[#E8E0D4]">
              <tr>
                <th className="py-3 px-4 text-[#B87333] font-bold">US Men</th>
                <th className="py-3 px-4">US Women</th>
                <th className="py-3 px-4">UK</th>
                <th className="py-3 px-4">EU</th>
                <th className="py-3 px-4">CM Length</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#F0EBE3] text-[#1A1814]">
              {sizeChart.map((row) => (
                <tr key={row.usMen} className="hover:bg-[#FAF7F2] transition-colors">
                  <td className="py-3 px-4 font-bold text-[#1A1814]">{row.usMen}</td>
                  <td className="py-3 px-4 text-[#8C8275]">{row.usWomen}</td>
                  <td className="py-3 px-4 text-[#8C8275]">{row.uk}</td>
                  <td className="py-3 px-4 text-[#8C8275]">{row.eu}</td>
                  <td className="py-3 px-4 text-[#8C8275]">{row.cm} cm</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="mt-6 flex justify-end">
          <button
            onClick={closeSizeGuide}
            className="px-6 py-2.5 bg-[#FAF7F2] hover:bg-[#F0EBE3] border border-[#E8E0D4] text-[#1A1814] font-sans text-xs font-medium rounded-full transition-colors"
          >
            Close Guide
          </button>
        </div>
      </div>
    </div>
  );
}
