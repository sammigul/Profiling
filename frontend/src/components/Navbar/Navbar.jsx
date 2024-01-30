import React from 'react';
import { NavLink } from 'react-router-dom';
import './navbar_styles.css'

import { logoutUser } from '../../services/authentication';
import { clearLocalStorage } from '../../utils/LocalStorage';


const Navbar = () => {

    const logout = async () => {
        try {
          const res = await logoutUser();
          alert("ss")
          clearLocalStorage()
          navigate("/login")
        }
        catch (e) {
          console.log("Error while logging out")
        }
    }


    return (
      <nav className="navbar">
          <ul className="nav-links">
            <li><NavLink to="/" exact>Profile</NavLink></li>
            <li><NavLink to="/login" exact>Login</NavLink></li>
            <li><NavLink to="/register" exact>Register</NavLink></li>
            <li>
                <button className="btn-secv" onClick={logout} > Log Out</button>
            </li>
          </ul>
      </nav>
    );
  };

export default Navbar;