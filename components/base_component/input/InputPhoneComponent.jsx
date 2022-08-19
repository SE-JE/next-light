import { useEffect, useState } from "react";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import { ValidateComponent } from "../";
import { faPlus } from "@fortawesome/free-solid-svg-icons";

export default function InputPhoneComponent({
  autoComplete,
  type,
  placeholder,
  name,
  icon,
  disabled,
  onFocus,
  onBlur,
  onChange,
  onClick,
  option,
  items,
  validate,
  error,
  setInputValue,
  listSuggestions,
  ref,
  size,
  onValidate,
  className,
  iconLeft,
  label
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
  }, [setInputValue]);

  useEffect(() => {
    if (value && typeof value === "string") {
      let val = value.split("");
      let newVal = "";

      val.map((data, index) => {
        if (index == 2 || index == 6 || index == 11 || index == 16) {
          newVal += " ";
        }
        if (/[0-9]/.test(data)) {
          newVal += data;
        }
      });

      setValue(newVal);
    }
  }, [value]);

  return (
    <>
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
          type={type}
          value={value}
          placeholder={focus ? placeholder : ""}
          maxLength={validate && validate.max && validate.max}
          className={`
            ${iconLeft ? "pl-20 pr-5" : icon ? "pl-10 pr-14" : "pl-5 pr-5"}
            ${invalid ? " invalid" : ""}
          `}
          name={name}
          id={name}
          disabled={disabled}
          onFocus={() => {
            setFocus(true);
            if (onFocus) {
              onFocus();
            }
          }}
          onBlur={() => {
            setFocus(false);
            if (onBlur) {
              onBlur();
            }
            // if (!value) {
            //   setInvalid(false);
            // }
          }}
          onChange={(e) => {
            if (e.target.value.length <= 18) {
              setValue(e.target.value);
              if (onChange) {
                onChange(e.target.value);
              }
            }
          }}
          autoComplete={"off"}
        />

        {icon && (
          <FontAwesomeIcon
            className={`
              absolute text-gray-400 text-xl 
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

        {(focus || value) && (
          <div
            className={`absolute text-lg pt-4 ${iconLeft ? "ml-16" : "left-1 ml-5"}`}
          >
            <FontAwesomeIcon icon={faPlus} />
          </div>
        )}

        {validate && focus && value && (
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
        <small className="block px-2 text-left -mt-4 mb-6 pl-5 text-sm text__danger">
          {invalid}
        </small>
      )}
    </>
  );
}
