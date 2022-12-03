
import ReactCrop from "react-image-crop";
import { useEffect, useState } from "react";
import { faExclamationTriangle, faPlus } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import ButtonComponent from "../ButtonComponent";
import { ModalComponent } from "..";

// ########## basic usage ###############
/*
    <InputImageCrop
        show={ShowModal}
        onClose={() => setShowModal(false)}
        onSubmit={handleSubmit}
    />
*/

export default function InputImageCrop({
    widthLayout = 1,
    heightLayout = 1,
    icon,
    onSubmit,

    isLoading,
    onClose,
    show,
    title,

    placeholder,
}) {
    const [Crop, setCrop] = useState({})
    const [ImageFile, setImageFile] = useState(null);
    const [ImageCurrent, setImageCurrent] = useState({});
    const [InvalidMessage, setInvalidMessage] = useState(null)

    function dataURLtoBlob(dataURL) {
        let array, binary, i, len;
        binary = atob(dataURL.split(',')[1]);
        array = [];
        i = 0;
        len = binary.length;
        while (i < len) {
            array.push(binary.charCodeAt(i));
            i++;
        }
        return new Blob([new Uint8Array(array)], {
            type: 'image/png'
        });
    };


    function presetCrop(fileImage) {
        var ElImage = new Image()
        const urlImage = URL.createObjectURL(fileImage)
        ElImage.onload = function () {
            const { width, height } = this
            const masterPxSize = width < height ? width : height
            const masterRatio = heightLayout > widthLayout ? heightLayout : widthLayout

            const pxHeight = heightLayout / masterRatio * masterPxSize
            const pxWidth = widthLayout / masterRatio * masterPxSize

            const percentHeight = pxHeight / height * 100
            const percentWidth = pxWidth / width * 100

            const startX = (100 - percentHeight) / 2
            const startY = (100 - percentWidth) / 2
            setCrop({
                unit: '%',
                x: startX,
                y: startY,
                height: percentHeight,
                width: percentWidth,
            })
            URL.revokeObjectURL(urlImage)
        }
        ElImage.src = urlImage
    }



    function submit() {
        setInvalidMessage(null)
        const canvas = document.createElement("canvas");
        canvas.width = Crop.width / 100 * ImageCurrent.width;
        canvas.height = Crop.height / 100 * ImageCurrent.height;
        const ctx = canvas.getContext("2d");
        ctx.imageSmoothingQuality = 'high';
        ctx.drawImage(
            ImageCurrent,
            (Crop.x / 100) * ImageCurrent.naturalWidth,
            (Crop.y / 100) * ImageCurrent.naturalHeight,
            (Crop.width / 100) * ImageCurrent.naturalWidth,
            (Crop.height / 100) * ImageCurrent.naturalHeight,
            0,
            0,
            (Crop.width / 100) * ImageCurrent.width,
            (Crop.height / 100) * ImageCurrent.height,
        );
        const base64Image = canvas.toDataURL("image/jpeg", 1);
        if (onSubmit) {
            onSubmit(dataURLtoBlob(base64Image))
        }
    }

    useEffect(() => {
        if (!show) {
            setImageFile(null)
            setImageCurrent(null)
            setInvalidMessage(null)
        }
    }, [show])


    return (
        <ModalComponent
            onClose={onClose}
            show={show}
            title={title ?? 'Upload Foto'}
        >
            <div className="card rounded-md">
                <div className="my-8 aspect-square max-w-[20rem] mx-auto">
                    <div className="border border-dashed border-2 rounded w-full h-full">
                        {(!ImageFile) &&
                            <>
                                <label
                                    htmlFor={'inputImage'}
                                    className={`flex items-center justify-center flex-col aspect-square`}
                                >
                                    <div>
                                        <FontAwesomeIcon icon={icon ?? faPlus} />
                                    </div>
                                    <div>
                                        {placeholder ?? 'Pilih Foto'}
                                    </div>
                                </label>
                                <input
                                    id={'inputImage'}
                                    className="hidden"
                                    type='file'
                                    accept="image/*"
                                    onChange={(e) => {
                                        var fileImage = e.target.files[0]
                                        if (fileImage && (fileImage.type.split('/')[0] == 'image')) {
                                            setImageFile(fileImage)
                                            presetCrop(fileImage)
                                            setInvalidMessage(null)
                                        } else {
                                            setInvalidMessage('Hanya file image saja yang diizinkan')
                                        }
                                    }}
                                />
                            </>
                        }

                        {(ImageFile) &&
                            <div className="h-full flex items-center justify-center" style={{ backgroundColor: 'rgba(0, 0, 0, .125)' }}>
                                <ReactCrop
                                    crop={Crop}
                                    onChange={(_, percentCrop) => {
                                        setCrop(percentCrop)
                                    }}
                                    aspect={widthLayout / heightLayout}
                                >
                                    <img
                                        alt="Foto yang diunggah"
                                        src={URL.createObjectURL(ImageFile)}
                                        onLoad={(e) => {
                                            setImageCurrent(e.currentTarget)
                                        }}
                                    />
                                </ReactCrop>
                            </div>
                        }
                    </div>

                    <div className="flex flex-col mt-2">
                        {
                            InvalidMessage &&
                            <div className="text-red-500 text-sm">
                                <FontAwesomeIcon icon={faExclamationTriangle} className="mr-1" />
                                {InvalidMessage}
                            </div>
                        }
                        {(ImageFile) &&
                            <div
                                onClick={() => {
                                    setImageFile(null)
                                    setImageCurrent(null)
                                }}
                                className="mx-auto py-1 px-5 text-gray-800 cursor-pointer rounded-full hover:bg-gray-200 underline hover:no-underline">
                                ganti file
                            </div>
                        }
                    </div>
                </div>
                <div className="card-footer justify-end gap-3">
                    <ButtonComponent
                        disabled={!(ImageCurrent?.src)}
                        loading={isLoading}
                        label={"Apply"}
                        bg="primary"
                        onClick={() => {
                            if (ImageCurrent?.src) {
                                submit()
                            }
                        }}
                    />
                </div>
            </div>
        </ModalComponent >
    )
}