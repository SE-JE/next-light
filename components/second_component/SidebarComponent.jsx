/* eslint-disable @next/next/no-img-element */
import React, {
  useEffect,
  useRef,
  useState,
} from 'react';

import Link from 'next/link';
import { useRouter } from 'next/router';

import {
  faBuildingCircleCheck,
  faCalendarCheck,
  faCar,
  faCarTunnel,
  faChampagneGlasses,
  faChevronDown,
  faCircle,
  faClockRotateLeft,
  faCogs,
  faFileCircleCheck,
  faFileInvoice,
  faHeart,
  faHotel,
  faLocationDot,
  faMasksTheater,
  faMoneyCheck,
  faMoneyCheckDollar,
  faPeopleCarryBox,
  faPeoplePulling,
  faPeopleRoof,
  faPersonThroughWindow,
  faPersonWalkingLuggage,
  faPlane,
  faPlaneDeparture,
  faPlaneUp,
  faSquarePollVertical,
  faSuitcase,
  faSwatchbook,
  faTableColumns,
  faTruckPlane,
  faUmbrellaBeach,
  faUser,
  faUserGroup,
  faUsersBetweenLines,
  faUsersGear,
  faUtensils,
	faListDots,
	faPassport,
	faMoneyBillTrendUp,
	faLayerGroup
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { InputStatusComponent } from '../base_component';

export default function SidebarComponent({
	cekActive,
	darkMode,
	changeDarkMode,
}) {
	const router = useRouter();
	const [showSubmenu, setShowSubmenu] = useState([]);
  const [showMenu, setShowMenu] = useState([]);
	const [showSetting, setShowSetting] = useState(false);
	const menu = [
		{
			head: "Dashboard",
			submenu: [
				{
					icon: faTableColumns,
					label: "Dashboard",
					path: "/",
				},
			],
		},
		{
			head: "Booking & Reservation",
			submenu: [
				{
					icon: faPlaneDeparture,
					label: "Flight Ticket",
					path: "/booking/flight-ticket",
				},
				{
					icon: faLayerGroup,
					label: "Group Booking",
					path: "/booking/group-booking",
				},
				{
					icon: faHotel,
					label: "Hotel",
					path: "/booking/hotel",
				},
				{
					icon: faFileCircleCheck,
					label: "Tour",
					path: "/booking/tour",
				},
				{
					icon: faPersonThroughWindow,
					label: "Attraction",
					path: "/booking/attraction",
				},
				{
					icon: faChampagneGlasses,
					label: "Event",
					path: "/booking/event",
				},
				{
					icon: faCarTunnel,
					label: "Car Rental",
					path: "/booking/car-rental",
				},
				{
					icon: faFileCircleCheck,
					label: "Document",
					path: "/booking/document",
				},
			],
		},
		{
			head: "Master",
      		collapse: true,
			submenu: [
				{
					icon: faSwatchbook,
					label: "Category",
					submenu: [
						{
							label: "Product Category",
							path: "/master/product-category",
						},
						{
							label: "Suplier Category",
							path: "/master/suplier-category",
						},
						{
							label: "Hotel Room Category",
							path: "/master/hotel-room-category",
						},
						{
							label: "Hotel Room Meal Category",
							path: "/master/hotel-room-meal-category",
						},
						{
							label: "Hotel Service",
							path: "/master/hotel-service",
						},
						{
							label: "Job Type",
							path: "/master/job-type",
						},
					],
				},
				{
					icon: faLocationDot,
					label: "Country & City",
					path: "/master/country-and-city",
				},
				{
					icon: faPlaneUp,
					label: "Airport",
					path: "/master/airport",
				},
				{
					icon: faMoneyCheck,
					label: "Payment Method",
					path: "/master/payment-method",
				},
				{
					icon: faFileInvoice,
					label: "Travel Document",
					submenu: [
						{
							label: "Document Category",
							path: "/master/category-document",
						},
						{
							label: "Visa",
							path: "/master/visa",
						},
						{
							label: "Passport",
							path: "/master/passport",
						},
					],
				},
				{
					icon: faCar,
					label: "Vechicle",
					path: "/master/vechicle",
				},
				{
					icon: faPeopleCarryBox,
					label: "Suplier",
					path: "/master/suplier",
				},
				{
					icon: faSquarePollVertical,
					label: "Terms",
					submenu: [
						{
							label: "Inclusion",
							path: "/master/inclusion",
						},
						{
							label: "Exclusion",
							path: "/master/exclusion",
						},
						{
							label: "Term & Condition",
							path: "/master/term-and-condition",
						},
					],
				},
				{
					icon: faPeoplePulling,
					label: "TL / Guide / Driver",
					path: "/master/tl-guide-driver",
				},
				// {
				// 	icon: faCheckDouble,
				// 	label: "Status",
				// 	path: "/master/status",
				// },
			],
		},
		{
			head: "Product",
      		collapse: true,
			submenu: [
				{
					icon: faPlaneDeparture,
					label: "Flight Tikcket",
					path: "/product/flight-ticket",
				},
				{
					icon: faHotel,
					label: "Hotel",
					path: "/product/hotel",
				},
				{
					icon: faUtensils,
					label: "Restaurant",
					path: "/product/restaurant",
				},
				{
					icon: faPersonThroughWindow,
					label: "Attraction",
					path: "/product/attraction",
				},
				{
					icon: faChampagneGlasses,
					label: "Event",
					path: "/product/event",
				},
				{
					icon: faTruckPlane,
					label: "Transport",
					path: "/product/transport",
				},
				{
					icon: faFileCircleCheck,
					label: "Travel Document",
					path: "/product/travel-document",
				},
				{
					icon: faPersonWalkingLuggage,
					label: "Tour",
					submenu: [
						{
							label: "Fixed Departure",
							path: "/master/fixed-departure",
						},
						{
							label: "Fit Tour",
							path: "/master/fit-tour",
						},
					],
				},
			],
		},
		{
			head: "User Management",
      collapse: true,
			submenu: [
				{
					icon: faUser,
					label: "User",
					path: "/user",
				},
				{
					icon: faMasksTheater,
					label: "Role",
					path: "/user/role",
				},
			],
		},
		{
			head: "Customer Management",
      collapse: true,
			submenu: [
				{
					icon: faUserGroup,
					label: "Customer",
					path: "/customer/customer",
				},
				{
					icon: faPeopleRoof,
					label: "Family Tree",
					path: "/customer/family-tree",
				},
				{
					icon: faPassport,
					label: "Passport",
					path: "/customer/passport",
				},
				{
					icon: faClockRotateLeft,
					label: "History",
					path: "/customer/history",
				},
				{
					icon: faHeart,
					label: "WishList",
					path: "/customer/wishlist",
				},
			],
		},
		{
			head: "Corporate Management",
			collapse: true,
			submenu: [
				{
					icon: faPeopleRoof,
					label: "Corporate",
					path: "/corporate",
				},
				{
					icon: faMoneyCheckDollar,
					label: "Credit Corporate",
					path: "/corporate/credit",
				},
				{
					icon: faMoneyBillTrendUp,
					label: "Billing Control",
					path: "/corporate/bill-control",
				},
				{
					icon: faUsersGear,
					label: "User",
					path: "/corporate/pic",
				},
				{
					icon: faUsersBetweenLines,
					label: "Employe & Customer",
					path: "/corporate/employe",
				},
				{
					icon: faClockRotateLeft,
					label: "History",
					path: "/corporate/history",
				},
			],
		},
		{
			head: "Advance",
			collapse: true,
			submenu: [
				{
					icon: faListDots,
					label: "Log Payload",
					path: "/advance/log-payload",
				},
			],
		},
	];

	const wrapSetting = useRef(null);

	useEffect(() => {
		function handleClickOutside(event) {
			if (
				wrapSetting.current &&
				!wrapSetting.current.contains(event.target) &&
				showSetting
			) {
				setShowSetting(false);
			}
		}
		document.addEventListener("mousedown", handleClickOutside);
		return () => {
			document.removeEventListener("mousedown", handleClickOutside);
		};
	}, [wrapSetting, showSetting]);

	useEffect(() => {
		menu.map((menu_head, menu_head_key) => {
			{
				menu_head.submenu.map((menu, menu_key) => {
					if (
						menu.submenu &&
						menu.submenu[0] &&
						menu.submenu?.filter((val) => val.path == router.asPath)[0]
					) {
						if (
							!showSubmenu[0] ||
							!showSubmenu.includes(menu_head_key + "|" + menu_key)
						) {
							setShowSubmenu([...showSubmenu, menu_head_key + "|" + menu_key]);
						}
					}

					if (menu.submenu && menu.submenu[0]) {
						menu.submenu.map((submenu, submenu_key) => {
							if (submenu.path && router.asPath == submenu.path) {
								if (cekActive) {
									cekActive([menu_head, menu, submenu]);
								}
							}
						});
					} else {
						if (menu.path && router.asPath == menu.path) {
							if (cekActive) {
								cekActive([menu_head, menu]);
							}
						}
					}
				});
			}
		});
	}, [router]);

	return (
		<>
			<div className="flex flex-col justify-between h-full ">
				<div className="p-5 bg__primary">
					<img src="/images/logo-white.png" alt="logo" />
				</div>

				<div className="h-full py-5 overflow-auto scroll_control shadow__scrolly dark:bg-gray-700">
					{menu.map((menu_head, menu_head_key) => {
						return (
							<React.Fragment key={menu_head_key}>
								<div className="px-8 pt-5 pb-3 flex justify-between cursor-pointer" onClick={(e) => {
														if (menu_head.collapse) {
															if (
																!showMenu[0] ||
																!showMenu.includes(
																	menu_head_key,
																)
															) {
																setShowMenu([
																	...showMenu,
																	menu_head_key,
																]);
															} else {
																setShowMenu(
																	showMenu.filter(
																		(val) =>
																			val != menu_head_key,
																	),
																);
															}
														}
													}}>
									<h6 className="text-lg font-semibold text-gray-500 dark:text-gray-300">
										{menu_head.head}
									</h6>
									{menu_head.collapse && (
										<FontAwesomeIcon
											icon={faChevronDown}
											className={`text-lg text-gray-500 dark:text-gray-300 ${showMenu[0] &&
												showMenu.includes(
													menu_head_key,
												)
												? "rotate-180"
												: ""
												}`}
										/>
									)}
								</div>

								<div className={`${(!menu_head.collapse || (showMenu[0] &&
															showMenu.includes(
																menu_head_key,
															) )) 
																? ""
																: "hidden"
														}`}>
									{menu_head.submenu.map((menu, menu_key) => {
										return (
											<React.Fragment key={menu_key}>
												<a
													className={`flex items-center justify-between gap-5 py-5 text-gray-600 dark:text-gray-200 hover__text__primary cursor-pointer ${
														menu.submenu?.filter(
															(val) => val.path == router.asPath,
														)[0] ||
														(menu.path && router.asPath == menu.path)
															? "text__primary pr-8"
															: "px-8"
													}`}
													onClick={(e) => {
														if (
															!menu.submenu ||
															!menu.submenu[0] ||
															menu.path
														) {
															router.push(menu.path);
														} else {
															if (
																!showSubmenu[0] ||
																!showSubmenu.includes(
																	menu_head_key + "|" + menu_key,
																)
															) {
																setShowSubmenu([
																	...showSubmenu,
																	menu_head_key + "|" + menu_key,
																]);
															} else {
																setShowSubmenu(
																	showSubmenu.filter(
																		(val) =>
																			val != menu_head_key + "|" + menu_key,
																	),
																);
															}
														}
													}}
												>
													<div className="flex items-center gap-5">
														{(menu.path && router.asPath == menu.path) ||
														menu.submenu?.filter(
															(val) => val.path == router.asPath,
														)[0] ? (
															<div className="px-[4px] py-5 mr-3 bg__primary rounded-r"></div>
														) : (
															""
														)}
														<FontAwesomeIcon
															icon={menu.icon}
															className="text-lg"
														/>
														<h6 className="font-semibold">{menu.label}</h6>
													</div>

													{menu.submenu && menu.submenu[0] && (
														<FontAwesomeIcon
															icon={faChevronDown}
															className={`text-base ${
																showSubmenu[0] &&
																showSubmenu.includes(
																	menu_head_key + "|" + menu_key,
																)
																	? "rotate-180"
																	: ""
															}`}
														/>
													)}
												</a>

												{menu.submenu && menu.submenu[0] && (
													<div
														className={`shadow-lg rounded-b-lg bg-gray-50 intro__y ${
															showSubmenu[0] &&
															showSubmenu.includes(
																menu_head_key + "|" + menu_key,
															)
																? ""
																: "hidden"
														}`}
													>
														{menu.submenu.map((submenu, submenu_key) => {
															return (
																<Link href={submenu.path} key={submenu_key}>
																	<a
																		className={`flex items-center gap-5 px-12 py-4 text-gray-500 dark:text-gray-300 hover__text__primary ${
																			submenu.path &&
																			router.asPath == submenu.path
																				? "text__primary pl-16"
																				: ""
																		}`}
																	>
																		<FontAwesomeIcon
																			icon={faCircle}
																			className="text-[8px]"
																		/>
																		<h6 className="font-semibold">
																			{submenu.label}
																		</h6>
																	</a>
																</Link>
															);
														})}
													</div>
												)}
											</React.Fragment>
										);
									})}
								</div>
							</React.Fragment>
						);
					})}
				</div>

				<div className="relative flex justify-between px-5 py-2 bg__primary">
					<div className="flex">
						{/* <div className="p-3 cursor-pointer">
              <FontAwesomeIcon icon={faCalendarAlt} className="text-white" />
            </div> */}
						<div
							className="p-3 cursor-pointer"
							onMouseDown={() => setShowSetting(true)}
						>
							<FontAwesomeIcon icon={faCogs} className="text-white" />
						</div>
					</div>

					<div className="flex cursor-pointer">
						{/* <div className="px-3 py-1 text-right text-white">
              <h6 className="text-[10px] text__light__danger">Jakarta</h6>
              <h5 className="text-sm">20:16:22</h5>
            </div> */}
						{/* <div className="px-3 py-1 text-white">
              <h6 className="text-[10px] text__light__danger">2022</h6>
              <h5 className="text-sm">24 Mar</h5>
            </div> */}
					</div>
					<div
						ref={wrapSetting}
						className={`absolute -top-2 -translate-y-full left-5 p-4 bg-white rounded-lg shadow-md flex items-center gap-5 ${
							showSetting ? "scale-y-100" : "scale-y-0"
						}`}
					>
						<InputStatusComponent
							label="Theme"
							labelActive="Dark"
							labelInactive="Light"
							setActive={darkMode}
							name={"darkMode"}
							onChange={(e) => changeDarkMode(!darkMode)}
						/>
					</div>
				</div>
			</div>
		</>
	);
}
