import React, {
  useEffect,
  useState,
} from 'react';

import { faTimes } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { LoadingComponent } from '../base_component';
import ModalConfirmationComponent from './ModalConfirmationComponent';

function ModalComponent({
  children,
  show,
  onClose,
  title,
  size,
  onSave,
  submitLabel,
  actionBar,
  noAction,
  saveDisabled,
  loading,
  fixed,
  top,
  px,
  back,
  data,
  submitLoading,
  width,
  onCloseConfirmation
}) {
  const [isLoading, setisLoading] = useState(true);
  const [closeConfirmation, setCloseConfirmation] = useState(false);

  useEffect(() => {
    setisLoading(false);
  }, []);

  if (show) {
    // document.getSelection("body").scrolling = "no";
    if (!isLoading)
      document.getElementsByTagName("html")[0].style.overflow = "hidden";
  } else {
    // document.getElementsByTagName('html')[0].style.overflow = "auto"
    if (!isLoading)
      document.getElementsByTagName("html")[0].style.removeProperty("overflow");
  }

  return (
    <>
      <div
        className={`fixed top-0 z-40 w-screen h-screen bg-black opacity-50 modal-wrap ${
          show ? "left-0 opacity-1" : "-left-[110%] opacity-0"
        }`}
        onClick={() => onCloseConfirmation ? setCloseConfirmation(true) : onClose()}
      ></div>

      <div
        className={`fixed top-0 ${
          show ? "right-0" : `-right-[100%]`
        } h-screen w-[${
          width ? width : "40%"
        }] bg-white z-50 rounded-l-3xl border-l-8 border__secondary shadow-[-4px_0px_10px_-4px_rgba(0,0,0,0.35)]`}
      >
        <div className="flex items-center justify-between px-6 py-4 shadow rounded-b-xl">
          <h3 className="text-lg font-semibold text__secondary">{title}</h3>
          <div className="p-3 cursor-pointer" onClick={() => onCloseConfirmation ? setCloseConfirmation(true) : onClose()}>
            <FontAwesomeIcon icon={faTimes} className="text__danger" />
          </div>
        </div>

        <div
          className={`max-h-[calc(100vh-75px)] overflow-y-auto scroll_control`}
        >
          {children}
        </div>
      </div>

      {loading && (
        <div className="fixed top-0 left-0 z-50 flex items-center justify-center w-screen h-screen bg-gray-200 bg-opacity-50">
          <LoadingComponent />
        </div>
      )}
      
      <div className='relative z-[60]'>
        <ModalConfirmationComponent show={closeConfirmation} onClose={() => setCloseConfirmation(false)} onSubmit={() => {
          onClose() 
          setCloseConfirmation(false)
        }}>
          Want to close without saving? your data and actions will not be saved
        </ModalConfirmationComponent>
      </div>
      
    </>
  );
}

export default ModalComponent;
