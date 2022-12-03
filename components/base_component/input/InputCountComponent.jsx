import React, {
  useEffect,
  useState,
} from 'react';

import {
  faMinus,
  faPlus,
  faTriangleExclamation,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { ValidateComponent } from '../';

export default function InputCountComponent({
  type,
  placeholder,
  name,
  icon,
  icomoon,
  disabled,
  onFocus,
  onBlur,
  onChange,
  onClick,
  validate,
  error,
  setInputValue,
  label,
  autoComplete,
  listSuggestions,
  size,
  mb,
  iconLeft,
  setRef,
  className,
  onValidate,
  subFix,
  min,
  max,
  msgErrorMax,
  hideButton,
  inputClassName,
  maxWord,
}) {
  const [focus, setFocus] = useState(false);
  const [value, setValue] = useState("");
  const [invalid, setInvalid] = useState("");
  const [tooltip, setTooltip] = useState("");
  const [valueSelect, setValueSelect] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [activeSuggestion, setActiveSuggestion] = useState(0);
  const [filteredSuggestions, setFilteredSuggestions] = useState([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [first, setFirst] = useState(true);

  useEffect(() => {
    setSuggestions(listSuggestions);
  }, [listSuggestions]);

  useEffect(() => {
    setInvalid(error);
  }, [error]);

  useEffect(() => {
    setValue(setInputValue);
    setValueSelect("");
    if (setInputValue) {
      setFirst(false);
    }
  }, [setInputValue]);

  useEffect(() => {
    if (value) {
      let val = String(value).split("");
      let newVal = "";

      val.map((data, index) => {
        if (/[0-9]/.test(data)) {
          newVal += data;
        }
      });


      if (newVal == "") {
        newVal = 0
      }

      if (newVal < min) {
        newVal = min;
      }

      if (newVal > max) {
        newVal = max;
        setTooltip(msgErrorMax)
        setTimeout(() => {
          setTooltip("")
        }, 5000);
      }

      if (maxWord) {
        newVal = newVal.slice(0, maxWord)
      }

      setValue(newVal);

      if (onChange) {
        onChange(newVal);
      }
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [value]);

  return (
    <div className='relative'>
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
            ${focus ? "text__primary" : ""}
            ${invalid ? "text__danger" : ""}
          `}
        >
          {label}
        </label>

        <div className='relative'>
          <input
            ref={setRef}
            type={'text'}
            inputMode="numeric"
            value={value ? subFix ? value + " " + subFix : value : ""}
            id={name}
            className={`
              ${iconLeft ? "pl-16 pr-5" : icon ? "pl-5 pr-14" : "pl-5 pr-5"}
              ${invalid ? " invalid" : ""}
              ${inputClassName}
            `}
            name={name}
            disabled={disabled}
            placeholder={placeholder}
            onFocus={(e) => {
              setFocus(true);

              if (e.target.value == "") {
                setValue(0)
              }

              if (onFocus) {
                onFocus();
              }
              if (autoComplete) {
                filterSuggestion(e);
              }
            }}
            onBlur={(e) => {
              setTimeout(() => {
                setFocus(false);
              }, 100);

              if (onBlur) {
                onBlur(e.target.value);
              }
            }}
            onChange={(e) => {
              setValue(e.target.value);
              setFirst(false);


              if (!validate) {
                setInvalid("");
              }


              if (autoComplete) {
                filterSuggestion(e);
              }
            }}
            onKeyDown={(e) => {
              if (autoComplete) {
                onKeyDownSuggestion(e);
              }
            }}
            autoComplete={"off"}
          />


          {icon && (
            <FontAwesomeIcon
              className={`
                absolute text-gray-400 text-xl top-1/2 -translate-y-1/2
                ${iconLeft ? "left-1 ml-5" : "right-1 mr-5"} 
                ${onClick && "cursor-pointer"} 
                ${focus ? "text__primary" : ""}
                ${invalid ? "text__danger" : ""}
              `}
              icon={icon}
              onClick={(e) => {
                if (onClick) {
                  onClick(e);
                }
              }}
            />
          )}

          {!hideButton && focus ? (
            <label htmlFor={name} className='absolute right-1 mr-4 top-1/2 -translate-y-1/2'>
              <div className='flex gap-3 '>
                <div className={`w-6 h-6 flex justify-center items-center rounded-md cursor-pointer ${focus
                  ? "bg__light__primary"
                  : "bg-gray-300"
                  }`} onMouseDown={() => {
                    setTimeout(() => {
                      setFocus(true)
                    }, 110)

                  }} onMouseUp={(e) => {
                    setValue(String(parseInt(value) - 1));
                    setTimeout(() => {
                      setFocus(true);
                    }, 120);
                  }}>
                  <FontAwesomeIcon
                    className={` text-gray-500 ${size == "sm" ? "text-sm" : "text-base"
                      } ${focus
                        ? !invalid
                          ? "text__primary"
                          : "text__danger"
                        : !invalid
                          ? ""
                          : "text__danger"
                      }`}
                    icon={faMinus}

                  />
                </div>

                <div className={`w-6 h-6 flex justify-center items-center rounded-md cursor-pointer ${focus
                  ? "bg__light__primary"
                  : "bg-gray-300"
                  }`} onMouseDown={() => {
                    setTimeout(() => {
                      setFocus(true)
                    }, 110)

                  }} onMouseUp={(e) => {
                    setValue(String(parseInt(value) + 1));
                    setTimeout(() => {
                      setFocus(true);
                    }, 120);
                  }}>
                  <FontAwesomeIcon
                    className={` text-gray-500 ${size == "sm" ? "text-sm" : "text-base"
                      } ${focus
                        ? !invalid
                          ? "text__primary"
                          : "text__danger"
                        : !invalid
                          ? ""
                          : "text__danger"
                      }`}
                    icon={faPlus}

                  />
                </div>
              </div>
            </label>
          ) : ""}

          {maxWord && (
            <div className='absolute right-1 mr-5 top-1/2 -translate-y-1/2 text-gray-400 '>{value.length}/{maxWord}</div>
          )}
        </div>

        {validate && !first && focus && (
          <ValidateComponent
            type={autoComplete && focus ? "select" : "text"}
            {...validate}
            value={value}
            setInvalid={(e) => {
              setInvalid(e);
              if (onValidate) {
                onValidate(e);
              }
            }}
          />
        )}
      </div>
      {invalid && (
        <small className='block text-sm text-left text__danger mt-2'>
          {invalid}
        </small>
      )}


      {tooltip && focus && (
        <ul
          className={`absolute left-0 mt-2 rounded-lg bg__light__primary text__primary tooltip triangle_up primary w-max shadow-lg text-left pt-3 pb-1 px-4 z-40`}>
          <li className='mb-2 flex items-center text-semibold'>
            <span className='w-7'>
              <FontAwesomeIcon className='text__primary' icon={faTriangleExclamation} />
            </span>
            {tooltip}
          </li>
        </ul>
      )}
    </div>
  );
}
