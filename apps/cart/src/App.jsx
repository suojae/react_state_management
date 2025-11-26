/**
 * Cart App - 메인 컴포넌트
 *
 * Shell에서 동적으로 로딩되는 장바구니 마이크로앱
 *
 * 핵심:
 * - @mini-shop/shared의 useCartStore 사용
 * - Products 앱과 같은 스토어 인스턴스 공유
 * - Products에서 담은 상품이 여기서 보임!
 */

import { Link } from 'react-router-dom';
import { useCartStore } from '@mini-shop/shared';
import { Button, Card } from '@mini-shop/ui';

// 장바구니 아이템 컴포넌트
function CartItem({ item }) {
  const { updateQuantity, removeItem } = useCartStore();

  return (
    <Card style={{ display: 'flex', gap: '16px', marginBottom: '12px' }}>
      <img
        src={item.image}
        alt={item.title}
        style={{ width: '100px', height: '100px', objectFit: 'contain' }}
      />
      <div style={{ flex: 1 }}>
        <h3 style={{ fontSize: '16px', marginBottom: '8px' }}>{item.title}</h3>
        <p style={{ color: '#e53935', fontWeight: 'bold' }}>${item.price.toFixed(2)}</p>
      </div>
      <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
        <Button
          variant="secondary"
          onClick={() => updateQuantity(item.id, item.quantity - 1)}
          style={{ width: '32px', height: '32px', padding: '0' }}
        >
          -
        </Button>
        <span style={{ minWidth: '24px', textAlign: 'center' }}>{item.quantity}</span>
        <Button
          variant="secondary"
          onClick={() => updateQuantity(item.id, item.quantity + 1)}
          style={{ width: '32px', height: '32px', padding: '0' }}
        >
          +
        </Button>
      </div>
      <div style={{ minWidth: '100px', textAlign: 'right', display: 'flex', alignItems: 'center' }}>
        <p style={{ fontWeight: 'bold' }}>${(item.price * item.quantity).toFixed(2)}</p>
      </div>
      <Button variant="secondary" onClick={() => removeItem(item.id)}>
        Remove
      </Button>
    </Card>
  );
}

// 주문 요약 컴포넌트
function CartSummary() {
  const getTotalPrice = useCartStore((state) => state.getTotalPrice);
  const getTotalCount = useCartStore((state) => state.getTotalCount);
  const clearCart = useCartStore((state) => state.clearCart);

  return (
    <Card style={{ position: 'sticky', top: '24px' }}>
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
      <Button style={{ width: '100%', marginBottom: '12px' }}>Checkout</Button>
      <Button variant="secondary" onClick={clearCart} style={{ width: '100%' }}>
        Clear Cart
      </Button>
    </Card>
  );
}

// 메인 App
export default function App() {
  const items = useCartStore((state) => state.items);

  // 빈 장바구니
  if (items.length === 0) {
    return (
      <div style={{ textAlign: 'center', padding: '60px' }}>
        <h2 style={{ marginBottom: '16px' }}>Your cart is empty</h2>
        <p style={{ color: '#666', marginBottom: '24px' }}>Add some products to get started!</p>
        <Link to="/">
          <Button>Continue Shopping</Button>
        </Link>
      </div>
    );
  }

  return (
    <div>
      <h2 style={{ marginBottom: '24px' }}>Shopping Cart</h2>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 350px', gap: '32px' }}>
        <div>
          {items.map((item) => (
            <CartItem key={item.id} item={item} />
          ))}
        </div>
        <CartSummary />
      </div>
    </div>
  );
}
