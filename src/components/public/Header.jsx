import React, { useState, useRef, useEffect } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import logo from '../../assets/logo/logo.jpg';

const Header = () => {
  const [isServicesDropdownOpen, setIsServicesDropdownOpen] = useState(false);
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const navigate = useNavigate();

  const servicesDropdownRef = useRef(null);
  const mobileMenuRef = useRef(null);

  // Close services dropdown when clicking outside
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

  // Close mobile menu when clicking outside
  useEffect(() => {
    const handleClickOutsideMobile = (event) => {
      if (
        mobileMenuRef.current &&
        !mobileMenuRef.current.contains(event.target)
      ) {
        setIsMobileOpen(false);
        setIsServicesDropdownOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutsideMobile);
    return () => document.removeEventListener("mousedown", handleClickOutsideMobile);
  }, []);

  return (
    <nav className="fixed top-0 left-0 w-full bg-white border-gray-200 shadow-md h-18 flex items-center relative z-50">
      <div className="w-full flex flex-wrap items-center justify-between px-6 py-3">
        {/* Logo */}
        <a
          href="/"
          className="flex items-center space-x-3 pl-8 rtl:space-x-reverse"
        >
          <img src={logo} className="h-14 w-16" alt="Logo" />
          <span className="self-center text-4xl font-bold whitespace-nowrap text-green-400">
            KisanMitra
          </span>
        </a>

        {/* Right side */}
        <div className="flex items-center order-2 space-x-4 rtl:space-x-reverse">
          {/* Mobile menu button */}
          <button
            onClick={() => setIsMobileOpen(!isMobileOpen)}
            className="lg:hidden flex items-center p-2 -m-2 text-gray-500 hover:text-gray-700"
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d={isMobileOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"}
              />
            </svg>
          </button>

          {/* Desktop buttons */}
          <div className="hidden lg:flex items-center space-x-4 pr-5">
            <button
              onClick={() => navigate("auth/login")}
              className="px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition text-base"
            >
              Login
            </button>
            <button
              onClick={() => navigate("auth/signup")}
              className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition text-base"
            >
              Signup
            </button>
          </div>
        </div>

        {/* Desktop main menu */}
        <div
          className="hidden lg:flex text-lg w-auto"
          id="navbar-user"
        >
          <ul className="flex flex-row font-normal p-0 mt-0 space-x-6 rtl:space-x-reverse border-0 text-gray-900 bg-transparent">
            <li>
              <NavLink
                to="/"
                className={({ isActive }) =>
                  `block py-1 px-4 rounded-md ${
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
                  `block py-1 px-4 rounded-md ${
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
                  `block py-1 px-4 rounded-md ${
                    isActive
                      ? "bg-green-600 text-white"
                      : "text-gray-900 hover:text-green-600"
                  }`
                }
              >
                Weather
              </NavLink>
            </li>

            {/* Services dropdown (desktop) */}
            <li className="relative" ref={servicesDropdownRef}>
              <button
                onClick={() =>
                  setIsServicesDropdownOpen(!isServicesDropdownOpen)
                }
                className="flex items-center py-1 px-4 text-gray-900 rounded-md hover:text-green-600 w-auto"
              >
                Services
                <svg
                  className={`w-4 h-4 ml-1 transition-transform duration-200 ${isServicesDropdownOpen ? "rotate-180" : ""}`}
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
                <ul className="absolute left-0 mt-2 w-56 bg-white border rounded-md shadow-lg z-10">
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
                  `block py-1 px-4 rounded-md ${
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

      {/* Mobile menu */}
      {isMobileOpen && (
        <div
          ref={mobileMenuRef}
          className="lg:hidden absolute top-18 left-0 w-full bg-white border border-gray-200 shadow-lg z-40"
        >
          <ul className="divide-y divide-gray-200">
            <li>
              <NavLink
                to="/"
                onClick={() => setIsMobileOpen(false)}
                className={({ isActive }) =>
                  `block py-3 px-4 text-gray-900 hover:text-green-600 hover:bg-gray-100 transition ${
                    isActive ? "text-green-600 bg-green-50" : ""
                  }`
                }
              >
                Home
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/ai-chatbot"
                onClick={() => setIsMobileOpen(false)}
                className={({ isActive }) =>
                  `block py-3 px-4 text-gray-900 hover:text-green-600 hover:bg-gray-100 transition ${
                    isActive ? "text-green-600 bg-green-50" : ""
                  }`
                }
              >
                Ai-Chatbot
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/weather"
                onClick={() => setIsMobileOpen(false)}
                className={({ isActive }) =>
                  `block py-3 px-4 text-gray-900 hover:text-green-600 hover:bg-gray-100 transition ${
                    isActive ? "text-green-600 bg-green-50" : ""
                  }`
                }
              >
                Weather
              </NavLink>
            </li>
            <li className="relative">
              <button
                onClick={() => setIsServicesDropdownOpen(!isServicesDropdownOpen)}
                className="flex items-center justify-between w-full py-3 px-4 text-left text-gray-900 hover:text-green-600 hover:bg-gray-100 transition"
              >
                <span>Services</span>
                <svg
                  className={`w-4 h-4 ml-1 transition-transform duration-200 ${isServicesDropdownOpen ? "rotate-180" : ""}`}
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
                <ul className="py-2 px-4 bg-gray-50 space-y-1">
                  <li>
                    <NavLink
                      to="/soil-detection"
                      onClick={() => {
                        setIsServicesDropdownOpen(false);
                        setIsMobileOpen(false);
                      }}
                      className={({ isActive }) =>
                        `block py-1 px-2 rounded text-sm text-gray-700 hover:bg-white hover:text-green-600 transition ${
                          isActive ? "text-green-600 bg-white" : ""
                        }`
                      }
                    >
                      Soil Detection
                    </NavLink>
                  </li>
                  <li>
                    <NavLink
                      to="/ai-chatbot"
                      onClick={() => {
                        setIsServicesDropdownOpen(false);
                        setIsMobileOpen(false);
                      }}
                      className={({ isActive }) =>
                        `block py-1 px-2 rounded text-sm text-gray-700 hover:bg-white hover:text-green-600 transition ${
                          isActive ? "text-green-600 bg-white" : ""
                        }`
                      }
                    >
                      Ai-Chatbot
                    </NavLink>
                  </li>
                  <li>
                    <NavLink
                      to="/disease-detection"
                      onClick={() => {
                        setIsServicesDropdownOpen(false);
                        setIsMobileOpen(false);
                      }}
                      className={({ isActive }) =>
                        `block py-1 px-2 rounded text-sm text-gray-700 hover:bg-white hover:text-green-600 transition ${
                          isActive ? "text-green-600 bg-white" : ""
                        }`
                      }
                    >
                      Disease Treatment
                    </NavLink>
                  </li>
                  <li>
                    <NavLink
                      to="/market-price"
                      onClick={() => {
                        setIsServicesDropdownOpen(false);
                        setIsMobileOpen(false);
                      }}
                      className={({ isActive }) =>
                        `block py-1 px-2 rounded text-sm text-gray-700 hover:bg-white hover:text-green-600 transition ${
                          isActive ? "text-green-600 bg-white" : ""
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
                onClick={() => setIsMobileOpen(false)}
                className={({ isActive }) =>
                  `block py-3 px-4 text-gray-900 hover:text-green-600 hover:bg-gray-100 transition ${
                    isActive ? "text-green-600 bg-green-50" : ""
                  }`
                }
              >
                Contact
              </NavLink>
            </li>
            <li className="border-t border-gray-200">
              <div className="p-4 space-y-2">
                <button
                  onClick={() => {
                    setIsMobileOpen(false);
                    navigate("auth/login");
                  }}
                  className="w-full px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition text-base"
                >
                  Login
                </button>
                <button
                  onClick={() => {
                    setIsMobileOpen(false);
                    navigate("auth/signup");
                  }}
                  className="w-full px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition text-base"
                >
                  Signup
                </button>
              </div>
            </li>
          </ul>
        </div>
      )}
    </nav>
  );
};

export default Header;