/**
 * cartStore.js - 전역 장바구니 스토어
 *
 * 마이크로 프론트엔드 핵심:
 * - 이 스토어는 @mini-shop/shared 패키지에 있음
 * - Shell, Products, Cart 앱 모두 같은 스토어 인스턴스를 공유
 * - Module Federation의 shared 설정으로 싱글톤 보장
 *
 * Flutter 비교:
 * - GetIt 같은 서비스 로케이터로 전역 상태 공유하는 것과 유사
 * - 여러 패키지에서 같은 Cubit 인스턴스 접근
 */

import { create } from 'zustand';

export const useCartStore = create((set, get) => ({
  items: [],

  addItem: (product) =>
    set((state) => {
      const existingItem = state.items.find((item) => item.id === product.id);
      if (existingItem) {
        return {
          items: state.items.map((item) =>
            item.id === product.id
              ? { ...item, quantity: item.quantity + 1 }
              : item
          ),
        };
      }
      return {
        items: [...state.items, { ...product, quantity: 1 }],
      };
    }),

  removeItem: (productId) =>
    set((state) => ({
      items: state.items.filter((item) => item.id !== productId),
    })),

  updateQuantity: (productId, quantity) =>
    set((state) => {
      if (quantity <= 0) {
        return { items: state.items.filter((item) => item.id !== productId) };
      }
      return {
        items: state.items.map((item) =>
          item.id === productId ? { ...item, quantity } : item
        ),
      };
    }),

  clearCart: () => set({ items: [] }),

  getTotalCount: () => {
    const { items } = get();
    return items.reduce((total, item) => total + item.quantity, 0);
  },

  getTotalPrice: () => {
    const { items } = get();
    return items.reduce((total, item) => total + item.price * item.quantity, 0);
  },
}));
