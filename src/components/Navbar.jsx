import { NavLink, useNavigate } from "react-router-dom";
import { useContext } from "react";
import { authContext } from "../context/auth.context";

function Navbar() {
  const navigate = useNavigate();
  const { validateToken } = useContext(authContext);

  const handleLogout = () => {
    localStorage.removeItem("authToken");
    validateToken();
    navigate("/");
  };
  return (
    <div>
      <NavLink to="/anuncios">Anuncios</NavLink>
      <NavLink>Favoritos</NavLink>
      <NavLink to='/anuncios/anadir'>Añadir Anuncio</NavLink>
      <NavLink>Mensajes</NavLink>
      <NavLink>Perfil</NavLink>
      <span onClick={handleLogout}>Cerrar Sesión</span>
    </div>
  );
}

export default Navbar;
