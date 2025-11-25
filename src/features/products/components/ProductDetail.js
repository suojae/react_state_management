import { useParams, useNavigate } from 'react-router-dom';
import { useProduct } from '../hooks/useProducts';
import { useCartStore } from '../../cart/store';

export function ProductDetail() {
  const { id } = useParams(); // URL 파라미터 (Flutter의 GoRouter args와 유사)
  const navigate = useNavigate();
  const { data: product, isLoading, error } = useProduct(id);
  const addItem = useCartStore((state) => state.addItem);

  if (isLoading) {
    return (
      <div style={{ textAlign: 'center', padding: '40px' }}>
        <p>Loading product...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div style={{ textAlign: 'center', padding: '40px', color: '#e53935' }}>
        <p>Error: {error.message}</p>
        <button onClick={() => navigate('/')}>Go Back</button>
      </div>
    );
  }

  const handleAddToCart = () => {
    addItem(product);
  };

  return (
    <div style={{ backgroundColor: '#fff', borderRadius: '8px', padding: '32px' }}>
      <button
        onClick={() => navigate(-1)}
        style={{
          marginBottom: '24px',
          padding: '8px 16px',
          border: '1px solid #ddd',
          borderRadius: '4px',
          cursor: 'pointer',
          backgroundColor: '#fff',
        }}
      >
        Back
      </button>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '48px' }}>
        {/* 상품 이미지 */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '24px',
        }}>
          <img
            src={product.image}
            alt={product.title}
            style={{ maxWidth: '100%', maxHeight: '400px', objectFit: 'contain' }}
          />
        </div>

        {/* 상품 정보 */}
        <div>
          <p style={{
            color: '#666',
            textTransform: 'uppercase',
            fontSize: '14px',
            marginBottom: '8px',
          }}>
            {product.category}
          </p>

          <h1 style={{ fontSize: '24px', marginBottom: '16px' }}>
            {product.title}
          </h1>

          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '16px' }}>
            <span style={{ color: '#ffc107' }}>Rating: {product.rating?.rate}</span>
            <span style={{ color: '#666' }}>({product.rating?.count} reviews)</span>
          </div>

          <p style={{
            fontSize: '32px',
            fontWeight: 'bold',
            color: '#e53935',
            marginBottom: '24px',
          }}>
            ${product.price.toFixed(2)}
          </p>

          <p style={{ color: '#666', lineHeight: '1.6', marginBottom: '32px' }}>
            {product.description}
          </p>

          <button
            onClick={handleAddToCart}
            style={{
              padding: '16px 48px',
              backgroundColor: '#1976d2',
              color: '#fff',
              border: 'none',
              borderRadius: '4px',
              cursor: 'pointer',
              fontWeight: 'bold',
              fontSize: '16px',
            }}
          >
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
}
