import {
  useEffect,
  useRef,
  useState,
} from 'react';

import { faCamera, faSave } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { STORAGE_URL } from '../../../config';
import { post } from '../../../pages/api/crud';
import ModalComponent from '../modal/ModalComponent';
import AvatarEditor from 'react-avatar-editor';
import ButtonComponent from '../ButtonComponent';

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
  uploadFolder,
  crop,
  cropSize
}) {
  const [Image, setImage] = useState(false);
  const [ImageValid, setImageValid] = useState(true);
  const [dragActive, setDragActive] = useState(false);
  const [imageCrop, setImageCrop] = useState(false);

  const inputRef = useRef(null);

  useEffect(() => {
    if (setInputValue) {
      if (onChange && !uploadUrl) {
        setImage(setInputValue ? setInputValue.type ? URL.createObjectURL(setInputValue) : setInputValue : "");
      } else {
        setImage(STORAGE_URL + "/" + setInputValue);
      }
    } else {
      setImage("");
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

    if (crop) {
      setImageCrop(image)
    } else {
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

        const upload = await post("admin/hotel/upload-image", formData);

        if (upload?.status == 200) {
          onChange(upload.data.file_name);
          setImage(STORAGE_URL + "/" + upload.data.file_name);
        }
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

  const [zoom, setZoom] = useState("1");
  const imageRef = useRef();

  const onCropDown = () => {
    if (imageRef.current) {
      // This returns a HTMLCanvasElement, it can be made into a data URL or a blob,
      // drawn on another canvas, or added to the DOM.
      const canvas = imageRef.current.getImage().toDataURL();
      setImage(canvas);
      setImageCrop(false)

      onChange && onChange(dataURLtoFile(canvas, name))

      // If you want the image resized to the canvas size (also a HTMLCanvasElement)
      const canvasScaled = imageRef.current.getImageScaledToCanvas();
    }
  };

  useEffect(() => {
    setZoom(1)
    if (!imageCrop) {
      inputRef.current.value = null;
    }
  }, [imageCrop]);

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
        {/* <div className='p-4 border-2 border-dashed rounded-xl bg__background'> */}
          <label htmlFor={name} className='cursor-pointer'>
          {label && <div className='mb-3 font-semibold ml-1'>{label}</div>}
          <div
              // htmlFor={name}
              style={{
                backgroundImage: "URL(" + Image + ")",
                filter: "brightness(0.9)",
                aspectRatio: aspect,
              }}
            className={`border-b-[3px] bg__background ${dragActive ? "border__primary" : "border-gray-300"}  text-gray-400 w-full aspect-${aspect ? aspect : "video"
                } relative flex flex-col gap-y-5 justify-center items-center m-auto rounded-lg bg-cover bg-no-repeat ${!disabled && "cursor-pointer "
                } ${!ImageValid && "outline__danger"}`}
              name={name} onDragEnter={handleDrag}>
              {!disabled &&
                (Image ? (
                  <FontAwesomeIcon className='text-3xl' icon={faCamera} />
                ) : (
                  <>
                    <FontAwesomeIcon className='text-3xl' icon={faCamera} />
                  <p className="font-semibold">{dragActive ? "Letakkan disini" : "Pilih gambar"}</p>
                  </>
                ))}
          </div>
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
            {error || "Warning: Allowable format Image"}
            </div>
          )}
        </div>
      {/* </div> */}

      <ModalComponent
        onClose={() => setImageCrop(false)}
        show={imageCrop}
        title={'Sesuaikan ukuran gambar'}
        footer={(
          <div className='flex justify-end'>
            <ButtonComponent
              icon={faSave}
              label={"Simpan"}
              bg="primary"
              color={"background"}
              size="sm"
              onClick={() => onCropDown()}
            />
          </div>
        )}
      >
        <div className='flex justify-center'>
          <div onWheel={(e) => e.deltaY < 0 ? setZoom(zoom + 0.01) : (zoom > 1) && setZoom(zoom - 0.01)}>
            <AvatarEditor
              ref={imageRef}
              image={imageCrop}
              width={cropSize?.at(0) ? cropSize[0] : 200}
              height={cropSize?.at(1) ? cropSize[1] : 200}
              // border={20}
              border={[20, 20]}
              color={[34, 40, 49, 0.5]} // RGBA
              scale={+zoom}
              rotate={0}
              borderRadius={0}
            />
          </div>
        </div>
      </ModalComponent>
    </>
  );
}
