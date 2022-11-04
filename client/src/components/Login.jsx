import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { loginUser } from "../redux/api";

const Login = () => {
  const [error, setError] = useState(null);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleClick = () => {};

  const handleSubmit = (e) => {
    e.preventDefault();
    const newUser = {
      email: email,
      password: password,
    };

    loginUser(newUser, dispatch, navigate);
  };

  return (
    <div className="auth-modal">
      <div className="close-icon" onClick={handleClick}>
        ⓧ
      </div>

      <h2>TẠO TÀI KHOẢN</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="email"
          id="email"
          name="email"
          placeholder="email"
          value={email}
          required={true}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          id="password"
          name="password"
          placeholder="password"
          value={password}
          required={true}
          onChange={(e) => setPassword(e.target.value)}
        />

        <input className="secondary-button" type="submit" />
        <p>{error}</p>
      </form>

      <hr />
      <h2>GET THE APP</h2>
    </div>
  );
};

export default Login;
