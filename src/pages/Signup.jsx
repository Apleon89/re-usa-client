import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { signupService } from "../services/auth.services";

function Signup() {
  const navigate = useNavigate();

  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [repeatPassword, setRepeatPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newUSer = {
      username,
      email,
      password,
      repeatPassword,
    };
    try {
      await signupService(newUSer);
      navigate("/acceso");
    } catch (error) {
      if (error.response.status === 400) {
        setErrorMessage(error.response.data.errorMessage);
      } else {
        navigate("/error");
      }
    }
  };
  return (
    <>
      <h2>Regístrate</h2>
      <form>
        <div>
          <label htmlFor="username">Nombre de Usuario:</label>
          <input
            type="text"
            id="username"
            name="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>
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
        <div>
          <label htmlFor="repeatPassword">Repetir contraseña:</label>
          <input
            type="password"
            id="repeatPassword"
            name="repeatPassword"
            value={repeatPassword}
            onChange={(e) => setRepeatPassword(e.target.value)}
          />
        </div>
        <div>{errorMessage !== "" && <h2>{errorMessage}</h2>}</div>
        <button onClick={handleSubmit}>Registrarse</button>
      </form>
      <p>¿Registrado?</p>
      <Link to="/acceso">
        <button>Accede</button>
      </Link>
      <Link to="/anuncios">
        <button>Ver anuncios</button>
      </Link>
    </>
  );
}

export default Signup;
