import React from 'react';
import { motion } from 'framer-motion';
import { faChevronLeft } from '@fortawesome/free-solid-svg-icons';
import { useRouter } from 'next/router';
import { ButtonComponent } from '../../base_component';
import useDetectKeyboardOpen from 'use-detect-keyboard-open';

const FloatingPageComponent = ({ children, title, bottomBar }) => {
    const router = useRouter()

    const isKeyboardOpen = useDetectKeyboardOpen();

    return (
        <>
            <motion.div
                className="p-3 pb-8 bg__primary flex gap-3 items-center relative -top-[100px]"
                animate={{ y: 100 }}
                transition={{ ease: "easeOut", duration: 0.25 }}>
                <ButtonComponent icon={faChevronLeft} square onClick={() => router.back()} />
                <h1 className="text-white text-xl font-medium">{title}</h1>
            </motion.div>
            <motion.div
                className='fixed w-full container mt-[60px] top-[100vh]'
                animate={{ y: "calc(-100vh)" }}
                transition={{ ease: "easeOut", duration: 0.15 }}>
                <div className="bg__background rounded-t-2xl overflow-y-auto relative" style={{ height: "calc(100vh - 60px)" }}>
                    <div className="pb-20">
                        {children}
                    </div>
                </div>
            </motion.div>

            {bottomBar && (
                <div className={`fixed z-40 w-full bg-white pb-4 pt-5 px-5 shadow-[0_3px_10px_1px_rgba(0,0,0,0.15)] rounded-xl ${isKeyboardOpen ? "-bottom-32" : "bottom-0"}`}>
                    {bottomBar}
                </div>
            )}
        </>


    );
}

export default FloatingPageComponent;
