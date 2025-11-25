import { useCartStore } from '../store';

export function CartItem({ item }) {
  const { updateQuantity, removeItem } = useCartStore();

  return (
    <div style={{
      display: 'flex',
      gap: '16px',
      padding: '16px',
      backgroundColor: '#fff',
      borderRadius: '8px',
      marginBottom: '12px',
    }}>
      {/* 상품 이미지 */}
      <img
        src={item.image}
        alt={item.title}
        style={{ width: '100px', height: '100px', objectFit: 'contain' }}
      />

      {/* 상품 정보 */}
      <div style={{ flex: 1 }}>
        <h3 style={{ fontSize: '16px', marginBottom: '8px' }}>{item.title}</h3>
        <p style={{ color: '#e53935', fontWeight: 'bold' }}>${item.price.toFixed(2)}</p>
      </div>

      {/* 수량 조절 */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
        <button
          onClick={() => updateQuantity(item.id, item.quantity - 1)}
          style={{
            width: '32px',
            height: '32px',
            border: '1px solid #ddd',
            borderRadius: '4px',
            cursor: 'pointer',
            backgroundColor: '#fff',
          }}
        >
          -
        </button>
        <span style={{ minWidth: '24px', textAlign: 'center' }}>{item.quantity}</span>
        <button
          onClick={() => updateQuantity(item.id, item.quantity + 1)}
          style={{
            width: '32px',
            height: '32px',
            border: '1px solid #ddd',
            borderRadius: '4px',
            cursor: 'pointer',
            backgroundColor: '#fff',
          }}
        >
          +
        </button>
      </div>

      {/* 소계 */}
      <div style={{ minWidth: '100px', textAlign: 'right' }}>
        <p style={{ fontWeight: 'bold' }}>${(item.price * item.quantity).toFixed(2)}</p>
      </div>

      {/* 삭제 버튼 */}
      <button
        onClick={() => removeItem(item.id)}
        style={{
          padding: '8px 16px',
          border: 'none',
          backgroundColor: '#f5f5f5',
          borderRadius: '4px',
          cursor: 'pointer',
          color: '#666',
        }}
      >
        Remove
      </button>
    </div>
  );
}
