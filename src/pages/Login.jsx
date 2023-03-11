import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { loginService } from "../services/auth.services";
import { useContext } from "react";
import { authContext } from "../context/auth.context";

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
        console.log(error);
      }
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
        <div>{errorMessage !== "" && <h2>{errorMessage}</h2>}</div>
        <button onClick={handleLogin}>Entrar</button>
      </form>
      <p>¿No tienes cuenta? Regístrate</p>
      <Link to="/registro">
        <button>Regístrase</button>
      </Link>
      <Link to="/anuncios">
        <button>Ver anuncios</button>
      </Link>
    </>
  );
}

export default Login;
