import { faCube } from '@fortawesome/free-solid-svg-icons';
import React from 'react';
import { BreadcumbComponent, NavbarComponent, SidebarComponent } from '../../components/base_component';

const Sidebar = () => {
    const menu = [
        {
            head: "Head of Menu",
            // collapse: true,
            submenu: [
                {
                    icon: faCube,
                    label: "Menu",
                    path: "",
                },
                {
                    icon: faCube,
                    label: "Menu",
                    submenu: [
                        {
                            icon: faCube,
                            label: "Menu",
                            path: "/1.1",
                        },
                        {
                            icon: faCube,
                            label: "Menu",
                            path: "/1.2",
                        },
                    ]
                },
                {
                    icon: faCube,
                    label: "Menu",
                    path: "/2",
                },
                {
                    icon: faCube,
                    label: "Menu",
                    path: "/3",
                },
                {
                    icon: faCube,
                    label: "Menu",
                    path: "/4",
                },
            ],
        },
        {
            head: "Head of Menu",
            submenu: [
                {
                    icon: faCube,
                    label: "Menu",
                    submenu: [
                        {
                            icon: faCube,
                            label: "Menu",
                            path: "/5.5",
                        },
                        {
                            icon: faCube,
                            label: "Menu",
                            path: "/5.5",
                        },
                    ]
                },
            ],
        },
    ];
    return (
        <div>
            <SidebarComponent menu={menu} basePath="/sidebar">
                <NavbarComponent>
                    <BreadcumbComponent
                        items={[
                            {
                                link: "/",
                                label: 'Home'
                            },
                            {
                                link: "/",
                                label: 'Menu'
                            }
                        ]}
                    />
                </NavbarComponent>
                <div className='w-full bg-white py-48 rounded-xl shadow mt-8'>

                </div>
            </SidebarComponent>
        </div>
    );
}

export default Sidebar;
