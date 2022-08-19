import React from 'react';

import { faSpinner } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import IcomoonComponent from './IcomoonComponent';

// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

function ButtonComponent({
  type,
  label,
  bg,
  rounded,
  block,
  className,
  disabled,
  border,
  size,
  onClick,
  icon,
  icomoon,
  loading,
  square,
  color,
  hover,
  boxIcon,
  font,
}) {
  return (
    <button
      type={type ? type : "button"}
      disabled={disabled || loading}
      onClick={(e) => onClick && onClick(e)}
      className={`relative overflow-hidden ${
        square
          ? size == "sm"
            ? "py-3 px-3"
            : size == "lg"
            ? "py-5 px-5"
            : "py-4 px-5"
          : boxIcon
          ? size == "sm"
            ? "py-2 pl-2 pr-6"
            : size == "lg"
            ? "py-4 pl-4 pr-14"
            : "py-3 pl-3 pr-10"
          : size == "sm"
          ? "py-3 px-6"
          : size == "lg"
          ? "py-5 px-14"
          : "py-4 px-10"
      } ${rounded ? "rounded-full" : "rounded-lg"} ${
        block ? "block w-full" : "w-auto"
      } ${border ? "border-[2px] border__" + border : ""} ${
        disabled ? "btn__disabled" : `bg__${bg}`
      } ${className}`}>
      {/* {!disabled && loading != undefined && (
        <div
          className={`absolute top-0 w-full h-full bg__${bg} ${
            loading ? "-left-20 btn_loading" : "left-0"
          }`}></div>
      )} */}
      <div
        className={`flex ${
          size == "sm" ? "gap-3" : size == "lg" ? "gap-6" : "gap-4"
        } items-center ${font ? "font-" + font : "font-medium"}
        ${disabled ? "text-gray-400" : color ? "text__" + color : "text-white"}
        ${
          size == "sm"
            ? "text-sm"
            : size == "lg"
            ? "text-xl"
            : "text-lg"
        }`}>
        {!loading && (
          <>
            {icon && !icomoon && !boxIcon && (
              <FontAwesomeIcon
                icon={icon}
                className={`inline ${
                  size == "sm"
                    ? "text-sm"
                    : size == "lg"
                    ? "text-xl"
                    : "text-lg"
                }`}
              />

            )}
            {icon && icomoon && !boxIcon && (
              <IcomoonComponent className={`inline ${size == "sm"
                ? "text-sm"
                : size == "lg"
                  ? "text-xl"
                  : "text-lg"
                }`} icon={icon} color={disabled ? "disabled" : color ? color : "white"} />

            )}
            {icon && boxIcon && (
              <div
                className={`${
                  size == "sm"
                    ? "w-6 h-6"
                    : size == "lg"
                    ? "w-12 h-12"
                    : "w-9 h-9"
                } ${
                  rounded ? "rounded-full" : "rounded-md"
                } flex items-center justify-center bg-white bg-opacity-20`}>
                <FontAwesomeIcon
                  icon={icon}
                  className={`inline ${
                    size == "sm"
                      ? "text-sm"
                      : size == "lg"
                      ? "text-xl"
                      : "text-lg"
                  }`}
                />
              </div>
            )}
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
                ? "text-lg lg:text-xl"
                : "text-base lg:text-lg"
            }`}
          />
        )}
      </div>
    </button>
  );
}

export default ButtonComponent;
