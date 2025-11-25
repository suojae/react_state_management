import { useCartStore } from '../store';

export function CartSummary() {
  const items = useCartStore((state) => state.items);
  const getTotalPrice = useCartStore((state) => state.getTotalPrice);
  const getTotalCount = useCartStore((state) => state.getTotalCount);
  const clearCart = useCartStore((state) => state.clearCart);

  if (items.length === 0) {
    return null;
  }

  return (
    <div style={{
      backgroundColor: '#fff',
      borderRadius: '8px',
      padding: '24px',
      position: 'sticky',
      top: '24px',
    }}>
      <h3 style={{ marginBottom: '16px' }}>Order Summary</h3>

      <div style={{ marginBottom: '16px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
          <span>Items ({getTotalCount()})</span>
          <span>${getTotalPrice().toFixed(2)}</span>
        </div>
        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
          <span>Shipping</span>
          <span>Free</span>
        </div>
      </div>

      <hr style={{ border: 'none', borderTop: '1px solid #eee', margin: '16px 0' }} />

      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '24px' }}>
        <span style={{ fontWeight: 'bold', fontSize: '18px' }}>Total</span>
        <span style={{ fontWeight: 'bold', fontSize: '18px', color: '#e53935' }}>
          ${getTotalPrice().toFixed(2)}
        </span>
      </div>

      <button
        style={{
          width: '100%',
          padding: '16px',
          backgroundColor: '#1976d2',
          color: '#fff',
          border: 'none',
          borderRadius: '4px',
          cursor: 'pointer',
          fontWeight: 'bold',
          marginBottom: '12px',
        }}
      >
        Checkout
      </button>

      <button
        onClick={clearCart}
        style={{
          width: '100%',
          padding: '12px',
          backgroundColor: '#fff',
          color: '#666',
          border: '1px solid #ddd',
          borderRadius: '4px',
          cursor: 'pointer',
        }}
      >
        Clear Cart
      </button>
    </div>
  );
}
