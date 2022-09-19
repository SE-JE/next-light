import React, {
  useEffect,
  useState,
} from 'react';

import { faTimes } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { LoadingComponent, ModalConfirmComponent, ButtonComponent } from '../';

export default function ModalRightComponent({
  children,
  show,
  onClose,
  title,
  subTitle,
  loading,
  width,
  onCloseConfirmation,
  footer
}) {
  const [isLoading, setisLoading] = useState(true);
  const [closeConfirmation, setCloseConfirmation] = useState(false);

  useEffect(() => {
    setisLoading(false);
  }, []);

  if (show) {
    if (!isLoading)
      document.getElementsByTagName("html")[0].style.overflow = "hidden";
  } else {
    if (!isLoading)
      document.getElementsByTagName("html")[0].style.removeProperty("overflow");
  }

  return (
    <>
      <div
        className={`fixed top-0 z-40 w-screen h-screen bg-black opacity-50 modal-wrap ${show ? "left-0 opacity-1" : "-left-[110%] opacity-0"
          }`}
        onClick={() => onCloseConfirmation ? setCloseConfirmation(true) : onClose()}
      ></div>

      <div
        className={`fixed top-0 ${show ? "right-0" : `-right-[100%]`
          } h-screen bg-white z-50 rounded-l-3xl border-l-4 border__secondary shadow-[-4px_0px_10px_-4px_rgba(0,0,0,0.35)]`}
        style={{
          width: width ? width : "40%"
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

        <div
          className={`max-h-[calc(100vh-75px)] overflow-y-auto scroll_control px-8`}
        >
          {children}
        </div>

        {footer && (
          <div className='px-8 py-4 bg__background rounded-b-xl absolute bottom-0 w-full'>
            {footer}
          </div>
        )}
      </div>

      {loading && (
        <div className="fixed top-0 left-0 z-50 flex items-center justify-center w-screen h-screen bg-gray-200 bg-opacity-50">
          <LoadingComponent />
        </div>
      )}

      <div className='relative z-[60]'>
        <ModalConfirmComponent show={closeConfirmation} onClose={() => setClose(false)} onSubmit={() => {
          onClose()
          setCloseConfirmation(false)
        }}>
          Want to close without saving? your data and actions will not be saved
        </ModalConfirmComponent>
      </div>

    </>
  );
}
