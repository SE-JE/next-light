import {
  useEffect,
  useState,
} from 'react';

import { faCamera } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { STORAGE_URL } from '../../../config';
import { create } from '../../../pages/api/crud';

export default function InputImageComponent({
  name,
  onValidate,
  onChange,
  setInputValue,
  disabled,
  placeholder,
  aspect,
  uploadUrl,
  uploadFolder
}) {
  const [Image, setImage] = useState(false);
  const [ImageValid, setImageValid] = useState(true);

  useEffect(() => {
    if (onChange && !uploadUrl) {
      setImage(setInputValue ? setInputValue.type ? URL.createObjectURL(setInputValue) : setInputValue : "");
    } else {
      setImage(STORAGE_URL + "/" + setInputValue);
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

    if (onChange && !uploadUrl) {
      setImage(image ? URL.createObjectURL(image) : "");
      onChange(e.target.files[0]);
    }

    if (onChange && uploadUrl) {
      const formData = new FormData;

      formData.append("file_image", e.target.files[0])

      if(uploadFolder) {
        formData.append("folder_name", uploadFolder)
      }

      const upload = await create("admin/hotel/upload-image", formData);
      
      if (upload?.status == 200) {
        onChange(upload.data.file_name);
        setImage(STORAGE_URL + "/" + upload.data.file_name);
      }
    }
  }

  return (
    <>
      <div className='text-center relative'>
        <label
          htmlFor={name}
          style={{
            backgroundImage: "URL(" + Image + ")",
            filter: "brightness(0.9)",
            aspectRatio: aspect,
          }}
          className={` bg-gray-200 text-gray-400 w-full aspect-${
            aspect ? aspect : "video"
          } relative flex flex-col gap-y-5 justify-center items-center m-auto rounded-lg bg-cover bg-no-repeat ${
            !disabled && "cursor-pointer "
          } ${!ImageValid && "outline__danger"}`}
          name={name}>
          {!disabled &&
            (Image ? (
              <FontAwesomeIcon className='text-3xl' icon={faCamera} />
            ) : (
              <>
                <FontAwesomeIcon className='text-3xl' icon={faCamera} />
                <p className="font-semibold text-sm">{placeholder ? placeholder : "Take a Picture"}</p>
              </>
            ))}
        </label>
        {!ImageValid && (
          <div className='text__danger mt-3'>
            Image Extension Only (.jpg, .jpeg, .png, .svg)
          </div>
        )}
        <input
          type='file'
          id={name}
          name={name}
          onChange={(event) => ImageHndler(event)}
          className='hidden'
          disabled={disabled}
        />
      </div>
    </>
  );
}
