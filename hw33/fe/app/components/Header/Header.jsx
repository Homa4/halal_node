"use client";
import "./Header.css";
// import logo from "../../images/logo1.png";

const Header = () => {
  return (
    <div className="header-container">
      <div className="header-logo">
        <a href="/">
          <img src="/logo_img/logo3.png" alt="Logo" />
        </a>
      </div>

      <div className="header-nav">
        <a href="/">
          <span>Home</span>
        </a>
        <a href="/about">
          <span>About us</span>
        </a>
        <a href="/contact">
          <span>Contact us</span>
        </a>
      </div>

      <a className="header-login" href="/login">
        Login
      </a>
    </div>
  );
};

export default Header;
