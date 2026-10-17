'use client';

import React from 'react';
import { ALL_BRANDS, ALL_CATEGORIES, ALL_SIZES } from '@/data/products';
import { BrandName, ProductCategory } from '@/types';
import { X, Filter, RotateCcw, Check } from 'lucide-react';

interface CatalogFiltersProps {
  selectedBrands: BrandName[];
  selectedCategories: ProductCategory[];
  selectedSizes: number[];
  selectedColors: string[];
  priceRange: [number, number];
  inStockOnly: boolean;
  onSaleOnly: boolean;
  onToggleBrand: (brand: BrandName) => void;
  onToggleCategory: (cat: ProductCategory) => void;
  onToggleSize: (size: number) => void;
  onToggleColor: (color: string) => void;
  onChangePriceRange: (range: [number, number]) => void;
  onToggleInStock: () => void;
  onToggleOnSale: () => void;
  onResetFilters: () => void;
  isMobileDrawer?: boolean;
  onCloseMobileDrawer?: () => void;
}

const COLOR_OPTIONS = [
  { name: 'Black', hex: '#18181b' },
  { name: 'White', hex: '#ffffff' },
  { name: 'Grey', hex: '#71717a' },
  { name: 'Red', hex: '#dc2626' },
  { name: 'Blue', hex: '#2563eb' },
  { name: 'Green', hex: '#16a34a' },
  { name: 'Yellow', hex: '#B87333' },
  { name: 'Brown', hex: '#78350f' },
];

