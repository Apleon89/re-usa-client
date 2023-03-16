import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { loginService } from "../services/auth.services";
import { useContext } from "react";
import { authContext } from "../context/auth.context";
import "./Login.css";

function Login() {
  const navigate = useNavigate();

  const { validateToken } = useContext(authContext);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();

    const user = {
      email,
      password,
    };
    try {
      const response = await loginService(user);
      localStorage.setItem("authToken", response.data.authToken);
      validateToken();
      navigate("/anuncios");
    } catch (error) {
      if (error.response.status === 400) {
        setErrorMessage(error.response.data.errorMessage);
      } else {
        navigate("/error");
      }
    }
  };
  return (
    <div className="body-login">
      <h2 className="entra-titulo">Inicia sesión</h2>
      <div>
        <form className="login-form">
          <div className="login-div">
            <label htmlFor="email">Email:</label>
            <input
              type="email"
              id="email"
              name="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="login-div">
            <label htmlFor="password">Contraseña:</label>
            <input
              type="password"
              id="password"
              name="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <div>{errorMessage !== "" && <h2>{errorMessage}</h2>}</div>
          <button className="btn" onClick={handleLogin}>
            Entrar
          </button>
        </form>
      </div>
      <p className="link-acceso-login">
        ¿No tienes cuenta? <Link to="/registro">Regístrate</Link>
      </p>
      <Link to="/anuncios">
        <button className="btn">Ver anuncios</button>
      </Link>
    </div>
  );
}

export default Login;
