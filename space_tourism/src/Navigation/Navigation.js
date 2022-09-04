import { useEffect, useState } from "react";
import { NavLink } from "react-router-dom"
import close from "./icon-close.svg";
import hamburger from "./icon-hamburger.svg";
import logo from "./logo.svg";
import "./Navigation.css"

/**
 * Respnsive navigation
 */
function Navigation() {
    let [isMobile, setIsMobile] = useState(false);
    let [isHamburgerOpen, setIsHamburgerOpen] = useState(false);

    useEffect(() => {
        function handleResize() {
            let fd = window.getComputedStyle(document.getElementById("nav-links")).getPropertyValue("flex-direction");
            if (fd === "column") {
                setIsMobile(true);
            }
            else {
                setIsMobile(false);
            }
        }
        //run initially
        handleResize();

        //run on resize
        window.addEventListener("resize", handleResize);

        return () => window.removeEventListener("resize", handleResize);
    }, []);


    return (
        <header>
            <nav>
                <div id="nav-logo"><img src={logo} alt="" /></div>

                <div id="nav-right">
                    {isMobile &&
                        <>
                            <div id="nav-hamburger-icons">
                                <img
                                    className={isHamburgerOpen ? "hidden" : ""}
                                    onClick={() => setIsHamburgerOpen(true)}
                                    id="hamburger-open"
                                    src={hamburger} alt="" />

                                <img
                                    className={isHamburgerOpen ? "" : "hidden"}
                                    onClick={() => setIsHamburgerOpen(false)}
                                    id="hamburger-close"
                                    src={close} alt="" />
                            </div>

                            <div id="nav-links" className={isHamburgerOpen ? "" : "hidden"}>
                                <NavLink className={({ isActive }) => isActive ? "active-link" : ""} to="/">00 Home</NavLink>
                                <NavLink className={({ isActive }) => isActive ? "active-link" : ""} to="/destination">01 Destination</NavLink>
                                <NavLink className={({ isActive }) => isActive ? "active-link" : ""} to="/crew">02 Crew</NavLink>
                                <NavLink className={({ isActive }) => isActive ? "active-link" : ""} to="/technology">03 Technology</NavLink>
                            </div>
                        </>

                    }

                    {!isMobile &&
                        <div id="nav-links">
                            <NavLink className={({ isActive }) => isActive ? "active-link" : ""} to="/">00 Home</NavLink>
                            <NavLink className={({ isActive }) => isActive ? "active-link" : ""} to="/destination">01 Destination</NavLink>
                            <NavLink className={({ isActive }) => isActive ? "active-link" : ""} to="/crew">02 Crew</NavLink>
                            <NavLink className={({ isActive }) => isActive ? "active-link" : ""} to="/technology">03 Technology</NavLink>
                        </div>
                    }

                </div>
            </nav>

        </header>

    )
}

export default Navigation;