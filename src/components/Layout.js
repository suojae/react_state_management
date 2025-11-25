/**
 * Layout.js - 공통 레이아웃 컴포넌트
 *
 * Flutter 비교:
 * - Scaffold 위젯과 유사 (AppBar + body 구조)
 * - go_router의 ShellRoute와 동일한 역할
 *
 * 핵심 개념:
 * - 모든 페이지에서 공유하는 UI (헤더, 푸터 등)
 * - <Outlet />에 자식 라우트의 컴포넌트가 렌더링됨
 */

import { Link, Outlet } from 'react-router-dom';
import { useCartStore } from '../features/cart/store';

export function Layout() {
  /**
   * Zustand에서 상태 가져오기
   *
   * useCartStore((state) => state.getTotalCount())
   * - selector 패턴: 필요한 상태만 구독
   * - 이 값이 변경될 때만 이 컴포넌트가 리렌더링됨
   *
   * Flutter 비교:
   * - context.watch<CartCubit>().state.totalCount와 유사
   * - BlocSelector와 동일한 최적화 효과
   */
  const cartCount = useCartStore((state) => state.getTotalCount());

  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#f5f5f5' }}>
      {/* ========================================
          Header - Flutter의 AppBar와 유사
          ======================================== */}
      <header style={{
        backgroundColor: '#fff',
        padding: '16px 24px',
        boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
      }}>
        {/**
         * Link 컴포넌트: 페이지 이동 (새로고침 없이)
         * - Flutter의 Navigator.pushNamed() 또는 context.go()와 유사
         * - HTML <a> 태그와 달리 SPA 방식으로 동작
         */}
        <Link to="/" style={{ textDecoration: 'none', color: '#333', fontSize: '24px', fontWeight: 'bold' }}>
          Mini Shop
        </Link>

        <nav style={{ display: 'flex', gap: '24px', alignItems: 'center' }}>
          <Link to="/" style={{ textDecoration: 'none', color: '#666' }}>
            Products
          </Link>
          <Link to="/cart" style={{ textDecoration: 'none', color: '#666', position: 'relative' }}>
            Cart
            {/**
             * 조건부 렌더링: cartCount > 0 일 때만 배지 표시
             *
             * Flutter 비교:
             * if (cartCount > 0) Badge(...)
             *
             * React에서는 && 연산자 또는 삼항 연산자 사용
             * - condition && <Component />  : true일 때만 렌더링
             * - condition ? <A /> : <B />   : 조건에 따라 다른 컴포넌트
             */}
            {cartCount > 0 && (
              <span style={{
                position: 'absolute',
                top: '-8px',
                right: '-12px',
                backgroundColor: '#e53935',
                color: '#fff',
                borderRadius: '50%',
                padding: '2px 6px',
                fontSize: '12px',
              }}>
                {cartCount}
              </span>
            )}
          </Link>
        </nav>
      </header>

      {/* ========================================
          Main Content Area
          ======================================== */}
      <main style={{ padding: '24px', maxWidth: '1200px', margin: '0 auto' }}>
        {/**
         * Outlet: 자식 라우트가 렌더링되는 위치
         *
         * Flutter 비교:
         * - ShellRoute에서 child 파라미터와 동일
         * - Navigator의 pages가 렌더링되는 위치
         *
         * URL에 따라 여기에 다른 컴포넌트가 들어감:
         * - "/" → HomePage
         * - "/products/1" → ProductPage
         * - "/cart" → CartPage
         */}
        <Outlet />
      </main>
    </div>
  );
}
