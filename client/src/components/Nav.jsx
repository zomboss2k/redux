import React from "react";
import whiteLogo from "../images/tinder_logo_white.png";
// import colorLogo from "../images/color-logo-tinder.png";

const Nav = ({ setShowModal, showModal }) => {
  const handleClick = () => {
    setShowModal(true);
  };
  return (
    <nav>
      <div className="logo-container">
        <img className="logo" src={whiteLogo} alt="logo" />
      </div>

      <button className="nav-button" onClick={handleClick} disabled={showModal}>
        Đăng nhập
      </button>
    </nav>
  );
};

export default Nav;
