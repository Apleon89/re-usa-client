import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { PropagateLoader } from "react-spinners";
import Header from "../components/Header";
import Navbar from "../components/Navbar";
import { getProfileService } from "../services/profile.services";
import { useContext } from "react";
import { authContext } from "../context/auth.context";
import "./UserProfile.css";

function UserProfile() {
  const { validateToken, loggedUser } = useContext(authContext);

  const params = useParams();
  const navigate = useNavigate();
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    const getData = async () => {
      try {
        const response = await getProfileService(params.idUsuario);
        setUserData(response.data);
      } catch (error) {
        navigate("/error");
      }
    };
    getData();
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("authToken");
    validateToken();
    navigate("/");
  };

  return (
    <div className="userProfile-body">
      <Navbar />
    <Header name={'Mi Perfil'} />
      <div className="userProfile-container">
        {!userData ? (
          <div className="loopSearch">
            <h3>Buscando</h3>
            <PropagateLoader />
          </div>
        ) : (
          <>
            <div className="userProfile-imgContainer">
              <img
                src={userData.profileImage}
                alt="profile img"
                width="100px"
              />
            </div>
            <div className="userProfile-dataContainer">
              <div className="dataContainerDiv">
                <span>Nombre de usuario: </span>
                <h3>{userData.username}</h3>
              </div>
              <div className="dataContainerDiv">
                <span>Email: </span>
                <h4>{userData.email}</h4>
              </div>
              <div className="dataContainerDiv">
                <span>Location: </span>
                <h5>{userData.location}</h5>
              </div>
            </div>
            <div className="userProfile-links">
              <Link to={`/perfil/${loggedUser._id}/misAnuncios`}>
                <button className="btn">Mis anuncios</button>
              </Link>
              <Link to={`/perfil/${loggedUser._id}/editar`}>
                <button className="btn">Editar Perfil</button>
              </Link>
              <button className="btn" onClick={handleLogout}>
                Cerrar sesión
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default UserProfile;
