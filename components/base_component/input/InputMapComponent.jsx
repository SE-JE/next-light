import React, { useEffect, useState } from 'react'
import GoogleMapReact from 'google-map-react';
import { MAPS_KEY } from '../../../config';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLocationCrosshairs, faLocationDot } from '@fortawesome/free-solid-svg-icons';
import axios from 'axios';

export default function InputMapComponent({ onChange, name, setInputValue }) {
    const [addressLoading, setAddressLoading] = useState(false);

    const [value, setValue] = useState({});
    const [drag, setDrag] = useState(false);
    const [address, setAddress] = useState("");
    const [street, setStreet] = useState("");
    const [country, setCountry] = useState("");
    const [city, setCity] = useState("");
    const [stateAddress, setStateAddress] = useState("");
    const [postalCode, setPostalCode] = useState("");
    const [subDistrict, setSubDistrict] = useState("");

    useEffect(() => {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition((pos) => {

                setValue({
                    lat: pos.coords.latitude,
                    lng: pos.coords.longitude,
                });
            });
        } else {
            console.log("Geolocation is not supported by this browser.");
        }

    }, []);


    useEffect(async () => {
        setAddressLoading(true)
        setAddress("")

        if (value.lat) {
            // let getAddress = await axios.get(`https://geocode.xyz/${value.lat},${value.lng}?geoit=json&auth=72963910611040322835x93055`);
            let getAddress = await axios.get(`https://api.geoapify.com/v1/geocode/reverse?lat=${value.lat}&lon=${value.lng}&apiKey=2761145afb6a43e5ade77d5e825c9474`);

            if (getAddress?.status == 200 && !getAddress.data.error) {
                // let data = getAddress.data;
                // let address = data.staddress + " " + data.city + " " + data.state + " " + data.country + " " + data.postal

                let data = getAddress.data.features?.at(0)?.properties;
                // console.log(data);
                let address = data?.address_line1 + " " + data?.address_line2

                setAddress(address);
                setStreet(data?.street);
                setCity(data?.city)
                setStateAddress(data?.state)
                setCountry(data?.country)
                setSubDistrict(data?.suburb);
                setPostalCode(data?.postcode)
                setAddressLoading(false)
            } else {
                setAddressLoading(false)
            }
        }
    }, [value]);

    useEffect(() => {
        if (onChange) {
            let newValue = value;

            newValue.address = address;
            newValue.lat = value.lat;
            newValue.lng = value.lng;
            newValue.street = street;
            newValue.city = city;
            newValue.state = stateAddress;
            newValue.country = country;
            newValue.subDistrict = subDistrict;
            newValue.postalCode = postalCode;

            onChange(newValue)
        }
    }, [value, address]);


    const setCurrentPosition = () => {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition((pos) => {
                // console.log(pos);
                setValue({
                    lat: pos.coords.latitude,
                    lng: pos.coords.longitude,
                });
            });
        } else {
            console.log("Geolocation is not supported by this browser.");
        }
    }

    useEffect(() => {
        if (setInputValue && setInputValue.lng && setInputValue.lat) {
            setValue(setInputValue)
        }
    }, [setInputValue]);

    return (
        <div>
            <div className={`w-full h-[400px] bg-gray-300 rounded-xl overflow-hidden mt-4 relative`}>
                <input type="hidden" name={name + "_lat"} value={value?.lat} />
                <input type="hidden" name={name + "_lng"} value={value?.lng} />

                <GoogleMapReact
                    bootstrapURLKeys={{
                        key: MAPS_KEY,
                    }}
                    options={
                        {
                            fullscreenControl: false,
                            zoomControl: false,
                        }
                    }
                    defaultCenter={{
                        lat: value.lat ? parseFloat(value.lat) : -6.208,
                        lng: value.lng ? parseFloat(value.lng) : 106.689,
                    }}
                    center={{
                        lat: value.lat ? parseFloat(value.lat) : -6.208,
                        lng: value.lng ? parseFloat(value.lng) : 106.689,
                    }}
                    onDrag={(ev) => {
                        setAddressLoading(true)
                        setAddress("")
                        setDrag(true)
                    }}
                    onDragEnd={(ev) => {
                        if (ev.center.lat && ev.center.lng) {
                            setValue({
                                lat: ev.center.lat(),
                                lng: ev.center.lng(),
                            });
                        }
                        setDrag(false)
                    }}
                    defaultZoom={18}>
                </GoogleMapReact>


                <div
                    className={`flex flex-col items-center absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2`}
                >
                    <FontAwesomeIcon
                        icon={faLocationDot}
                        className={`text-4xl text__primary drop-shadow-md  ${drag ? "scale-125 -translate-y-3" : ""}`}
                    />
                </div>

                {!drag && (
                    <div className={`absolute top-3 left-3 bg__background px-3 py-2 max-w-[200px] min-w-[200px] rounded-lg `}>
                        <div className={`${(addressLoading && !address) ? "skeleton-loading py-4" : ""}`}></div>
                        {address}
                    </div>
                )}

                <div className={`absolute top-3 right-3 bg__background p-4 rounded-lg cursor-pointer`} onClick={() => setCurrentPosition()}>
                    <FontAwesomeIcon icon={faLocationCrosshairs} className="text-2xl" />
                </div>

            </div>
        </div>
    )
}