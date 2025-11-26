/**
 * Products App - Standalone 진입점
 *
 * 마이크로앱은 두 가지 방식으로 실행 가능:
 * 1. Standalone: 독립적으로 실행 (개발/테스트용)
 * 2. Federated: Shell에서 불러와서 실행 (프로덕션)
 *
 * 이 파일은 Standalone 실행용
 */

import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import App from './App';

const queryClient = new QueryClient();

// Standalone으로 실행할 때만 렌더링
ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <div style={{ padding: '24px', maxWidth: '1200px', margin: '0 auto' }}>
          <h1 style={{ marginBottom: '24px' }}>Products App (Standalone)</h1>
          <App />
        </div>
      </BrowserRouter>
    </QueryClientProvider>
  </React.StrictMode>
);
