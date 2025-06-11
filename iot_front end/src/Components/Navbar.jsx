import React from "react";
import logo from "../assets/hcmut.png";
import { Link } from "react-router-dom";

const Navbar = () => {
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
        <ul id="navbar" className="flex space-x-8">
          <Link to="/" className="text-decoration-none">
            <li id>
              <a className="active text-gray-800 hover:text-green-600">Home</a>
            </li>
          </Link>

          <Link to="/" className="text-decoration-none">
            <li>
              <a className="text-gray-800 hover:text-green-600" href="">
                About
              </a>
            </li>
          </Link>

          <Link to="/" className="text-decoration-none">
            <li>
              <a className="text-gray-800 hover:text-green-600 oke1" href="">
                Contact 
              </a>
            </li>
          </Link>

          <Link
            to="/Login"
            className="text-white text-xl font-bold bg-[#05386B] hover:bg-[#3FEEE6] hover:text-[#000000] px-4 py-2 rounded login text-decoration-none"
          >
            Login
          </Link>
        </ul>
      </div>
    </section>
  );
};

export default Navbar;
