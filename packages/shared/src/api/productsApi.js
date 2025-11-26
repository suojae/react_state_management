/**
 * productsApi.js - 상품 API
 *
 * 마이크로 프론트엔드에서:
 * - API 함수들은 shared 패키지에서 관리
 * - 여러 마이크로앱에서 동일한 API 사용
 */

const BASE_URL = 'https://fakestoreapi.com';

export const productsApi = {
  getAll: async () => {
    const response = await fetch(`${BASE_URL}/products`);
    if (!response.ok) throw new Error('Failed to fetch products');
    return response.json();
  },

  getById: async (id) => {
    const response = await fetch(`${BASE_URL}/products/${id}`);
    if (!response.ok) throw new Error('Failed to fetch product');
    return response.json();
  },

  getByCategory: async (category) => {
    const response = await fetch(`${BASE_URL}/products/category/${category}`);
    if (!response.ok) throw new Error('Failed to fetch products');
    return response.json();
  },

  getCategories: async () => {
    const response = await fetch(`${BASE_URL}/products/categories`);
    if (!response.ok) throw new Error('Failed to fetch categories');
    return response.json();
  },
};