export function CatalogFilters({
  selectedBrands,
  selectedCategories,
  selectedSizes,
  selectedColors,
  priceRange,
  inStockOnly,
  onSaleOnly,
  onToggleBrand,
  onToggleCategory,
  onToggleSize,
  onToggleColor,
  onChangePriceRange,
  onToggleInStock,
  onToggleOnSale,
  onResetFilters,
  isMobileDrawer = false,
  onCloseMobileDrawer,
}: CatalogFiltersProps) {
  return (
    <div className="space-y-6 text-[#1A1814]">
      {/* Mobile drawer header */}
      {isMobileDrawer && (
        <div className="flex items-center justify-between pb-4 border-b border-[#E8E0D4]">
          <div className="flex items-center gap-2">
            <Filter className="w-4 h-4 text-[#B87333]" />
            <h3 className="font-serif text-lg font-bold text-[#1A1814]">
              Filter Catalog
            </h3>
          </div>
          <button
            onClick={onCloseMobileDrawer}
            className="p-2 text-[#8C8275] hover:text-[#1A1814] rounded-full hover:bg-[#F0EBE3] transition-colors"
            aria-label="Close filters"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      )}

      {/* Filter Reset */}
      <div className="flex items-center justify-between pb-3 border-b border-[#E8E0D4]">
        <span className="font-mono text-[11px] uppercase tracking-wider text-[#8C8275] font-semibold">
          Refine Selection
        </span>
        <button
          onClick={onResetFilters}
          className="font-mono text-[11px] text-[#B87333] hover:underline flex items-center gap-1 font-semibold"
        >
          <RotateCcw className="w-3 h-3" />
          <span>Reset</span>
        </button>
      </div>

      {/* Brands Filter */}
      <div>
        <h4 className="font-serif text-xs font-bold uppercase tracking-wider text-[#1A1814] mb-3">
          House / Lineage
        </h4>
        <div className="space-y-2 max-h-48 overflow-y-auto pr-1">
          {ALL_BRANDS.map((brand) => {
            const isChecked = selectedBrands.includes(brand);
            return (
              <label
                key={brand}
                className="flex items-center gap-2.5 text-xs text-[#8C8275] hover:text-[#1A1814] cursor-pointer select-none py-0.5"
              >
                <div
                  onClick={() => onToggleBrand(brand)}
                  className={`w-4 h-4 rounded border flex items-center justify-center transition-all ${
                    isChecked
                      ? 'bg-[#B87333] border-[#B87333] text-white font-bold'
                      : 'border-[#E8E0D4] bg-[#FAF7F2] hover:border-[#B87333]'
                  }`}
                >
                  {isChecked && <Check className="w-3 h-3 stroke-[3]" />}
                </div>
                <span className={isChecked ? 'font-medium text-[#1A1814]' : ''}>{brand}</span>
              </label>
            );
          })}
        </div>
      </div>

      {/* Categories Filter */}
      <div className="pt-4 border-t border-[#E8E0D4]">
        <h4 className="font-serif text-xs font-bold uppercase tracking-wider text-[#1A1814] mb-3">
          Silhouette Category
        </h4>
        <div className="space-y-2">
          {ALL_CATEGORIES.map((cat) => {
            const isChecked = selectedCategories.includes(cat);
            return (
              <label
                key={cat}
                className="flex items-center gap-2.5 text-xs text-[#8C8275] hover:text-[#1A1814] cursor-pointer select-none py-0.5"
              >
                <div
                  onClick={() => onToggleCategory(cat)}
                  className={`w-4 h-4 rounded border flex items-center justify-center transition-all ${
                    isChecked
                      ? 'bg-[#B87333] border-[#B87333] text-white font-bold'
                      : 'border-[#E8E0D4] bg-[#FAF7F2] hover:border-[#B87333]'
                  }`}
                >
                  {isChecked && <Check className="w-3 h-3 stroke-[3]" />}
                </div>
                <span className={isChecked ? 'font-medium text-[#1A1814]' : ''}>{cat}</span>
              </label>
            );
          })}
        </div>
      </div>

      {/* Shoe Sizes Filter */}
      <div className="pt-4 border-t border-[#E8E0D4]">
        <h4 className="font-serif text-xs font-bold uppercase tracking-wider text-[#1A1814] mb-3">
          Size (US Men)
        </h4>
        <div className="grid grid-cols-4 gap-1.5">
          {ALL_SIZES.map((size) => {
            const isSelected = selectedSizes.includes(size);
            return (
              <button
                key={size}
                type="button"
                onClick={() => onToggleSize(size)}
                className={`py-1.5 text-xs font-mono rounded-lg border transition-all ${
                  isSelected
                    ? 'bg-[#B87333] border-[#B87333] text-white font-bold shadow-sm'
                    : 'bg-[#FAF7F2] border-[#E8E0D4] text-[#1A1814] hover:border-[#B87333]'
                }`}
              >
                {size}
              </button>
            );
          })}
        </div>
      </div>

      {/* Price Range Slider */}
      <div className="pt-4 border-t border-[#E8E0D4]">
        <div className="flex items-center justify-between mb-3">
          <h4 className="font-serif text-xs font-bold uppercase tracking-wider text-[#1A1814]">
            Price Limit
          </h4>
          <span className="font-mono text-xs font-bold text-[#B87333]">
            ${priceRange[1]}
          </span>
        </div>
        <input
          type="range"
          min="70"
          max="260"
          step="10"
          value={priceRange[1]}
          onChange={(e) => onChangePriceRange([priceRange[0], Number(e.target.value)])}
          className="w-full accent-[#B87333] cursor-pointer bg-[#E8E0D4] rounded-lg h-1.5"
        />
        <div className="flex justify-between font-mono text-[10px] text-[#8C8275] mt-2">
          <span>$70</span>
          <span>$160</span>
          <span>$260+</span>
        </div>
      </div>

      {/* Color Swatches */}
      <div className="pt-4 border-t border-[#E8E0D4]">
        <h4 className="font-serif text-xs font-bold uppercase tracking-wider text-[#1A1814] mb-3">
          Color Palette
        </h4>
        <div className="flex flex-wrap gap-2">
          {COLOR_OPTIONS.map((col) => {
            const isSelected = selectedColors.includes(col.name.toLowerCase());
            return (
              <button
                key={col.name}
                type="button"
                onClick={() => onToggleColor(col.name.toLowerCase())}
                className={`w-6 h-6 rounded-full border-2 transition-transform ${
                  isSelected
                    ? 'border-[#B87333] scale-125 shadow-md ring-2 ring-[#B87333]/20'
                    : 'border-[#E8E0D4] hover:scale-110'
                }`}
                style={{ backgroundColor: col.hex }}
                title={col.name}
                aria-label={`Filter by ${col.name}`}
              />
            );
          })}
        </div>
      </div>

      {/* Availability / Sale Toggles */}
      <div className="pt-4 border-t border-[#E8E0D4] space-y-2.5 text-xs">
        <label className="flex items-center gap-2.5 text-[#8C8275] hover:text-[#1A1814] cursor-pointer select-none">
          <div
            onClick={onToggleInStock}
            className={`w-4 h-4 rounded border flex items-center justify-center transition-all ${
              inStockOnly
                ? 'bg-[#B87333] border-[#B87333] text-white font-bold'
                : 'border-[#E8E0D4] bg-[#FAF7F2] hover:border-[#B87333]'
            }`}
          >
            {inStockOnly && <Check className="w-3 h-3 stroke-[3]" />}
          </div>
          <span className={inStockOnly ? 'font-medium text-[#1A1814]' : ''}>In Vault Stock Only</span>
        </label>

        <label className="flex items-center gap-2.5 text-[#8C8275] hover:text-[#1A1814] cursor-pointer select-none">
          <div
            onClick={onToggleOnSale}
            className={`w-4 h-4 rounded border flex items-center justify-center transition-all ${
              onSaleOnly
                ? 'bg-[#B87333] border-[#B87333] text-white font-bold'
                : 'border-[#E8E0D4] bg-[#FAF7F2] hover:border-[#B87333]'
            }`}
          >
            {onSaleOnly && <Check className="w-3 h-3 stroke-[3]" />}
          </div>
          <span className="text-[#8B5A2B] font-medium">Archive Sale Offers</span>
        </label>
      </div>

      {isMobileDrawer && (
        <div className="pt-6">
          <button
            onClick={onCloseMobileDrawer}
            className="w-full py-3.5 bg-[#B87333] hover:bg-[#8B5A2B] text-white font-medium text-xs rounded-full shadow-md transition-colors"
          >
            Apply Filters
          </button>
        </div>
      )}
    </div>
  );
}
