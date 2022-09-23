import { faPaperPlane } from '@fortawesome/free-solid-svg-icons';
import React from 'react';
import { ButtonComponent, InputDefaultComponent } from '../components/base_component';

const ButtonComponentPage = () => {
    return (
        <>
            <div className='container mx-auto items-center my-5'>
                <div className='flex flex-col gap-10'>
                    <div className='flex items-center gap-5 flex-wrap'>
                        <ButtonComponent
                            label={"Button"}
                            bg="primary"
                            size={"sm"}
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
                            loading
                            size={"sm"}
                        />

                        <ButtonComponent
                            label={"Button"}
                            bg="primary"
                            icon={faPaperPlane}
                            size={"sm"}
                            rounded
                        />

                        <ButtonComponent
                            label={"Button"}
                            bg="primary"
                            loading
                            size={"sm"}
                            rounded
                        />

                        <ButtonComponent
                            square
                            bg="primary"
                            size={"sm"}
                            icon={faPaperPlane}
                        />

                        <ButtonComponent
                            bg="primary"
                            loading
                            size={"sm"}
                            square
                        />

                        <ButtonComponent
                            label={"Button"}
                            bg="primary"
                            icon={faPaperPlane}
                            boxIcon
                            size={"sm"}
                        />
                    </div>

                    <div className='flex flex-wrap gap-5 items-start'>
                        <ButtonComponent
                            label={"Button"}
                            bg="primary"
                        />

                        <ButtonComponent
                            label={"Button"}
                            bg="primary"
                            icon={faPaperPlane}
                        />

                        <ButtonComponent
                            label={"Button"}
                            bg="primary"
                            loading
                        />

                        <ButtonComponent
                            label={"Button"}
                            bg="primary"
                            icon={faPaperPlane}
                            rounded
                        />

                        <ButtonComponent
                            label={"Button"}
                            bg="primary"
                            loading
                            rounded
                        />

                        <ButtonComponent
                            square
                            bg="primary"
                            icon={faPaperPlane}
                        />

                        <ButtonComponent
                            bg="primary"
                            loading
                            square
                        />

                        <ButtonComponent
                            label={"Button"}
                            bg="primary"
                            icon={faPaperPlane}
                            boxIcon
                        />
                    </div>

                    <div className='flex flex-wrap gap-5 items-start'>
                        <ButtonComponent
                            label={"Button"}
                            bg="primary"
                            size={"lg"}
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
                            loading
                            size={"lg"}
                        />

                        <ButtonComponent
                            label={"Button"}
                            bg="primary"
                            icon={faPaperPlane}
                            size={"lg"}
                            rounded
                        />

                        <ButtonComponent
                            label={"Button"}
                            bg="primary"
                            loading
                            size={"lg"}
                            rounded
                        />

                        <ButtonComponent
                            square
                            bg="primary"
                            size={"lg"}
                            icon={faPaperPlane}
                        />

                        <ButtonComponent
                            bg="primary"
                            loading
                            size={"lg"}
                            square
                        />

                        <ButtonComponent
                            label={"Button"}
                            bg="primary"
                            icon={faPaperPlane}
                            boxIcon
                            size={"lg"}
                        />
                    </div>

                    <div className='flex flex-wrap gap-5 items-start'>
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
                </div>



            </div>
        </>
    );
}

export default ButtonComponentPage;
