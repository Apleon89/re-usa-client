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
import "./AdDetails.css";

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
    <div className="adDetails-body">
      <Navbar />

      {!ad ? (
        <>
          <h3>Buscando</h3>
          <PropagateLoader />
        </>
      ) : (
        <>
          <div>
            <div className="adDetails-title-container">
              <GoBack />
              <h3>{ad.title[0].toUpperCase() + ad.title.slice(1)}</h3>
              <div className="divStyle"></div>
            </div>
            <div className="ad-owner-data">
              <p className="ad-owner">{ad.owner.username}</p>
              <p className="adOwner-location">{ad.owner.location}</p>
            </div>
            <Carousel adImages={ad.adImages} />
            <p className="ad-description">
              <span>Descripción: </span>
              {ad.description}
            </p>
            <p>{new Date(ad.updatedAt).toLocaleDateString()}</p>
          </div>
          {isOwner ? (
            <>
              <Link to={`/anuncios/${idProducto}/editar`}>
                <button className="btn btn-editarAd">Editar</button>
              </Link>
              <button className="btn btn-borrarAd" onClick={deleteAd}>
                Eliminar
              </button>
            </>
          ) : (
            <div className="fav-msg-buttons">
              <IsAdFavourite
                idProducto={idProducto}
                userFavs={userFavs.favouritesAds}
              />
              <Link to={`/mensajes/${ad.owner._id}`}>
                <button className="btn-mensaje">Mensaje</button>
              </Link>
            </div>
          )}
        </>
      )}
    </div>
  );
}

export default AdDetails;
