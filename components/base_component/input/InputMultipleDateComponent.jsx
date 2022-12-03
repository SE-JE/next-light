import React, {
  useEffect,
  useState,
} from 'react';

import moment from 'moment';
import Calendar from 'react-calendar';

import {
  faCalendarPlus,
  faPlus,
  faPlusCircle,
  faTimes,
  faTimesCircle,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

export default function InputMultipleDateComponent({
  name,
  disabled,
  placeholder,
  size,
  onChange,
  setInputValue,
  icon,
  error,
  className,
  label,
  toRight,
  toTop,
  minDate,
  maxDate,
  value,
  defaultView,
  range,
  mb,
}) {
  const [focus, setFocus] = useState(false);
  const [values, setValues] = useState([]);
  const [valueSelect, setValueSelect] = useState([]);
  const [invalid, setInvalid] = useState("");

  useEffect(() => {
    setInvalid(error);
  }, [error]);

  useEffect(() => {
    if (onChange) {
      if (setInputValue !== valueSelect) {
        onChange(valueSelect);
      }
    }
  }, [valueSelect, setInputValue]);

  useEffect(() => {
    if (setInputValue) {
      let newValue = [];
      setInputValue.map((data, key) => {
        let date = data.split("-");
        newValue.push(new Date(date[0], date[1] - 1, date[2]));
      });
      setValues(newValue);
      setValueSelect(setInputValue);
      if (onChange) {
        onChange(setInputValue);
      }
    }
  }, [setInputValue]);

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
            readOnly="readonly"
            placeholder={focus && !values.at(0) ? placeholder : ""}
            className={`
              ${icon ? "pl-16 pr-5" : "pl-5 pr-5"}
              ${invalid ? " invalid" : ""}
            `}
            name={name}
            disabled={disabled}
            onFocus={() => {
              setFocus(true);
            }}
          />

          {icon && (
            <FontAwesomeIcon
              className={`
                absolute left-1 ml-5 text-gray-400 text-lg
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

          {values[0] && (
            <div
              className={`
                absolute top-1/2 -translate-y-1/2
                max-w-[]
                overflow-x-auto scroll__form
                ${icon ? "ml-16" : "ml-5"}
              `}
              style={{
                maxWidth: `calc(100% - ${icon ? "7.5rem" : "5.5rem"})`
              }}
            >
              <div className={`left-0 flex gap-2 flex-nowrap w-max`}>
                {values.map((data, key) => {
                  return (
                    <div
                      key={key}
                      className='flex px-2 justify-between items-center text-base font-medium bg-gray-200 rounded-md'>
                      <span className='pl-2'>{moment(data).locale("id").format("DD MMMM YYYY")}</span>
                      <FontAwesomeIcon
                        icon={faTimes}
                        className='ml-2 text-sm cursor-pointer py-2 px-2 hover__text__danger'
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

          <div
            className='absolute mr-9 right-1 text-gray-400 top-1/2 -translate-y-1/2'
            onClick={() => setFocus(true)}>
            <FontAwesomeIcon
              className={`absolute text-xl -mt-3  ${focus
                ? !invalid
                  ? "text__primary"
                  : "text__danger"
                : !invalid
                  ? ""
                  : "text__danger"
                }`}
              icon={faCalendarPlus}
            />
          </div>

          {focus && (
            <>
              <div
                className='fixed top-0 left-0 z-10 w-full h-full bg-black opacity-30'
                onClick={() => setFocus(false)}></div>

              <div className={`absolute z-50 w-[400px] p-5 mr-5 bg-white border-2 rounded-lg shadow-lg ${!toRight ? "right-0" : "right-0 translate-x-1/2"} ${!toTop ? "top-20" : "top-0 -translate-y-full"}`}>
                <Calendar
                  onChange={(e) => {
                    if (
                      valueSelect.find(
                        (val) => val == moment(e).format("YYYY-MM-DD")
                      )
                    ) {
                      let index = valueSelect.findIndex(
                        (val) => val == moment(e).format("YYYY-MM-DD")
                      );
                      setValues(values.filter((_, val) => val != index));
                      setValueSelect(
                        valueSelect.filter((_, val) => val != index)
                      );
                      if (onChange) {
                        onChange(valueSelect.filter((_, val) => val != index));
                      }
                    } else {
                      setValues([...values, e]);
                      setValueSelect([
                        ...valueSelect,
                        moment(e).format("YYYY-MM-DD"),
                      ]);
                      if (onChange) {
                        onChange([
                          ...valueSelect,
                          moment(e).format("YYYY-MM-DD"),
                        ]);
                      }
                    }
                    setFocus(false);
                    setInvalid(false);
                  }}
                  minDate={minDate ? minDate : null}
                  maxDate={maxDate ? maxDate : null}
                  value={value}
                  defaultView={defaultView}
                  selectRange={range}
                />
              </div>
            </>
          )}
        </div>


        {invalid && (
          <small className='block px-2 pl-5 -bottom-6 text-sm text-left text__danger absolute'>
            {invalid}
          </small>
        )}
      </div>
    </>
  );
}
