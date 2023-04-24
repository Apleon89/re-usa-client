import React, { useContext, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { signupService } from "../services/auth.services";
import "./Signup.css";
import { authContext } from "../context/auth.context";

function Signup() {
  const navigate = useNavigate();

  const { loggedUser } = useContext(authContext)

  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [repeatPassword, setRepeatPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  useEffect( () => {
    loggedUser && navigate('/anuncios')
  }, [])

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
    <div className="body-signup">
      <h2 className="registrate-titulo">Regístrate</h2>
      <div>
        <form className="signup-form">
          <div className="signup-div">
            <label htmlFor="username">Nombre de Usuario:</label>
            <input
              type="text"
              id="username"
              name="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>
          <div className="signup-div">
            <label htmlFor="email">Email:</label>
            <input
              type="email"
              id="email"
              name="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="signup-div">
            <label htmlFor="password">Contraseña:</label>
            <input
              type="password"
              id="password"
              name="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <div className="signup-div">
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
          <button className="btn" onClick={handleSubmit}>
            Registrarse
          </button>
        </form>
        <p className="link-acceso-signup">
          ¿Registrado? <Link to="/acceso">Accede</Link>
        </p>

        <Link to="/anuncios">
          <button className="btn">Ver anuncios</button>
        </Link>
      </div>
    </div>
  );
}

export default Signup;
