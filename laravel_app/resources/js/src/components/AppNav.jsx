import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import Profile from "./Profiles/Profile";

let idx;

function AppNav({ caption, items }) {
    const [click, setClick] = useState(false);
    const [showSubmenu, setShowSubmenu] = useState("");
    const [isClick, setIsClick] = useState(false);

    const nav = document.getElementById("collections-nav");
    const left = document.getElementById("arrow-container-left");
    const right = document.getElementById("arrow-container-right");
    const [showPrev, setShowPrev] = useState(false);
    const [showNext, setShowNext] = useState(true);
    const [subMenuPosition, setSubMenuPosition] = useState({ x: 0, y: 0 });
    const [scrollOffset, setScrollOffset] = useState(0);

    const location = useLocation();

    const handleOnscroll = (e) => {
        setScrollOffset(nav.scrollLeft);
        setShowNext(true);
        setShowPrev(true);
        if (nav && nav.scrollLeft <= 0) {
            setShowPrev(false);
            clearInterval(idx);
        }
        if (nav && nav.scrollLeft >= nav.scrollWidth - nav.clientWidth) {
            setShowNext(false);
            clearInterval(idx);
        }
    };
    const handleMouseEnterNextArrow = () => {
        idx = setInterval(() => {
            nav.scrollLeft += 10;

            // // kiem tra xem co den cuoi chua
            // if (nav.scrollLeft >= nav.scrollWidth - nav.clientWidth) {
            //   setShowNext(false);
            //   clearInterval(idx);
            // } else {
            //   setShowNext(true);
            //   setShowPrev(true);
            // }
        }, 10);
    };

    useEffect(() => {
        if (nav && nav.scrollLeft <= 0) {
            setShowPrev(false);
        }
        if (nav && nav.scrollLeft >= nav.scrollWidth - nav.clientWidth) {
            setShowNext(false);
        }
    }, []);
    const handleMouseEnterPrevArrow = () => {
        idx = setInterval(() => {
            nav.scrollLeft -= 10;
            // kiem tra xem den dau chua
            // if (nav.scrollLeft <= 0) {
            //   setShowPrev(false);
            //   clearInterval(idx);
            // } else {
            //   setShowNext(true);
            //   setShowPrev(true);
            // }
        }, 10);
    };
    const handleClick = () => {
        setClick(!click);
    };

    const handleMouseEnter = (e, menuItem) => {
        const elementX = e.target.offsetLeft;
        const elementY = e.target.offsetTop;
        // Hiển thị thông tin
        setSubMenuPosition({
            x: elementX - scrollOffset,
            y: elementY + 50,
        });
        setShowSubmenu(menuItem);
    };
    const handleMenuClick = (e) => {
        setIsClick(true);
        e.stopPropagation();
    };
    const handleClickOutSide = () => {
        setIsClick(false);
    };

    useEffect(() => {
        document.body.addEventListener("click", handleClickOutSide);
        return () => {
            document.body.removeEventListener("click", handleClickOutSide);
        };
    }, []);
    const renderAutoScrollNextButtonts = () => (
        <div
            id="arrow-container-right"
            className=" leading-[50px] text-center absolute right-[58px] h-[50px] w-[25px] bg-[rgba(0,0,0,0.2)] cursor-pointer  text-white hover:bg-[rgba(0,0,0,0.5)] transition-all duration-300"
            onMouseLeave={() => clearInterval(idx)}
            onMouseEnter={handleMouseEnterNextArrow}
        >
            <i className="fa-solid fa-angle-right text-white" />
        </div>
    );

    const renderAutoScrollPrevButtonts = () => (
        <div
            id="arrow-container-left"
            className="leading-[50px] text-center absolute left-[100px] h-[50px] w-[25px] bg-[rgba(0,0,0,0.2)] cursor-pointer  text-white hover:bg-[rgba(0,0,0,0.5)] transition-all duration-300"
            onMouseLeave={() => clearInterval(idx)}
            onMouseEnter={handleMouseEnterPrevArrow}
        >
            <i className="fa-solid fa-angle-left text-white" />
        </div>
    );
    return (
        <div className="nav_style ">
            <img
                src="/logo.png"
                alt="cudidi logo"
                style={{ width: "86px", height: "30px", marginLeft: "10px" }}
            />
            <Link to="/cms/dashboard">
                <div className="nav_caption">
                    <strong>{caption}</strong>
                </div>
            </Link>
            <div
                className="menu-icon"
                onClick={handleClick}
                onKeyDown={handleClick}
                role="presentation"
            >
                <i
                    className={click ? "fa-solid fa-xmark" : "fa-solid fa-bars"}
                />
            </div>

            <ul
                id="collections-nav"
                className={
                    click
                        ? "nav-menu no-scroll-bar active"
                        : "nav-menu no-scroll-bar"
                }
                onScroll={handleOnscroll}
            >
                {items.map((item, index) => (
                    <li className="nav-item" key={`menuItem_${item.key}`}>
                        <div
                            onMouseEnter={(e) =>
                                handleMouseEnter(e, `menuItem_${index}`)
                            }
                            onClick={handleMenuClick}
                        >
                            {item.subMenu ? (
                                <a
                                    // className={
                                    //     isClick &&
                                    //     showSubmenu === `menuItem_${index}`
                                    //         ? "nav-links active"
                                    //         : "nav-links"
                                    // }
                                    className={`nav-links ${
                                        item.subMenu.some((child) =>
                                            child.path.includes(
                                                location.pathname + "?"
                                            )
                                        )
                                            ? "active"
                                            : ""
                                    }`}
                                >
                                    {item.label}
                                </a>
                            ) : (
                                <Link
                                    to={item.path}
                                    // className={
                                    //     isClick &&
                                    //     showSubmenu === `menuItem_${index}`
                                    //         ? "nav-links active"
                                    //         : "nav-links"
                                    // }
                                    className={`nav-links ${
                                        item.path &&
                                        item.path.includes(
                                            location.pathname + "?"
                                        )
                                            ? "active"
                                            : ""
                                    }`}
                                >
                                    {item.label}
                                </Link>
                            )}
                        </div>
                        {item.subMenu && item.subMenu.length > 0 && (
                            <ul
                                className={
                                    isClick &&
                                    showSubmenu === `menuItem_${index}`
                                        ? `submenu active`
                                        : "submenu"
                                }
                                style={{
                                    top: `${subMenuPosition.y}px`,
                                    left: `${subMenuPosition.x}px`,
                                }}
                            >
                                {item.subMenu.map((subItem) => (
                                    <li
                                        className="submenu-item"
                                        key={subItem.key}
                                    >
                                        <Link
                                            to={subItem.path}
                                            className="submenu-link inline-flex"
                                        >
                                            {subItem.label}
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                        )}
                    </li>
                ))}
            </ul>
            {showPrev && renderAutoScrollPrevButtonts()}
            {showNext && renderAutoScrollNextButtonts()}
            <div className=" absolute right-[20px] z-[2]">
                <Profile />
            </div>
        </div>
    );
}

export default AppNav;
