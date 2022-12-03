import {
  useEffect,
  useState,
} from 'react';

export default function CheckBoxComponent({
  label,
  name,
  className,
  color,
  onChange,
  checked,
  textSize,
  value
}) {
  return (
    <div className='flex items-center gap-4 2xl:gap-6 relative'>
      <label
        className={`${className} cover__checkbox__control checkbox__${color ? color : "primary"
          } text-sm`}>
        <input
          type='checkbox'
          className='opacity-0'
          id={name}
          name={name}
          onChange={onChange}
          checked={checked}
          value={value}
        />
        <span className='checkbox__control'></span>
      </label>
      <label
        htmlFor={name}
        className={`text-${textSize ? textSize : "base"} cursor-pointer ${checked ? "text-gray-500 font-bold" : "text-gray-400 font-medium"
          }`}>
        {label}
      </label>
    </div>

  );
}
