import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import notFavHeart from "../assets/images/heart-outline.png";
import favHeart from "../assets/images/heart-red.png";
import { addRemoveFavService } from "../services/ad.services";
import './IsAdFavourite.css'

function IsAdFavourite(props) {
  const { idProducto, userFavs } = props;

  const navigate = useNavigate();

  const [isFavourite, setIsFavourite] = useState(false);
  const [favAd] = useState(idProducto);
  const [delFavAd] = useState(idProducto);

  useEffect(() => {
    userFavs.map((each) => {
      if (each === idProducto) {
        setIsFavourite(true);
      }
    });
  }, []);

  const addFav = async () => {
    const idToAdd = { favAd };
    try {
      await addRemoveFavService(idProducto, idToAdd);
      setIsFavourite(!isFavourite);
    } catch (error) {
      navigate("/error");
    }
  };
  const removeFav = async () => {
    const idToRemove = { delFavAd };
    try {
      await addRemoveFavService(idProducto, idToRemove);
      setIsFavourite(!isFavourite);
    } catch (error) {
      navigate("/error");
    }
  };
  return (
    <>
      {isFavourite ? (
        <button className="btn-favAd" onClick={removeFav}>
          <img src={favHeart} alt="" width="20px" />
        </button>
      ) : (
        <button className="btn-favAd" onClick={addFav}>
          <img src={notFavHeart} alt="" width="20px" />
        </button>
      )}
    </>
  );
}

export default IsAdFavourite;
