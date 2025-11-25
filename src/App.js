/**
 * App.js - 애플리케이션의 루트 컴포넌트
 *
 * Flutter 비교:
 * - main.dart의 MyApp 클래스와 유사
 * - MaterialApp에서 routes 설정하는 것과 동일한 역할
 *
 * 핵심 개념:
 * 1. Provider 패턴: 앱 전체에 공유할 기능을 최상위에서 감싸줌
 * 2. 라우팅: URL에 따라 다른 컴포넌트를 렌더링
 */

import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { QueryClientProvider } from '@tanstack/react-query';
import { queryClient } from './lib/queryClient';
import { Layout } from './components/Layout';
import { HomePage } from './pages/HomePage';
import { ProductPage } from './pages/ProductPage';
import { CartPage } from './pages/CartPage';

function App() {
  return (
    /**
     * QueryClientProvider: React Query의 Provider
     * - Flutter의 BlocProvider 또는 RepositoryProvider와 유사
     * - 하위 모든 컴포넌트에서 useQuery 훅 사용 가능하게 함
     */
    <QueryClientProvider client={queryClient}>
      {/**
       * BrowserRouter: 라우팅 기능 제공
       * - Flutter의 MaterialApp.router 또는 GoRouter와 유사
       * - HTML5 History API 사용하여 URL 관리
       */}
      <BrowserRouter>
        {/**
         * Routes & Route: 라우트 정의
         * - Flutter의 routes: { '/': (context) => HomePage() } 와 유사
         *
         * 중첩 라우팅(Nested Routes):
         * - Layout이 부모 Route, 나머지가 자식 Route
         * - Layout의 <Outlet />에 자식 라우트가 렌더링됨
         * - Flutter의 ShellRoute(go_router)와 동일한 개념
         */}
        <Routes>
          {/* Layout을 공통 레이아웃으로 사용 */}
          <Route path="/" element={<Layout />}>
            {/* index: 부모 경로(/)와 정확히 일치할 때 렌더링 */}
            <Route index element={<HomePage />} />

            {/* :id는 동적 파라미터 (Flutter의 /products/:id와 동일) */}
            <Route path="products/:id" element={<ProductPage />} />

            <Route path="cart" element={<CartPage />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </QueryClientProvider>
  );
}

export default App;
