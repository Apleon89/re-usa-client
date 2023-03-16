import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { PropagateLoader } from "react-spinners";
import Navbar from "../components/Navbar";
import OneElement from "../components/OneElement";
import SearchBar from "../components/SearchBar";
import { allAdsService } from "../services/ad.services";
import "./AllAds.css";

function AllAds() {
  const navigate = useNavigate();
  const [allAds, setAllAds] = useState(null);
  const [categoryToSearch, setCategoryToSearch] = useState("");
  const [valueToSearch, setValueToSearch] = useState("");

  useEffect(() => {
    const getData = async () => {
      try {
        const response = await allAdsService();
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
                  .includes(valueToSearch.toLowerCase()) ||
                each.owner.username
                  .toLowerCase()
                  .includes(valueToSearch.toLowerCase())
              );
            });
          setAllAds(filteredAds);
        } else {
          setAllAds(response.data);
        }
      } catch (error) {
        navigate("/error");
      }
    };
    getData();
  }, [categoryToSearch, valueToSearch]);

  return (
    <div className="allAds-body">
      <Navbar />

      <SearchBar
        setCategoryToSearch={setCategoryToSearch}
        setValueToSearch={setValueToSearch}
      />

      {!allAds ? (
        <div className="loopSearch">
          <h3>Buscando</h3>
          <PropagateLoader />
        </div>
      ) : allAds.length === 0 ? (
        <h4>No hay anuncios</h4>
      ) : (
        <div className="allAds-container">
          {allAds.map((each) => (
            <Link to={`/anuncios/${each._id}`} key={each._id}>
              <OneElement
                img={each.adImages[0]}
                title={each.title}
                username={each.owner.username}
              />
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}

export default AllAds;
