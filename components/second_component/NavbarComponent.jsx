import React, { useEffect, useRef, useState } from "react";

import Link from "next/link";

import {
  faBarsStaggered,
  faBell,
  faChevronDown,
  faChevronRight,
  faMagnifyingGlass,
  faPowerOff,
  faUserCog,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useRouter } from "next/router";
import Cookies from "js-cookie";
import Image from "next/image";

export default function NavbarComponent({ sidebar, setSidebar, activePage }) {
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
    <div className="flex items-center justify-between relative">
      <div className="flex items-center">
        <div
          className="p-3 cursor-pointer"
          onClick={() => setSidebar(!sidebar)}
        >
          <FontAwesomeIcon
            icon={faBarsStaggered}
            className="text-xl text-white"
          />
        </div>
        <div className="flex items-center gap-3 p-4">
          <FontAwesomeIcon
            icon={faChevronRight}
            className="text-base text-white"
          />
          <Link href="/">
            <a className="text-sm font-semibold text-gray-200 cursor-pointer">
              Dashboard
            </a>
          </Link>
          {activePage && activePage[0] && (
            <>
              {activePage.map((menu, index) => {
                if (menu?.label != "Dashboard" && menu?.head != "Dashboard") {
                  return (
                    <>
                      <FontAwesomeIcon
                        icon={faChevronRight}
                        className="text-base text-white"
                      />
                      <Link href={menu.path ? menu.path : ""}>
                        <a
                          className={`text-sm font-semibold ${
                            index == activePage.length - 1
                              ? "text__light__danger"
                              : "text-white"
                          }`}
                        >
                          {menu.label ? menu.label : menu.head}
                        </a>
                      </Link>
                    </>
                  );
                }
              })}
            </>
          )}
        </div>
      </div>
      <div className="flex gap-4">
        {/* <div className="p-3">
          <FontAwesomeIcon
            icon={faMagnifyingGlass}
            className="text-lg text-white"
          />
        </div> */}
        <div className="p-3">
          <FontAwesomeIcon icon={faBell} className="text-lg text-white" />
        </div>
        <div
          className="flex items-center gap-5 px-3 py-1"
          onMouseDown={() => setProfile(!profile)}
        >
          <div className="h-10 bg-white rounded-full aspect-square overflow-hidden">
            <Image src="/images/avatar-150x150.jpg" width={150} height={150} />
          </div>

          <h6 className="text-white">Admin Lila</h6>

          <FontAwesomeIcon
            icon={faChevronDown}
            className="text-base text-white"
          />
        </div>
      </div>

      <div
        className={`absolute right-0 top-14 rounded-xl shadow-md overflow-hidden bg-white z-50 ${
          profile ? "scale-y-100" : "scale-y-0"
        }`}
        ref={wrapProfile}
      >
        <div className="flex items-center gap-6 px-8 py-6 rounded-b-xl shadow-md">
          <div className="h-16 bg-white border-4 border__secondary rounded-full aspect-square overflow-hidden">
            <Image src="/images/avatar-150x150.jpg" width={150} height={150} />
          </div>
          <div className="pr-5">
            <h6 className="text-lg font-extrabold text-gray-800">Admin Lila</h6>
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
      </div>
    </div>
  );
}
