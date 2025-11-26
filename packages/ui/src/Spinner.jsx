/**
 * 공유 Spinner 컴포넌트
 */

export function Spinner({ size = 40 }) {
  return (
    <div
      style={{
        width: size,
        height: size,
        border: '3px solid #f3f3f3',
        borderTop: '3px solid #1976d2',
        borderRadius: '50%',
        animation: 'spin 1s linear infinite',
      }}
    />
  );
}

// CSS animation은 각 앱의 global CSS에서 정의해야 함
// @keyframes spin { 0% { transform: rotate(0deg); } 100% { transform: rotate(360deg); } }
