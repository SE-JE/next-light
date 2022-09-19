import React from 'react';

import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

export default function BottomSheetComponent({
  show,
  children,
  onClose,
  buttonRight,
  title,
}) {
  return (
    <div
      className={`bg-gray-500 pt-5 fixed top-0 z-50 left-0 w-full ${
        show ? "opacity-100 h-[100vh]" : "opacity-0 h-0"
      }  overflow-hidden`}>
      <div
        className={`container bg-white h-full overflow-y-auto relative ${
          show ? "top-0" : "top-[100vh]"
        } rounded-t-2xl`}>
        {title && (
          <div className='text-center py-6'>
            <h1 className='font-medium text-2xl mb-2'>{title}</h1>
          </div>
        )}

        <div className='absolute left-0 top-0'>
          <button
            onClick={() => onClose()}
            className='block text__secondary p-6 text-xl'>
            <FontAwesomeIcon icon={faArrowLeft} />
          </button>
        </div>

        <div className='absolute right-0 top-0'>{buttonRight}</div>

        {children}
      </div>
    </div>
  );
}
