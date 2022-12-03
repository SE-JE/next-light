import React, { useEffect, useState } from 'react'
import CheckBoxComponent from './CheckBoxComponent';
import RadioComponent from './RadioComponent';

export default function InputRadioGroupComponent({
  name,
  disabled,
  validate,
  error,
  setInputValue,
  label,
  className,
  options,
  col,
  onValidate,
  onChange
}) {
  const [value, setValue] = useState("");
  const [invalid, setInvalid] = useState("");

  useEffect(() => {
    setInvalid(error);
  }, [error]);

  useEffect(() => {
    setValue(setInputValue);
  }, [setInputValue]);

  return (
    <div>
      <label
        htmlFor={name}
        className="font-medium"
      >
        {label}
      </label>
      <div
        className={`
                    w-full relative bg__background mt-1 py-3 2xl:py-4 px-5 border-[1px] border-gray-300 rounded-xl
                    ${disabled ? "opacity-60" : ""} 
                    ${className}`}
      >


        <div className='max-h-[180px] scroll_control overflow-y-auto'>
          <div
            className={`flex gap-4`}>
            {options && options.map((option, key) => {
              return (
                <CheckBoxComponent
                  key={key}
                  label={option.label}
                  value={option.value}
                  id={name + "_" + key}
                  name={name}
                  checked={value == option.value}
                  onChange={(e) => {
                    setValue(option.value)
                    setInvalid(false)
                    if (onChange) {
                      onChange(option.value)
                    }
                  }}
                />
              )
            })}
          </div>
        </div>

        {invalid && (
          <small className='block px-2 pl-5 -bottom-6 text-sm text-left text__danger absolute'>
            {invalid}
          </small>
        )}
      </div>
    </div>
  )
}
