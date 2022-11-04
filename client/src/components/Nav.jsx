import React from "react";
import { useNavigate } from "react-router-dom";
import whiteLogo from "../images/tinder_logo_white.png";
// import colorLogo from "../images/color-logo-tinder.png";

const Nav = () => {
  let navigate = useNavigate();
  const handleClick = (e) => {
    e.preventDefault();
    navigate("/login");
  };
  return (
    <nav>
      <div className="logo-container">
        <img className="logo" src={whiteLogo} alt="logo" />
      </div>

      <button className="nav-button" onClick={handleClick}>
        Đăng nhập
      </button>
    </nav>
  );
};

export default Nav;
