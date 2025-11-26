/**
 * Products App - 메인 컴포넌트
 *
 * 이 컴포넌트가 Shell에서 동적으로 로딩됨
 * exposes: { './App': './src/App.jsx' }
 */

import { useQuery } from '@tanstack/react-query';
import { useParams, useNavigate } from 'react-router-dom';
import { useCartStore, productsApi } from '@mini-shop/shared';
import { Button, Card, Spinner } from '@mini-shop/ui';

// 상품 목록 컴포넌트
function ProductList() {
  const { data: products, isLoading, error } = useQuery({
    queryKey: ['products'],
    queryFn: productsApi.getAll,
  });
  const addItem = useCartStore((state) => state.addItem);

  if (isLoading) {
    return (
      <div style={{ display: 'flex', justifyContent: 'center', padding: '40px' }}>
        <Spinner />
      </div>
    );
  }

  if (error) {
    return <div style={{ color: '#e53935', textAlign: 'center' }}>Error: {error.message}</div>;
  }

  return (
    <div>
      <h2 style={{ marginBottom: '24px' }}>All Products</h2>
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))',
        gap: '24px',
      }}>
        {products.map((product) => (
          <ProductCard key={product.id} product={product} onAddToCart={() => addItem(product)} />
        ))}
      </div>
    </div>
  );
}

// 상품 카드 컴포넌트
function ProductCard({ product, onAddToCart }) {
  const navigate = useNavigate();

  return (
    <Card style={{ cursor: 'pointer', display: 'flex', flexDirection: 'column', height: '100%' }}>
      <div
        onClick={() => navigate(`/products/${product.id}`)}
        style={{ flex: 1 }}
      >
        <div style={{ height: '200px', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '12px' }}>
          <img src={product.image} alt={product.title} style={{ maxWidth: '100%', maxHeight: '100%', objectFit: 'contain' }} />
        </div>
        <h3 style={{ fontSize: '14px', marginBottom: '8px', overflow: 'hidden', textOverflow: 'ellipsis', display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical' }}>
          {product.title}
        </h3>
        <p style={{ color: '#666', fontSize: '12px', marginBottom: '8px', textTransform: 'capitalize' }}>{product.category}</p>
        <p style={{ fontSize: '18px', fontWeight: 'bold', color: '#e53935', marginBottom: '12px' }}>${product.price.toFixed(2)}</p>
      </div>
      <Button onClick={(e) => { e.stopPropagation(); onAddToCart(); }} style={{ width: '100%' }}>
        Add to Cart
      </Button>
    </Card>
  );
}

// 상품 상세 컴포넌트
function ProductDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const addItem = useCartStore((state) => state.addItem);

  const { data: product, isLoading, error } = useQuery({
    queryKey: ['products', id],
    queryFn: () => productsApi.getById(id),
    enabled: !!id,
  });

  if (isLoading) {
    return (
      <div style={{ display: 'flex', justifyContent: 'center', padding: '40px' }}>
        <Spinner />
      </div>
    );
  }

  if (error) {
    return <div style={{ color: '#e53935' }}>Error: {error.message}</div>;
  }

  return (
    <Card>
      <Button variant="secondary" onClick={() => navigate('/')} style={{ marginBottom: '24px' }}>
        ← Back
      </Button>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '48px' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <img src={product.image} alt={product.title} style={{ maxWidth: '100%', maxHeight: '400px', objectFit: 'contain' }} />
        </div>
        <div>
          <p style={{ color: '#666', textTransform: 'uppercase', fontSize: '14px', marginBottom: '8px' }}>{product.category}</p>
          <h1 style={{ fontSize: '24px', marginBottom: '16px' }}>{product.title}</h1>
          <p style={{ fontSize: '32px', fontWeight: 'bold', color: '#e53935', marginBottom: '24px' }}>${product.price.toFixed(2)}</p>
          <p style={{ color: '#666', lineHeight: '1.6', marginBottom: '32px' }}>{product.description}</p>
          <Button onClick={() => addItem(product)} style={{ padding: '16px 48px' }}>
            Add to Cart
          </Button>
        </div>
      </div>
    </Card>
  );
}

// 메인 App - URL에 따라 분기
export default function App() {
  const { id } = useParams();

  // URL에 id가 있으면 상세 페이지, 없으면 목록
  if (id) {
    return <ProductDetail />;
  }

  return <ProductList />;
}
