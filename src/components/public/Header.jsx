import React, { useState, useRef, useEffect } from "react";
import { NavLink, useNavigate } from "react-router-dom";

const Header = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isServicesDropdownOpen, setIsServicesDropdownOpen] = useState(false);
  const [isAuthDropdownOpen, setIsAuthDropdownOpen] = useState(false);
  const navigate = useNavigate();

  const authDropdownRef = useRef(null);
  const servicesDropdownRef = useRef(null);
  const mobileMenuRef = useRef(null);

  // Close dropdowns + mobile menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        authDropdownRef.current &&
        !authDropdownRef.current.contains(event.target)
      ) {
        setIsAuthDropdownOpen(false);
      }
      if (
        servicesDropdownRef.current &&
        !servicesDropdownRef.current.contains(event.target)
      ) {
        setIsServicesDropdownOpen(false);
      }
      if (
        mobileMenuRef.current &&
        !mobileMenuRef.current.contains(event.target) &&
        !event.target.closest("#mobile-menu-btn")
      ) {
        setIsMobileMenuOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <nav className="fixed top-0 left-0 w-full bg-white border-gray-200 shadow-md flex items-center z-50">
      <div className="w-full flex flex-wrap items-center justify-between px-4 py-3">
        {/* Logo */}
        <a
          href="/"
          className="flex items-center space-x-3 pl-2 sm:pl-6 lg:pl-8 rtl:space-x-reverse"
        >
          <img
            src="https://flowbite.com/docs/images/logo.svg"
            className="h-8"
            alt="Logo"
          />
          <span className="self-center text-2xl sm:text-3xl lg:text-4xl font-semibold whitespace-nowrap text-green-400">
            CropApp
          </span>
        </a>

        {/* Right side */}
        <div className="flex items-center md:order-2 space-x-3 md:space-x-0 relative">
          {/* Profile dropdown */}
          <div className="relative" ref={authDropdownRef}>
            <button
              type="button"
              onClick={() => setIsAuthDropdownOpen(!isAuthDropdownOpen)}
              className="flex text-sm bg-gray-200 rounded-full focus:ring-4 focus:ring-gray-300"
            >
              <img
                className="w-10 h-10 rounded-full"
                src="https://cdn-icons-png.flaticon.com/512/149/149071.png"
                alt="profile"
              />
            </button>

            {isAuthDropdownOpen && (
              <div className="absolute right-0 mt-2 w-40 bg-white rounded-lg shadow-md">
                <ul className="py-2 text-gray-700">
                  <li>
                    <button
                      onClick={() => {
                        navigate("/login");
                        setIsAuthDropdownOpen(false);
                      }}
                      className="block w-full text-left px-4 py-2 hover:bg-green-600 hover:text-white"
                    >
                      Login
                    </button>
                  </li>
                  <li>
                    <button
                      onClick={() => {
                        navigate("/signup");
                        setIsAuthDropdownOpen(false);
                      }}
                      className="block w-full text-left px-4 py-2 hover:bg-green-600 hover:text-white"
                    >
                      Signup
                    </button>
                  </li>
                </ul>
              </div>
            )}
          </div>

          {/* Mobile menu button */}
          <button
            id="mobile-menu-btn"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            type="button"
            className="inline-flex items-center p-2 w-10 h-10 justify-center text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 ml-2"
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
          </button>
        </div>

        {/* Main menu */}
        <div
          ref={mobileMenuRef}
          className={`text-lg w-full md:flex md:w-auto ${
            isMobileMenuOpen ? "block" : "hidden"
          }`}
        >
          <ul className="flex flex-col font-normal p-4 md:p-0 mt-4 rounded-lg bg-gray-50 md:bg-transparent md:space-x-6 lg:space-x-8 md:flex-row md:mt-0">
            <li>
              <NavLink
                to="/"
                className={({ isActive }) =>
                  `block py-1 px-4 rounded ${
                    isActive
                      ? "bg-green-600 text-white"
                      : "text-gray-900 hover:text-green-600"
                  }`
                }
              >
                Home
              </NavLink>
            </li>

            <li>
              <NavLink
                to="/ai-chatbot"
                className={({ isActive }) =>
                  `block py-1 px-4 rounded ${
                    isActive
                      ? "bg-green-600 text-white"
                      : "text-gray-900 hover:text-green-600"
                  }`
                }
              >
                Ai-Chatbot
              </NavLink>
            </li>

            <li>
              <NavLink
                to="/weather"
                className={({ isActive }) =>
                  `block py-1 px-4 rounded ${
                    isActive
                      ? "bg-green-600 text-white"
                      : "text-gray-900 hover:text-green-600"
                  }`
                }
              >
                Weather
              </NavLink>
            </li>

            {/* Services dropdown */}
            <li className="relative" ref={servicesDropdownRef}>
              <button
                onClick={() =>
                  setIsServicesDropdownOpen(!isServicesDropdownOpen)
                }
                className="flex items-center py-1 px-4 text-gray-900 rounded hover:text-green-600"
              >
                Services
                <svg
                  className="w-4 h-4 ml-1"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  viewBox="0 0 24 24"
                >
                  <path d="M19 9l-7 7-7-7" />
                </svg>
              </button>

              {isServicesDropdownOpen && (
                <ul className="absolute left-0 mt-2 w-56 bg-white border rounded-md shadow-lg">
                  <li>
                    <NavLink
                      to="/soil-detection"
                      onClick={() => setIsServicesDropdownOpen(false)}
                      className="block px-4 py-2 hover:bg-green-600 hover:text-white"
                    >
                      Soil Detection
                    </NavLink>
                  </li>
                  <li>
                    <NavLink
                      to="/ai-chatbot"
                      onClick={() => setIsServicesDropdownOpen(false)}
                      className="block px-4 py-2 hover:bg-green-600 hover:text-white"
                    >
                      Ai-Chatbot
                    </NavLink>
                  </li>
                  <li>
                    <NavLink
                      to="/disease-detection"
                      onClick={() => setIsServicesDropdownOpen(false)}
                      className="block px-4 py-2 hover:bg-green-600 hover:text-white"
                    >
                      Disease Treatment
                    </NavLink>
                  </li>
                  <li>
                    <NavLink
                      to="/market-price"
                      onClick={() => setIsServicesDropdownOpen(false)}
                      className="block px-4 py-2 hover:bg-green-600 hover:text-white"
                    >
                      Market Price
                    </NavLink>
                  </li>
                </ul>
              )}
            </li>

            <li>
              <NavLink
                to="/contact"
                className={({ isActive }) =>
                  `block py-1 px-4 rounded ${
                    isActive
                      ? "bg-green-600 text-white"
                      : "text-gray-900 hover:text-green-600"
                  }`
                }
              >
                Contact
              </NavLink>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Header;
