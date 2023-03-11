import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { PropagateLoader } from "react-spinners";
import GoBack from "../components/GoBack";
import Navbar from "../components/Navbar";
import { getProfileService } from "../services/profile.services";
import { useContext } from "react";
import { authContext } from "../context/auth.context";

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
        console.log(error);
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
    <>
      <Navbar />
      <GoBack />
      <div>
        {!userData ? (
          <>
            <h3>Buscando</h3>
            <PropagateLoader />
          </>
        ) : (
          <>
            <img src={userData.profileImage} alt="profile img" width="100px" />
            <h3>
              <span>Nombre de usuario: </span>
              {userData.username}
            </h3>
            <h4>
              <span>Email: </span>
              {userData.email}
            </h4>
            <h5>
              <span>Location: </span>
              {userData.location}
            </h5>
            <Link to={`/perfil/${loggedUser._id}/misAnuncios`}>
              <button>Mis anuncios</button>
            </Link>
            <Link to={`/perfil/${loggedUser._id}/editar`}>
              <button>Editar Perfil</button>
            </Link>
            <button onClick={handleLogout}>Cerrar sesión</button>
          </>
        )}
      </div>
    </>
  );
}

export default UserProfile;
