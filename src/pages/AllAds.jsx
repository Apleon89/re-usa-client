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

  useEffect(() => {
    const getData = async () => {
      try {
        const response = await allAdsService();
        setAllAds(response.data);
      } catch (error) {
        navigate("/error");
      }
    };
    getData();
  }, []);

  return (
    <div>
      <Navbar />

      <SearchBar />

      {allAds ? (
        allAds.map((each) => (
          <Link to={`/anuncios/${each._id}`} key={each._id}>
            <OneElement
              img={each.adImages[0]}
              title={each.title}
              username={each.owner.username}
            />
          </Link>
        ))
      ) : (
        <>
          <h3>Buscando</h3>
          <PropagateLoader />
        </>
      )}
    </div>
  );
}

export default AllAds;
