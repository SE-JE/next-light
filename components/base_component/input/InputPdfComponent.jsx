import React, { useState } from 'react';

import {
  faFile,
  faFileImage,
  faFilePdf,
  faUpload,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

export default function InputPdfComponent({label, name}) {
  const [fileUpload, setFileUpload] = useState([]);
  const [fileAfterUpload, setFileAfterUpload] = useState([]);

  // const uploadDocument = async (file) => {
  //   const formData = new FormData();
  //   formData.append("document", file);

  //   let upload = await create("rekam-medis/upload", formData);

  //   if (upload?.status == 200) {
  //     setFileAfterUpload([
  //       ...fileAfterUpload,
  //       {
  //         filename: upload.data?.file_name,
  //         status: true,
  //       },
  //     ]);

  //     return {
  //       filename: upload.data?.file_name,
  //       status: true,
  //     };
  //   } else {
  //     setFileAfterUpload([
  //       ...fileAfterUpload,
  //       {
  //         status: false,
  //       },
  //     ]);

  //     return {
  //       status: false,
  //     };
  //   }
  // };

  // useEffect(() => {
  //   if (fileUpload) {
  //     if (fileUpload.length > fileAfterUpload.length) {
  //       fileUpload.map((data, key) => {
  //         if (key == fileAfterUpload.length) {
  //           uploadDocument(data);
  //         }
  //       });
  //     }
  //   }
  // }, [fileUpload, fileAfterUpload]);

  const showFile = (e) => {
    let selectFile = fileUpload[e];

    setUrlView(URL.createObjectURL(selectFile));
  };

  return (
    <>
      <div className='p-4 border-2 border-dashed rounded-xl'>
            <label htmlFor={name} className='cursor-pointer'>
              <div className='mb-2 text-sm font-semibold text-gray-400'>{label}</div>
              <div className='text-center shadow-[inset_0_1px_6px_0_rgba(0,0,0,0.25)] rounded-lg py-10 px-4'>
                <FontAwesomeIcon icon={fileUpload?.name ? fileUpload?.name?.split(".").pop() == "jpg" ||
                    fileUpload?.name?.split(".").pop() == "png" ||
                    fileUpload?.name?.split(".").pop() == "jpeg" ||
                    fileUpload?.name?.split(".").pop() == "jfif"
                  ? faFileImage
                  : fileUpload?.name?.split(".").pop() == "pdf"
                  ? faFilePdf
                  : faFile
                : faUpload} className='text-3xl text-gray-500' />
                <h6 className='text-sm mt-4 text-gray-500 font-semibold limit__line__2 min-h-[32px] h-[32px] max-h-[32px]'>{fileUpload?.name ? fileUpload?.name : "Upload File"}</h6>
              </div>
              <input
                type='file'
                className='hidden'
                id={name}
                name={name}
                // multiple='multiple'
                onChange={(e) => {
                  if (e.target.files) {
                    setFileUpload(e.target.files[0]);
                  }
                }}
              />
            </label>
            {fileUpload?.name && !['jpg', 'png', 'jpeg', 'pdf'].includes(fileUpload?.name?.split(".").pop()) && (
              <div className='mt-2 text-xs font-medium text-red-500'>
                Warning: Allowable format PDF & Image
              </div>
            )}
      </div>
    </>
  )
}
