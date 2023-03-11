import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { PropagateLoader } from "react-spinners";
import Navbar from "../components/Navbar";
import OneElement from "../components/OneElement";
import SearchBar from "../components/SearchBar";
import { allAdsService } from "../services/ad.services";

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
          const categoryFilteredAds = response.data.filter((each) => {
            if (categoryToSearch !== "") {
              return each.category[0] === categoryToSearch;
            } else {
              return each;
            }
          });
          const valueFilteredAds = categoryFilteredAds.filter((each) => {
            if (
              each.title.toLowerCase().includes(valueToSearch.toLowerCase())
              // || each.description.toLowerCase().includes(valueToSearch.toLowerCase())
            ) {
              return true;
            } else {
              return false;
            }
          });
          setAllAds(valueFilteredAds);
        } else {
          setAllAds(response.data);
        }
      } catch (error) {
        console.log(error);
        // navigate("/error");
      }
    };
    getData();
  }, [categoryToSearch, valueToSearch]);

  return (
    <div>
      <Navbar />

      <SearchBar
        setCategoryToSearch={setCategoryToSearch}
        setValueToSearch={setValueToSearch}
      />

      {!allAds ? (
        <>
          <h3>Buscando</h3>
          <PropagateLoader />
        </>
      ) : allAds.length === 0 ? (
        <h4>No hay anuncios</h4>
      ) : (
        allAds.map((each) => (
          <Link to={`/anuncios/${each._id}`} key={each._id}>
            <OneElement
              img={each.adImages[0]}
              title={each.title}
              username={each.owner.username}
            />
          </Link>
        ))
      )}
    </div>
  );
}

export default AllAds;
