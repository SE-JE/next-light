import React, {
  useEffect,
  useState,
} from 'react';

export default function InputStatusComponent({ name, label, labelActive, labelInactive, onChange, setActive }) {
    const [checked, setChecked] = useState(false);

    // useEffect(() => {
    //     if(onChange){
    //         onChange(checked)
    //     }
    // }, [checked])

    // useEffect(() => {
    //     setChecked(setActive)
    // }, [setActive])
    return (
        <>
            <label className='font-semibold text-gray-500'>{label ? label : "Status"}</label>
            <label className="switch btn-color-mode-switch">
            <input type="checkbox" name={name} id={ name } value="1" checked={setActive} onChange={onChange} />
                <label htmlFor={name} data-on={labelActive ? labelActive : "Active"} data-off={labelInactive ? labelInactive : "Inactive"} className="btn-color-mode-switch-inner"></label>
            </label>
        </>
    )
}
