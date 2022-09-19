import React from 'react'
import { FormPlusComponent } from '../components/base_component'

export default function form() {
    return (
        <div className='container mx-auto py-8'>
            <div className='bg-white p-8 rounded-xl shadow-md'>
                <FormPlusComponent
                    title={"Form Title"}
                    submitUrl="/example"
                    forms={[
                        {
                            label: "Name",
                            placeholder: "Jhon Duck",
                            name: "name",
                            validate: {
                                required: true,
                            }
                        },
                        {
                            type: "email",
                            label: "Email",
                            placeholder: "example@email.com",
                            name: "email",
                            validate: {
                                required: true,
                                email: true
                            },
                            col: 8
                        },
                        {
                            type: "select",
                            label: "Position",
                            placeholder: "select your position...",
                            name: "position",
                            validate: {
                                required: true
                            },
                            options: [
                                {
                                    label: "Teacher",
                                    value: "teacher",
                                },
                                {
                                    label: "Student",
                                    value: "student",
                                }
                            ],
                            col: 4
                        },
                        {
                            type: "password",
                            label: "Password",
                            placeholder: "Enter your secret word...",
                            name: "password",
                            validate: {
                                required: true,
                                min: 8,
                                max: 20,
                                uppercase: true,
                                lowercase: true,
                                numeric: true,
                                confirmPassword: true,
                            },
                            col: 6
                        },
                        {
                            type: "phone",
                            label: "Phone",
                            placeholder: "62 000 0000 0000 0000",
                            name: "phone",
                            validate: {
                                required: true
                            },
                            col: 4
                        },
                        {
                            type: "date",
                            label: "Date of Birth",
                            placeholder: "select your birth day...",
                            name: "dob",
                            validate: {
                                required: true
                            },
                            col: 4
                        },
                        {
                            type: "radio",
                            label: "Gender",
                            name: "gender",
                            options: [
                                {
                                    label: "Male",
                                    value: "male",
                                },
                                {
                                    label: "Female",
                                    value: "female",
                                }
                            ],
                            col: 4
                        },
                    ]}
                />
            </div>
        </div>
    )
}
