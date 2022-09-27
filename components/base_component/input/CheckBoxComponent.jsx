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
  textSize
}) {
  return (
    <div className='flex items-center gap-3 2xl:gap-6 relative'>
      <label
        className={`${className} cover__checkbox__control checkbox__${color ? color : "primary"
          } text-sm`}>
        <input
          type='checkbox'
          className='opacity-0'
          id={name}
          onChange={onChange}
          checked={checked}
        />
        <span className='checkbox__control'></span>
      </label>
      <label
        htmlFor={name}
        className={`text-${textSize ? textSize : "lg"} cursor-pointer ${checked ? "text-gray-700 font-bold" : "text-gray-500 font-medium"
          }`}>
        {label}
      </label>
    </div>

  );
}
