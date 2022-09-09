import React, { useEffect, useRef, useState } from "react";

import Link from "next/link";

import {
  faBarsStaggered,
  faBell,
  faChevronDown,
  faChevronRight,
  faCog,
  faMagnifyingGlass,
  faPowerOff,
  faUserCog,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useRouter } from "next/router";
import Cookies from "js-cookie";
import Image from "next/image";

export default function NavbarComponent({ children, activePage }) {
  const router = useRouter();
  const [profile, setProfile] = useState(false);

  const wrapProfile = useRef(null);

  useEffect(() => {
    function handleClickOutside(event) {
      if (
        wrapProfile.current &&
        !wrapProfile.current.contains(event.target) &&
        profile
      ) {
        setProfile(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [wrapProfile, profile]);

  const submitLogout = (e) => {
    Cookies.remove("lila.user.token");
    Cookies.remove("lila.user.profile");
    router.push("/login");
  };

  return (
    <div className="p-4 flex items-center justify-between bg-white rounded-xl relative">
      <div className="px-4">
        {children}
      </div>
      <div className="flex gap-4">
        {/* <div className="p-3">
          <FontAwesomeIcon
            icon={faMagnifyingGlass}
            className="text-lg text-white"
          />
        </div> */}
        {/* <div className="p-3">
          <FontAwesomeIcon icon={faBell} className="text-lg text-white" />
        </div> */}
        <div
          className="flex items-center gap-5 px-4"
          onMouseDown={() => setProfile(!profile)}
        >
          <div className="h-10 bg-white rounded-full aspect-square overflow-hidden">
            <Image src="/avatar.jpg" width={150} height={150} />
          </div>

          <div>
            <h6 className="text-lg font-semibold">Jhon Duck..</h6>
            <h6 className="-mt-1 text-sm font-medium">Admin</h6>
          </div>


          <FontAwesomeIcon
            icon={faCog}
            className="text-xl cursor-pointer"
          />
        </div>
      </div>

      {/* <div
        className={`absolute right-0 top-14 rounded-xl shadow-md overflow-hidden bg-white z-50 ${profile ? "scale-y-100" : "scale-y-0"
          }`}
        ref={wrapProfile}
      >
        <div className="flex items-center gap-6 px-8 py-6 rounded-b-xl shadow-md">
          <div className="h-16 bg-white border-4 border__secondary rounded-full aspect-square overflow-hidden">
            <Image src="/images/avatar-150x150.jpg" width={150} height={150} />
          </div>
          <div className="pr-5">
            <h6 className="text-lg font-extrabold text-gray-800">Muhammad No...</h6>
            <h6 className="text-sm font-medium text-gray-600">Admin</h6>
          </div>
        </div>

        <div className="py-5">
          <div className="px-8 py-4 flex gap-5 text-gray-700 hover__bg__light__primary hover:shadow-md cursor-pointer">
            <FontAwesomeIcon icon={faUserCog} />
            <label className="cursor-pointer font-semibold">Edit Profile</label>
          </div>
          <div
            className="px-8 py-4 flex gap-5 hover__bg__light__primary hover:shadow-md cursor-pointer text__danger"
            onClick={() => submitLogout()}
          >
            <FontAwesomeIcon icon={faPowerOff} />
            <label className="cursor-pointer font-semibold">Sign Out</label>
          </div>
        </div>
      </div> */}
    </div>
  );
}
