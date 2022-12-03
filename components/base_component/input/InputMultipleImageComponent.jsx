import { LogarithmicScale } from 'chart.js';
import React, { useEffect, useState } from 'react'
import MultiImageInput from 'react-multiple-image-input';

export default function InputMultipleImageComponent({ onChange, setInputValue, name }) {
    const [images, setImages] = useState({});
    const [value, setValue] = useState([]);

    useEffect(() => {
        if (setInputValue != undefined) {
            setImages(setInputValue)
        }
    }, [setInputValue]);

    function dataURLtoFile(dataurl, filename) {

        var arr = dataurl.split(','),
            mime = arr[0].match(/:(.*?);/)[1],
            bstr = atob(arr[1]),
            n = bstr.length,
            u8arr = new Uint8Array(n);

        while (n--) {
            u8arr[n] = bstr.charCodeAt(n);
        }

        return new File([u8arr], filename, { type: mime });
    }

    return (
        <>
            <div className='relative'>

                <MultiImageInput
                    max={10}
                    images={images}
                    setImages={(e) => {
                        setImages(e)

                        let data = [];

                        Object.keys(e).map((key) => {
                            data.push(dataURLtoFile(e[key], key))
                        })

                        setValue(data)

                        onChange && onChange(data)
                    }}
                    allowCrop={false}
                    theme={{
                        background: "#222831",
                    }}
                    style={{
                        borderRadius: "20px"
                    }}
                />

                {/* <input type="file" name={name} multiple className='opacity-0 absolute' value={value} /> */}
            </div>
        </>
    )
}
