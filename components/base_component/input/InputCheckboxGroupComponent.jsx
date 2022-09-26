import React, {
  useEffect,
  useState,
} from 'react';

import CheckBoxComponent from './CheckBoxComponent';

export default function InputCheckboxGroupComponent({
  label,
  options,
  col,
  setInputValue,
  onChange,
  name,
  className,
  disabled,
}) {
  const [values, setValues] = useState([]);

  useEffect(() => {
    setValues(setInputValue ? setInputValue : []);
  }, [setInputValue]);

  return (
    <div
      className={`
          w-full relative bg-white py-2 px-3 border-b-[3px] border-gray-300 rounded-xl
          ${disabled ? "opacity-60" : ""} 
          ${className}
      `}
    >
      <label
        htmlFor={name}
        className={`
          z-10 text-base text-gray-400
        `}
      >
        {label}
      </label>

      <div className='max-h-[180px] scroll_control overflow-y-auto pt-1'>
        <div className={`flex gap-4`}>
          {options &&
            options.map((data, key) => {
              return (
                <CheckBoxComponent
                  key={key}
                  defaultChecked={values ? values.filter((val, _) => val == data.value)[0] : ""}
                  name={data.value}
                  label={data.label}
                  onChange={(e) => {
                    if (values.filter((val, _) => val == data.value)[0]) {
                      setValues([
                        ...values.filter((val, _) => val != data.value),
                      ]);

                      if (onChange) {
                        onChange([
                          ...values.filter((val, _) => val != data.value),
                        ]);
                      }

                    } else {
                      setValues([
                        ...values.filter((val, _) => val != data.value),
                        data.value,
                      ]);

                      if (onChange) {
                        onChange([
                          ...values.filter((val, _) => val != data.value),
                          data.value,
                        ]);
                      }
                    }
                  }}
                />
              );
            })}
        </div>
      </div>
    </div>
  );
}
