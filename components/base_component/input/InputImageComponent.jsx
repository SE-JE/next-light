import {
  useEffect,
  useRef,
  useState,
} from 'react';

import { faCamera } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { STORAGE_URL } from '../../../config';
import { create } from '../../../pages/api/crud';

export default function InputImageComponent({
  name,
  label,
  onValidate,
  onChange,
  setInputValue,
  disabled,
  placeholder,
  aspect,
  uploadUrl,
  error,
  uploadFolder
}) {
  const [Image, setImage] = useState(false);
  const [ImageValid, setImageValid] = useState(true);
  const [dragActive, setDragActive] = useState(false);

  const inputRef = useRef(null);

  useEffect(() => {
    if (setInputValue) {
      if (onChange && !uploadUrl) {
        setImage(setInputValue ? setInputValue.type ? URL.createObjectURL(setInputValue) : setInputValue : "");
      } else {
        setImage(STORAGE_URL + "/" + setInputValue);
      }
    }
  }, [setInputValue]);

  const ImageHndler = async (e) => {
    var image = e.target.files[0];

    const allowedExtension = [
      "image/jpeg",
      "image/jpg",
      "image/png",
      "image/svg",
    ];

    var isValid = e.target.files[0] && allowedExtension.includes(image.type);

    setImageValid(isValid);


    if (onValidate) {
      onValidate(isValid);
    }

    if (!uploadUrl) {
      setImage(image ? URL.createObjectURL(image) : "");
    }

    if (onChange && !uploadUrl) {
      onChange(e.target.files[0]);
    }

    if (onChange && uploadUrl) {
      const formData = new FormData;

      formData.append("file_image", e.target.files[0])

      if (uploadFolder) {
        formData.append("folder_name", uploadFolder)
      }

      const upload = await create("admin/hotel/upload-image", formData);

      if (upload?.status == 200) {
        onChange(upload.data.file_name);
        setImage(STORAGE_URL + "/" + upload.data.file_name);
      }
    }
  }

  // handle drag events
  const handleDrag = function (e) {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  // triggers when file is dropped
  const handleDrop = function (e) {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      inputRef.current.files = e.dataTransfer.files;

      let image = e.dataTransfer.files[0];

      if (!uploadUrl) {
        setImage(image ? URL.createObjectURL(image) : "");
      }
    }
  };


  return (
    <>
      <div className='relative'>
        <div className='p-4 border-2 border-dashed rounded-xl'>
          <label htmlFor={name} className='cursor-pointer'>
            <div className='mb-3 font-semibold ml-1'>{label}</div>
            <label
              htmlFor={name}
              style={{
                backgroundImage: "URL(" + Image + ")",
                filter: "brightness(0.9)",
                aspectRatio: aspect,
              }}
              className={`border border-b-[3px] ${dragActive ? "border__primary" : "border-gray-300"}  text-gray-400 w-full aspect-${aspect ? aspect : "video"
                } relative flex flex-col gap-y-5 justify-center items-center m-auto rounded-lg bg-cover bg-no-repeat ${!disabled && "cursor-pointer "
                } ${!ImageValid && "outline__danger"}`}
              name={name} onDragEnter={handleDrag}>
              {!disabled &&
                (Image ? (
                  <FontAwesomeIcon className='text-3xl' icon={faCamera} />
                ) : (
                  <>
                    <FontAwesomeIcon className='text-3xl' icon={faCamera} />
                    <p className="font-semibold">{dragActive ? "Drop Here" : "Take a Picture"}</p>
                  </>
                ))}
            </label>
            {/* {!ImageValid && (
              <div className='text__danger mt-3'>
                Image Extension Only (.jpg, .jpeg, .png, .svg)
              </div>
            )} */}
            <input
              ref={inputRef}
              type='file'
              id={name}
              name={name}
              onChange={(e) => ImageHndler(e)}
              className='hidden'
              disabled={disabled}
            />

            {dragActive && <div className='absolute w-full h-full top-0 left-0' onDragEnter={handleDrag} onDragLeave={handleDrag} onDragOver={handleDrag} onDrop={handleDrop}></div>}
          </label>

          {(error || !ImageValid) && (
            <div className='mt-2 text-xs font-medium text-red-500'>
              Warning: Allowable format Image
            </div>
          )}
        </div>
      </div>
    </>
  );
}
