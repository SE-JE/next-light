import React, { useEffect, useState } from "react";

import { faCheck, faTimes } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

function ValidateComponent({
  value,
  min,
  max,
  email,
  uppercase,
  lowercase,
  oneNumeric,
  phone,
  confirm,
  required,
  setInvalid,
  setInputInvalid,
  type,
  uniqueCheck,
}) {
  const [tooltip, setTooltip] = useState([]);
  const [status, setStatus] = useState(true);

  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(async () => {
    let newTooltip = [];
    let invalid = false;

    if (required) {
      newTooltip.push({
        label: "Please fill in this field!",
        status: value ? true : false,
      });
    }

    if (min && max) {
      newTooltip.push({
        label: "Field must be " + min + " - " + max + " Character!",
        status: value?.length >= min && value?.length <= max ? true : false,
      });
    }

    if (phone) {
      newTooltip.push({
        label: "Please enter valid mobile number!",
        status: value?.length >= 11 && value?.length <= 18 ? true : false,
      });
    }

    if (uppercase) {
      newTooltip.push({
        label: "Field must be at least 1 uppercase!",
        status: /[A-Z]/.test(value),
      });
    }

    if (lowercase) {
      newTooltip.push({
        label: "Field must be at least 1 lowercase!",
        status: /[a-z]/.test(value),
      });
    }

    if (oneNumeric) {
      newTooltip.push({
        label: "Field must be at least 1 numeric!",
        status: /[0-9]/.test(value),
      });
    }

    if (email) {
      newTooltip.push({
        label: "Please enter valid email!",
        status:
          /(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9]))\.){3}(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9])|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/.test(
            value
          ),
      });
    }

    if (confirm) {
      newTooltip.push({
        label: "Confirmation password not correctly!",
        status: confirm == value,
      });
    }

    setTooltip(newTooltip);

    newTooltip.map((data, index) => {
      if (data.status == false) {
        invalid = data.label;
      }
    });

    if (invalid) {
      setInvalid(invalid);
      // setInputInvalid(false);
    } else {
      setInvalid("");
      // setInputInvalid(true);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [value]);

  useEffect(() => {
    if (tooltip.length > 0) {
      let newStatus = true;
      tooltip.map((data, index) => {
        if (data.status == false) {
          newStatus = false;
        }
      });

      setStatus(newStatus);
    }
  }, [tooltip]);

  return (
    <div>
      {/* {tooltip.length > 0 && (
        <ul
          className={`absolute ${type != "select" ? "left-0" : "right-0"
            } mt-10 rounded-lg ${status
              ? "bg-white triangle_up"
              : "triangle_up"
            } shadow-lg text-left pt-3 pb-1 pl-4 pr-12 z-40`}>
          <li className='mb-2 flex items-center'>
            <span className='w-6'>
              {value && tooltip[0]?.status && (
                <FontAwesomeIcon className='text__primary' icon={faCheck} />
              )}
              {(!value || !tooltip[0]?.status) && (
                <FontAwesomeIcon className='text__danger' icon={faTimes} />
              )}
            </span>
            {tooltip[0].label}
          </li>
        </ul>
      )} */}
    </div>
  );
}

export default ValidateComponent;
