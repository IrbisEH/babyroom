import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import { useMediaQuery } from "react-responsive";
import { FiShoppingCart } from "react-icons/fi";
import { IoChevronBackOutline, IoMenu } from "react-icons/io5";
import logo from "../../static/media/logo.png"
import "./Navbar.css";

const Navbar = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const isMobile = useMediaQuery({ maxWidth: "800px" });

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };

    const countCartItems = 0;

    const iconSize = 28;

    const generateKey = (prefix) => {
        return `${prefix}_${ new Date().getTime()}`;
    }

    const menuItems = [
        {id: "catalog", name: "Каталог", to: "/catalog"},
        {id: "looks", name: "Образы", to: "/looks"},
        {id: "sales", name: "Скидки", to: "/sales"},
        {id: "info", name: "Инфо", to: "/info"},
    ]

    const renderNavList = () => {
        const navClassName = isMobile ? "nav__list_col" : "nav__list";
        return (
            <ul className={navClassName}>
                {menuItems.map(item => (
                    <li key={generateKey(item.id)} className="nav__item">
                        <NavLink
                            to={item.to}
                            className="nav__link"
                            onClick={toggleMenu}
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
                            <FiShoppingCart size={iconSize} />
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
                        {renderNavList()}
                        <NavLink to="/cart" className="nav__cart">
                            <FiShoppingCart size={iconSize} />
                        </NavLink>
                    </nav>
                </header>
            )
            }
        </>
    );
}

export default Navbar;