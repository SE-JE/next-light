import React from 'react';

function RadioComponent({
  name,
  label,
  onChange,
  checked,
  className,
  disabled,
  id,
  textSize
}) {
  return (
    <div
      className={
        `flex items-center ${disabled ? "opacity-70" : "cursor-pointer"} ` +
        className
      }
    >
      <input
        type="checkbox"
        id={id ? id : name}
        name={name}
        className=" radio__control cursor-pointer"
        onChange={onChange}
        checked={checked}
        disabled={disabled}
      />
      {label && (
        <label
          htmlFor={id ? id : name}
          className={`ml-2 whitespace-nowrap font-semibold text-gray-600 text-${textSize}`}
        >
          {label}
        </label>
      )}
    </div>
  );
}

export default RadioComponent;
