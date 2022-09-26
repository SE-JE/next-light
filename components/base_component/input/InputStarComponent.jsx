import React, {
  useEffect,
  useState,
} from 'react';

import { faStar as farStar } from '@fortawesome/free-regular-svg-icons';
import { faStar, faTimes } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

export default function StarComponent({ setInputValue, onChange, disabled, className, iconLeft, invalid, label, icon, onFocus, onBlur, name }) {
  const [value, setValue] = useState(0);
  const [star, setStar] = useState([]);
  const [focus, setFocus] = useState(false);

  useEffect(() => {
    setValue(setInputValue);
  }, [setInputValue]);

  return (
    <div
      className={`
        form__control
        ${disabled ? "opacity-60" : ""} 
        ${className}
      `}
    >
      <label
        htmlFor={name}
        className={`
            absolute z-10 
            ${value || focus ? `active` : ``} 
            ${iconLeft ? "ml-14" : "ml-3"}
            ${focus ? "text__primary" : ""}
            ${invalid ? "text__danger" : ""}
          `}
      >
        {label}
      </label>
      <input
        readOnly="readonly"
        className={`
            ${iconLeft ? "pl-16 pr-5" : icon ? "pl-5 pr-14" : "pl-5 pr-5"}
            ${invalid ? " invalid" : ""}
          `}
        onFocus={(e) => {
          setFocus(true);
          if (onFocus) {
            onFocus();
          }
        }}
        onBlur={(e) => {
          setTimeout(() => {
            setFocus(false);
          }, 100);

          if (onBlur) {
            onBlur();
          }
        }}
      />
      {(focus || value) && (
        <div className='flex gap-3 bottom-5 absolute left-5'>
          {[1, 2, 3, 4, 5].map((num, key) => {
            if (num <= value) {
              return (
                <FontAwesomeIcon
                  icon={faStar}
                  className={`text-yellow-400 text-xl hover:scale-125 cursor-pointer`}
                  onMouseDown={(e) => {
                    setValue(num);
                    setTimeout(() => {
                      setFocus(true);
                    }, 110);
                  }}

                  onMouseUp={() => {
                    setValue(num);
                    setTimeout(() => {
                      setFocus(false);
                    }, 120);
                    if (onChange) {
                      onChange(num);
                    }
                  }}
                />
              );
            } else {
              return (
                <FontAwesomeIcon
                  icon={farStar}
                  className={`text-yellow-400 text-xl hover:scale-125 cursor-pointer`}
                  onMouseDown={(e) => {
                    setValue(num);
                    setTimeout(() => {
                      setFocus(true);
                    }, 110);
                  }}

                  onMouseUp={() => {
                    setValue(num);
                    setTimeout(() => {
                      setFocus(false);
                    }, 120);
                    if (onChange) {
                      onChange(num);
                    }
                  }}
                />
              );
            }
          })}
        </div>
      )}

      {value && (
        <FontAwesomeIcon
          className={`
              absolute right-8 text-xl text-gray-400
              ${focus ? "text__primary" : ""}
              ${invalid ? "text__danger" : ""}
            `}
          icon={faTimes}
          onClick={(e) => {
            setValue("")
          }}
        />
      )}

    </div>
  );
}
