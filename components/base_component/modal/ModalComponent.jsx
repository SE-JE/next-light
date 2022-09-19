import React, {
    useEffect,
    useState,
} from 'react';

import {
    faCheck,
    faTimes,
    faTriangleExclamation,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { ButtonComponent } from '..';

function ModalComponent({
    children,
    show,
    onClose,
    title,
    subTitle,
    footer,
}) {
    const [isLoading, setisLoading] = useState(true);

    useEffect(() => {
        setisLoading(false);
    }, []);

    if (show) {
        // document.getSelection("body").scrolling = "no";
        if (!isLoading)
            document.getElementsByTagName("body")[0].style.overflow = "hidden";
    } else {
        // document.getElementsByTagName('html')[0].style.overflow = "auto"
        if (!isLoading)
            document.getElementsByTagName("body")[0].style.removeProperty("overflow");
    }

    return (
        <>
            <div
                className={
                    `fixed left-0 z-40 w-screen h-screen bg-black opacity-50 modal-wrap 
                    ${show ? "top-0 opacity-1" : "-top-[110%] opacity-0"}`
                }
                onClick={() => onClose()}
            ></div>

            <div
                className={`
                    fixed left-1/2 -translate-x-1/2 -translate-y-1/2 bg-white z-50 max-w-lg rounded-xl shadow-lg border-b-4 border__primary
                    ${show ? "top-1/2 opacity-1" : "top-[150%] opacity-0"}
                `}
                style={{
                    width: "60vw",
                    maxWidth: "600px"
                }}
            >
                <div className='flex justify-between items-center gap-8 px-8 py-6'>
                    <div>
                        <h6 className='text-xl font-semibold text-gray-600'>{title}</h6>
                        <p className='text-md text-gray-400 leading-4 mt-1'>{subTitle}</p>
                    </div>

                    <ButtonComponent
                        icon={faTimes}
                        color="gray"
                        square
                        onClick={() => onClose()}
                    />
                </div>

                <div className='px-8 pb-8'>
                    {children}
                </div>

                <div className='px-8 py-4 bg__background rounded-b-xl'>
                    {footer}
                </div>
            </div>
        </>
    );
}

export default ModalComponent;
