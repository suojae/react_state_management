/**
 * ProductList.js - 상품 목록 컴포넌트
 *
 * Flutter 비교:
 * - BlocBuilder를 사용하는 ListView 위젯과 유사
 * - 상태(loading, error, data)에 따라 다른 UI 렌더링
 *
 * 핵심 개념:
 * - React Query 훅의 반환값으로 상태 관리
 * - 조건부 렌더링으로 상태별 UI 분기
 */

import { useProducts } from '../hooks/useProducts';
import { ProductCard } from './ProductCard';

export function ProductList() {
  /**
   * useProducts 훅에서 구조 분해 할당
   *
   * data: products로 이름 변경 (별칭)
   * - const { data: products } = ... 는
   * - const products = result.data 와 같음
   *
   * Flutter 비교 (BlocBuilder):
   * BlocBuilder<ProductBloc, ProductState>(
   *   builder: (context, state) {
   *     if (state is ProductLoading) return CircularProgressIndicator();
   *     if (state is ProductError) return Text(state.message);
   *     if (state is ProductLoaded) return ListView(...);
   *   }
   * )
   */
  const { data: products, isLoading, error } = useProducts();

  // ========================================
  // 로딩 상태
  // Flutter: if (state is ProductLoading)
  // ========================================
  if (isLoading) {
    return (
      <div style={{ textAlign: 'center', padding: '40px' }}>
        <p>Loading products...</p>
        {/* 실제 프로젝트에서는 스피너 컴포넌트 사용 */}
      </div>
    );
  }

  // ========================================
  // 에러 상태
  // Flutter: if (state is ProductError)
  // ========================================
  if (error) {
    return (
      <div style={{ textAlign: 'center', padding: '40px', color: '#e53935' }}>
        <p>Error: {error.message}</p>
        {/* 실제 프로젝트에서는 재시도 버튼 등 추가 */}
      </div>
    );
  }

  // ========================================
  // 성공 상태 (데이터 로드 완료)
  // Flutter: if (state is ProductLoaded)
  // ========================================
  return (
    <div>
      <h2 style={{ marginBottom: '24px' }}>All Products</h2>

      {/**
       * CSS Grid를 이용한 반응형 그리드 레이아웃
       *
       * gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))'
       * - auto-fill: 가능한 많은 컬럼 생성
       * - minmax(250px, 1fr): 최소 250px, 남은 공간 균등 분배
       *
       * Flutter 비교:
       * GridView.builder(
       *   gridDelegate: SliverGridDelegateWithMaxCrossAxisExtent(
       *     maxCrossAxisExtent: 250,
       *   ),
       * )
       */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))',
        gap: '24px',
      }}>
        {/**
         * 배열.map(): 배열의 각 요소를 컴포넌트로 변환
         *
         * Flutter 비교:
         * products.map((product) => ProductCard(product: product)).toList()
         *
         * key prop:
         * - React가 리스트 아이템을 효율적으로 업데이트하기 위해 필요
         * - Flutter의 Key와 동일한 역할
         * - 고유한 값 사용 (보통 id)
         */}
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
}
