import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { loginService } from "../services/auth.services";

function Login() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();

    const user = {
      email,
      password,
    };
    try {
      const response = await loginService(user);
      localStorage.setItem("authToken", response.data.authToken);
      
    } catch (error) {
      navigate("/error");
    }
  };
  return (
    <>
      <h2>Inicia sesión</h2>
      <form>
        <div>
          <label htmlFor="email">Email:</label>
          <input
            type="text"
            id="email"
            name="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="password">Contraseña:</label>
          <input
            type="password"
            id="password"
            name="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <button onClick={handleLogin}>Entrar</button>
      </form>
      <p>¿No tienes cuenta? Regístrate</p>
      <Link to="/registro">
        <button>Regístrase</button>
      </Link>
    </>
  );
}

export default Login;
