import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { PropagateLoader } from "react-spinners";
import GoBack from "../components/GoBack";
import Navbar from "../components/Navbar";
import OneElement from "../components/OneElement";
import { getUserAdsService } from "../services/profile.services";

function UserAds() {
  const params = useParams();
  const navigate = useNavigate();

  const [userAds, setUserAds] = useState(null);

  useEffect(() => {
    const getData = async () => {
      try {
        const response = await getUserAdsService(params.idUsuario);
        setUserAds(response.data);
      } catch (error) {
        navigate("/error");
        console.log(error);
      }
    };
    getData();
  }, []);

  return (
    <>
      <Navbar />
      <GoBack />
      {!userAds ? (
        <>
          <h3>Buscando</h3>
          <PropagateLoader />
        </>
      ) : (
        <>
        <h3>Mis anuncios</h3>
          {userAds.length === 0
          ?
          <p>No hay anuncios publicados</p>
          :
          userAds.map((each) => (
            <Link to={`/anuncios/${each._id}`} key={each._id}>
              <OneElement img={each.adImages[0]} title={each.title} />
            </Link>
          ))
          }
        </>
      )}
    </>
  );
}

export default UserAds;
