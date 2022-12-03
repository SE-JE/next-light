import React, {
  useEffect,
  useRef,
  useState,
} from 'react';

// import { useMediaQuery } from 'react-responsive';
import {
  faCheck,
  faChevronDown,
  faTimes,
  faTimesCircle,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { ValidateComponent } from '../';

export default function SelectMultipleComponent({
  type,
  placeholder,
  name,
  icon,
  disabled,
  onFocus,
  onBlur,
  onChange,
  onClick,
  items,
  validate,
  error,
  setInputValue,
  label,
  options,
  className,
  mb,
  size,
  searchable
}) {
  const [focus, setFocus] = useState(false);
  const [value, setValue] = useState("");
  const [values, setValues] = useState([]);
  const [invalid, setInvalid] = useState("");
  const [valueSelect, setValueSelect] = useState([]);
  const [suggestions, setSuggestions] = useState([]);
  const [activeSuggestion, setActiveSuggestion] = useState(false);
  const [filteredSuggestions, setFilteredSuggestions] = useState([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const inputCom = useRef();

  useEffect(() => {
    setSuggestions(options);
  }, [options]);

  // const mobile = useMediaQuery({ query: "(max-width: 768px)" });

  useEffect(() => {
    setInvalid(error);
  }, [error]);

  useEffect(() => {
    if (setInputValue && options && options.length > 0) {
      let newValue = [];

      options.map((data, key) => {
        if (setInputValue.find((val) => val == data.value)) {
          newValue.push(data.label);
        }
      });

      setValues(newValue);
      setValueSelect(setInputValue);
    }
  }, [setInputValue, options]);

  useEffect(() => {
    if (onChange) {
      onChange(valueSelect);
    }
  }, [valueSelect]);

  const filterSuggestion = (e) => {
    if (options) {
      const filteredSuggestion = options.filter(
        (suggestion) =>
          suggestion.label.toLowerCase().indexOf(e.target.value.toLowerCase()) >
          -1
      );

      setActiveSuggestion(-1);
      setFilteredSuggestions(filteredSuggestion);
      setShowSuggestions(true);
    }
  };

  const onKeyDownSuggestion = (e) => {
    if (options) {
      if (e.keyCode === 13 && filteredSuggestions[activeSuggestion]) {
        e.preventDefault();

        setActiveSuggestion(-1);
        setFilteredSuggestions([]);
        setShowSuggestions(false);

        if (
          valueSelect.find(
            (val, key) => val == filteredSuggestions[activeSuggestion]?.value
          )
        ) {
          setValues(
            values.filter(
              (val, key) => val != filteredSuggestions[activeSuggestion]?.label
            )
          );
          setValueSelect(
            valueSelect.filter(
              (val, key) => val != filteredSuggestions[activeSuggestion]?.value
            )
          );
        } else {
          setValues([...values, filteredSuggestions[activeSuggestion]?.label]);
          setValueSelect([
            ...valueSelect,
            filteredSuggestions[activeSuggestion]?.value,
          ]);
        }

        setFocus(false);
        setValue("");
      } else if (e.keyCode === 38) {
        if (activeSuggestion === 0) {
          return;
        }

        setActiveSuggestion(activeSuggestion - 1);
        setValue(filteredSuggestions[activeSuggestion - 1]?.label);
      } else if (e.keyCode === 40) {
        if (activeSuggestion + 1 >= filteredSuggestions.length) {
          return;
        }

        setActiveSuggestion(activeSuggestion + 1);
        setValue(filteredSuggestions[activeSuggestion + 1]?.label);
      }
    }
  };

  useEffect(() => {
    if (focus) {
      inputCom.current.focus();
    } else {
      inputCom.current.blur();
    }
  }, [focus]);

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
            ref={inputCom}
            readOnly={!searchable ? "readonly" : ""}
            value={value}
            id={name}
            placeholder={values?.at(0) ? "" : placeholder}
            className={`
              ${icon ? "pl-16 pr-5" : "pl-5 pr-5"}
              ${invalid ? " invalid" : ""}
            `}
            name={name}
            disabled={disabled}
            onFocus={(e) => {
              setFocus(true);
              setShowSuggestions(true);
              filterSuggestion(e);
              if (onFocus) {
                onFocus();
              }
            }}
            onBlur={(e) => {
              setTimeout(() => {
                setFocus(false);
              }, 100);

              // setValue("");

              if (onBlur) {
                onBlur();
              }
            }}
            onChange={(e) => {
              setValue(e.target.value);
              filterSuggestion(e);
            }}
            onKeyDown={(e) => {
              if (options) {
                onKeyDownSuggestion(e);
              }
            }}
            autoComplete='off'
          />
          {icon && (
            <FontAwesomeIcon
              className={`
                absolute left-1 ml-5 text-xl text-gray-400 top-1/2 -translate-y-1/2
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


          {(!searchable || (searchable && !focus)) && (
            <div
              className={`
                absolute top-1/2 -translate-y-1/2
                overflow-x-auto scroll__form
                ${icon ? "ml-16" : "ml-5"}
              `}
              style={{
                maxWidth: `calc(100% - ${icon ? "7.5rem" : "5rem"})`
              }}
            >
              <div className={`left-0 flex gap-2 flex-nowrap w-max`}>
                {values.map((data, key) => {
                  return (
                    <div
                      key={key}
                      className='flex px-2 justify-between bg-gray-200 items-center text-base font-medium rounded-md'>
                      <span className='pl-2'>{data}</span>
                      <FontAwesomeIcon
                        icon={faTimes}
                        className='ml-2 text-sm cursor-pointer py-2.5 px-2 hover__text__danger'
                        onClick={() => {
                          let index = values.findIndex((val) => val == data);
                          setValues(values.filter((_, val) => val != index));
                          setValueSelect(
                            valueSelect.filter((_, val) => val != index)
                          );
                        }}
                      />
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          <label
            onClick={() => setFocus(!disabled ? !focus : false)}
            className='absolute mr-5 right-1 top-1/2 -translate-y-1/2 text-gray-400'>
            <FontAwesomeIcon
              className={`text-xl -mt-2 ${focus
                ? !invalid
                  ? "text__primary"
                  : "text__danger"
                : !invalid
                  ? ""
                  : "text__danger"
                }`}
              icon={faChevronDown}
              onClick={() => setFocus(true)}
            />
          </label>

          {showSuggestions && (
            <div>
              <ul
                className={`absolute suggestions left-0 mt-2 rounded-xl w-full bg-gray-100 shadow text-left z-30 overflow-hidden py-3 ease-in-out ${focus ? "opacity-100 scale-y-100" : "opacity-0 scale-y-0"
                  }`}>


                <ul
                  className='flex flex-col gap-2 overflow-auto custom__scroll'
                  style={{ maxHeight: "170px" }}>
                  {filteredSuggestions.map((suggestion, index) => {
                    let activeValue = valueSelect.findIndex(
                      (val) => val == suggestion.value
                    );

                    return (
                      <li
                        tabIndex='-1'
                        className={`w-full px-5 py-3 list-none cursor hover:bg-neutral-600 cursor-pointer ${activeValue > -1 || activeSuggestion == index
                          ? "bg__light__primary"
                          : ""
                          }`}
                        key={suggestion.value}
                        onMouseDown={(e) => {
                          setTimeout(() => {
                            setFocus(true);
                          }, 110);
                        }}
                        onMouseUp={() => {
                          setTimeout(() => {
                            setFocus(false);
                            if (activeValue > -1) {
                              setValues(
                                values.filter(
                                  (val, key) => val != suggestion.label
                                )
                              );
                              setValueSelect(
                                valueSelect.filter(
                                  (val, key) => val != suggestion.value
                                )
                              );
                            } else {
                              setValues([...values, suggestion.label]);
                              setValueSelect([...valueSelect, suggestion.value]);
                            }

                            setFilteredSuggestions([]);
                            setActiveSuggestion(index);
                            setShowSuggestions(false);
                            setValue("");
                            setInvalid(false);
                          }, 120);
                        }}>
                        {activeValue > -1 && (
                          <FontAwesomeIcon icon={faCheck} className='mr-2' />
                        )}

                        {!suggestion.customView
                          ? suggestion.label
                          : suggestion.customView}
                      </li>
                    );
                  })}
                </ul>
              </ul>
            </div>
          )}

        </div>

        {validate && focus && (
          <ValidateComponent
            {...validate}
            value={value}
            setInvalid={(e) => {
              setInvalid(e);
            }}
          />
        )}

        {invalid && (
          <small className='block px-2 pl-5 -bottom-6 text-sm text-left text__danger absolute'>
            {invalid}
          </small>
        )}
      </div>
    </>
  );
}
