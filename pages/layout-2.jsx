import React from 'react'
import { FooterComponent, NavbarBigestComponent } from '../components/base_component'

export default function layout2() {
    return (
        <div>
            <NavbarBigestComponent />
            <div className='h-[calc(100vh-550px)]'>

            </div>
            <FooterComponent />
        </div>
    )
}
