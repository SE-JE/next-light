import React, {
  useEffect,
  useState,
} from 'react';

import moment from 'moment';
import Calendar from 'react-calendar';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import ValidateComponent from '../ValidateComponent';
import { faCalendarDay } from '@fortawesome/free-solid-svg-icons';

export default function MultipleDateComponent({
  name,
  range,
  disabled,
  placeholder,
  onChange,
  setInputValue,
  icon,
  error,
  label,
  validate,
  onValidate,
  className,
  minDate,
  maxDate,
  toTop,
  toRight,
  defaultView
}) {
  const [focus, setFocus] = useState(false);
  const [value, setValue] = useState("");
  const [valueSelect, setValueSelect] = useState("");
  const [invalid, setInvalid] = useState("");
  const [first, setFirst] = useState(true);

  useEffect(() => {
    setInvalid(error);
  }, [error]);

  useEffect(() => {
    if (setInputValue) {
      if (range) {
        setValue([new Date(setInputValue[0]), new Date(setInputValue[1])]);
      } else {
        let date = setInputValue.split("-");
        setValue(new Date(date[0], date[1] - 1, date[2]));
      }
      setValueSelect(setInputValue);
      if (onChange) {
        onChange(setInputValue);
      }
    } else {
      setValue("");
    }
  }, [setInputValue]);

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
          htmlFor={name + "_field"}
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
        <input type="hidden" name={name} value={value ? (!range ? moment(value).locale("id").format("YYYY-MM-DD") : moment(value[0]).locale("id").format("YYYY-MM-DD") + "|" + moment(value[1]).locale("id").format("YYYY-MM-DD")) : ""} />
        <input
          readOnly="readonly"
          id={name + "_field"}
          placeholder={focus ? placeholder : ""}
          value={value ? (!range ? moment(value).locale("id").format("DD MMMM YYYY") : moment(value[0]).locale("id").format("DD MMMM YYYY") + " - " + moment(value[1]).locale("id").format("DD MMMM YYYY")) : ""}
          className={`
            ${icon ? "pl-16 pr-5" : "pl-5 pr-5"}
            ${invalid ? " invalid" : ""}
          `}
          name={""}
          disabled={disabled}
          onFocus={() => {
            setFocus(true);
          }}
          autoComplete={false}
        />

        {icon && (
          <FontAwesomeIcon
            className={`
              absolute text-gray-400 left-1 ml-5 
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

        {!disabled && (
          <label
            className='absolute mr-8 right-1 text-gray-400'
            onClick={() => setFocus(true)}>
            <FontAwesomeIcon
              className={`absolute text-xl -mt-2 ${focus
                ? !invalid
                  ? "text__primary"
                  : "text__danger"
                : !invalid
                  ? ""
                  : "text__danger"
                }`}
              icon={faCalendarDay}
            />
          </label>
        )}

        {!disabled && focus && (
          <>
            <div
              className='fixed top-0 left-0 z-40 w-full h-full bg-black opacity-30'
              onClick={() => setFocus(false)}></div>

            <div className={`absolute z-50 w-[400px] p-5 mr-5 bg-white border-2 rounded-lg shadow-lg ${!toRight ? "right-0" : "right-0 translate-x-1/2"} ${!toTop ? "top-20" : "top-0 -translate-y-full"}`}>
              <Calendar
                onChange={(e) => {
                  setFirst(false);
                  setValue(e);
                  setValueSelect(moment(e).format("YYYY-MM-DD"));
                  if (onChange) {
                    if (!range) {
                      onChange(moment(e).format("YYYY-MM-DD"));
                    } else {
                      onChange([moment(e[0]).format("YYYY-MM-DD"), moment(e[1]).format("YYYY-MM-DD")]);
                    }

                  }
                  setTimeout(() => {
                    setFocus(false);
                  }, 100);
                  setInvalid(false);
                }}
                minDate={minDate ? minDate : null}
                maxDate={maxDate ? maxDate : null}
                // value={new Date(value)}
                defaultView={defaultView}
                selectRange={range}
              />
            </div>
          </>
        )}

        {validate && !first && focus && (
          <ValidateComponent
            type={"text"}
            {...validate}
            value={valueSelect}
            setInvalid={(e) => {
              setInvalid(e);
              if (onValidate) {
                onValidate(e);
              }
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
