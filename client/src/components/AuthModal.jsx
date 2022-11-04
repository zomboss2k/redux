import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const AuthModal = ({ setShowModal }) => {
  const dispatch = useDispatch(); // Truyeefn hafnh ddojng

  const [error, setError] = useState(null);
  // const [email, setEmail] = useState(authRegister.email);
  // const [password, setPassword] = useState(authRegister.password);
  // const [confirmPassword, setConfirmPassword] = useState(
  //   authRegister.confirmPassword
  // );

  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const { username, email, password, confirmPassword } = formData;

  const navigate = useNavigate();

  const handleClick = () => {
    setShowModal(false);
  };

  const onChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      setError("Passwords do not match");
    } else {
      const userData = {
        username,
        email,
        password,
      };
    }
  };

  return (
    <div className="auth-modal">
      <div className="close-icon" onClick={handleClick}>
        ⓧ
      </div>

      <h2>TẠO TÀI KHOẢN</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="username"
          id="username"
          name="username"
          placeholder="User Name"
          value={username}
          required={true}
          onChange={onChange}
        />
        <input
          type="email"
          id="email"
          name="email"
          placeholder="email"
          value={email}
          required={true}
          onChange={onChange}
        />
        <input
          type="password"
          id="password"
          name="password"
          placeholder="password"
          value={password}
          required={true}
          onChange={onChange}
        />

        <input
          type="password"
          id="password-check"
          name="confirmPassword"
          placeholder="confirm password"
          value={confirmPassword}
          required={true}
          onChange={onChange}
        />

        <input className="secondary-button" type="submit" />
        <p>{error}</p>
      </form>

      <hr />
      <h2>GET THE APP</h2>
    </div>
  );
};

export default AuthModal;
