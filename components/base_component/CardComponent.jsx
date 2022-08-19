export default function CardComponent({ children, title, className }) {
  return (
    <div className={`border rounded-lg shadow ${className}`}>
      {title && <div className='px-6 py-5'>{title}</div>}
      <div className='px-6'>{children}</div>
    </div>
  );
}
