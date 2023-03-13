import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { PropagateLoader } from "react-spinners";
import GoBack from "../components/GoBack";
import Navbar from "../components/Navbar";
import OneElement from "../components/OneElement";
import SearchBar from "../components/SearchBar";
import { favouritesUserAdsService } from "../services/ad.services";

function FavouritesUserAds() {
  const navigate = useNavigate();

  const [favouritesAds, setFavouritesAds] = useState(null);
  const [categoryToSearch, setCategoryToSearch] = useState("");
  const [valueToSearch, setValueToSearch] = useState("");

  useEffect(() => {
    const getData = async () => {
      try {
        const response = await favouritesUserAdsService();
        if (categoryToSearch || valueToSearch) {
          const filteredAds = response.data
            .filter((each) => {
              if (categoryToSearch !== "") {
                return each.category[0] === categoryToSearch;
              } else {
                return each;
              }
            })
            .filter((each) => {
              return (
                each.title
                  .toLowerCase()
                  .includes(valueToSearch.toLowerCase()) ||
                each.description
                  .toLowerCase()
                  .includes(valueToSearch.toLowerCase())
              );
            });
          setFavouritesAds(filteredAds);
        } else {
          setFavouritesAds(response.data);
        }
      } catch (error) {
        navigate("/error");
      }
    };
    getData();
  }, [categoryToSearch, valueToSearch]);

  return (
    <>
      <Navbar />
      <GoBack />
      <h3>Favoritos</h3>
      <SearchBar
        setCategoryToSearch={setCategoryToSearch}
        setValueToSearch={setValueToSearch}
      />
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
