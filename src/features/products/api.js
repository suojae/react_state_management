/**
 * api.js - 상품 관련 API 함수들
 *
 * Flutter 비교:
 * - Repository의 DataSource 또는 ApiClient와 유사
 * - Dio를 사용한 HTTP 요청 코드와 동일한 역할
 *
 * 핵심 개념:
 * - fetch(): 브라우저 내장 HTTP 클라이언트 (Flutter의 http 패키지와 유사)
 * - async/await: Dart와 동일한 비동기 문법
 * - 에러 처리: throw로 예외를 던지면 React Query가 자동으로 error 상태 처리
 */

const BASE_URL = 'https://fakestoreapi.com';

/**
 * productsApi 객체
 * - API 함수들을 하나의 객체로 묶어서 관리
 * - Flutter의 ProductRepository 또는 ProductDataSource 클래스와 유사
 */
export const productsApi = {
  /**
   * 상품 목록 전체 조회
   *
   * Flutter 비교:
   * Future<List<Product>> getProducts() async {
   *   final response = await dio.get('/products');
   *   return (response.data as List).map((e) => Product.fromJson(e)).toList();
   * }
   */
  getAll: async () => {
    const response = await fetch(`${BASE_URL}/products`);

    // response.ok: HTTP 상태 코드가 200-299인지 확인
    if (!response.ok) throw new Error('Failed to fetch products');

    // response.json(): Response body를 JSON으로 파싱
    // Flutter의 jsonDecode(response.body)와 동일
    return response.json();
  },

  /**
   * 상품 상세 조회 (ID로)
   *
   * Flutter 비교:
   * Future<Product> getProduct(int id) async {
   *   final response = await dio.get('/products/$id');
   *   return Product.fromJson(response.data);
   * }
   */
  getById: async (id) => {
    const response = await fetch(`${BASE_URL}/products/${id}`);
    if (!response.ok) throw new Error('Failed to fetch product');
    return response.json();
  },

  /**
   * 카테고리별 상품 조회
   */
  getByCategory: async (category) => {
    const response = await fetch(`${BASE_URL}/products/category/${category}`);
    if (!response.ok) throw new Error('Failed to fetch products');
    return response.json();
  },

  /**
   * 카테고리 목록 조회
   */
  getCategories: async () => {
    const response = await fetch(`${BASE_URL}/products/categories`);
    if (!response.ok) throw new Error('Failed to fetch categories');
    return response.json();
  },
};
