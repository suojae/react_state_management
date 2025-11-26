/**
 * Products App - Vite 설정 (Remote)
 *
 * Remote 앱의 역할:
 * - 독립적으로 개발/배포 가능
 * - exposes로 다른 앱에 제공할 컴포넌트 정의
 * - Shell(Host)에서 런타임에 불러감
 */

import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import federation from '@originjs/vite-plugin-federation';

export default defineConfig({
  plugins: [
    react(),
    federation({
      name: 'products',
      filename: 'remoteEntry.js',
      /**
       * exposes: 외부에 공개할 모듈들
       *
       * './App': 이 앱의 App 컴포넌트를 공개
       * Shell에서 import('products/App')으로 사용 가능
       */
      exposes: {
        './App': './src/App.jsx',
      },
      /**
       * shared: Shell과 동일한 의존성 공유
       * 싱글톤으로 같은 인스턴스 사용 → 상태 공유 가능
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
