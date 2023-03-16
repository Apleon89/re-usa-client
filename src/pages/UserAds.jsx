import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { PropagateLoader } from "react-spinners";
import GoBack from "../components/GoBack";
import Navbar from "../components/Navbar";
import OneElement from "../components/OneElement";
import SearchBar from "../components/SearchBar";
import { getUserAdsService } from "../services/profile.services";
import "./UserAds.css";

function UserAds() {
  const params = useParams();
  const navigate = useNavigate();

  const [userAds, setUserAds] = useState(null);
  const [categoryToSearch, setCategoryToSearch] = useState("");
  const [valueToSearch, setValueToSearch] = useState("");

  useEffect(() => {
    const getData = async () => {
      try {
        const response = await getUserAdsService(params.idUsuario);
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
          setUserAds(filteredAds);
        } else {
          setUserAds(response.data);
        }
      } catch (error) {
        navigate("/error");
      }
    };
    getData();
  }, [categoryToSearch, valueToSearch]);

  return (
    <div className="userAds-body">
      <Navbar />
      <div className="userAds-title-container">
        <GoBack />
        <h3>Mis anuncios</h3>
        <div className="divStyle"></div>
      </div>
      <div className="search-container">
        <SearchBar
          setCategoryToSearch={setCategoryToSearch}
          setValueToSearch={setValueToSearch}
        />
      </div>
      <div className="userAds-container">
        {!userAds ? (
          <div className="loopSearch">
            <h3>Buscando</h3>
            <PropagateLoader />
          </div>
        ) : (
          <>
            {userAds.length === 0 ? (
              <p>No hay anuncios publicados</p>
            ) : (
              userAds.map((each) => (
                <Link to={`/anuncios/${each._id}`} key={each._id}>
                  <OneElement img={each.adImages[0]} title={each.title} />
                </Link>
              ))
            )}
          </>
        )}
      </div>
    </div>
  );
}

export default UserAds;
