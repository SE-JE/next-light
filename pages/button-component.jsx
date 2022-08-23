import { faPaperPlane } from '@fortawesome/free-solid-svg-icons';
import React from 'react';
import { ButtonComponent, InputDefaultComponent } from '../components/base_component';

const ButtonComponentPage = () => {
    return (
        <>
            <div className='container mx-auto items-center flex flex-wrap my-5 gap-5'>
                <ButtonComponent
                    label={"Button"}
                    bg="primary"
                    size={"sm"}
                />
                <ButtonComponent
                    label={"Button"}
                    bg="primary"
                />
                <ButtonComponent
                    label={"Button"}
                    bg="primary"
                    size={"lg"}
                />

                <ButtonComponent
                    label={"Button"}
                    bg="primary"
                    size={"sm"}
                    icon={faPaperPlane}
                />
                <ButtonComponent
                    label={"Button"}
                    bg="primary"
                    icon={faPaperPlane}
                />
                <ButtonComponent
                    label={"Button"}
                    bg="primary"
                    size={"lg"}
                    icon={faPaperPlane}
                />

                <ButtonComponent
                    label={"Button"}
                    bg="primary"
                    size={"sm"}
                    icon={faPaperPlane}
                    boxIcon
                />
                <ButtonComponent
                    label={"Button"}
                    bg="primary"
                    icon={faPaperPlane}
                    boxIcon
                />
                <ButtonComponent
                    label={"Button"}
                    bg="primary"
                    size={"lg"}
                    icon={faPaperPlane}
                    boxIcon
                />

                <ButtonComponent
                    label={"Button"}
                    bg="primary"
                    icon={faPaperPlane}
                    boxIcon
                    size={"sm"}
                    rounded
                />
                <ButtonComponent
                    label={"Button"}
                    bg="primary"
                    icon={faPaperPlane}
                    boxIcon
                    rounded
                />
                <ButtonComponent
                    label={"Button"}
                    bg="primary"
                    icon={faPaperPlane}
                    boxIcon
                    rounded
                    size={"lg"}
                />

                <ButtonComponent
                    square
                    bg="primary"
                    size={"sm"}
                    icon={faPaperPlane}
                />
                <ButtonComponent
                    square
                    bg="primary"
                    icon={faPaperPlane}
                />
                <ButtonComponent
                    square
                    bg="primary"
                    size={"lg"}
                    icon={faPaperPlane}
                />

                <ButtonComponent
                    label={"Button"}
                    bg="primary"
                    loading
                    size={"sm"}
                />
                <ButtonComponent
                    label={"Button"}
                    bg="primary"
                    loading
                />
                <ButtonComponent
                    label={"Button"}
                    bg="primary"
                    loading
                    size={"lg"}
                />

                <ButtonComponent
                    label={"Button"}
                    bg="primary"
                    loading
                    size={"sm"}
                    square
                />
                <ButtonComponent
                    label={"Button"}
                    bg="primary"
                    loading
                    square
                />
                <ButtonComponent
                    label={"Button"}
                    bg="primary"
                    loading
                    size={"lg"}
                    square
                />

                <ButtonComponent
                    label={"Button"}
                    bg="light__primary"
                    color={"primary"}
                    rounded
                />

                <ButtonComponent
                    label={"Button"}
                    border="primary"
                    color={"primary"}
                    rounded
                />

                <ButtonComponent
                    label={"Button"}
                    border="primary"
                    bg="light__primary"
                    color={"primary"}
                    rounded
                />

                <ButtonComponent
                    label={"Button"}
                    bg="primary"
                    disabled
                    rounded
                />
            </div>
        </>
    );
}

export default ButtonComponentPage;
