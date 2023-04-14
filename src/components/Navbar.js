import React from "react";
import { Link } from "gatsby";

const Navbar = () => {
  return (
    <nav className="w-full fixed z-10">
      <ul className="flex flex-row gap-5 p-5 text-xl font-bold text-white">
        <li className="ml-0 mr-auto">
          <Link to="/">&lt;Greg Lawrence /&gt;</Link>
        </li>
        <li className="ml-auto">
          <Link to="/services">Skills & Services</Link>
        </li>
        <li className="">
          <Link to="/portfolio">Portfolio</Link>
        </li>
        <li>
          <Link to="/about">About Me</Link>
        </li>
        <li>
          <Link to="/contact">Say Hi!</Link>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
