import React, {
  useEffect,
  useState,
} from 'react';

import { faSpinner } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { ValidateComponent } from '../';

export default function InputButtonComponent({
  type,
  placeholder,
  name,
  icon,
  disabled,
  onFocus,
  onBlur,
  onChange,
  onSubmit,
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
  loading,
  rounded,
  block,
  border,
  bg,
  font,
  color,
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
    // if (type == "phone") {
    //   if (value) {
    //     let val = value.split("");
    //     let newVal = "";

    //     val.map((data, index) => {
    //       // if (index == 3 || index == 8) {
    //       //   newVal += " ";
    //       // }
    //       if (/[0-9]/.test(data)) {
    //         newVal += data;
    //       }
    //     });

    //     setValue(newVal);
    //   }
    // }

    if (type == "number") {
      if (value) {
        let val = value.split("");
        let newVal = "";

        val.map((data, index) => {
          if (/[0-9]/.test(data)) {
            newVal += data;
          }
        });

        setValue(newVal);
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
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
  var today = new Date();
  var dd = today.getDate();
  var mm = today.getMonth() + 1; //January is 0!
  var yyyy = today.getFullYear();
  if (dd < 10) {
    dd = "0" + dd;
  }
  if (mm < 10) {
    mm = "0" + mm;
  }
  today = yyyy + "-" + mm + "-" + dd;

  return (
    <div className={`flex mb-${mb ? mb : "3"}`}>
      <div>
        <div
          className={`text-gray-400 flex items-center w-full relative  ${
            disabled ? "opacity-60" : ""
          } ${className}`}>
          <label
            htmlFor={name}
            className={`absolute z-10 ${
              size == "sm"
                ? iconLeft
                  ? "ml-12"
                  : "ml-2"
                : iconLeft
                ? "ml-14"
                : "ml-3"
            } px-2 ${
              value || focus
                ? `font-regular ${
                    size == "sm" ? "text-xs -mt-3" : "-mt-6 text-sm"
                  } ${
                    !disabled
                      ? !invalid
                        ? focus
                          ? "text__primary"
                          : ""
                        : "text__danger"
                      : ""
                  }`
                : `text-base font-bold ${
                    !invalid ? "text-gray-400" : "text__danger"
                  }`
            }`}>
            {placeholder}
          </label>
          <input
            ref={setRef}
            type={
              type == "number"
                ? "text"
                : type == "date"
                ? value || focus
                  ? "date"
                  : "text"
                : type
            }
            value={value}
            id={name}
            className={`${size == "sm" ? "pl-4 pr-4" : "pl-5 pr-5"} ${
              size == "sm" ? "pt-6 pb-2 text-base" : "pt-8 pb-3 text-lg"
            } w-full font-bold form__control text-gray-700 rounded-l-xl transition duration-150 ease-in-out focus:outline-none ${
              !disabled && focus && !invalid ? "value" : ""
            } ${invalid ? "danger" : ""}`}
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

          {(focus || value) && type == "phone" && (
            <div
              className={`absolute xl:text-base font-bold right-left ml-5 ${
                focus
                  ? !invalid
                    ? "text__primary"
                    : "text__danger"
                  : !invalid
                  ? "text-gray-700"
                  : "text__danger"
              }`}>
              +62
            </div>
          )}
          {autoComplete && showSuggestions && filteredSuggestions.length ? (
            <div>
              <ul
                className={`absolute suggestions left-0 mt-10 rounded-xl w-full bg-white drop-shadow-lg text-left z-30 overflow-hidden py-3 ease-in-out ${
                  focus ? "opacity-100 scale-y-100" : "opacity-0 scale-y-0"
                }`}>
                {filteredSuggestions.map((suggestion, index) => {
                  return (
                    <li
                      // tabIndex='-1'
                      className={`w-full px-5 py-3 list-none text-black cursor font-medium hover__bg__light__primary cursor-pointer ${
                        index == activeSuggestion
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
          <small className='px-2 pl-5 mb-3 -mt-4 text-sm text-left text__danger'>
            {invalid}
          </small>
        )}
      </div>

      <button
        type={type ? type : "button"}
        disabled={disabled || loading}
        onClick={(e) => onSubmit && onSubmit(e)}
        className={`relative overflow-hidden ${
          size == "sm"
            ? "py-3 px-6"
            : size == "lg"
            ? "py-5 px-14"
            : "py-4 px-10"
        } ${rounded ? "rounded-r-full" : "rounded-r-lg"} ${
          border ? "border-[3px] border__" + border : ""
        } ${disabled ? "btn__disabled" : `bg__${bg}`} ${className}`}>
        <div
          className={`flex ${
            size == "sm" ? "gap-3" : size == "lg" ? "gap-6" : "gap-4"
          } items-center ${
            font ? "font-" + font : "font-medium"
          } tracking-widest
        ${disabled ? "text-gray-400" : color ? "text__" + color : "text-white"}
        ${
          size == "sm"
            ? "text-xs lg:text-xs"
            : size == "lg"
            ? "text-base lg:text-xl"
            : "text-sm lg:text-base"
        }`}>
          {!loading && (
            <>
              <FontAwesomeIcon
                icon={icon}
                className={`inline ${
                  size == "sm"
                    ? "text-xs lg:text-base"
                    : size == "lg"
                    ? "text-base lg:text-xl"
                    : "text-sm lg:text-xl"
                }`}
              />

              {label}
            </>
          )}

          {loading && (
            <FontAwesomeIcon
              icon={faSpinner}
              className={`btn__loading ${
                size == "sm"
                  ? "text-xs lg:text-xs"
                  : size == "lg"
                  ? "text-base lg:text-xl"
                  : "text-sm lg:text-base"
              }`}
            />
          )}
        </div>
      </button>
    </div>
  );
}
