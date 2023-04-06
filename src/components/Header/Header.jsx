import React from "react";
import logo from "../../images/Logo.svg";
import "./Header.css";
import { Link } from "react-router-dom";

const Header = () => {
  return (
    <div className="flex justify-between header px-8 py-3 items-center sticky top-0 z-10">
      <img src={logo} alt="" />
      <div className="text-white link-container">
        <Link to='/'>Shop</Link>
        <Link to='/orders' href="/order">Orders</Link>
        <Link to="/order review">Order Review</Link>
        <Link to="/inventory">Inventory</Link>
        <Link to="/login">Log in</Link>
      </div>
    </div>
  );
};

export default Header;
