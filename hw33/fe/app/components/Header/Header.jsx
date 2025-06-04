"use client";
import "./Header.css";

const Header = ({ showLogin = true }) => {
  const handleLogOut = async () => {
    await fetch("http://localhost:8080/public/logout");
  };

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
        <a href="/public/aboutUsPage">
          <span>About us</span>
        </a>
        <a href="/contact">
          <span>Contact us</span>
        </a>
      </div>
      {showLogin ? (
        <a className="header-login" href="/public/login">
          Log in
        </a>
      ) : (
        <a className="header-login" onClick={handleLogOut} href="/">
          Log out
        </a>
      )}
    </div>
  );
};

export default Header;
