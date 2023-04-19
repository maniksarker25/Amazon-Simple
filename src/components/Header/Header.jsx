import React, { useContext } from "react";
import logo from "../../images/Logo.svg";
import "./Header.css";
import { Link } from "react-router-dom";
import { authContext } from "../../Providers/AuthProvider";

const Header = () => {
  const {user,logOut} = useContext(authContext)
  
  // log out -----
  const handleLogOut = () =>{
    logOut()
    .then((result)=>{})
    .catch(error=>{
      console.log(error)
    })
  }
  return (
    <div className="flex justify-between header px-8 py-3 items-center sticky top-0 z-10">
      <img src={logo} alt="" />
      <div className="text-white flex gap-5 items-center">
        <Link to='/'>Shop</Link>
        <Link to='/orders' href="/order">Orders</Link>
        <Link to="/order review">Order Review</Link>
        <Link to="/inventory">Inventory</Link>
        {
          user?<button onClick={handleLogOut} className="bg-gray-400 py-2 px-2 rounded-md"><Link >Logout</Link></button>:<button className="bg-gray-400 py-2 px-2 rounded-md"><Link to='/login'>Login</Link></button>
        }
      </div>
    </div>
  );
};

export default Header;
