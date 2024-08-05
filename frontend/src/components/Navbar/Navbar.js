import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import { FiShoppingCart } from "react-icons/fi";
import { IoChevronBackOutline, IoMenu } from "react-icons/io5";
import logo from "../../static/media/logo.png"
import "./Navbar.css";

const Navbar = ({ isMobile, isLoggedIn }) => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };

    const countCartItems = 1;

    const iconSize = 28;

    const generateKey = (prefix) => {
        return `${prefix}_${ new Date().getTime()}`;
    }

    const menuItems = [
        // {id: "main", name: "Главная", to: "/"},
        {id: "catalog", name: "Каталог", to: "/catalog"},
        // {id: "looks", name: "Образы", to: "/looks"},
        // {id: "sales", name: "Скидки", to: "/sales"},
        // {id: "info", name: "Инфо", to: "/info"},
    ]

    const renderNavList = () => {
        const navClassName = isMobile ? "nav__menu_list_mob" : "nav__menu_list";
        return (
            <ul className={navClassName}>
                {menuItems.map(item => (
                    <li key={generateKey(item.id)} className="nav__menu_item">
                        <NavLink
                            to={item.to}
                            className="nav__menu_link"
                            onClick={isMobile ? toggleMenu : null}
                        >
                            {item.name}
                        </NavLink>
                    </li>
                ))}
            </ul>
        );
    }

    return (
        <>
            {isMobile ? (
                <header className="header">
                    <nav className="nav">
                        <div className="nav__toggle" id="nav-toggle" onClick={toggleMenu}>
                            <IoMenu size={iconSize} />
                        </div>
                        <div className={`nav__menu  ${isMenuOpen ? "show-menu" : ""}`}>
                            <div className="nav__close" id="nav-close" onClick={toggleMenu}>
                                <IoChevronBackOutline size={iconSize} />
                            </div>
                            {renderNavList()}
                        </div>
                        <NavLink to="/" className="nav__logo">
                            <img src={logo} alt="logo"/>
                            <h1>BABYROOM</h1>
                        </NavLink>
                        <NavLink to="/cart" className="nav__cart">
                            <span badge={countCartItems}>
                                <FiShoppingCart size={iconSize}/>
                            </span>
                        </NavLink>
                    </nav>
                </header>
            ) : (
                <header className="header">
                    <nav className="nav">
                        <NavLink to="/" className="nav__logo">
                            <img src={logo} alt="logo"/>
                            <h1>BABYROOM</h1>
                        </NavLink>
                        <div className="nav__menu">
                            {renderNavList()}
                        </div>
                        <NavLink to="/cart" className="nav__cart">
                            <span badge={countCartItems}>
                                <FiShoppingCart size={iconSize} />
                            </span>
                        </NavLink>
                    </nav>
                </header>
            )
            }
        </>
    );
}

export default Navbar;