import React, { useState } from "react";
import AuthModal from "../components/AuthModal";
import Nav from "../components/Nav";

const Home = () => {
  const [showModal, setShowModal] = useState(false); // Modal login và register

  const handleClick = () => {
    setShowModal(true);
  };
  return (
    <div className="overlay">
      <Nav setShowModal={setShowModal} showModal={showModal} />
      <div className="home">
        <h1 className="primary-title">Swipe Right®</h1>
        <button className="primary-button" onClick={handleClick}>
          Tạo tài khoản
        </button>
        {showModal && <AuthModal setShowModal={setShowModal} />}
      </div>
    </div>
  );
};

export default Home;
