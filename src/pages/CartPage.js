import { Link } from 'react-router-dom';
import { useCartStore, CartItem, CartSummary } from '../features/cart';

export function CartPage() {
  const items = useCartStore((state) => state.items);

  if (items.length === 0) {
    return (
      <div style={{ textAlign: 'center', padding: '60px' }}>
        <h2 style={{ marginBottom: '16px' }}>Your cart is empty</h2>
        <p style={{ color: '#666', marginBottom: '24px' }}>
          Add some products to get started!
        </p>
        <Link
          to="/"
          style={{
            display: 'inline-block',
            padding: '12px 24px',
            backgroundColor: '#1976d2',
            color: '#fff',
            textDecoration: 'none',
            borderRadius: '4px',
          }}
        >
          Continue Shopping
        </Link>
      </div>
    );
  }

  return (
    <div>
      <h2 style={{ marginBottom: '24px' }}>Shopping Cart</h2>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 350px', gap: '32px' }}>
        {/* 장바구니 아이템 목록 */}
        <div>
          {items.map((item) => (
            <CartItem key={item.id} item={item} />
          ))}
        </div>

        {/* 주문 요약 */}
        <CartSummary />
      </div>
    </div>
  );
}
