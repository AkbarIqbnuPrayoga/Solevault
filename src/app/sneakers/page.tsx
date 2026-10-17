'use client';

import React, { useState, useMemo, useEffect, Suspense } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { PRODUCTS, ALL_BRANDS, ALL_CATEGORIES } from '@/data/products';
import { Product, BrandName, ProductCategory } from '@/types';
import { ProductCard } from '@/components/catalog/ProductCard';
import { CatalogFilters } from '@/components/catalog/CatalogFilters';
import {
  Search,
  SlidersHorizontal,
  LayoutGrid,
  Grid3X3,
  X,
  RotateCcw,
  Sparkles,
  ArrowUpDown,
} from 'lucide-react';

function CatalogContent() {
  const searchParams = useSearchParams();
  const router = useRouter();

  // URL state initialization
  const initialBrandParam = searchParams.get('brand');
  const initialCategoryParam = searchParams.get('category');
  const initialSortParam = searchParams.get('sort');
  const initialSaleParam = searchParams.get('sale');
  const initialFeaturedParam = searchParams.get('featured');

  // Filter States
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedBrands, setSelectedBrands] = useState<BrandName[]>(() => {
    if (initialBrandParam && ALL_BRANDS.includes(initialBrandParam as BrandName)) {
      return [initialBrandParam as BrandName];
    }
    return [];
  });
  const [selectedCategories, setSelectedCategories] = useState<ProductCategory[]>(() => {
    if (initialCategoryParam && ALL_CATEGORIES.includes(initialCategoryParam as ProductCategory)) {
      return [initialCategoryParam as ProductCategory];
    }
    return [];
  });
  const [selectedSizes, setSelectedSizes] = useState<number[]>([]);
  const [selectedColors, setSelectedColors] = useState<string[]>([]);
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 260]);
  const [inStockOnly, setInStockOnly] = useState(false);
  const [onSaleOnly, setOnSaleOnly] = useState<boolean>(initialSaleParam === 'true');
  const [sortBy, setSortBy] = useState<string>(initialSortParam || (initialFeaturedParam ? 'popularity' : 'featured'));
  
  // UI States
  const [gridCols, setGridCols] = useState<'3' | '4'>('4');
  const [isMobileFiltersOpen, setIsMobileFiltersOpen] = useState(false);
  const [visibleCount, setVisibleCount] = useState(12);

  // Sync state if URL searchParams change
  useEffect(() => {
    const brand = searchParams.get('brand');
    if (brand && ALL_BRANDS.includes(brand as BrandName)) {
      setSelectedBrands([brand as BrandName]);
    }
    const cat = searchParams.get('category');
    if (cat && ALL_CATEGORIES.includes(cat as ProductCategory)) {
      setSelectedCategories([cat as ProductCategory]);
    }
    if (searchParams.get('sale') === 'true') {
      setOnSaleOnly(true);
    }
    if (searchParams.get('sort')) {
      setSortBy(searchParams.get('sort')!);
    }
  }, [searchParams]);

  // Handlers
  const handleToggleBrand = (brand: BrandName) => {
    setSelectedBrands((prev) =>
      prev.includes(brand) ? prev.filter((b) => b !== brand) : [...prev, brand]
    );
  };

  const handleToggleCategory = (cat: ProductCategory) => {
    setSelectedCategories((prev) =>
      prev.includes(cat) ? prev.filter((c) => c !== cat) : [...prev, cat]
    );
  };

  const handleToggleSize = (size: number) => {
    setSelectedSizes((prev) =>
      prev.includes(size) ? prev.filter((s) => s !== size) : [...prev, size]
    );
  };

  const handleToggleColor = (color: string) => {
    setSelectedColors((prev) =>
      prev.includes(color) ? prev.filter((c) => c !== color) : [...prev, color]
    );
  };

  const handleResetFilters = () => {
    setSearchQuery('');
    setSelectedBrands([]);
    setSelectedCategories([]);
    setSelectedSizes([]);
    setSelectedColors([]);
    setPriceRange([0, 260]);
    setInStockOnly(false);
    setOnSaleOnly(false);
    setSortBy('featured');
    router.replace('/sneakers');
  };

  // Filter Algorithm
  const filteredProducts = useMemo(() => {
    return PRODUCTS.filter((product) => {
      // 1. Text Search Query
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase().trim();
        const matchesName = product.name.toLowerCase().includes(q);
        const matchesBrand = product.brand.toLowerCase().includes(q);
        const matchesCategory = product.category.toLowerCase().includes(q);
        const matchesSKU = product.sku.toLowerCase().includes(q);
        const matchesTags = product.tags.some((t) => t.toLowerCase().includes(q));
        if (!matchesName && !matchesBrand && !matchesCategory && !matchesSKU && !matchesTags) {
          return false;
        }
      }

      // 2. Brand Filter
      if (selectedBrands.length > 0 && !selectedBrands.includes(product.brand)) {
        return false;
      }

      // 3. Category Filter
      if (selectedCategories.length > 0 && !selectedCategories.includes(product.category)) {
        return false;
      }

      // 4. Size Filter
      if (selectedSizes.length > 0) {
        const hasSize = selectedSizes.some(
          (size) => product.availableSizes.includes(size) && !product.sizesOutOfStock.includes(size)
        );
        if (!hasSize) return false;
      }

      // 5. Color Filter
      if (selectedColors.length > 0) {
        const matchesColor = product.availableColors.some((c) =>
          selectedColors.includes(c.name.toLowerCase())
        );
        if (!matchesColor) return false;
      }

      // 6. Price Range Filter
      if (product.price < priceRange[0] || product.price > priceRange[1]) {
        return false;
      }

      // 7. Stock status
      if (inStockOnly && product.stockQuantity <= 0) {
        return false;
      }

      // 8. Sale filter
      if (onSaleOnly && !product.sale) {
        return false;
      }

      return true;
    }).sort((a, b) => {
      // Sorting
      if (sortBy === 'newest') {
        return (b.newArrival ? 1 : 0) - (a.newArrival ? 1 : 0);
      }
      if (sortBy === 'price-asc') {
        return a.price - b.price;
      }
      if (sortBy === 'price-desc') {
        return b.price - a.price;
      }
      if (sortBy === 'popularity') {
        return b.popularityScore - a.popularityScore;
      }
      // Default: featured
      return (b.featured ? 1 : 0) - (a.featured ? 1 : 0);
    });
  }, [
    searchQuery,
    selectedBrands,
    selectedCategories,
    selectedSizes,
    selectedColors,
    priceRange,
    inStockOnly,
    onSaleOnly,
    sortBy,
  ]);

  const activeFilterCount =
    (searchQuery ? 1 : 0) +
    selectedBrands.length +
    selectedCategories.length +
    selectedSizes.length +
    selectedColors.length +
    (priceRange[1] < 260 ? 1 : 0) +
    (inStockOnly ? 1 : 0) +
    (onSaleOnly ? 1 : 0);

  const displayedProducts = filteredProducts.slice(0, visibleCount);
  const hasMore = visibleCount < filteredProducts.length;

  return (
    <div className="min-h-screen bg-[#FAF7F2] text-[#1A1814] py-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header Breadcrumbs & Title */}
        <div className="border-b border-[#E8E0D4] pb-8 mb-8">
          <div className="flex items-center gap-2 mb-2">
            <span className="font-mono text-[11px] uppercase tracking-[0.25em] text-[#B87333] font-semibold">
              ARCHIVE DOSSIER
            </span>
          </div>
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
            <div>
              <h1 className="font-serif text-3xl sm:text-5xl font-bold text-[#1A1814] tracking-tight">
                The Sneaker <span className="italic text-[#B87333]">Vault</span>
              </h1>
              <p className="text-sm text-[#8C8275] mt-2 max-w-xl font-sans">
                Curated architectural silhouettes, limited edition drops, and timeless staples from our global partner houses.
              </p>
            </div>
            <span className="font-mono text-xs text-[#8C8275] bg-white border border-[#E8E0D4] px-3.5 py-1.5 rounded-full shadow-sm">
              Displaying {filteredProducts.length} curated pairs
            </span>
          </div>
        </div>

        {/* Toolbar: Search, Sort & Controls */}
        <div className="flex flex-col lg:flex-row gap-4 justify-between items-stretch lg:items-center mb-6">
          {/* Search Input */}
          <div className="relative flex-1 max-w-lg">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-[#8C8275]" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search by silhouette, colorway, or SKU..."
              className="w-full bg-white border border-[#E8E0D4] text-[#1A1814] placeholder-[#8C8275] text-xs font-sans pl-11 pr-4 py-3.5 rounded-full focus:border-[#B87333] focus:outline-none transition-all shadow-sm"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-[#8C8275] hover:text-[#1A1814]"
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </div>

          {/* Sort Dropdown & Layout Buttons */}
          <div className="flex items-center gap-3">
            {/* Mobile Filter Button */}
            <button
              type="button"
              onClick={() => setIsMobileFiltersOpen(true)}
              className="lg:hidden flex-1 sm:flex-none flex items-center justify-center gap-2 px-4 py-3 bg-white border border-[#E8E0D4] rounded-full text-xs font-sans uppercase tracking-wider text-[#1A1814] shadow-sm"
            >
              <SlidersHorizontal className="w-4 h-4 text-[#B87333]" />
              <span>Filters ({activeFilterCount})</span>
            </button>

            {/* Sort Dropdown */}
            <div className="relative flex items-center">
              <ArrowUpDown className="absolute left-3.5 w-3.5 h-3.5 text-[#8C8275] pointer-events-none" />
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="bg-white border border-[#E8E0D4] text-[#1A1814] font-sans text-xs pl-9 pr-8 py-3 rounded-full focus:border-[#B87333] focus:outline-none cursor-pointer appearance-none shadow-sm font-medium"
                aria-label="Sort products"
              >
                <option value="featured">Sort: Featured Picks</option>
                <option value="newest">Sort: Newest Drops</option>
                <option value="price-asc">Sort: Price: Low to High</option>
                <option value="price-desc">Sort: Price: High to Low</option>
                <option value="popularity">Sort: Most Popular</option>
              </select>
            </div>

            {/* Column Layout Toggle (Desktop) */}
            <div className="hidden lg:flex items-center border border-[#E8E0D4] rounded-full overflow-hidden bg-white p-1 shadow-sm">
              <button
                type="button"
                onClick={() => setGridCols('3')}
                className={`p-2 rounded-full transition-colors ${
                  gridCols === '3' ? 'bg-[#FAF7F2] text-[#B87333] shadow-sm' : 'text-[#8C8275] hover:text-[#1A1814]'
                }`}
                title="3 columns grid"
                aria-label="3 columns grid view"
              >
                <LayoutGrid className="w-4 h-4" />
              </button>
              <button
                type="button"
                onClick={() => setGridCols('4')}
                className={`p-2 rounded-full transition-colors ${
                  gridCols === '4' ? 'bg-[#FAF7F2] text-[#B87333] shadow-sm' : 'text-[#8C8275] hover:text-[#1A1814]'
                }`}
                title="4 columns grid"
                aria-label="4 columns grid view"
              >
                <Grid3X3 className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>

        {/* Active Filter Chips */}
        {activeFilterCount > 0 && (
          <div className="flex flex-wrap items-center gap-2 mb-8 pt-2">
            <span className="font-mono text-xs text-[#8C8275]">Active Filters:</span>
            
            {searchQuery && (
              <span className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-white border border-[#E8E0D4] text-xs text-[#1A1814] shadow-sm">
                &ldquo;{searchQuery}&rdquo;
                <button onClick={() => setSearchQuery('')} className="hover:text-[#B87333]">
                  <X className="w-3 h-3" />
                </button>
              </span>
            )}

            {selectedBrands.map((b) => (
              <span key={b} className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-[#B87333]/10 border border-[#B87333]/30 text-xs font-medium text-[#B87333]">
                {b}
                <button onClick={() => handleToggleBrand(b)} className="hover:text-[#1A1814]">
                  <X className="w-3 h-3" />
                </button>
              </span>
            ))}

            {selectedCategories.map((c) => (
              <span key={c} className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-white border border-[#E8E0D4] text-xs text-[#1A1814] shadow-sm">
                {c}
                <button onClick={() => handleToggleCategory(c)} className="hover:text-[#B87333]">
                  <X className="w-3 h-3" />
                </button>
              </span>
            ))}

            {selectedSizes.map((s) => (
              <span key={s} className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-white border border-[#E8E0D4] text-xs font-mono text-[#1A1814] shadow-sm">
                US {s}
                <button onClick={() => handleToggleSize(s)} className="hover:text-[#B87333]">
                  <X className="w-3 h-3" />
                </button>
              </span>
            ))}

            {selectedColors.map((col) => (
              <span key={col} className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-white border border-[#E8E0D4] text-xs text-[#1A1814] capitalize shadow-sm">
                {col}
                <button onClick={() => handleToggleColor(col)} className="hover:text-[#B87333]">
                  <X className="w-3 h-3" />
                </button>
              </span>
            ))}

            {priceRange[1] < 260 && (
              <span className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-white border border-[#E8E0D4] text-xs font-mono text-[#1A1814] shadow-sm">
                Up to ${priceRange[1]}
                <button onClick={() => setPriceRange([0, 260])} className="hover:text-[#B87333]">
                  <X className="w-3 h-3" />
                </button>
              </span>
            )}

            {inStockOnly && (
              <span className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-white border border-[#E8E0D4] text-xs text-[#1A1814] shadow-sm">
                In Stock Only
                <button onClick={() => setInStockOnly(false)} className="hover:text-[#B87333]">
                  <X className="w-3 h-3" />
                </button>
              </span>
            )}

            {onSaleOnly && (
              <span className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-[#B87333]/15 border border-[#B87333]/40 text-xs text-[#8B5A2B] font-medium">
                Archive Sale
                <button onClick={() => setOnSaleOnly(false)} className="hover:text-[#1A1814]">
                  <X className="w-3 h-3" />
                </button>
              </span>
            )}

            <button
              onClick={handleResetFilters}
              className="font-mono text-xs text-[#B87333] hover:underline flex items-center gap-1 ml-2 font-semibold"
            >
              <RotateCcw className="w-3 h-3" />
              <span>Clear All</span>
            </button>
          </div>
        )}

        {/* Main Grid: Filter Sidebar + Products Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Desktop Left Filter Sidebar */}
          <aside className="hidden lg:block lg:col-span-3 sticky top-28 p-6 bg-white border border-[#E8E0D4] rounded-3xl shadow-sm">
            <CatalogFilters
              selectedBrands={selectedBrands}
              selectedCategories={selectedCategories}
              selectedSizes={selectedSizes}
              selectedColors={selectedColors}
              priceRange={priceRange}
              inStockOnly={inStockOnly}
              onSaleOnly={onSaleOnly}
              onToggleBrand={handleToggleBrand}
              onToggleCategory={handleToggleCategory}
              onToggleSize={handleToggleSize}
              onToggleColor={handleToggleColor}
              onChangePriceRange={setPriceRange}
              onToggleInStock={() => setInStockOnly(!inStockOnly)}
              onToggleOnSale={() => setOnSaleOnly(!onSaleOnly)}
              onResetFilters={handleResetFilters}
            />
          </aside>

          {/* Right Product Grid */}
          <div className="lg:col-span-9">
            {displayedProducts.length > 0 ? (
              <>
                <div
                  className={`grid gap-6 ${
                    gridCols === '4'
                      ? 'grid-cols-1 sm:grid-cols-2 xl:grid-cols-3'
                      : 'grid-cols-1 sm:grid-cols-2 xl:grid-cols-2'
                  }`}
                >
                  {displayedProducts.map((product) => (
                    <ProductCard key={product.id} product={product} />
                  ))}
                </div>

                {/* Load More Button */}
                {hasMore && (
                  <div className="mt-12 flex flex-col items-center justify-center gap-3">
                    <p className="font-mono text-xs text-[#8C8275]">
                      Showing {displayedProducts.length} of {filteredProducts.length} silhouettes
                    </p>
                    <button
                      onClick={() => setVisibleCount((prev) => prev + 8)}
                      className="px-8 py-3.5 bg-[#FAF7F2] hover:bg-white text-[#1A1814] hover:text-[#B87333] border border-[#E8E0D4] hover:border-[#B87333] font-sans text-xs font-semibold uppercase tracking-wider rounded-full transition-all shadow-sm active:scale-95"
                    >
                      Load More Drops
                    </button>
                  </div>
                )}
              </>
            ) : (
              /* Empty State */
              <div className="p-12 text-center bg-white border border-[#E8E0D4] rounded-3xl shadow-sm">
                <div className="w-16 h-16 rounded-full bg-[#FAF7F2] border border-[#E8E0D4] flex items-center justify-center text-[#8C8275] mx-auto mb-4">
                  <Search className="w-8 h-8" />
                </div>
                <h3 className="font-serif text-2xl font-bold text-[#1A1814] mb-2">
                  No Matching Silhouettes
                </h3>
                <p className="text-[#8C8275] text-xs max-w-md mx-auto mb-6">
                  No footwear matches the active combination of filters and search queries. Try removing some filters or resetting to the full catalog.
                </p>
                <button
                  onClick={handleResetFilters}
                  className="px-6 py-3 bg-[#B87333] hover:bg-[#8B5A2B] text-white font-sans text-xs font-medium rounded-full transition-colors shadow-sm"
                >
                  Reset All Filters
                </button>
              </div>
            )}
          </div>

        </div>
      </div>

      {/* Mobile Filters Slide-out Sheet */}
      {isMobileFiltersOpen && (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-50 flex lg:hidden bg-[#1A1814]/70 backdrop-blur-sm animate-in fade-in duration-200"
          onClick={() => setIsMobileFiltersOpen(false)}
        >
          <div
            className="w-[85%] max-w-sm bg-[#FFFDF8] h-full border-r border-[#E8E0D4] p-6 overflow-y-auto shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <CatalogFilters
              selectedBrands={selectedBrands}
              selectedCategories={selectedCategories}
              selectedSizes={selectedSizes}
              selectedColors={selectedColors}
              priceRange={priceRange}
              inStockOnly={inStockOnly}
              onSaleOnly={onSaleOnly}
              onToggleBrand={handleToggleBrand}
              onToggleCategory={handleToggleCategory}
              onToggleSize={handleToggleSize}
              onToggleColor={handleToggleColor}
              onChangePriceRange={setPriceRange}
              onToggleInStock={() => setInStockOnly(!inStockOnly)}
              onToggleOnSale={() => setOnSaleOnly(!onSaleOnly)}
              onResetFilters={handleResetFilters}
              isMobileDrawer={true}
              onCloseMobileDrawer={() => setIsMobileFiltersOpen(false)}
            />
          </div>
        </div>
      )}
    </div>
  );
}

export default function SneakersPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen bg-[#FAF7F2] flex items-center justify-center">
          <div className="font-mono text-xs uppercase tracking-widest text-[#B87333] animate-pulse">
            LOADING VAULT ARCHIVE...
          </div>
        </div>
      }
    >
      <CatalogContent />
    </Suspense>
  );
}
