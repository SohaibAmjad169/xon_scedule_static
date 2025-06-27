import React, { useEffect, useState } from "react";
import { Menu } from "@headlessui/react";
import { Link, useLocation } from "react-router-dom";
import menuItems from "../../database/menuItems.json";

const Navbar = () => {
    const [isTransparent, setIsTransparent] = useState(true);
    const location = useLocation();

    const handleScroll = () => {
        if (location.pathname === "/") {
            if (window.scrollY > 100) {
                setIsTransparent(false);
            } else {
                setIsTransparent(true);
            }
        }
    };

    // eslint-disable-next-line
    useEffect(() => {
        setIsTransparent(location.pathname === "/");

        if (location.pathname === "/") {
            window.addEventListener("scroll", handleScroll);
        }

        return () => {
            window.removeEventListener("scroll", handleScroll);
        };
    }, [location.pathname]);

    return (
        <nav
            className={`fixed top-0 w-full z-50 transition-all duration-100 ease-in-out ${isTransparent
                ? "bg-transparent text-white shadow-none"
                : "bg-white text-gray-800 shadow-none"
                }`}
        >
            <div className="flex items-center justify-between py-4 px-4 sm:px-[10px] md:px-[10px] lg:px-[60px]">
                {/* Logo */}
                <div className="text-2xl font-[400] tracking-wider transition-all duration-100 ease-in-out">
                    <Link to="/">
                        <img
                            src={isTransparent ? "/images/logo-dark-1.png" : "/images/logo.png"}
                            className="h-6 w-auto object-contain"
                        />

                    </Link>
                </div>

                {/* Desktop Navbar Menu Items */}
                <div className="hidden md:flex shadow-none items-center justify-center space-x-10 text-[13px] font-[500] ml-auto">
                    {menuItems.map((item, index) => (
                        <Link
                            key={index}
                            to={item.url}
                            className="hover:text-[#cbb198] transition border-b-2 border-transparent hover:border-[#cbb198]"
                        >
                            {item.name}
                        </Link>
                    ))}
                </div>

                {/* Mobile Navbar Menu Items */}
                <div className="md:hidden">
                    <Menu as="div" className="relative">
                        <Menu.Button className="text-white p-2 rounded-md">
                            <img
                                src="/images/hamburger.svg"
                                className="w-[14px] h-[14px] object-cover"
                                alt="Hamburger menu icon"
                            />
                        </Menu.Button>
                        <Menu.Items className="fixed top-[4rem] left-0 w-screen bg-white text-gray-800 shadow-lg z-50">
                            {menuItems.map((item, index) => (
                                <Menu.Item key={index}>
                                    {({ active }) => (
                                        <Link
                                            to={item.url}
                                            className={`block px-4 py-2 border-b border-gray-200 text-lg font-normal ${active ? "bg-gray-100" : ""
                                                }`}
                                        >
                                            {item.name}
                                        </Link>
                                    )}
                                </Menu.Item>
                            ))}
                            <Menu.Item>
                                {({ active }) => (
                                    <button
                                        className={`block w-full bg-[#cbb198] text-white px-6 py-2 text-lg font-[300] hover:bg-[#cbb198]/80 transition ${active ? "bg-[#cbb198]/80" : ""
                                            }`}
                                    >
                                        Book Now
                                    </button>
                                )}
                            </Menu.Item>
                        </Menu.Items>
                    </Menu>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
