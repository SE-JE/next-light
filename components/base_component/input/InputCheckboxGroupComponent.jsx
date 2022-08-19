import React, {
  useEffect,
  useState,
} from 'react';

import CheckBoxComponent from './CheckBoxComponent';

export default function InputCheckboxGroupComponent({
  label,
  items,
  col,
  setInputValue,
  onChange,
}) {
  const [values, setValues] = useState([]);

  useEffect(() => {
    setValues(setInputValue);
  }, [setInputValue]);

  return (
    <div className='bg-white p-5 rounded-xl'>
      <label htmlFor='' className='text-semibold text-gray-500 block pt-2 pb-5'>
        {label}
      </label>
      <div className='max-h-[180px] scroll_control overflow-y-auto'>
        <div className={`grid grid-cols-${col ? col : 1} gap-4`}>
          {items &&
            items.map((data, key) => {
              return (
                <CheckBoxComponent
                  key={key}
                  defaultChecked={values ? values.filter((val, _) => val == data.value)[0] : ""}
                  name={data.value}
                  label={data.label}
                  onChange={(e) => {
                    if (values.filter((val, _) => val == data.value)[0]) {
                      setValues([
                        ...values.filter((val, _) => val != data.value),
                      ]);

                      onChange([
                        ...values.filter((val, _) => val != data.value),
                      ]);
                    } else {
                      setValues([
                        ...values.filter((val, _) => val != data.value),
                        data.value,
                      ]);

                      onChange([
                        ...values.filter((val, _) => val != data.value),
                        data.value,
                      ]);
                    }
                  }}
                />
              );
            })}
        </div>
      </div>
    </div>
  );
}
