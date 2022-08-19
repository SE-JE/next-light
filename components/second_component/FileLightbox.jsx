import React, {
  useEffect,
  useState,
} from 'react';

import { faTimes } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

export default function FileLightbox({ src, onClose, type = null }) {
  const [isLoading, setisLoading] = useState(true);
  useEffect(() => {
    setisLoading(false);
  }, []);

  if (src) {
    if (!isLoading) {
      document.getElementsByTagName("html")[0].style.overflow = "hidden";
    }

    return (
      <>
        <div
          className='fixed top-0 left-0 z-50 w-screen h-screen bg-black opacity-50 modal-wrap'
          onClick={() => onClose()}></div>

        <div
          className={`flex items-center pb-10 w-3/4 justify-center opacity-100 z-50 modal`}
          style={{
            left: "35%",
            top: "50%",
            transform: "translate(-50%, -50%)",
          }}>
          <div className='w-full bg-white rounded-xl h-[80vh] overflow-auto scroll_control'>
            <div className='absolute top-0 flex flex-row-reverse justify-between w-full'>
              {onClose && (
                <div
                  onClick={() => onClose()}
                  className='-mr-10 my-auto text-xl cursor-pointer text-gray-700 hover__text__danger'>
                  <FontAwesomeIcon icon={faTimes} />
                </div>
              )}
            </div>
            {type == "image" ? (
              <img src={src} alt="" width="100%" />
            ) : (
              <iframe
              src={src}
              // frameborder='0'
              className='w-full h-full'></iframe>
          
             )}
            </div>
        </div>
      </>
    );
  }

  return <></>;
}
