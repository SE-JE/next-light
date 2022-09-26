import React from 'react';
import { CheckBoxComponent, InputButtonComponent, InputCheckboxGroupComponent, InputCountComponent, InputDateComponent, InputDefaultComponent, InputDiscountComponent, InputEditorComponent, InputMultipleDateComponent, InputOtpComponent, InputPhoneComponent, InputRadioGroupComponent, InputRupiahComponent, InputStarComponent, InputStatusComponent, RadioComponent, SelectComponent, SelectMultipleComponent } from '../components/base_component';
import { faArrowTrendDown, faCalendarCheck, faList, faPhone, faUser } from '@fortawesome/free-solid-svg-icons';

const Component = () => {
    return (
        <div className='container mx-auto grid grid-cols-3 my-5 gap-5 items-start'>
            <InputDefaultComponent
                label="Username"
                placeholder={"Masukkan Username kamu..."}
            />
            <InputDefaultComponent
                label="Label"
                icon={faUser}
                autoComplete
                listSuggestions={['Option 1', 'Option 2']}
            />
            <InputDefaultComponent
                label="Email"
                icon={faUser}
                iconLeft
                validate={{
                    required: true,
                    email: true,
                    min: 10,
                }}
            />

            <InputPhoneComponent
                label="Phone"
                icon={faPhone}
                placeholder={'62 000 0000 0000 (contoh)'}
                validate={{
                    required: true,
                }}
            />

            <InputPhoneComponent
                label="Phone"
                iconLeft
                icon={faPhone}
                placeholder={'62 000 0000 0000 (contoh)'}
                validate={{
                    required: true,
                }}
            />

            <InputCountComponent
                label="Count"
                placeholder={"Masukkan nilai"}
            />

            <SelectComponent
                label={"Select Option"}
                placeholder={'Pilih kesukaan kamu...'}
                options={[
                    {
                        label: "option 1",
                        value: "1"
                    },
                    {
                        label: "option 2",
                        value: "2"
                    }
                ]}
            />

            <SelectComponent
                icon={faArrowTrendDown}
                label={"Select Option"}
                searchable
                options={[
                    {
                        label: "option 1",
                        value: "1"
                    },
                    {
                        label: "option 2",
                        value: "2"
                    }
                ]}
            />

            <SelectComponent
                icon={faArrowTrendDown}
                label={"Select Option"}
                searchable
                options={[
                    {
                        label: "option 1",
                        value: "1"
                    },
                    {
                        label: "option 2",
                        value: "2"
                    }
                ]}
                validate={{
                    required: true
                }}
            />

            <SelectMultipleComponent
                label={"Select Option"}
                placeholder={'Pilih kesukaan kamu...'}
                options={[
                    {
                        label: "option 1",
                        value: "1"
                    },
                    {
                        label: "option 2",
                        value: "2"
                    }
                ]}
            />

            <SelectMultipleComponent
                icon={faArrowTrendDown}
                label={"Select Option"}
                placeholder={'Pilih kesukaan kamu...'}
                options={[
                    {
                        label: "option 1",
                        value: "1"
                    },
                    {
                        label: "option 2",
                        value: "2"
                    }
                ]}
                searchable
            />

            <InputDateComponent
                label="Input Date"
                placeholder={'Pilih tanggal...'}
            />

            <InputDateComponent
                label="Input Date"
                placeholder={'Pilih tanggal...'}
                range
            />

            <InputMultipleDateComponent
                label="Input Date"
                placeholder={'Pilih tanggal...'}
            />

            <InputMultipleDateComponent
                label="Input Date"
                placeholder={'Pilih tanggal...'}
            />

            <InputStarComponent
                label="Input star"
            />

            <InputRadioGroupComponent
                label={"Gender"}
                col={4}
                options={[
                    {
                        label: "Male",
                        value: "male",
                    },
                    {
                        label: "Female",
                        value: "female",
                    },
                    {
                        label: "Other",
                        value: "other",
                    }
                ]}
            />

            <InputCheckboxGroupComponent
                label={"Hobby"}
                col={4}
                options={[
                    {
                        label: "Read",
                        value: "read",
                    },
                    {
                        label: "Sport",
                        value: "Sport",
                    },
                    {
                        label: "Other",
                        value: "other",
                    }
                ]}
            />

            <InputRupiahComponent
                label={"Input Rupiah"}
                placeholder="0.000.000.000"
            />

            <InputDiscountComponent
                label={"Input Discount"}
                placeholder="Enter discount amount"
                name={"discount"}
            />

            <div className="col-span-3 mt-5 mb-5">
                <InputEditorComponent
                    placeholder={"Text Editor"}
                    name="editor"
                />
            </div>

            <div className="flex gap-5 py-5">
                <RadioComponent label="Radio option 1" name={"radio1"} />
                <RadioComponent label="Radio option 2" name={"radio2"} />
                <RadioComponent label="Radio option 3" name={"radio3"} />
            </div>

            <div className="flex gap-3 py-5">
                <CheckBoxComponent label="Radio option 1" name={"radio1"} />
                <CheckBoxComponent label="Radio option 2" name={"radio2"} />
                <CheckBoxComponent label="Radio option 3" name={"radio3"} />
            </div>
        </div>
    );
}

export default Component;
