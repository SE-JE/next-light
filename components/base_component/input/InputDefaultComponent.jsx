import React, {
  useEffect,
  useState,
} from 'react';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { ValidateComponent } from '../';
import PropTypes from 'prop-types'

InputDefaultComponent.propTypes = {
  name: PropTypes.string
};

export default function InputDefaultComponent({
  type,
  placeholder,
  name,
  icon,
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
  iconLeft,
  setRef,
  className,
  onValidate,
  onlyAlphabet,
  autoUppercase,
  maxWord,

}) {
  const [focus, setFocus] = useState(false);
  const [value, setValue] = useState("");
  const [invalid, setInvalid] = useState("");
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
    if (value && typeof value === "string") {
      let val = value.split("");
      let newVal = "";

      if (onlyAlphabet) {
        val.map((data, index) => {
          if (data == " ") {
            newVal += " ";
          } else if (/[A-Za-z]/.test(data)) {
            newVal += data;
          }
        });
      } else {
        newVal = value;
      }

      if (autoUppercase) {
        newVal = newVal.toUpperCase();
      }

      if (maxWord) {
        newVal = newVal.slice(0, maxWord)
      }

      setValue(newVal);
    }
  }, [value]);

  const filterSuggestion = (e) => {
    if (autoComplete) {
      const filteredSuggestion = [];

      if (e.target.value) {
        filteredSuggestion = suggestions
          .filter(
            (suggestion) =>
              suggestion.toLowerCase().indexOf(e.target.value.toLowerCase()) >
              -1
          )
          .slice(0, 10);
      } else {
        filteredSuggestion = suggestions.slice(0, 10);
      }

      setActiveSuggestion(-1);
      setFilteredSuggestions(filteredSuggestion);
      setShowSuggestions(true);
    }
  };

  const onKeyDownSuggestion = (e) => {
    if (autoComplete) {
      if (e.keyCode === 13) {
        let resultValue = filteredSuggestions[activeSuggestion];
        setActiveSuggestion(-1);
        setFilteredSuggestions([]);
        setShowSuggestions(false);
        setValue(resultValue ? resultValue : value);
        if (onChange) {
          onChange(resultValue ? resultValue : value);
        }
        e.preventDefault();
      } else if (e.keyCode === 38) {
        if (activeSuggestion === 0) {
          return;
        }

        setActiveSuggestion(activeSuggestion - 1);
      } else if (e.keyCode === 40) {
        if (activeSuggestion + 1 >= filteredSuggestions.length) {
          return;
        }

        setActiveSuggestion(activeSuggestion + 1);
      }
    }
  };



  return (
    <>
      <div
        className={`
          form__control
          ${disabled ? "opacity-60" : ""} 
          ${className}`}
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
            type={type ? type : "text"}
            value={value}
            placeholder={placeholder}
            id={name}
            className={`
            ${iconLeft ? "pl-16 pr-5" : icon ? "pl-5 pr-14" : "pl-5 pr-5"}
            ${invalid ? " invalid" : ""}
          `}
            name={name}
            disabled={disabled}
            onFocus={(e) => {
              setFocus(true);
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
                onBlur();
              }
            }}
            onChange={(e) => {
              setValue(e.target.value);

              setFirst(false);

              if (!validate) {
                setInvalid("");
              }

              if (onChange) {
                onChange(e.target.value);
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

          {maxWord && (
            <div className='absolute right-1 mr-5 top-1/2 -translate-y-1/2 text-gray-400 '>{value.length}/{maxWord}</div>
          )}
        </div>


        {autoComplete && showSuggestions && filteredSuggestions.length ? (
          <div>
            <ul
              className={`absolute suggestions left-0 mt-10 rounded-xl w-full bg-white shadow text-left z-30 overflow-hidden py-3 ease-in-out ${focus ? "opacity-100 scale-y-100" : "opacity-0 scale-y-0"
                }`}>
              {filteredSuggestions.map((suggestion, index) => {
                return (
                  <li
                    // tabIndex='-1'
                    className={`w-full px-5 py-3 list-none text-black cursor font-medium hover__bg__light__primary cursor-pointer ${index == activeSuggestion
                      ? "bg__light__primary text__primary"
                      : ""
                      }`}
                    key={suggestion}
                    onMouseDown={() => {
                      setTimeout(() => {
                        setFocus(true);
                      }, 110);
                    }}
                    onMouseUp={() => {
                      setActiveSuggestion(index);
                      setFilteredSuggestions([]);
                      setShowSuggestions(false);
                      setValue(
                        filteredSuggestions[index]
                          ? filteredSuggestions[index]
                          : value
                      );
                      if (onChange) {
                        onChange(
                          filteredSuggestions[index]
                            ? filteredSuggestions[index]
                            : value
                        );
                      }
                      setTimeout(() => {
                        setFocus(false);
                      }, 120);
                    }}>
                    {suggestion}
                  </li>
                );
              })}
            </ul>
          </div>
        ) : (
          ""
        )}

        {validate && !first && (
          <ValidateComponent
            type={"text"}
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

        {invalid && (
          <small className='block text-sm text-left text__danger mt-2'>
            {invalid}
          </small>
        )}
      </div>

    </>
  );
}
