import { NavLink } from "react-router-dom";
import { useContext } from "react";
import { authContext } from "../context/auth.context";

function Navbar() {
  const { loggedUser, isLoggedIn } = useContext(authContext);

  if (isLoggedIn) {
    return (
      <div>
        <NavLink to="/anuncios">Anuncios</NavLink>
        <NavLink to="/anuncios/favoritos">Favoritos</NavLink>
        <NavLink to="/anuncios/anadir">Añadir Anuncio</NavLink>
        <NavLink>Mensajes</NavLink>
        <NavLink to={`/perfil/${loggedUser._id}`}>Perfil</NavLink>
      </div>
    );
  } else {
    return (
      <div>
        <NavLink to='/registro'>Registro</NavLink>
        <NavLink to='/acceso'>Acceso</NavLink>
      </div>
    );
  }
}

export default Navbar;
