/**
 * 공유 Button 컴포넌트
 * 모든 마이크로앱에서 일관된 버튼 스타일 사용
 */

export function Button({ children, variant = 'primary', onClick, style, ...props }) {
  const baseStyle = {
    padding: '10px 20px',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
    fontWeight: '500',
    transition: 'background-color 0.2s',
  };

  const variants = {
    primary: {
      backgroundColor: '#1976d2',
      color: '#fff',
    },
    secondary: {
      backgroundColor: '#fff',
      color: '#666',
      border: '1px solid #ddd',
    },
    danger: {
      backgroundColor: '#e53935',
      color: '#fff',
    },
  };

  return (
    <button
      onClick={onClick}
      style={{ ...baseStyle, ...variants[variant], ...style }}
      {...props}
    >
      {children}
    </button>
  );
}
