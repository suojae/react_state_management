/**
 * queryClient.js - React Query 클라이언트 설정
 *
 * Flutter 비교:
 * - Dio 클라이언트 설정 + 캐시 정책 설정과 유사
 * - Repository에서 캐싱 로직 직접 구현할 필요 없음
 *
 * React Query가 자동으로 해주는 것들:
 * 1. 데이터 캐싱
 * 2. 중복 요청 제거 (같은 데이터 여러 번 요청 방지)
 * 3. 백그라운드 데이터 갱신
 * 4. 메모리 관리 (안 쓰는 데이터 자동 정리)
 */

import { QueryClient } from '@tanstack/react-query';

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      /**
       * staleTime: 데이터가 "신선"하다고 간주되는 시간
       * - 이 시간 동안은 캐시된 데이터를 그대로 사용
       * - 이 시간이 지나면 백그라운드에서 자동으로 다시 fetch
       *
       * 예: 5분 설정 시
       * - 0~5분: 캐시 데이터 사용, API 호출 X
       * - 5분 후: 화면 표시는 캐시, 백그라운드에서 새 데이터 fetch
       */
      staleTime: 1000 * 60 * 5, // 5분

      /**
       * retry: 실패 시 재시도 횟수
       * - 네트워크 오류 등으로 실패하면 자동 재시도
       */
      retry: 1,

      /**
       * 기타 유용한 옵션들 (필요시 추가):
       *
       * cacheTime: 캐시 유지 시간 (기본 5분)
       * refetchOnWindowFocus: 탭 전환 시 자동 갱신 (기본 true)
       * refetchOnMount: 컴포넌트 마운트 시 자동 갱신
       * refetchOnReconnect: 네트워크 재연결 시 자동 갱신
       */
    },
  },
});
