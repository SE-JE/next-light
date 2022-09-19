import { faArrowRightToBracket } from '@fortawesome/free-solid-svg-icons';
import React, { useState } from 'react'
import { langValidate } from '../../../lang/validate';
import ButtonComponent from '../ButtonComponent';
import InputDefaultComponent from '../input/InputDefaultComponent';
import InputDateComponent from '../input/InputDateComponent';
import InputPhoneComponent from '../input/InputPhoneComponent';
import SelectComponent from '../input/SelectComponent';
import RadioComponent from '../input/RadioComponent';
import { post } from '../../../pages/api/crud';

export default function FormPlusComponent({ title, submitUrl, forms }) {
    const [submitLoading, setSubmitLoading] = useState(false);
    const [modalConfirm, setModalConfirm] = useState(false);
    const [modalError, setModalError] = useState(false);
    const [modalSuccess, setModalSuccess] = useState(false);

    const [FormValues, setFormValues] = useState([]);
    const [FormErrors, setFormErrors] = useState([]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setSubmitLoading(true)

        let errors = [];

        // validate
        forms.map((form, key) => {
            if (form.validate) {
                let value = e.target[form.name].value;

                if (form.validate?.required) {
                    if (!value) {
                        errors.push({
                            name: form.name,
                            msg: langValidate.required
                        })
                    }
                }

                if (form.validate?.min && !form.validate?.max) {
                    if (value?.length < form.validate?.min) {
                        errors.push({
                            name: form.name,
                            msg: langValidate.min.replace(/@max/g, form.validate?.min)
                        })
                    }
                }

                if (!form.validate?.min && form.validate?.max) {
                    if (value?.length > form.validate?.max) {
                        errors.push({
                            name: form.name,
                            msg: langValidate.max.replace(/@min/g, form.validate?.max)
                        })
                    }
                }

                if (form.validate?.min && form.validate?.max) {
                    if (value?.length < form.validate?.min || value?.length > form.validate?.max) {
                        errors.push({
                            name: form.name,
                            msg: langValidate.min_max.replace(/@min/g, form.validate?.min).replace(/@max/g, form.validate?.max)
                        })
                    }
                }

                if (form.validate?.uppercase) {
                    if (!/[A-Z]/.test(value)) {
                        errors.push({
                            name: form.name,
                            msg: langValidate.uppercase
                        })
                    }
                }

                if (form.validate?.lowercase) {
                    if (!/[a-z]/.test(value)) {
                        errors.push({
                            name: form.name,
                            msg: langValidate.lowercase
                        })
                    }
                }

                if (form.validate?.numeric) {
                    if (!/[0-9]/.test(value)) {
                        errors.push({
                            name: form.name,
                            msg: langValidate.numeric
                        })
                    }
                }

                if (form.validate?.email) {
                    if (!/(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9]))\.){3}(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9])|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/.test(value)) {
                        errors.push({
                            name: form.name,
                            msg: langValidate.email
                        })
                    }
                }

                if (form.validate?.confirmPassword) {
                    if (!e.target["password_confirm"].value) {
                        errors.push({
                            name: "password_confirm",
                            msg: langValidate.required
                        })
                    }

                    if (e.target["password_confirm"].value != value) {
                        errors.push({
                            name: "password_confirm",
                            msg: langValidate.password_confirm
                        })
                    }
                }


            }

        })

        if (errors[0]) {
            setFormErrors(errors);
            setSubmitLoading(false)
        } else {
            let formData = new FormData(e.target);

            let response = await post(submitUrl, formData);

            if (response?.status == 200) {
                setSubmitLoading(false)
                setModalSuccess(true)
            } else {
                setSubmitLoading(false)
            }
        }
    }

    return (
        <>
            <form onSubmit={(e) => handleSubmit(e)}>
                <h4 className='text-xl text-gray-600 font-semibold mb-6'>{title}</h4>
                <div className='grid grid-cols-12 gap-8'>
                    {forms.map((form, key) => {
                        if (form?.type == "select") {
                            return (
                                <div
                                    style={{
                                        gridColumn: `span ${form?.col ? form.col : "12"} / span ${form?.col ? form.col : "12"}`
                                    }}
                                >
                                    <SelectComponent
                                        name={form.name}
                                        options={form.options}
                                        label={form.label}
                                        placeholder={form.placeholder}
                                        validate={form.validate}
                                        error={FormErrors.filter((error) => error.name == form.name)?.at(0)?.msg}
                                    />
                                </div>
                            )
                        } else if (form?.type == "phone") {
                            return (
                                <div
                                    style={{
                                        gridColumn: `span ${form?.col ? form.col : "12"} / span ${form?.col ? form.col : "12"}`
                                    }}
                                >
                                    <InputPhoneComponent
                                        name={form.name}
                                        label={form.label}
                                        placeholder={form.placeholder}
                                        validate={form.validate}
                                        error={FormErrors.filter((error) => error.name == form.name)?.at(0)?.msg}
                                    />
                                </div>
                            )
                        } else if (form?.type == "date") {
                            return (
                                <div
                                    style={{
                                        gridColumn: `span ${form?.col ? form.col : "12"} / span ${form?.col ? form.col : "12"}`
                                    }}
                                >
                                    <InputDateComponent
                                        name={form.name}
                                        label={form.label}
                                        placeholder={form.placeholder}
                                        validate={form.validate}
                                        error={FormErrors.filter((error) => error.name == form.name)?.at(0)?.msg}
                                    />
                                </div>
                            )
                        } else if (form?.type == "radio") {
                            return (
                                <div
                                    style={{
                                        gridColumn: `span ${form?.col ? form.col : "12"} / span ${form?.col ? form.col : "12"}`
                                    }}
                                >
                                    {/* <InputDateComponent
                                        name={form.name}
                                        label={form.label}
                                        placeholder={form.placeholder}
                                        validate={form.validate}
                                        error={FormErrors.filter((error) => error.name == form.name)?.at(0)?.msg}
                                    /> */}
                                    <div className='py-2'>
                                        <label htmlFor="">{form.label}</label>
                                        <div className='flex gap-3 py-3'>
                                            {form?.options?.at(0) && form.options.map((option, optionKey) => {
                                                return (
                                                    <RadioComponent
                                                        key={optionKey}
                                                        name={form.name}
                                                        label={option.label}
                                                        value={option.value}
                                                    />
                                                )
                                            })}
                                        </div>
                                    </div>
                                </div>
                            )
                        } else {
                            return (
                                <>
                                    <div
                                        style={{
                                            gridColumn: `span ${form?.col ? form.col : "12"} / span ${form?.col ? form.col : "12"}`
                                        }}
                                    >
                                        <InputDefaultComponent
                                            type={form.type}
                                            name={form.name}
                                            label={form.label}
                                            placeholder={form.placeholder}
                                            validate={form.validate}
                                            error={FormErrors.filter((error) => error.name == form.name)?.at(0)?.msg}
                                        />
                                    </div>

                                    {(form.type == "password" && form.validate?.confirmPassword) && (
                                        <div
                                            style={{
                                                gridColumn: `span ${form?.col ? form.col : "12"} / span ${form?.col ? form.col : "12"}`
                                            }}
                                        >
                                            <InputDefaultComponent
                                                type={"password"}
                                                name={"password_confirm"}
                                                label={"Password Confirm"}
                                                placeholder={"Re-enter your password"}
                                                validate={{
                                                    required: true,
                                                }}
                                                error={FormErrors.filter((error) => error.name == "password_confirm")?.at(0)?.msg}
                                            />
                                        </div>
                                    )}
                                </>
                            )
                        }
                    })}
                </div>
                <div className='flex justify-end mt-8'>
                    <ButtonComponent
                        type={"submit"}
                        label="Submit"
                        icon={faArrowRightToBracket}
                        bg="primary"
                        loading={submitLoading}
                    />
                </div>
            </form>
        </>
    )
}
