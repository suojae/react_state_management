/**
 * Cart App - Standalone 진입점
 */

import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './App';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <div style={{ padding: '24px', maxWidth: '1200px', margin: '0 auto' }}>
        <h1 style={{ marginBottom: '24px' }}>Cart App (Standalone)</h1>
        <App />
      </div>
    </BrowserRouter>
  </React.StrictMode>
);
