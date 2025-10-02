import React, { useState, useRef, useEffect } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import axios from "axios";

const Header = () => {
  const [isServicesDropdownOpen, setIsServicesDropdownOpen] = useState(false);
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const [isProfileDropdownOpen, setIsProfileDropdownOpen] = useState(false);
  const [userName, setUserName] = useState("");

  const navigate = useNavigate();
  const servicesDropdownRef = useRef(null);
  const profileDropdownRef = useRef(null);
  const mobileMenuRef = useRef(null);

  const token = localStorage.getItem("token");

  // Fetch profile
  useEffect(() => {
    if (token) {
      const fetchProfile = async () => {
        try {
          const res = await axios.get("http://localhost:3000/api/user", {
            headers: { Authorization: `Bearer ${token}` },
          });
          setUserName(res.data.name || "User");
        } catch (err) {
          console.error("Error fetching profile:", err);
          if (err.response?.status === 401) {
            localStorage.removeItem("token");
            navigate("/auth/login");
          }
        }
      };
      fetchProfile();
    } else {
      setUserName("");
    }
  }, [token, navigate]);

  // Close dropdowns when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        servicesDropdownRef.current &&
        !servicesDropdownRef.current.contains(event.target)
      ) {
        setIsServicesDropdownOpen(false);
      }
      if (
        profileDropdownRef.current &&
        !profileDropdownRef.current.contains(event.target)
      ) {
        setIsProfileDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Close mobile when clicking outside
  useEffect(() => {
    const handleClickOutsideMobile = (event) => {
      if (mobileMenuRef.current && !mobileMenuRef.current.contains(event.target)) {
        setIsMobileOpen(false);
        setIsServicesDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutsideMobile);
    return () => document.removeEventListener("mousedown", handleClickOutsideMobile);
  }, []);

  // Logout handler
  const handleLogout = () => {
    localStorage.removeItem("token");
    setUserName("");
    navigate("/auth/login");
  };

  // History handler
  const handleHistory = () => {
    navigate("/history");
    setIsProfileDropdownOpen(false);
  };

  return (
    <nav className="fixed top-0 left-0 w-full bg-white shadow-md h-18 flex items-center z-50">
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
        <div className="flex items-center md:order-2 space-x-3 md:space-x-4 rtl:space-x-reverse relative md:pr-5">
          {token ? (
            <>
              <span className="hidden sm:inline-block text-gray-700">
                Welcome, {userName}
              </span>
              <div className="relative" ref={profileDropdownRef}>
                <button
                  onClick={() =>
                    setIsProfileDropdownOpen(!isProfileDropdownOpen)
                  }
                  className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center text-white font-bold"
                >
                  {userName.charAt(0).toUpperCase()}
                </button>
                {isProfileDropdownOpen && (
                  <ul className="absolute right-0 mt-2 w-48 bg-white border rounded-md shadow-lg">
                    <li
                      className="px-4 py-2 text-gray-700 border-b hover:bg-gray-100 cursor-pointer"
                      onClick={handleHistory}
                    >
                      History
                    </li>
                    <li>
                      <button
                        onClick={handleLogout}
                        className="block w-full px-4 py-2 text-left text-red-600 hover:bg-red-100"
                      >
                        Logout
                      </button>
                    </li>
                  </ul>
                )}
              </div>
            </>
          ) : (
            <>
              <button
                onClick={() => navigate("/auth/login")}
                className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition"
              >
                Login
              </button>
              <button
                onClick={() => navigate("/auth/signup")}
                className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition"
              >
                Signup
              </button>
            </>
          )}

          {/* Mobile menu button */}
          <button
            onClick={() => setIsMobileOpen(!isMobileOpen)}
            type="button"
            className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100"
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

        {/* Desktop main menu */}
        <div className="hidden md:flex text-lg w-auto" id="navbar-user">
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

            {/* Services dropdown */}
            <li className="relative" ref={servicesDropdownRef}>
              <button
                onClick={() =>
                  setIsServicesDropdownOpen(!isServicesDropdownOpen)
                }
                className="flex items-center py-1 px-4 text-gray-900 rounded-md hover:text-green-600"
              >
                Services
                <svg
                  className={`w-4 h-4 ml-1 transition-transform duration-200 ${
                    isServicesDropdownOpen ? "rotate-180" : ""
                  }`}
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
                      className="block px-4 py-2 text-gray-700 hover:bg-gray-100"
                    >
                      Soil Detection
                    </NavLink>
                  </li>
                  <li>
                    <NavLink
                      to="/disease-detection"
                      className="block px-4 py-2 text-gray-700 hover:bg-gray-100"
                    >
                      Disease Treatment
                    </NavLink>
                  </li>
                  <li>
                    <NavLink
                      to="/market-price"
                      className="block px-4 py-2 text-gray-700 hover:bg-gray-100"
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
          className="md:hidden absolute top-18 left-0 w-full bg-white border border-gray-200 shadow-lg z-40"
        >
          <ul className="divide-y divide-gray-200">
            <li>
              <NavLink
                to="/"
                onClick={() => setIsMobileOpen(false)}
                className="block py-3 px-4 text-gray-900 hover:text-green-600 hover:bg-gray-100"
              >
                Home
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/ai-chatbot"
                onClick={() => setIsMobileOpen(false)}
                className="block py-3 px-4 text-gray-900 hover:text-green-600 hover:bg-gray-100"
              >
                Ai-Chatbot
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/weather"
                onClick={() => setIsMobileOpen(false)}
                className="block py-3 px-4 text-gray-900 hover:text-green-600 hover:bg-gray-100"
              >
                Weather
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/contact"
                onClick={() => setIsMobileOpen(false)}
                className="block py-3 px-4 text-gray-900 hover:text-green-600 hover:bg-gray-100"
              >
                Contact
              </NavLink>
            </li>
          </ul>
        </div>
      )}
    </nav>
  );
};

export default Header;
