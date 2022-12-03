import { useEffect, useState } from "react";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import { ValidateComponent } from "..";
import { faPlus, faRupiahSign } from "@fortawesome/free-solid-svg-icons";

export default function InputRupiahComponent({
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
      var number_string = value.replace(/[^,\d]/g, '').toString(),
        split = number_string.split(','),
        sisa = split[0].length % 3,
        rupiah = split[0].substr(0, sisa),
        ribuan = split[0].substr(sisa).match(/\d{3}/gi);


      if (ribuan) {
        let separator = sisa ? '.' : '';
        rupiah += separator + ribuan.join('.');
      }

      rupiah = split[1] != undefined ? rupiah + ',' + split[1] : rupiah;


      setValue(rupiah);
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
            ${focus ? "text__primary" : ""}
            ${invalid ? "text__danger" : ""}
          `}
        >
          {label}
        </label>

        <div className='relative'>
          <input
            type={"text"}
            inputMode="numeric"
            value={value}
            placeholder={placeholder}
            maxLength={validate && validate.max && validate.max}
            className={`
              ${iconLeft ? "pl-20 pr-5" : icon ? "pl-16 pr-14" : "pl-16 pr-5"}
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

          {/* {(focus || value) && ( */}
          <div
            className={`absolute top-1/2 -translate-y-1/2 text-lg ${iconLeft ? "ml-16" : "left-1 ml-5"}`}
          >
            {/* <FontAwesomeIcon icon={faRupiahSign} /> */}
            Rp.
          </div>
          {/* )} */}
        </div>

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

        {invalid && (
          <small className='block text-sm text-left text__danger mt-2'>
            {invalid}
          </small>
        )}
      </div>
    </>
  );
}
