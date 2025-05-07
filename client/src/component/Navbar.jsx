import React, { useState, useEffect } from "react";
import { NavLink, Link } from "react-router-dom"
import axios from "axios";

import Cookies from "js-cookie";
import "../style/App.css";

function Navbar() {
  const [show, setShow] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const API_URL = 'https://expense-tracker-app-3hti.onrender.com'
  function toggleMenu() {
    setShow(!show);
  }
    const Logout = async () => {
      await axios.post(`${API_URL}/auth/logout`, {
        withCredentials: true,
      });
      setUser(null);
      alert("user logged out successfully");
      navigate("/login");
    };

  useEffect(() => {
    const handleScroll = () => setShow(false);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const token = Cookies.get("token");
    setIsLoggedIn(!!token);
  }, []);

  const guestLinks = (
    <>
      <li><a href="#about">About Us</a></li>
      <li><a href="#testimony">Testimonies</a></li>
      <li>
        <a
          href="https://wa.me/2349126785031?text=I%20Want%20to%20Hire%20A%20Developer"
          target="_blank"
          rel="noopener noreferrer"
        >
          Hire a Developer
        </a>
      </li>
      <li><NavLink to="/register">Register</NavLink></li>
    </>
  );

  const userLinks = (
    <>
      <li><NavLink to="/dashboard">Dashboard</NavLink></li>
      <li><NavLink to="/history">History</NavLink></li>
      <li><NavLink to="/settings">Settings</NavLink></li>
      <li><NavLink to="/logout">Logout</NavLink></li>
    </>
  );

  return (
    <>
      <nav>
        <div>
          <NavLink to="/"><h2>ExpenseApp</h2></NavLink>
        </div>

        <ul className="menu-items">
          {isLoggedIn ? userLinks : guestLinks}
        </ul>

        <div className="logout">
          <ul>
            <li>
              {isLoggedIn ? (
                <NavLink to="/logout">Logout</NavLink>
              ) : (
                <NavLink to="/register">Register</NavLink>
              )}
            </li>
          </ul>
        </div>

        <div className="menu" onClick={toggleMenu}>
          <div className="bar bar1"></div>
          <div className="bar bar2"></div>
          <div className="bar bar3"></div>
        </div>
      </nav>

      {show && (
        <div className="dropdown">
          <ul onClick={toggleMenu}>
            {isLoggedIn ? (
              <>
                <li><Link to="/dashboard">Dashboard</Link></li>
                <li><Link to="/history">History</Link></li>
                <li><Link to="/settings">Settings</Link></li>
                <button onClick={Logout}>Logout</button>
              </>
            ) : (
              <>
                <li><Link to="/">Home</Link></li>
                <li><a href="#about">About</a></li>
                <li><a href="#testimony">Testimonies</a></li>
                <li><Link to="/register">Register</Link></li>
                <li>
                  <a
                    href="https://wa.me/2349126785031?text=I%20Want%20to%20Hire%20A%20Developer"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Hire a Developer
                  </a>
                </li>
              </>
            )}
          </ul>
        </div>
      )}
    </>
  );
}

export default Navbar;
