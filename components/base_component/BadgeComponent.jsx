import React from "react";

export default function BadgeComponent({ label, bg, color }) {
  return (
    <span
      className={`
        px-4 py-1.5 rounded-full 
        ${bg ? "bg__" + bg : "bg-gray-300"} 
        ${color ? "text__" + color : "text-white"
      }`}
    >
      {label}
    </span>
  );
}
