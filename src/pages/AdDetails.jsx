import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { PropagateLoader } from "react-spinners";
import Carousel from "../components/Carousel";
import GoBack from "../components/GoBack";
import Navbar from "../components/Navbar";
import { adDetailsService, deleteAdService } from "../services/ad.services";
import { useContext } from "react";
import { authContext } from "../context/auth.context";
import IsAdFavourite from "../components/IsAdFavourite";

function AdDetails() {
  const navigate = useNavigate();

  const params = useParams();
  const { idProducto } = params;

  const { loggedUser } = useContext(authContext);

  const [ad, setAd] = useState(null);
  const [userFavs, setUserFavs] = useState(null);
  const [isOwner, setIsOwner] = useState(false);

  useEffect(() => {
    const getData = async () => {
      try {
        const response = await adDetailsService(idProducto);
        setAd(response.data[0]);
        setUserFavs(response.data[1]);
        if (loggedUser._id === response.data[0].owner._id) {
          setIsOwner(true);
        }
      } catch (error) {
        navigate("/error");
      }
    };
    getData();
  }, []);

  const deleteAd = async () => {
    try {
      await deleteAdService(idProducto);
      navigate(-1);
    } catch (error) {
      navigate("/error");
    }
  };
  return (
    <>
      <Navbar />

      <GoBack />

      {!ad ? (
        <>
          <h3>Buscando</h3>
          <PropagateLoader />
        </>
      ) : (
        <>
          <div>
            <h3>{ad.title}</h3>
            <p>{ad.owner.location}</p>
            <Carousel adImages={ad.adImages} />
            <p>
              <span>Descripción: </span>
              {ad.description}
            </p>
            <p>{ad.updatedAt}</p>
          </div>
          {isOwner ? (
            <>
              <Link to={`/anuncios/${idProducto}/editar`}>
                <button>Editar</button>
              </Link>
              <button onClick={deleteAd}>Eliminar</button>
            </>
          ) : (
            <>
              <IsAdFavourite
                idProducto={idProducto}
                userFavs={userFavs.favouritesAds}
              />
              <Link to={`/mensajes/${ad.owner._id}`}>
                <button>Mensaje</button>
              </Link>
            </>
          )}
        </>
      )}
    </>
  );
}

export default AdDetails;
