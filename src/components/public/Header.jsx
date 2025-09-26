import React, { useState } from "react";
import { NavLink } from "react-router-dom";

const Header = () => {
  const [isUserDropdownOpen, setIsUserDropdownOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isServicesDropdownOpen, setIsServicesDropdownOpen] = useState(false);

  return (
    <nav className="fixed top-0 left-0 w-full bg-white border-gray-200 shadow-md h-18 flex items-center z-50">
      <div className="w-full flex flex-wrap items-center justify-between px-4 py-3">
        {/* Logo */}
        <a href="/" className="flex items-center space-x-3 pl-8 rtl:space-x-reverse">
          <img
            src="https://flowbite.com/docs/images/logo.svg"
            className="h-8"
            alt="Logo"
          />
          <span className="self-center text-4xl font-semibold whitespace-nowrap text-green-400">
            CropApp
          </span>
        </a>

        {/* Right side */}
        <div className="flex items-center md:order-2 space-x-3 md:space-x-0 rtl:space-x-reverse">
          {/* Profile dropdown button */}
          <button
            type="button"
            onClick={() => setIsUserDropdownOpen(!isUserDropdownOpen)}
            className="flex text-sm bg-gray-800 rounded-full md:me-0 focus:ring-4 focus:ring-gray-300 dark:focus:ring-gray-600"
          >
            <span className="sr-only">Open user menu</span>
            <img
              className="w-12 h-12 rounded-full"
              src="https://flowbite.com/docs/images/people/profile-picture-3.jpg"
              alt="user"
            />
          </button>

          {/* User Dropdown */}
          {isUserDropdownOpen && (
            <div className="z-50 my-4 text-base list-none bg-white divide-y divide-gray-100 rounded-lg shadow-sm dark:bg-gray-700 dark:divide-gray-600 absolute right-4 top-16">
              <div className="px-4 py-3">
                <span className="block text-sm text-gray-900 dark:text-white">
                  Bonnie Green
                </span>
                <span className="block text-sm text-gray-500 truncate dark:text-gray-400">
                  name@flowbite.com
                </span>
              </div>
              <ul className="py-2">
                <li>
                  <a
                    href="#"
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white"
                  >
                    Dashboard
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white"
                  >
                    Settings
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white"
                  >
                    Earnings
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white"
                  >
                    Sign out
                  </a>
                </li>
              </ul>
            </div>
          )}

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
        </div>

        {/* Main menu */}
        <div
          className={`text-xl w-full md:flex md:w-auto ml-100 ${
            isMobileMenuOpen ? "" : "hidden"
          }`}
          id="navbar-user"
        >
          <ul className="flex flex-col font-normal p-4 md:p-0 mt-4 rounded-lg bg-gray-50 md:space-x-8 rtl:space-x-reverse md:flex-row md:mt-0 md:border-0 text-gray-900">
            <li>
              <NavLink
                to="/"
                className={({ isActive }) =>
                  `block py-1 rounded-sm px-4 p-0 ${
                    isActive
                      ? "bg-green-600 text-white"
                      : "text-gray-900  hover:text-green-600"
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
                  `block py-1 rounded-sm px-4 p-0 ${
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
                  `block py-1 rounded-sm px-4 p-0 ${
                    isActive
                      ? "bg-green-600 text-white"
                      : "text-gray-900  hover:text-green-600"
                  }`
                }
              >
                Weather
              </NavLink>
            </li>

            {/* Services dropdown */}
            <li className="relative">
              <button
                onClick={() => setIsServicesDropdownOpen(!isServicesDropdownOpen)}
                className="flex items-center py-1 px-4 text-gray-900 rounded-sm hover:text-green-600"
              >
                Services
                <svg
                  className="w-4 h-4 ml-1"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                </svg>
              </button>

              {isServicesDropdownOpen && (
                <ul className="absolute left-0 mt-2 w-56 bg-white border rounded-md shadow-lg">
                  <li>
                    <NavLink
                      to="/soil-detection"
                      onClick={() => setIsServicesDropdownOpen(false)}
                      className={({ isActive }) =>
                        `block px-4 py-2 rounded-sm ${
                          isActive
                            ? "bg-green-600 text-white"
                            : "text-gray-700 hover:text-green-600"
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
                            : "text-gray-700 hover:text-green-600"
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
                            : "text-gray-700 hover:text-green-600"
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
                            : "text-gray-700 hover:text-green-600"
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
                  `block py-1 rounded-sm px-4 p-0 ${
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
