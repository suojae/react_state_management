/**
 * 공유 Card 컴포넌트
 */

export function Card({ children, style, ...props }) {
  return (
    <div
      style={{
        backgroundColor: '#fff',
        borderRadius: '8px',
        padding: '16px',
        boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
        ...style,
      }}
      {...props}
    >
      {children}
    </div>
  );
}
