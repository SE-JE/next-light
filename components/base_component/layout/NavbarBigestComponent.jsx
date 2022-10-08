import React, { useState } from 'react';

import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { ButtonComponent } from '..';


export default function NavbarBigestComponent({ }) {
    const router = useRouter();

    return (
        <>
            <div className='relative py-5 bg__light__primary'>
                <div className='container flex items-center justify-between px-24 mx-auto'>
                    <h2 className='text-base font-semibold'>
                        Information to customer{" "}
                        <a href='/' target="_blank" rel="noreferrer" className='text-base text__primary'>
                            Dasbor Professional
                        </a>
                    </h2>

                    <div className='flex gap-12'>
                        <a className='text-base font-medium text-gray-600' href=''>
                            About
                        </a>
                        <a className='text-base font-medium text-gray-600' href=''>
                            Terms & Service
                        </a>
                        <a className='text-base font-medium text-gray-600' href=''>
                            Faq
                        </a>
                        <a className='text-base font-medium text-gray-600' href=''>
                            Blog
                        </a>
                        <a className='text-base font-medium text-gray-600' href=''>
                            Contact
                        </a>
                    </div>
                </div>
            </div>
            <div className='bg-white shadow-sm'>
                <div className='container flex items-center justify-between px-12 py-6 mx-auto'>
                    <Link href='/'>
                        <a className='w-36'>
                            <Image src={"/logo.svg"} width={180} height={60} />
                        </a>
                    </Link>

                    <div className='flex items-center gap-12'>
                        <a className='text-xl font-medium text__primary border-b-2 border__primary p-2' href=''>
                            Menu 1
                        </a>
                        <a className='text-xl font-medium' href=''>
                            Menu 2
                        </a>
                        <a className='text-xl font-medium' href=''>
                            Menu 3
                        </a>
                        <a className='text-xl font-medium' href=''>
                            Menu 4
                        </a>
                        <a className='text-xl font-medium' href=''>
                            Menu 5
                        </a>
                        <div className='flex gap-6'>
                            <ButtonComponent
                                label={"Login"}
                                border={"primary"}
                                color={"primary"}
                                font="bold"
                                size={"sm"}
                            />
                            <ButtonComponent
                                label={"Register"}
                                bg={"primary"}
                                size={"sm"}
                            />
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
