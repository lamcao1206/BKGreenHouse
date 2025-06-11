import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { FaUserCircle } from "react-icons/fa";
import logo from "../assets/hcmut.png";


const Navbar = () => {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const location = useLocation();

  const toggleDropdown = () => setDropdownOpen(!dropdownOpen);

  const handleClickOutside = (event) => {
    if (dropdownOpen && !event.target.closest(".relative")) {
      setDropdownOpen(false);
    }
  };

  React.useEffect(() => {
    document.addEventListener("click", handleClickOutside);
    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, [dropdownOpen]);

  // Kiểm tra đường dẫn hiện tại có phải trang đang active không
  const isActive = (path) => location.pathname === path;

  return (
    <section
      id="header"
      className="flex justify-between items-center h-24 px-16 bg-gradient-to-r from-green-300 to-green-600 shadow-md sticky top-0 z-50 animate-gradient-move"
      style={{ backgroundColor: "#121C57" }}
    >
      <div className="justify-center flex items-center mr-auto">
        <img src={logo} alt="HCMUT Logo" className="h-18 mr-8" />
        <h1 className="text-gray-800 mr-auto">Green House</h1>
      </div>
      <div>
        <ul id="navbar" className="flex space-x-8 items-center">
          {/* <input
            type="text"
            placeholder="Search..."
            className="w-105 p-2 border outline-3 rounded-lg focus:outline-none focus:ring-4 focus:ring-green-900 me-5 mt-2"
          /> */}

          {/* Link Home */}
          <Link to="/MainPage" className="text-decoration-none">
            <li>
              <a
                className={`${
                  isActive("/MainPage") ? "active" : ""
                } text-gray-800 hover:text-green-600`}
              >
                Home
              </a>
            </li>
          </Link>

          

          {/* Link Faucet Control */}
          <Link to="/History" className="text-decoration-none">
            <li>
              <a
                className={`${
                  isActive("/History") ? "active oke" : "oke"
                } text-gray-800 hover:text-green-600`}
              >
                History
              </a>
            </li>
          </Link>

          {/* Link Contact */}
          <Link to="/MainPage" className="text-decoration-none">
            <li>
              <a
                className={`${
                  isActive("/Contact") ? "active oke1" : "oke1"
                } text-gray-800 hover:text-green-600`}
              >
                Contact
              </a>
            </li>
          </Link>

          {/* User Dropdown */}
          <div className="relative">
            <button
              onClick={toggleDropdown}
              className="text-black text-6xl transition-transform duration-300 hover:text-green-500 hover:scale-125"
            >
              <FaUserCircle className="text-4xl" />
            </button>
            {dropdownOpen && (
              <div className="absolute right-0 mt-2 w-40 bg-white rounded-lg shadow-lg">
                <Link
                  to="/Profile"
                  className="text-decoration-none text-black block px-4 py-2 hover:bg-gray-200 rounded-lg"
                >
                  Profile
                </Link>
                <Link
                  to="/"
                  className="text-decoration-none text-black block px-4 py-2 hover:bg-gray-200 rounded-lg"
                >
                  Logout
                </Link>
              </div>
            )}
          </div>
        </ul>
      </div>
    </section>
  );
};

export default Navbar;
