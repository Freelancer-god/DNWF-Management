/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import React, {useEffect, useState} from "react";

import {close, logo, menu} from "../assets";
import {navLinks} from "../constants";
import {APP_NAME, clog, loadStateFromHiddenField} from "../utils";


function Navbar(props) {
	const {view = "home"} = props;
	const chainStore = JSON.parse(loadStateFromHiddenField(APP_NAME, 'chain-store', '[]'));
	const [active, setActive] = useState(view);
	const [toggle, setToggle] = useState(false);
	const [showMenu, setShowMenu] = useState(false)

	clog(view);

	useEffect(() => {
		window.onclick = function (event) {
			if (!event.target.matches('.btnDropdown_')) {
				setShowMenu(false)
			} else if (event.target.matches('.btnDropdown_')) {
				event.preventDefault();
			}
		}
	}, [])

	return (
		<nav id="navbar"
			 className="w-full flex justify-between items-center navbar relative z-10 h-[87px] bg-[#00000030]"
		>
			<div className={"sm:pl-16 pr-6 px-6 w-full flex justify-between items-center navbar relative z-10 pt-4"}>
				<a href="/"><img src={logo} alt="DABI" className="w-[32px] h-[42px] "/></a>
				<ul className="list-none sm:flex hidden justify-center items-center flex-1">
					{navLinks.map((nav, index) => (
						<li key={nav.id}
							className={`text-center	flex items-center mr-10
							font-lato font-medium cursor-pointer text-[20px] leading-[24px] ${active === nav.id
								? "text-nav-active"
								: (nav.id === "restaurants" && showMenu)
									? "text-nav-active"
									: "text-white"}`}
							onClick={() => {
								if (nav.type !== 'DROPDOWN_SELECT') {
									setActive(nav.id)
									return false
								}
								if (nav.type === 'DROPDOWN_SELECT') setShowMenu(prevState => !prevState);
							}}>
							<a href={`${nav.link}`}
							   className={`pb-[2px] border-bottom-nav hover:text-nav-active hover:border-bottom-nav-active
							   ${nav.type === 'DROPDOWN_SELECT' ? 'btnDropdown_' : ''}
							   `}>{nav.title}
								{nav.type === 'DROPDOWN_SELECT' &&
									// <img src={arrowDownNav} alt={'nav-down'} className={'ml-1'}/>
									<i className="pointer-events-none fa fa-angle-down ml-1" aria-hidden="true"></i>
								}
							</a>
							{(nav.type === 'DROPDOWN_SELECT' && showMenu) &&
								<div id="myDropdown"
									 className="auto-group-x4e1-aJ1 absolute top-[60px] bg-[rgba(24,24,24,0.6)]">
									{chainStore.map((value) => {
										return (
											<a href={`/restaurant/${value.id}`}
											   className="neosuki-HTK hover:bg-[#ffffff25]">{value.name}</a>
										)
									})}
								</div>}
						</li>
					))}
				</ul>

				{/*<div className={'sm:flex hidden'}>*/}
				{/*	<div className={"bg-header-button-login flex items-center justify-center cursor-pointer"}>*/}
				{/*		<img src={userLogin} alt={'user'} className={'w-[15px] h-[17px] mr-[8px]'}/>*/}
				{/*		<span className={'header-button-login-label'}>{tt('Đăng nhập')}</span>*/}
				{/*	</div>*/}
				{/*</div>*/}

				<div className="sm:hidden flex flex-1 justify-end items-center">
					<img src={toggle ? close : menu}
						 alt="menu"
						 className="w-[28px] h-[28px] object-contain"
						 onClick={() => setToggle(!toggle)}
					/>
					<div className={`${!toggle ? "hidden" : "flex"
					} p-6 bg-[#EF9D37] absolute top-20 right-0 mx-4 my-2 min-w-[140px] rounded-[5px] sidebar z-9999`}>
						<ul className="list-none flex justify-end items-start flex-1 flex-col">
							{navLinks.map((nav, index) => (
								<li key={nav.id}
									className={`font-lato font-medium cursor-pointer relative text-[16px] ${active === nav.id
										? "text-nav-active"
										: (nav.id === "restaurants" && showMenu)
											? "text-nav-active"
											: "text-white"
									} ${index === navLinks.length - 1 ? "mb-0" : "mb-4"}`}
									onClick={() => {
										if (nav.type !== 'DROPDOWN_SELECT') {
											setActive(nav.id)
											return false
										}
										if (nav.type === 'DROPDOWN_SELECT') setShowMenu(prevState => !prevState);
									}}
								>
									<a href={`${nav.link}`}
									   className={`${nav.type === 'DROPDOWN_SELECT' ? 'btnDropdown_' : ''}`}>
										{nav.title}
										{nav.type === 'DROPDOWN_SELECT' &&
											<i className="fa fa-angle-down ml-1" aria-hidden="true"></i>
										}
									</a>
									{(nav.type === 'DROPDOWN_SELECT' && showMenu) &&
										<div id="myDropdown"
											 className="auto-group-x4e1-aJ1 absolute top-[25px] right-[15px] bg-[#242424] z-[10000]">
											{chainStore.map((value) => {
												return (
													<a href={`/restaurant/${value.id}`}
													   className="neosuki-HTK hover:bg-[#ffffff25]"
													   style={{padding: '8px 30px 8px 30px'}}>{value.name}</a>
												)
											})}
										</div>}
								</li>
							))}
						</ul>
					</div>
				</div>
			</div>
		</nav>
	);
}

export default Navbar;
