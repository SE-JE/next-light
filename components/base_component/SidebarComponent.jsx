/* eslint-disable @next/next/no-img-element */
import React, {
	useEffect,
	useRef,
	useState,
} from 'react';

import Link from 'next/link';
import { useRouter } from 'next/router';

import {
	faChevronDown,
	faCircle,
	faCogs,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { InputStatusComponent } from '.';

export default function SidebarComponent({
	cekActive,
	darkMode,
	changeDarkMode,
	menu,
	basePath,
	children
}) {
	const router = useRouter();
	const [showSubmenu, setShowSubmenu] = useState([]);
	const [showMenu, setShowMenu] = useState([]);
	const [showSetting, setShowSetting] = useState(false);

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
						menu.submenu?.filter((val) => basePath + val.path == router.asPath)[0]
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
							if (basePath + submenu.path && router.asPath == basePath + submenu.path) {
								if (cekActive) {
									cekActive([menu_head, menu, submenu]);
								}
							}
						});
					} else {
						if (basePath + menu.path && router.asPath == basePath + menu.path) {
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
			<div className='container mx-auto grid min-h-screen grid-cols-9 gap-8'>
				<div className='col-span-2 py-4'>
					<div className="flex flex-col justify-between h-full bg-white rounded-xl overflow-hidden shadow">
						<div className="m-4 px-6 py-4 flex gap-8 bg__primary rounded-xl">
							{/* <img src="/logo.png" alt="logo" width={"35%"} /> */}
							<h1 className="text-xl font-bold text-white">MY PROJECT</h1>
						</div>

						<div className="h-full pt-2 pb-4 px-2 overflow-auto scroll_control shadow__scrolly dark:bg-gray-700">
							{menu.map((menu_head, menu_head_key) => {
								return (
									<React.Fragment key={menu_head_key}>
										<div className="px-4 pt-4 pb-2 flex justify-between cursor-pointer" onClick={(e) => {
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
											<h6 className="text-lg text-gray-500 dark:text-gray-300">
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
											)))
											? ""
											: "hidden"
											}`}>
											{menu_head.submenu.map((menu, menu_key) => {
												let menuPath = basePath + menu.path;
												let submenuActive = false;
												if (menu.submenu) {
													submenuActive = menu.submenu.filter((submenu) => basePath + submenu.path == router.asPath)[0];
												}

												return (
													<React.Fragment key={menu_key}>
														<a
															className={`flex items-center duration-150 justify-between gap-4 py-4 my-2 cursor-pointer ${menu.submenu?.filter(
																(val) => val.path == router.asPath,
															)[0] ||
																(menuPath && router.asPath == menuPath || submenuActive)
																? "text-white bg__primary mx-4 px-4 rounded-xl"
																: "px-8 text-gray-400 dark:text-gray-200 hover__text__primary"
																}`}
															onClick={(e) => {
																if (
																	!menu.submenu ||
																	!menu.submenu[0] ||
																	menu.path
																) {
																	router.push(menuPath);
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
															<div className="flex items-center gap-4">
																{/* {(menuPath && router.asPath == menuPath) ||
																	menu.submenu?.filter(
																		(val) => val.path == router.asPath,
																	)[0] ? (
																	<div className="px-[4px] py-5 mr-3 bg__primary rounded-r"></div>
																) : (
																	""
																)} */}
																<FontAwesomeIcon
																	icon={menu.icon}
																	className="text-lg"
																/>
																<h6 className="">{menu.label}</h6>
															</div>

															{menu.submenu && menu.submenu[0] && (
																<FontAwesomeIcon
																	icon={faChevronDown}
																	className={`text-base ${showSubmenu[0] &&
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
																className={`shadow-inner mx-4 py-2 rounded-lg bg-gray-50 intro__y ${showSubmenu[0] &&
																	showSubmenu.includes(
																		menu_head_key + "|" + menu_key,
																	)
																	? ""
																	: "hidden"
																	}`}
															>
																{menu.submenu.map((submenu, submenu_key) => {
																	let submenuPath = basePath + submenu.path;

																	return (
																		<Link href={submenuPath} key={submenu_key}>
																			<a
																				className={`flex items-center gap-5 mx-4 px-4 py-4 my-2 ${submenuPath &&
																					router.asPath == submenuPath
																					? "bg__primary text-white rounded-xl"
																					: "text-gray-400 dark:text-gray-300 hover__text__primary"
																					}`}
																			>
																				<FontAwesomeIcon
																					icon={submenu.icon}
																					className="text-lg"
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
					</div>
				</div>
				<div className='col-span-7 py-4 max-h-screen overflow-auto scroll_control'>
					{/* <div className="h-max"> */}
					{children}
					{/* </div> */}
				</div>
			</div>
		</>
	);
}
