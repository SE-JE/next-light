import React from 'react';

import { faSpinner } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';


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
      className={`
        relative overflow-hidden 
        ${square ? size == "sm" ? "w-[35px] aspect-square flex items-center justify-center" : size == "lg" ? "w-[55px] aspect-square flex items-center justify-center" : "w-[45px] aspect-square flex items-center justify-center"
          : boxIcon ? size == "sm" ? "py-2 pl-2 pr-6" : size == "lg" ? "py-3 pl-3 pr-12" : "py-2.5 pl-2.5 pr-10"
            : size == "sm" ? "py-2 px-8" : size == "lg" ? "py-4 px-12" : "py-3 px-10"
        } 
        ${rounded ? "rounded-full" : "rounded-lg"} 
        ${block ? "block w-full" : "w-auto"} 
        ${border ? "border-[2px] border__" + border : ""} 
        ${disabled ? "btn__disabled" : `bg__${bg}`}
        ${loading ? "opacity-80" : ""}
        ${className}
      `}
      style={square ? {
        width: size == "sm" ? '35px' : size == "lg" ? '55px' : '45px'
      } : null}
    >

      <div
        className={`
          flex items-center
          ${size == "sm" ? "gap-3" : size == "lg" ? "gap-5" : "gap-4"}
          ${font ? "font-" + font : "font-medium"}
          ${disabled ? "text-gray-400" : color ? "text__" + color : "text-white"}
          ${size == "sm" ? "text-base" : size == "lg" ? "text-2xl" : "text-xl"}
        `}
      >

        <>
          {!loading && (
            <>
              {icon && !boxIcon && (
                <FontAwesomeIcon
                  icon={icon}
                  className={`
                    inline 
                    ${size == "sm" ? "text-lg" : size == "lg" ? "text-2xl" : "text-xl"}
                  `}
                />
              )}

              {icon && boxIcon && (
                <div
                  className={`
                    flex items-center justify-center bg-white bg-opacity-20
                    ${size == "sm" ? "w-6 h-6" : size == "lg" ? "w-10 h-10" : "w-8 aspect-square"} 
                    ${rounded ? "rounded-full" : "rounded-md"}
                  `}
                >
                  <FontAwesomeIcon
                    icon={icon}
                    className={`
                      inline
                      ${size == "sm" ? "text-sm" : size == "lg" ? "text-xl" : "text-base"}
                    `}
                  />
                </div>
              )}
            </>
          )}

          {loading && (
            <>
              <div className={`
                  btn__loading variant_${color}
                  ${size == "sm" ? "w-3 h-3" : size == "lg" ? "w-5 h-5" : "w-4 h-4"}
              `}></div>
            </>

          )}
          {label}
        </>

      </div>
    </button>
  );
}

export default ButtonComponent;
