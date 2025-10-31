import React from "react";
import { useNavigate } from "react-router-dom";
import "./Login.css";

export default function Login() {
  const navigate = useNavigate();

  function handleLogin() {
    // Aqui você pode adicionar validações se quiser
    navigate("/Home"); // redireciona para a página Home
  }

  return (
    <div className="login-container">
      <div className="login-box">
        <h1 className="logo">pawgress</h1>
        <input type="email" placeholder="email" className="input" />
        <input type="password" placeholder="password" className="input" />
        <button className="login-btn" onClick={handleLogin}>
          login
        </button>
      </div>
    </div>
  );
}
