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
  textSize
}) {
  const [checked, setChecked] = useState(false);
  useEffect(() => {
    setChecked(defaultChecked);
  }, [defaultChecked]);
  return (
    <div className='flex gap-8'>
      <label
        className={`${className} cover__checkbox__control checkbox__${color ? color : "primary"
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
