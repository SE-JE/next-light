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

import { ButtonComponent } from '../base_component';

function ModalConfirmationComponent({
  children,
  show,
  onClose,
  title,
  onSubmit,
  noAction,
  submitLoading,
  icon,
  bg,
  color
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
        className={`fixed left-0 z-40 w-screen h-screen bg-black opacity-50 modal-wrap ${
          show ? "top-0 opacity-1" : "-top-[110%] opacity-0"
        }`}
        onClick={() => onClose()}></div>

      <div
        className={`fixed ${
          show ? "top-1/2 opacity-1" : "top-[150%] opacity-0"
        }  left-1/2 -translate-x-1/2 -translate-y-1/2 bg-white p-8 z-50 max-w-lg rounded-xl shadow-lg`}>
        <h3 className={`mb-5 text-xl font-bold text-center text__${color ? color : "danger"}`}>
          {title ? title : "Are you sure?"}
        </h3>
        <p className='text-lg font-medium text-center text-gray-600'>
        {children ? children : "Deleted data cannot be recovered, and there is a risk of deleting other data"}
         
        </p>
        {!noAction && (
          <div className='flex justify-center gap-4 mt-7'>
            <ButtonComponent
              icon={faCheck}
              bg='danger'
              label={"Yes"}
              rounded
              onClick={() => onSubmit()}
              loading={submitLoading}
            />
            <ButtonComponent
              icon={faTimes}
              bg='secondary'
              label={"Cancel"}
              rounded
              onClick={() => onClose()}
            />
          </div>
        )}
        
        <div className={`absolute top-0 z-50 max-w-lg py-5 -translate-x-1/2 -translate-y-full bg__${bg ? bg : "danger"}  left-1/2 px-44 rounded-t-xl`}>
          <FontAwesomeIcon
            icon={icon ? icon : faTriangleExclamation}
            className='text-3xl text-white'
          />
        </div>
      </div>
    </>
  );
}

export default ModalConfirmationComponent;
