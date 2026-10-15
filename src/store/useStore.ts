'use client';

import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import { Product, CartItem, ToastMessage } from '@/types';

interface StoreState {
  // Cart
  cart: CartItem[];
  isCartOpen: boolean;
  discountCode: string | null;
  discountPercent: number;
  openCart: () => void;
  closeCart: () => void;
  toggleCart: () => void;
  addToCart: (
    product: Product,
    selectedSize: number,
    selectedColor: string,
    quantity?: number
  ) => { success: boolean; message: string };
  removeFromCart: (itemId: string) => void;
  updateQuantity: (itemId: string, delta: number) => void;
  clearCart: () => void;
  applyDiscount: (code: string) => { success: boolean; message: string };
  removeDiscount: () => void;
  getCartSubtotal: () => number;
  getDiscountAmount: () => number;
  getCartTotal: () => number;
  getCartCount: () => number;

  // Wishlist
  wishlist: Product[];
  toggleWishlist: (product: Product) => { added: boolean };
  isInWishlist: (productId: string) => boolean;
  removeFromWishlist: (productId: string) => void;
  clearWishlist: () => void;
  getWishlistCount: () => number;

  // Recently Viewed
  recentlyViewed: Product[];
  addRecentlyViewed: (product: Product) => void;

  // Search Overlay
  isSearchOpen: boolean;
  searchQuery: string;
  recentSearches: string[];
  setSearchOpen: (open: boolean) => void;
  setSearchQuery: (query: string) => void;
  addRecentSearch: (query: string) => void;
  removeRecentSearch: (query: string) => void;
  clearRecentSearches: () => void;

  // Quick View Modal
  quickViewProduct: Product | null;
  openQuickView: (product: Product) => void;
  closeQuickView: () => void;

  // Size Guide Modal
  isSizeGuideOpen: boolean;
  openSizeGuide: () => void;
  closeSizeGuide: () => void;

  // Toasts
  toasts: ToastMessage[];
  addToast: (toast: Omit<ToastMessage, 'id'>) => void;
  removeToast: (id: string) => void;
}

