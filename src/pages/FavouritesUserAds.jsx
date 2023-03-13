import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { PropagateLoader } from "react-spinners";
import GoBack from "../components/GoBack";
import Navbar from "../components/Navbar";
import OneElement from "../components/OneElement";
import { favouritesUserAdsService } from "../services/ad.services";

function FavouritesUserAds() {
  const navigate = useNavigate();

  const [favouritesAds, setFavouritesAds] = useState(null);

  useEffect(() => {
    const getData = async () => {
      try {
        const response = await favouritesUserAdsService();
        setFavouritesAds(response.data);
      } catch (error) {
        navigate("/error");
      }
    };
    getData();
  }, []);

  return (
    <>
      <Navbar />
      <GoBack />
      <h3>Favoritos</h3>
      {!favouritesAds ? (
        <>
          <h3>Buscando</h3>
          <PropagateLoader />
        </>
      ) : favouritesAds.length === 0 ? (
        <h4>No hay anuncios favoritos.</h4>
      ) : (
        favouritesAds.map((each) => (
          <Link to={`/anuncios/${each._id}`} key={each._id}>
            <OneElement img={each.adImages[0]} title={each.title} />
          </Link>
        ))
      )}
    </>
  );
}

export default FavouritesUserAds;
