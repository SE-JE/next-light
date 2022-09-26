import React, { useEffect, useState } from 'react'
import RadioComponent from './RadioComponent';

export default function InputRadioGroupComponent({
    name,
    disabled,
    validate,
    error,
    setInputValue,
    label,
    className,
    options,
    col,
    onValidate,
    onChange
}) {
    const [value, setValue] = useState("");
    const [invalid, setInvalid] = useState("");

    useEffect(() => {
        setValue(setInputValue);
    }, [setInputValue]);

    return (
        <>
            <div
                className={`
                    w-full relative bg-white py-2 px-3 border-b-[3px] border-gray-300 rounded-xl
                    ${disabled ? "opacity-60" : ""} 
                    ${className}`}
            >
                <label
                    htmlFor={name}
                    className={`
                        z-10 text-base text-gray-400
                    `}
                >
                    {label}
                </label>

                <div className='max-h-[180px] scroll_control overflow-y-auto pt-1'>
                    <div
                        className={`flex gap-4`}>
                        {options && options.map((option, key) => {
                            return (
                                <RadioComponent
                                    key={key}
                                    label={option.label}
                                    value={option.value}
                                    id={name + "_" + key}
                                    name={name}
                                    checked={value == option.value}
                                    onChange={(e) => {
                                        setValue(option.value)

                                        if (onChange) {
                                            onChange(option.value)
                                        }
                                    }}
                                />
                            )
                        })}
                    </div>
                </div>
            </div>
        </>
    )
}
