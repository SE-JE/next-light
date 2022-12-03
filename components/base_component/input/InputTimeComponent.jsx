import React, {
    useEffect,
    useState,
} from 'react';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { ValidateComponent } from '../';
import TimePicker from 'rc-time-picker';
import moment from 'moment';

export default function InputTimeComponent({
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
    onlyAlphabet
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
                    {/* <input
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
                    /> */}
                    {/* <TimePicker defaultValue={moment()} showSecond={false} popupClassName="w-2" /> */}

                    {icon && (
                        <FontAwesomeIcon
                            className={`
                            absolute text-gray-400 text-xl 
                                ${iconLeft ? "left-1 ml-5" : "right-1 mr-5 top-1/2 -translate-y-1/2"} 
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
                </div>

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
