import React, { useEffect, useState } from 'react';
import OtpInput from 'react-otp-input';

const InputOtpComponent = ({ onChange, error, max, setInputValue }) => {
    const [value, setValue] = useState("");
    const [invalid, setInvalid] = useState(false);

    useEffect(() => {
        if (onChange) {
            onChange(value)
        }

        if (value) {
            setInvalid(false)
        }

    }, [value]);

    useEffect(() => {
        if (error) {
            setInvalid(error)
        }
    }, [error]);

    useEffect(() => {
        setValue(setInputValue);
    }, [setInputValue]);

    return (
        <div className='relative'>
            <OtpInput
                value={value}
                onChange={(e) => setValue(e)}
                numInputs={max}
                separator={" "}
                inputStyle={"input_otp"}
                containerStyle={"mt-2"}
                isInputNum={true}
                hasErrored={invalid}
                errorStyle={"border__danger"}
                placeholder="00000"
            />

            {invalid && (
                <small className='block -bottom-6 text-sm text-left text__danger absolute'>
                    {invalid}
                </small>
            )}
        </div>
    );
}

export default InputOtpComponent;