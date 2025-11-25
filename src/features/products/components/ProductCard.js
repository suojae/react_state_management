/**
 * ProductCard.js - 상품 카드 컴포넌트
 *
 * Flutter 비교:
 * - StatelessWidget과 유사
 * - GestureDetector + Card 위젯 조합과 비슷
 *
 * 핵심 개념:
 * - Props: 부모로부터 데이터를 받는 방법 (Flutter의 생성자 파라미터)
 * - 이벤트 핸들링: onClick, onSubmit 등
 * - 조건부 스타일링
 */

import { Link } from 'react-router-dom';
import { useCartStore } from '../../cart/store';

/**
 * 함수형 컴포넌트
 *
 * { product }: props에서 product를 구조 분해
 *
 * Flutter 비교:
 * class ProductCard extends StatelessWidget {
 *   final Product product;
 *   const ProductCard({required this.product});
 * }
 */
export function ProductCard({ product }) {
  /**
   * Zustand에서 addItem 액션만 가져오기
   *
   * selector를 사용하면:
   * 1. 필요한 것만 구독 → 불필요한 리렌더링 방지
   * 2. addItem이 변경되지 않으면 이 컴포넌트는 리렌더링 안 됨
   *
   * Flutter 비교:
   * final addItem = context.read<CartCubit>().addItem;
   */
  const addItem = useCartStore((state) => state.addItem);

  /**
   * 이벤트 핸들러 함수
   *
   * e: 이벤트 객체 (Flutter의 이벤트 콜백과 유사)
   * e.preventDefault(): 기본 동작 방지
   *   - 여기서는 Link의 페이지 이동을 막음
   *   - 버튼 클릭 시 장바구니 추가만 하고, 상세 페이지로는 이동 안 함
   *
   * Flutter 비교:
   * onTap: () {
   *   // GestureDetector의 onTap과 유사
   * }
   */
  const handleAddToCart = (e) => {
    e.preventDefault(); // Link 클릭 이벤트 전파 방지
    addItem(product);   // Zustand 액션 호출
  };

  return (
    /**
     * Link: 페이지 이동 컴포넌트
     *
     * to={`/products/${product.id}`}: 동적 경로
     *   - 템플릿 리터럴(백틱 ``)로 문자열 내 변수 삽입
     *   - Flutter의 '/products/${product.id}'와 동일
     *
     * Flutter 비교:
     * InkWell(
     *   onTap: () => context.push('/products/${product.id}'),
     *   child: Card(...),
     * )
     */
    <Link
      to={`/products/${product.id}`}
      style={{
        textDecoration: 'none', // 밑줄 제거
        color: 'inherit',       // 부모 색상 상속
      }}
    >
      {/**
       * 인라인 스타일
       *
       * React에서 style은 객체로 전달 (camelCase 사용)
       * - background-color → backgroundColor
       * - font-size → fontSize
       *
       * Flutter 비교:
       * Container(
       *   decoration: BoxDecoration(
       *     color: Colors.white,
       *     borderRadius: BorderRadius.circular(8),
       *   ),
       * )
       */}
      <div style={{
        backgroundColor: '#fff',
        borderRadius: '8px',
        padding: '16px',
        boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
        transition: 'transform 0.2s, box-shadow 0.2s', // CSS 애니메이션
        cursor: 'pointer',
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
      }}>
        {/* 상품 이미지 영역 */}
        <div style={{
          height: '200px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          marginBottom: '12px',
        }}>
          {/**
           * img 태그
           *
           * src: 이미지 URL
           * alt: 대체 텍스트 (접근성)
           *
           * Flutter 비교:
           * Image.network(
           *   product.image,
           *   fit: BoxFit.contain,
           * )
           */}
          <img
            src={product.image}
            alt={product.title}
            style={{
              maxWidth: '100%',
              maxHeight: '100%',
              objectFit: 'contain', // Flutter의 BoxFit.contain
            }}
          />
        </div>

        {/* 상품 정보 영역 */}
        <div style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
          {/* 상품명 (2줄 제한) */}
          <h3 style={{
            fontSize: '14px',
            fontWeight: '500',
            marginBottom: '8px',
            overflow: 'hidden',
            textOverflow: 'ellipsis',
            display: '-webkit-box',
            WebkitLineClamp: 2,        // 최대 2줄
            WebkitBoxOrient: 'vertical',
          }}>
            {product.title}
          </h3>

          {/* 카테고리 */}
          <p style={{
            color: '#666',
            fontSize: '12px',
            marginBottom: '8px',
            textTransform: 'capitalize', // 첫 글자 대문자
          }}>
            {product.category}
          </p>

          {/* 가격 + 버튼 (하단 고정) */}
          <div style={{ marginTop: 'auto' }}>
            {/* 가격 */}
            <p style={{
              fontSize: '18px',
              fontWeight: 'bold',
              color: '#e53935',
              marginBottom: '12px',
            }}>
              {/**
               * toFixed(2): 소수점 2자리까지 표시
               * Flutter의 toStringAsFixed(2)와 동일
               */}
              ${product.price.toFixed(2)}
            </p>

            {/**
             * 장바구니 추가 버튼
             *
             * onClick: 클릭 이벤트 핸들러
             *
             * Flutter 비교:
             * ElevatedButton(
             *   onPressed: () => context.read<CartCubit>().addItem(product),
             *   child: Text('Add to Cart'),
             * )
             */}
            <button
              onClick={handleAddToCart}
              style={{
                width: '100%',
                padding: '10px',
                backgroundColor: '#1976d2',
                color: '#fff',
                border: 'none',
                borderRadius: '4px',
                cursor: 'pointer',
                fontWeight: '500',
              }}
            >
              Add to Cart
            </button>
          </div>
        </div>
      </div>
    </Link>
  );
}
