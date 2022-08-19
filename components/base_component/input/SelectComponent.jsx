import React, {
  useEffect,
  useState,
} from 'react';

// import { useMediaQuery } from 'react-responsive';
import { faChevronDown } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { ValidateComponent } from '../';
import IcomoonComponent from '../IcomoonComponent';

export default function SelectComponent({
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
  options,
  className,
  searchable,
  onSearch,
  searchServer,
  onValidate,
  hideOption
}) {
  const [focus, setFocus] = useState(false);
  const [value, setValue] = useState("");
  const [invalid, setInvalid] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [activeSuggestion, setActiveSuggestion] = useState(false);
  const [filteredSuggestions, setFilteredSuggestions] = useState([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [keydown, setKeydown] = useState(false);

  useEffect(() => {
    setActiveSuggestion(-1);
    setFilteredSuggestions(options);
    setShowSuggestions(true);
  }, [options]);

  useEffect(() => {
    setInvalid(error);
  }, [error]);

  useEffect(() => {
    setValue(setInputValue);
  }, [setInputValue]);

  const filterSuggestion = (e) => {
    if (options && options[0]) {
      if (!searchable) {
        setActiveSuggestion(-1);
        setFilteredSuggestions(options);
        setShowSuggestions(true);
      } else {
        const filteredSuggestion = options.filter(
          (suggestion) =>
            suggestion.searchable ? suggestion.searchable
              .toLowerCase()
              .indexOf(e.target.value.toLowerCase()) > -1 :
              suggestion.label
                .toLowerCase()
                .indexOf(e.target.value.toLowerCase()) > -1
        );

        if (hideOption) {
          filteredSuggestion = filteredSuggestion.filter((val) => val.value != hideOption);
        }

        setActiveSuggestion(-1);
        setFilteredSuggestions(filteredSuggestion);
        setShowSuggestions(true);
      }
    }
  };

  const onKeyDownSuggestion = (e) => {
    if (options && options[0]) {
      if (e.keyCode === 13 && filteredSuggestions[0]) {
        e.preventDefault();

        setActiveSuggestion(-1);
        setFilteredSuggestions([]);
        setShowSuggestions(false);
        setValue(filteredSuggestions[activeSuggestion]?.label);
        if (onChange) {
          onChange(filteredSuggestions[activeSuggestion]);
        }
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

  return (
    <div className='relative'>
      <div
        className={`
          form__control
          ${disabled ? "opacity-60" : ""} 
          ${className}`}
      >
        <label
          htmlFor={name}
          className={`
            absolute z-10 
            ${value || focus ? `active` : ``} 
            ${icon ? "ml-14" : "ml-3"}
            ${focus ? "text__primary" : ""}
            ${invalid ? "text__danger" : ""}
          `}
        >
          {label}
        </label>
        <input
          readOnly={!searchable ? "readonly" : ""}
          value={value}
          id={name}
          placeholder={focus ? placeholder : ""}
          className={`
            ${icon ? "pl-16 pr-5" : "pl-5 pr-5"}
            ${invalid ? " invalid" : ""}
          `}
          name={name}
          disabled={disabled}
          onFocus={(e) => {
            setFocus(true);
            setShowSuggestions(true);
            if (!searchServer) {
              filterSuggestion(e);
            }

            if (onFocus) {
              onFocus();
            }
          }}
          onBlur={(e) => {
            setTimeout(() => {
              setFocus(false);
            }, 100);

            let suges = options.find(
              (suggestion) =>
                suggestion.label.toLowerCase() == e.target.value.toLowerCase()
            );

            setTimeout(() => {
              if (!keydown) {
                setValue(suges ? suges?.label : "");
                if (onChange) {
                  onChange(suges);
                }
              }
            }, 140);

            if (onBlur) {
              onBlur();
            }
          }}
          onChange={(e) => {
            if (searchable) {
              setValue(e.target.value);
            }

            if (searchServer) {
              onSearch(e.target.value);
            } else {
              if (options && options[0]) {
                filterSuggestion(e);
              } else {
                onChange(e.target);
              }
            }
          }}
          onKeyDown={(e) => {
            if (options && options[0]) {
              onKeyDownSuggestion(e);
            }
          }}
          autoComplete='off'
        />


        {icon && (
          <FontAwesomeIcon
            className={`
              absolute left-1 ml-5 text-xl text-gray-400
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

        <label
          onClick={() => setFocus(!disabled ? !focus : false)}
          className='absolute mr-5 right-1 text-gray-400'>
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

        {!disabled && options && options[0] && showSuggestions && (
          <div>
            <ul
              className={`
                  absolute suggestions left-0 mt-10 rounded-xl w-full bg-white shadow text-left z-30 overflow-hidden py-3 ease-in-out 
                  ${focus ? "opacity-100 scale-y-100" : "opacity-0 scale-y-0"}
              `}
              style={{
                maxWidth: `calc(100% - ${icon ? "7.5rem" : "5.5rem"})`
              }}
            >
              <ul
                className='overflow-x-hidden overflow-y-auto my__scroll_no_shadow'
                style={{ maxHeight: "170px" }}>
                {filteredSuggestions.map((suggestion, index) => {
                  return (
                    <li
                      className={`
                        w-full px-5 py-3 list-none text-black cursor font-medium hover__bg__light__primary cursor-pointer 
                        ${index == activeSuggestion ? "bg__light__primary text__primary" : ""}
                      `}
                      key={index}
                      onMouseDown={() => {
                        setKeydown(true);
                        setTimeout(() => {
                          setFocus(true);
                        }, 110);

                        setValue(suggestion.label);
                      }}

                      onMouseUp={() => {
                        setKeydown(false);
                        setValue(suggestion.label);
                        setFilteredSuggestions([]);
                        setActiveSuggestion(index);
                        setShowSuggestions(false);
                        setInvalid(false);
                        setTimeout(() => {
                          setFocus(false);
                        }, 120);
                        if (onChange) {
                          onChange(suggestion);
                        }
                      }}
                    >
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

        {validate && focus && (
          <ValidateComponent
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
        <small className='block px-2 pl-5 -bottom-6 text-sm text-left text__danger absolute'>
          {invalid}
        </small>
      )}
    </div>
  );
}
