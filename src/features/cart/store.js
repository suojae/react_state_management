/**
 * store.js - Zustand를 이용한 장바구니 상태 관리
 *
 * Flutter 비교:
 * - Cubit 또는 BLoC과 매우 유사한 패턴
 * - state + methods(actions)가 하나의 객체에 정의됨
 *
 * Zustand vs Flutter BLoC/Cubit:
 * ┌─────────────────┬──────────────────────────────┐
 * │ Flutter Cubit   │ Zustand                      │
 * ├─────────────────┼──────────────────────────────┤
 * │ state           │ 객체의 프로퍼티 (items 등)   │
 * │ emit(newState)  │ set({ ... })                 │
 * │ state.copyWith()│ { ...state, ... }            │
 * │ 메서드          │ 객체의 함수 프로퍼티         │
 * │ context.read()  │ useStore.getState()          │
 * │ context.watch() │ useStore((s) => s.value)     │
 * └─────────────────┴──────────────────────────────┘
 *
 * 왜 Zustand가 인기 있는가?
 * 1. 보일러플레이트가 거의 없음 (Redux 대비 코드 80% 감소)
 * 2. Provider로 감쌀 필요 없음 (전역으로 바로 사용)
 * 3. TypeScript 지원 우수
 * 4. 번들 사이즈가 매우 작음 (~1KB)
 */

import { create } from 'zustand';

/**
 * create(): Zustand 스토어 생성 함수
 *
 * 파라미터:
 * - set: 상태를 업데이트하는 함수 (Flutter의 emit과 유사)
 * - get: 현재 상태를 읽는 함수 (Flutter의 state 접근과 유사)
 *
 * 반환값:
 * - useCartStore: 커스텀 훅 (컴포넌트에서 상태 접근에 사용)
 */
export const useCartStore = create((set, get) => ({
  // ============================================================
  // STATE (상태)
  // Flutter Cubit의 state 클래스 필드들과 동일
  // ============================================================

  /**
   * items: 장바구니 아이템 배열
   *
   * 아이템 구조:
   * {
   *   id: number,
   *   title: string,
   *   price: number,
   *   image: string,
   *   quantity: number  // 장바구니에서 추가된 필드
   * }
   */
  items: [],

  // ============================================================
  // ACTIONS (액션/메서드)
  // Flutter Cubit의 메서드들과 동일
  // ============================================================

  /**
   * addItem - 장바구니에 상품 추가
   *
   * Flutter Cubit 비교:
   * void addItem(Product product) {
   *   final existingIndex = state.items.indexWhere((e) => e.id == product.id);
   *   if (existingIndex >= 0) {
   *     final updated = [...state.items];
   *     updated[existingIndex] = updated[existingIndex].copyWith(
   *       quantity: updated[existingIndex].quantity + 1
   *     );
   *     emit(state.copyWith(items: updated));
   *   } else {
   *     emit(state.copyWith(items: [...state.items, CartItem(product, 1)]));
   *   }
   * }
   */
  addItem: (product) =>
    set((state) => {
      // 이미 장바구니에 있는지 확인
      const existingItem = state.items.find((item) => item.id === product.id);

      if (existingItem) {
        // 이미 있으면 수량만 +1
        // map으로 새 배열 생성 (불변성 유지 - Flutter의 copyWith와 유사)
        return {
          items: state.items.map((item) =>
            item.id === product.id
              ? { ...item, quantity: item.quantity + 1 } // 스프레드 연산자로 복사 후 수정
              : item
          ),
        };
      }

      // 없으면 quantity: 1로 새로 추가
      // [...state.items, newItem]: 기존 배열 복사 + 새 아이템 추가
      return {
        items: [...state.items, { ...product, quantity: 1 }],
      };
    }),

  /**
   * removeItem - 장바구니에서 상품 완전 제거
   *
   * filter(): 조건에 맞는 요소만 새 배열로 반환
   * Flutter의 where().toList()와 유사
   */
  removeItem: (productId) =>
    set((state) => ({
      items: state.items.filter((item) => item.id !== productId),
    })),

  /**
   * updateQuantity - 상품 수량 변경
   *
   * @param {number} productId - 상품 ID
   * @param {number} quantity - 새 수량 (0 이하면 제거)
   */
  updateQuantity: (productId, quantity) =>
    set((state) => {
      // 수량이 0 이하면 아이템 제거
      if (quantity <= 0) {
        return { items: state.items.filter((item) => item.id !== productId) };
      }

      // 수량 업데이트
      return {
        items: state.items.map((item) =>
          item.id === productId ? { ...item, quantity } : item
        ),
      };
    }),

  /**
   * clearCart - 장바구니 비우기
   *
   * set({ items: [] }): 간단히 빈 배열로 교체
   */
  clearCart: () => set({ items: [] }),

  // ============================================================
  // GETTERS (계산된 값)
  // Flutter의 getter 또는 Selector와 유사
  // ============================================================

  /**
   * getTotalCount - 장바구니 총 상품 개수
   *
   * get(): 현재 상태를 읽어옴
   * reduce(): 배열을 순회하며 단일 값으로 축소
   *
   * Flutter 비교:
   * int get totalCount => items.fold(0, (sum, item) => sum + item.quantity);
   */
  getTotalCount: () => {
    const { items } = get();
    return items.reduce((total, item) => total + item.quantity, 0);
  },

  /**
   * getTotalPrice - 장바구니 총 금액
   *
   * Flutter 비교:
   * double get totalPrice => items.fold(0, (sum, item) => sum + item.price * item.quantity);
   */
  getTotalPrice: () => {
    const { items } = get();
    return items.reduce((total, item) => total + item.price * item.quantity, 0);
  },
}));

/**
 * 사용 예시:
 *
 * // 컴포넌트에서 상태 구독 (값이 변경되면 리렌더링)
 * const items = useCartStore((state) => state.items);
 * const count = useCartStore((state) => state.getTotalCount());
 *
 * // 액션 호출
 * const addItem = useCartStore((state) => state.addItem);
 * addItem(product);
 *
 * // 또는 구조 분해로 한 번에
 * const { items, addItem, removeItem } = useCartStore();
 *
 * // 컴포넌트 밖에서 상태 접근 (비추천, 필요시에만)
 * const currentItems = useCartStore.getState().items;
 */
