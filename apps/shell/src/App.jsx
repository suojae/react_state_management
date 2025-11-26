/**
 * Shell App - 메인 앱 컴포넌트
 *
 * 핵심:
 * - React.lazy()로 Remote 앱들을 동적 import
 * - Suspense로 로딩 상태 처리
 * - 라우팅으로 각 Remote 앱 연결
 */

import React, { Suspense } from 'react';
import { Routes, Route, Link } from 'react-router-dom';
import { useCartStore } from '@mini-shop/shared';
import { Spinner } from '@mini-shop/ui';

/**
 * React.lazy()로 Remote 앱 동적 로딩
 *
 * 'products/App': products 앱의 App 컴포넌트
 * - vite.config.js의 remotes 설정과 연결됨
 * - 런타임에 http://localhost:3001에서 불러옴
 *
 * Flutter 비교:
 * - deferred import와 유사
 * - import 'package:products/app.dart' deferred as products;
 */
const ProductsApp = React.lazy(() => import('products/App'));
const CartApp = React.lazy(() => import('cart/App'));

// 로딩 컴포넌트
function Loading() {
  return (
    <div style={{ display: 'flex', justifyContent: 'center', padding: '40px' }}>
      <Spinner />
    </div>
  );
}

// 공통 레이아웃
function Layout({ children }) {
  const cartCount = useCartStore((state) => state.getTotalCount());

  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#f5f5f5' }}>
      <header style={{
        backgroundColor: '#fff',
        padding: '16px 24px',
        boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
      }}>
        <Link to="/" style={{ textDecoration: 'none', color: '#333', fontSize: '24px', fontWeight: 'bold' }}>
          Mini Shop <span style={{ fontSize: '12px', color: '#1976d2' }}>MFE</span>
        </Link>
        <nav style={{ display: 'flex', gap: '24px', alignItems: 'center' }}>
          <Link to="/" style={{ textDecoration: 'none', color: '#666' }}>Products</Link>
          <Link to="/cart" style={{ textDecoration: 'none', color: '#666', position: 'relative' }}>
            Cart
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
      <main style={{ padding: '24px', maxWidth: '1200px', margin: '0 auto' }}>
        {children}
      </main>
    </div>
  );
}

export default function App() {
  return (
    <Layout>
      {/**
       * Suspense: 비동기 컴포넌트 로딩 중 fallback UI 표시
       *
       * Flutter 비교:
       * FutureBuilder처럼 로딩 상태 처리
       */}
      <Suspense fallback={<Loading />}>
        <Routes>
          {/* Products Remote App */}
          <Route path="/" element={<ProductsApp />} />
          <Route path="/products/:id" element={<ProductsApp />} />

          {/* Cart Remote App */}
          <Route path="/cart" element={<CartApp />} />
        </Routes>
      </Suspense>
    </Layout>
  );
}
