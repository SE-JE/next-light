export default function CardComponent({ children, title, className, border }) {
  return (
    <div
      className={`
        border border-b-2 rounded-lg shadow \
        ${border ? "border__" + border : "border-gray-300"}
        ${className}
      `}
    >
      {title && <div className='px-5 pt-5 pb-3 font-semibold'>{title}</div>}
      <div className='px-5 pb-5'>{children}</div>
    </div>
  );
}
