import { NavLink } from "react-router-dom";
import { useContext } from "react";
import { authContext } from "../context/auth.context";
import "./NavBar.css";
import homeIcon from "../assets/images/home-icon.png";
import favIcon from "../assets/images/favourites icon.png";
import addIcon from "../assets/images/add icon.png";
import mssgIcon2 from "../assets/images/mssggs-icon2 (1).png";
import logo from "../assets/images/Logo Re-Usa.PNG";

function Navbar() {
  const { loggedUser, isLoggedIn } = useContext(authContext);

  if (isLoggedIn) {
    return (
      <div className="navBar">
        <div className="mobile-navBar">
          <NavLink to="/todos-anuncios">
            <img className="home-icon" src={homeIcon} alt="home icon" />
          </NavLink>
          <NavLink to="/anuncios/favoritos">
            <img className="fav-icon" src={favIcon} alt="fav icon" />
          </NavLink>
          <NavLink to="/anuncios/anadir">
            <img className="add-icon" src={addIcon} alt="add icon" />
          </NavLink>
          <NavLink to="/mensajes">
            <img className="mssg-icon" src={mssgIcon2} alt="mssg icon" />
          </NavLink>
          <NavLink to={`/perfil/${loggedUser._id}`}>
            <img
              className="profile-icon"
              src={loggedUser.profileImage}
              alt=""
            />
          </NavLink>
        </div>
        <div className="">
          <div className="logo-container">
            <NavLink to={"/todos-anuncios"}>
              <img className="logo" src={logo} alt="logo Re-Usa" />
            </NavLink>
          </div>
          <div className="web-navBar">
            <NavLink exact to="/todos-anuncios">Anuncios</NavLink>
            <NavLink to="/anuncios/favoritos">Favoritos</NavLink>
            <NavLink to="/anuncios/anadir">Añadir Anuncio</NavLink>
            <NavLink to="/mensajes">Mensajes</NavLink>
            <NavLink to={`/perfil/${loggedUser._id}`}>Perfil</NavLink>
          </div>
        </div>
      </div>
    );
  } else {
    return (
      <div className="notLogin-navBar">
        <NavLink to="/registro">Registro</NavLink>
        <NavLink to="/acceso">Acceso</NavLink>
      </div>
    );
  }
}

export default Navbar;
