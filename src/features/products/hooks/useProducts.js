/**
 * useProducts.js - 상품 관련 커스텀 훅들
 *
 * Flutter 비교:
 * - BLoC의 역할을 React Query 훅이 대체
 * - Repository 호출 + 상태 관리(loading, error, data)를 한 번에 처리
 *
 * 핵심 개념:
 * - Custom Hook: 로직 재사용을 위한 React의 핵심 패턴
 * - useQuery: 서버 데이터를 가져오고 캐싱하는 React Query 훅
 *
 * 왜 Custom Hook을 사용하는가?
 * 1. 관심사 분리: 컴포넌트는 UI만, 훅은 로직만 담당
 * 2. 재사용성: 여러 컴포넌트에서 같은 훅 사용 가능
 * 3. 테스트 용이성: 훅만 따로 테스트 가능
 */

import { useQuery } from '@tanstack/react-query';
import { productsApi } from '../api';

/**
 * useProducts - 상품 목록 조회 훅
 *
 * 반환값:
 * - data: 성공 시 상품 배열
 * - isLoading: 로딩 중 여부 (처음 fetch할 때 true)
 * - isFetching: 백그라운드 fetch 중 여부
 * - error: 에러 객체 (실패 시)
 * - refetch: 수동으로 다시 fetch하는 함수
 *
 * Flutter 비교 (BLoC 패턴):
 * class ProductBloc extends Bloc<ProductEvent, ProductState> {
 *   on<LoadProducts>((event, emit) async {
 *     emit(ProductLoading());
 *     try {
 *       final products = await repository.getProducts();
 *       emit(ProductLoaded(products));
 *     } catch (e) {
 *       emit(ProductError(e.toString()));
 *     }
 *   });
 * }
 *
 * React Query는 위 코드를 아래 한 줄로 대체!
 */
export function useProducts() {
  return useQuery({
    /**
     * queryKey: 캐시를 식별하는 고유 키
     * - 이 키로 캐시가 저장되고 조회됨
     * - 배열 형태: ['products'], ['products', id], ['products', 'category', 'electronics']
     *
     * 중요: 같은 queryKey를 사용하면 캐시된 데이터 공유!
     * 예: A 컴포넌트와 B 컴포넌트가 같은 ['products'] 키 사용
     *     → A에서 fetch한 데이터를 B에서도 즉시 사용 가능
     */
    queryKey: ['products'],

    /**
     * queryFn: 실제 데이터를 가져오는 함수
     * - Promise를 반환해야 함
     * - 성공하면 data에, 실패하면 error에 저장됨
     */
    queryFn: productsApi.getAll,
  });
}

/**
 * useProduct - 상품 상세 조회 훅
 *
 * @param {string|number} id - 상품 ID
 */
export function useProduct(id) {
  return useQuery({
    // queryKey에 id 포함 → 상품마다 별도 캐시
    queryKey: ['products', id],

    // id를 파라미터로 전달해야 하므로 화살표 함수로 감싸기
    queryFn: () => productsApi.getById(id),

    /**
     * enabled: 조건부 fetch
     * - false면 자동 fetch 안 함
     * - !!id: id가 존재할 때만 fetch
     *
     * Flutter 비교:
     * if (id != null) {
     *   bloc.add(LoadProduct(id));
     * }
     */
    enabled: !!id,
  });
}

/**
 * useProductsByCategory - 카테고리별 상품 조회 훅
 */
export function useProductsByCategory(category) {
  return useQuery({
    queryKey: ['products', 'category', category],
    queryFn: () => productsApi.getByCategory(category),
    enabled: !!category,
  });
}

/**
 * useCategories - 카테고리 목록 조회 훅
 */
export function useCategories() {
  return useQuery({
    queryKey: ['categories'],
    queryFn: productsApi.getCategories,
  });
}
