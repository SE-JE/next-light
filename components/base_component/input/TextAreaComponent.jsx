import React, { useState } from 'react'

export default function TextAreaComponent({ label, onChange, value, placeholder, name, onFocus, max, error }) {
    const [focus, setFocus] = useState(false);

    return (
        <>
            {label && <label htmlFor={name} className={`font-medium block mb-2 ${focus ? "text__primary" : ""}`}>{label}</label>}
            <div className='relative'>
                <textarea
                    id={name}
                    className='form__control h-[120px] bg__background rounded-lg focus:outline-none transition duration-150 p-4 border-b-[3px] border-gray-300'
                    name={name}
                    placeholder={placeholder}
                    onChange={(e) => (!max || e.target.value.length <= max) && onChange(e.target.value)}
                    onFocus={(e) => {
                        setFocus(true);
                        if (onFocus) {
                            onFocus();
                        }
                    }}
                    onBlur={(e) => {
                        setTimeout(() => {
                            setFocus(false);
                        }, 100);
                    }}
                    value={value}
                >
                </textarea>
                {max && (
                    <div className='absolute bottom-4 right-6 text-gray-400'>{value.length}/{max}</div>
                )}
            </div>
            {error && (
                <small className='block text-sm text-left text__danger mt-2'>
                    {error}
                </small>
            )}
        </>
    )
}
