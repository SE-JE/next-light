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
  defaultChecked,
}) {
  const [checked, setChecked] = useState(false);
  useEffect(() => {
    setChecked(defaultChecked);
  }, [defaultChecked]);
  return (
    <label
      className={`${className} cover__checkbox__control flex items-center checkbox__${color ? color : "primary"
        } text-sm`}>
      <input
        type='checkbox'
        id={name}
        onChange={(e) => {
          setChecked(!checked);
          if (onChange) {
            onChange(e);
          }
        }}
        checked={checked}
      />
      <label
        htmlFor={name}
        className={`text-lg ml-1 cursor-pointer ${checked ? "text-gray-700 font-bold" : "text-gray-500 font-medium"
          }`}>
        {label}
      </label>

      <span className='checkbox__control'></span>
    </label>
  );
}