export const useStore = create<StoreState>()(
  persist(
    (set, get) => ({
      // Cart state
      cart: [],
      isCartOpen: false,
      discountCode: null,
      discountPercent: 0,

      openCart: () => set({ isCartOpen: true }),
      closeCart: () => set({ isCartOpen: false }),
      toggleCart: () => set((state) => ({ isCartOpen: !state.isCartOpen })),

      addToCart: (product, selectedSize, selectedColor, quantity = 1) => {
        if (!selectedSize) {
          return { success: false, message: 'Please select a shoe size.' };
        }

        if (product.sizesOutOfStock.includes(selectedSize)) {
          return {
            success: false,
            message: `Size US ${selectedSize} is currently out of stock.`,
          };
        }

        const itemId = `${product.id}-${selectedSize}-${selectedColor}`;
        const existingItem = get().cart.find((item) => item.id === itemId);

        const currentQty = existingItem ? existingItem.quantity : 0;
        const newQty = currentQty + quantity;

        if (newQty > product.stockQuantity) {
          return {
            success: false,
            message: `Maximum available inventory reached (${product.stockQuantity} pairs).`,
          };
        }

        if (existingItem) {
          set({
            cart: get().cart.map((item) =>
              item.id === itemId ? { ...item, quantity: newQty } : item
            ),
          });
        } else {
          set({
            cart: [
              ...get().cart,
              {
                id: itemId,
                product,
                selectedSize,
                selectedColor,
                quantity,
              },
            ],
          });
        }

        get().addToast({
          type: 'success',
          title: 'ADDED TO VAULT',
          message: `${product.name} (US ${selectedSize})`,
          image: product.images[0],
        });

        return { success: true, message: 'Item added to cart.' };
      },

      removeFromCart: (itemId) => {
        const itemToRemove = get().cart.find((i) => i.id === itemId);
        set({ cart: get().cart.filter((item) => item.id !== itemId) });
        if (itemToRemove) {
          get().addToast({
            type: 'info',
            title: 'REMOVED FROM BAG',
            message: `${itemToRemove.product.name} (US ${itemToRemove.selectedSize})`,
          });
        }
      },

      updateQuantity: (itemId, delta) => {
        const currentCart = get().cart;
        const item = currentCart.find((i) => i.id === itemId);
        if (!item) return;

        const updatedQty = item.quantity + delta;
        if (updatedQty <= 0) {
          get().removeFromCart(itemId);
          return;
        }

        if (updatedQty > item.product.stockQuantity) {
          get().addToast({
            type: 'error',
            title: 'STOCK LIMIT',
            message: `Only ${item.product.stockQuantity} pairs available in stock.`,
          });
          return;
        }

        set({
          cart: currentCart.map((i) =>
            i.id === itemId ? { ...i, quantity: updatedQty } : i
          ),
        });
      },

      clearCart: () => set({ cart: [], discountCode: null, discountPercent: 0 }),

      applyDiscount: (code) => {
        const normalized = code.trim().toUpperCase();
        if (normalized === 'VAULT10') {
          set({ discountCode: 'VAULT10', discountPercent: 10 });
          get().addToast({
            type: 'success',
            title: 'PROMO APPLIED',
            message: '10% discount applied to your order!',
          });
          return { success: true, message: '10% discount applied!' };
        } else if (normalized === 'SOLE20') {
          set({ discountCode: 'SOLE20', discountPercent: 20 });
          get().addToast({
            type: 'success',
            title: 'VIP PROMO APPLIED',
            message: '20% discount applied to your order!',
          });
          return { success: true, message: '20% VIP discount applied!' };
        } else if (normalized === 'FIRSTDROP') {
          set({ discountCode: 'FIRSTDROP', discountPercent: 15 });
          get().addToast({
            type: 'success',
            title: 'WELCOME PROMO APPLIED',
            message: '15% off first order applied!',
          });
          return { success: true, message: '15% welcome promo applied!' };
        }

        get().addToast({
          type: 'error',
          title: 'INVALID CODE',
          message: 'Try demo code: VAULT10 or SOLE20',
        });
        return {
          success: false,
          message: 'Invalid promo code. Try VAULT10 or SOLE20.',
        };
      },

      removeDiscount: () => set({ discountCode: null, discountPercent: 0 }),

      getCartSubtotal: () => {
        return get().cart.reduce(
          (sum, item) => sum + item.product.price * item.quantity,
          0
        );
      },

      getDiscountAmount: () => {
        const subtotal = get().getCartSubtotal();
        const percent = get().discountPercent;
        return (subtotal * percent) / 100;
      },

      getCartTotal: () => {
        const subtotal = get().getCartSubtotal();
        const discount = get().getDiscountAmount();
        return Math.max(0, subtotal - discount);
      },

      getCartCount: () => {
        return get().cart.reduce((count, item) => count + item.quantity, 0);
      },

      // Wishlist
      wishlist: [],

      toggleWishlist: (product) => {
        const exists = get().wishlist.some((item) => item.id === product.id);
        if (exists) {
          set({
            wishlist: get().wishlist.filter((item) => item.id !== product.id),
          });
          get().addToast({
            type: 'info',
            title: 'REMOVED FROM WISHLIST',
            message: product.name,
          });
          return { added: false };
        } else {
          set({ wishlist: [product, ...get().wishlist] });
          get().addToast({
            type: 'success',
            title: 'SAVED TO WISHLIST',
            message: product.name,
            image: product.images[0],
          });
          return { added: true };
        }
      },

      isInWishlist: (productId) => {
        return get().wishlist.some((item) => item.id === productId);
      },

      removeFromWishlist: (productId) => {
        set({
          wishlist: get().wishlist.filter((item) => item.id !== productId),
        });
      },

      clearWishlist: () => set({ wishlist: [] }),

      getWishlistCount: () => get().wishlist.length,

      // Recently Viewed
      recentlyViewed: [],
      addRecentlyViewed: (product) => {
        const filtered = get().recentlyViewed.filter((p) => p.id !== product.id);
        set({ recentlyViewed: [product, ...filtered].slice(0, 8) });
      },

      // Search
      isSearchOpen: false,
      searchQuery: '',
      recentSearches: [
        'Air Jordan 1',
        'Samba OG',
        'GEL-Kayano 14',
        '9060',
        'Air Max 95',
      ],
      setSearchOpen: (open) => set({ isSearchOpen: open }),
      setSearchQuery: (query) => set({ searchQuery: query }),
      addRecentSearch: (query) => {
        const trimmed = query.trim();
        if (!trimmed) return;
        const current = get().recentSearches.filter(
          (s) => s.toLowerCase() !== trimmed.toLowerCase()
        );
        set({ recentSearches: [trimmed, ...current].slice(0, 8) });
      },
      removeRecentSearch: (query) => {
        set({
          recentSearches: get().recentSearches.filter((s) => s !== query),
        });
      },
      clearRecentSearches: () => set({ recentSearches: [] }),

      // Quick View
      quickViewProduct: null,
      openQuickView: (product) => set({ quickViewProduct: product }),
      closeQuickView: () => set({ quickViewProduct: null }),

      // Size Guide
      isSizeGuideOpen: false,
      openSizeGuide: () => set({ isSizeGuideOpen: true }),
      closeSizeGuide: () => set({ isSizeGuideOpen: false }),

      // Toasts
      toasts: [],
      addToast: (toast) => {
        const id = Math.random().toString(36).substring(2, 9);
        const newToast: ToastMessage = { ...toast, id };
        set((state) => ({ toasts: [...state.toasts, newToast] }));

        setTimeout(() => {
          get().removeToast(id);
        }, 4000);
      },
      removeToast: (id) => {
        set((state) => ({
          toasts: state.toasts.filter((t) => t.id !== id),
        }));
      },
    }),
    {
      name: 'solevault-storage',
      storage: createJSONStorage(() => localStorage),
      partialize: (state) => ({
        cart: state.cart,
        wishlist: state.wishlist,
        recentlyViewed: state.recentlyViewed,
        recentSearches: state.recentSearches,
        discountCode: state.discountCode,
        discountPercent: state.discountPercent,
      }),
    }
  )
);
