import React from "react";

export default function BadgeComponent({ label, bg, color }) {
  return (
    <span
      className={`px-4 py-2 rounded-full bg__${bg ? bg : ""} text__${
        color ? color : ""
      }`}
    >
      {label}
    </span>
  );
}
