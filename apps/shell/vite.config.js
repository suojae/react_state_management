/**
 * Shell App - Vite 설정 (Host)
 *
 * Module Federation 핵심 개념:
 * - Host(Shell): 다른 Remote 앱들을 불러오는 메인 앱
 * - Remote: 독립 배포 가능한 마이크로앱 (Products, Cart)
 *
 * Flutter 비교:
 * - 메인 앱에서 다른 패키지들을 import하는 것과 유사
 * - 하지만 여기선 런타임에 동적으로 로딩됨!
 */

import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import federation from '@originjs/vite-plugin-federation';

export default defineConfig({
  plugins: [
    react(),
    federation({
      name: 'shell',
      /**
       * remotes: 불러올 마이크로앱 정의
       *
       * 형식: { 앱이름: '런타임에 불러올 URL' }
       * - products 앱은 3001 포트에서 실행
       * - cart 앱은 3002 포트에서 실행
       */
      remotes: {
        products: 'http://localhost:3001/assets/remoteEntry.js',
        cart: 'http://localhost:3002/assets/remoteEntry.js',
      },
      /**
       * shared: 여러 앱에서 공유하는 의존성
       *
       * 중요: react, react-dom, zustand 등을 싱글톤으로 공유
       * - 각 앱이 같은 인스턴스 사용 → 상태 공유 가능
       * - 번들 크기 최적화
       */
      shared: ['react', 'react-dom', 'react-router-dom', 'zustand', '@tanstack/react-query'],
    }),
  ],
  build: {
    modulePreload: false,
    target: 'esnext',
    minify: false,
    cssCodeSplit: false,
  },
});
