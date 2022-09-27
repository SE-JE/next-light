import React from 'react'
import CheckBoxComponent from './input/CheckBoxComponent'

export default function FilterComponent({ type, options, onChange, setInputValue }) {
    if (type == "checkbox") {
        return (
            <>
                <div className='flex flex-col gap-2'>
                    {options && options[0] && options.map((option, key) => {
                        return (
                            <CheckBoxComponent
                                key={key}
                                label={option.label}
                                value={option.value}
                                onChange={(e) => {
                                    if (setInputValue?.filter((val) => val == option.value)[0]) {
                                        onChange(setInputValue.filter((val) => val != option.value))
                                    } else {
                                        onChange([...setInputValue, option.value])
                                    }
                                }}
                                checked={setInputValue?.filter((val) => val == option.value)[0] ? true : false}
                            />
                        )
                    })}
                </div>
            </>
        )
    }

    return <></>;
}
