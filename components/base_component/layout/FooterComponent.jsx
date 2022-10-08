import React from 'react';

import {
    faClock,
    faMailBulk,
    faMapMarkedAlt,
    faPhone,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    faFacebook,
    faTwitter,
    faGithub,
    faInstagram,
} from '@fortawesome/free-brands-svg-icons';

function FooterComponent(props) {
    return (
        <footer className='text-gray-100 bg__light__primary body-font'>
            <div className='container px-12 py-24 mx-auto flex items-start md:flex-row md:flex-nowrap flex-wrap flex-col'>
                <div
                    className='w-3/6 flex-shrink-0 md:mx-0 text-left'
                    data-aos='fade-right'>
                    <img src='logo.svg' alt='Seje Digital Logo' width={250} />

                    <p className='mt-12 text-lg text-gray-600'>
                        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Voluptates consequuntur totam expedita molestias tempore rem tenetur optio fuga laborum veritatis.
                    </p>
                </div>
                <div
                    className='flex-grow flex flex-wrap md:pl-20 -mb-10 md:mt-0 mt-10 text-left'
                    data-aos='fade-right'>
                    <div className='w-full md:px-4'>
                        <h2 className='title-font font-medium tracking-widest text-lg mb-3 text__secondary'>
                            Hubungi Kami
                        </h2>
                        <nav className='mb-10'>
                            <ul>
                                <li className='mb-3'>
                                    <a
                                        href=''
                                        className='text-gray-600 hover:text-gray-900 text-xl'>
                                        <FontAwesomeIcon
                                            icon={faMapMarkedAlt}
                                            className='mr-3 text-one text-2xl'
                                        />{" "}
                                        Jl. Lorem ipsum dolor sit amet consectetur
                                    </a>
                                </li>
                                <li className='mb-3'>
                                    <a
                                        href=''
                                        className='text-gray-600 hover:text-gray-900 text-xl'>
                                        <FontAwesomeIcon icon={faPhone} className='mr-3 text-one text-2xl' />{" "}
                                        +62 00000000000
                                    </a>
                                </li>
                                <li className='mb-3'>
                                    <a
                                        href=''
                                        className='text-gray-600 hover:text-gray-900 text-xl'>
                                        <FontAwesomeIcon
                                            icon={faMailBulk}
                                            className='mr-3 text-one text-2xl'
                                        />{" "}
                                        example@gmail.com
                                    </a>
                                </li>
                                <li className='mb-3'>
                                    <a
                                        href=''
                                        className='text-gray-600 hover:text-gray-900 text-xl'>
                                        <FontAwesomeIcon icon={faClock} className='mr-4 text-one text-2xl' />{" "}
                                        24 / 7 Online Suport | Senin - Sabtu ( 09.00 s/d 17.00 )
                                    </a>
                                </li>
                            </ul>
                        </nav>
                    </div>
                </div>
            </div>
            <div className='bg__primary'>
                <div className='container mx-auto py-4 px-5 flex flex-wrap flex-col sm:flex-row'>
                    <p className='text-white text-lg text-center sm:text-left'>
                        Copyright ©
                        <a
                            href=''
                            className='text-white ml-1'>
                            seje.digital 2021 - Now
                        </a>
                    </p>
                    <span className='inline-flex gap-5 sm:ml-auto sm:mt-0 mt-2 justify-center sm:justify-start'>
                        <a href='' className='text-gray-500'>
                            <FontAwesomeIcon icon={faFacebook} className='text-white text-xl' />
                        </a>
                        <a href='' className='ml-3 text-gray-500'>
                            <FontAwesomeIcon icon={faTwitter} className='text-white text-xl' />
                        </a>
                        <a href='' className='ml-3 text-gray-500'>
                            <FontAwesomeIcon icon={faGithub} className='text-white text-xl' />
                        </a>
                        <a
                            href=''
                            className='ml-3 text-gray-500'>
                            <FontAwesomeIcon icon={faInstagram} className='text-white text-xl' />
                        </a>
                    </span>
                </div>
            </div>
        </footer>
    );
}

export default FooterComponent;
