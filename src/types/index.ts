export type BrandName =
  | 'Nike'
  | 'Jordan'
  | 'Adidas'
  | 'New Balance'
  | 'ASICS'
  | 'Puma'
  | 'Converse';

export type ProductCategory =
  | 'Retro'
  | 'Basketball'
  | 'Running'
  | 'Lifestyle'
  | 'Skate';

export interface ProductColor {
  name: string;
  hex: string;
  bgClass: string;
}

export interface Product {
  id: string;
  slug: string;
  name: string;
  brand: BrandName;
  category: ProductCategory;
  price: number;
  originalPrice?: number;
  description: string;
  story: string;
  images: string[];
  availableSizes: number[];
  sizesOutOfStock: number[];
  availableColors: ProductColor[];
  stockQuantity: number;
  featured: boolean;
  newArrival: boolean;
  trending: boolean;
  sale: boolean;
  popularityScore: number;
  releaseDate: string;
  sku: string;
  gender: 'Men' | 'Women' | 'Unisex';
  specs: {
    upperMaterial: string;
    soleMaterial: string;
    cushioning: string;
    origin: string;
  };
  tags: string[];
}

export interface CartItem {
  id: string; // unique item id: `${productId}-${size}-${color}`
  product: Product;
  selectedSize: number;
  selectedColor: string;
  quantity: number;
}

export interface WishlistItem {
  product: Product;
  addedAt: number;
}

export interface ToastMessage {
  id: string;
  type: 'success' | 'info' | 'error';
  title: string;
  message?: string;
  image?: string;
}

export interface FilterState {
  searchQuery: string;
  brands: BrandName[];
  categories: ProductCategory[];
  sizes: number[];
  minPrice: number;
  maxPrice: number;
  colors: string[];
  inStockOnly: boolean;
  onSaleOnly: boolean;
  sortBy: 'featured' | 'newest' | 'price-asc' | 'price-desc' | 'popularity';
}

export interface BrandInfo {
  name: BrandName;
  slug: string;
  tagline: string;
  description: string;
  founded: string;
  origin: string;
  heroImage: string;
  featuredModel: string;
}

export interface CollectionItem {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  image: string;
  category?: ProductCategory;
  tag: string;
}
