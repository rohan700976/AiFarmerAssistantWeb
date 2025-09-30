import React, { useState, useRef, useEffect } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import logo from '../../assets/logo/logo.png';

const Header = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isServicesDropdownOpen, setIsServicesDropdownOpen] = useState(false);
  const navigate = useNavigate();

  const servicesDropdownRef = useRef(null);

  // Close dropdowns when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        servicesDropdownRef.current &&
        !servicesDropdownRef.current.contains(event.target)
      ) {
        setIsServicesDropdownOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <nav className="fixed top-0 left-0 w-full bg-white shadow-md h-18 flex items-center z-50">
      <div className="w-full flex flex-wrap items-center justify-between px-4 py-3">
        {/* Logo */}
        <a
          href="/"
          className="flex items-center space-x-3 pl-2 sm:pl-6 lg:pl-8 rtl:space-x-reverse"
        >
          <img src={logo} className="h-14 w-16" alt="Logo" />
          <span className="self-center text-2xl sm:text-3xl lg:text-4xl font-bold whitespace-nowrap text-green-400">
            KisanMitra
          </span>
        </a>

        {/* Right side (desktop only) */}
        <div className="hidden md:flex items-center md:order-2 space-x-3 md:space-x-4 rtl:space-x-reverse relative md:pr-5">
          <button
            onClick={() => navigate("auth/login")}
            className="px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition"
          >
            Login
          </button>
          <button
            onClick={() => navigate("auth/signup")}
            className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition"
          >
            Signup
          </button>
        </div>

        {/* Mobile menu toggle */}
        <button
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          type="button"
          className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200"
        >
          <span className="sr-only">Open main menu</span>
          <svg
            className="w-5 h-5"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 17 14"
          >
            <path
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M1 1h15M1 7h15M1 13h15"
            />
          </svg>
        </button>

        {/* Main menu (mobile + desktop nav links) */}
        <div
          className={`text-lg w-full md:flex md:w-auto ${
            isMobileMenuOpen ? "" : "hidden"
          }`}
          id="navbar-user"
        >
          <ul className="flex flex-col font-normal p-4 md:p-0 mt-4 rounded-lg md:space-x-6 lg:space-x-8 rtl:space-x-reverse md:flex-row md:mt-0 md:border-0 text-gray-900">
            <li>
              <NavLink
                to="/"
                className={({ isActive }) =>
                  `block py-1 px-4 rounded-sm ${
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
                  `block py-1 px-4 rounded-sm ${
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
                  `block py-1 px-4 rounded-sm ${
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
                type="button"
                onClick={() =>
                  setIsServicesDropdownOpen(!isServicesDropdownOpen)
                }
                className="flex items-center py-1 px-4 text-gray-900 rounded-sm hover:text-green-600 focus:outline-none"
              >
                Services
                <svg
                  className="w-4 h-4 ml-1"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M19 9l-7 7-7-7"
                  />
                </svg>
              </button>

              {isServicesDropdownOpen && (
                <ul className="absolute left-0 mt-2 w-56 bg-white border rounded-md shadow-lg z-50">
                  <li>
                    <NavLink
                      to="/soil-detection"
                      onClick={() => setIsServicesDropdownOpen(false)}
                      className={({ isActive }) =>
                        `block px-4 py-2 rounded-sm ${
                          isActive
                            ? "bg-green-600 text-white"
                            : "text-gray-700 hover:bg-green-600 hover:text-white"
                        }`
                      }
                    >
                      Soil Detection
                    </NavLink>
                  </li>
                  <li>
                    <NavLink
                      to="/ai-chatbot"
                      onClick={() => setIsServicesDropdownOpen(false)}
                      className={({ isActive }) =>
                        `block px-4 py-2 rounded-sm ${
                          isActive
                            ? "bg-green-600 text-white"
                            : "text-gray-700 hover:bg-green-600 hover:text-white"
                        }`
                      }
                    >
                      Ai-Chatbot
                    </NavLink>
                  </li>
                  <li>
                    <NavLink
                      to="/disease-detection"
                      onClick={() => setIsServicesDropdownOpen(false)}
                      className={({ isActive }) =>
                        `block px-4 py-2 rounded-sm ${
                          isActive
                            ? "bg-green-600 text-white"
                            : "text-gray-700 hover:bg-green-600 hover:text-white"
                        }`
                      }
                    >
                      Disease Treatment
                    </NavLink>
                  </li>
                  <li>
                    <NavLink
                      to="/market-price"
                      onClick={() => setIsServicesDropdownOpen(false)}
                      className={({ isActive }) =>
                        `block px-4 py-2 rounded-sm ${
                          isActive
                            ? "bg-green-600 text-white"
                            : "text-gray-700 hover:bg-green-600 hover:text-white"
                        }`
                      }
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
                  `block py-1 px-4 rounded-sm ${
                    isActive
                      ? "bg-green-600 text-white"
                      : "text-gray-900 hover:text-green-600"
                  }`
                }
              >
                Contact
              </NavLink>
            </li>

            {/* Mobile-only Login/Signup */}
            <li className="md:hidden">
              <NavLink
                to="/auth/login"
                className={({ isActive }) =>
                  `block py-1 px-4 rounded-sm ${
                    isActive
                      ? "bg-green-600 text-white"
                      : "text-gray-900 hover:text-green-600"
                  }`
                }
              >
                Login
              </NavLink>
            </li>
            <li className="md:hidden">
              <NavLink
                to="/auth/signup"
                className={({ isActive }) =>
                  `block py-1 px-4 rounded-sm ${
                    isActive
                      ? "bg-green-600 text-white"
                      : "text-gray-900 hover:text-green-600"
                  }`
                }
              >
                Signup
              </NavLink>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Header;
