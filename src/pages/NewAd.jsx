import { useState } from "react";
import Navbar from "../components/Navbar";
import { useContext } from "react";
import { authContext } from "../context/auth.context";
import { newAdService } from "../services/ad.services";
import { useNavigate } from "react-router-dom";
import CloudinaryAdsUploader from "../components/CloudinaryAdsUploader";
import "./NewAd.css";
import Header from '../components/Header'

function NewAd() {
  const navigate = useNavigate();
  const { loggedUser } = useContext(authContext);

  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("");
  const [description, setDescription] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [image1, setImage1] = useState(
    "https://res.cloudinary.com/dacltsvln/image/upload/v1678707296/re-Usa/eca7lptfqlqstm28zorb.png"
  );
  const [image2, setImage2] = useState(
    "https://res.cloudinary.com/dacltsvln/image/upload/v1678707296/re-Usa/eca7lptfqlqstm28zorb.png"
  );
  const [image3, setImage3] = useState(
    "https://res.cloudinary.com/dacltsvln/image/upload/v1678707296/re-Usa/eca7lptfqlqstm28zorb.png"
  );
  const [image4, setImage4] = useState(
    "https://res.cloudinary.com/dacltsvln/image/upload/v1678707296/re-Usa/eca7lptfqlqstm28zorb.png"
  );

  const submitNewAd = (e) => {
    e.preventDefault();
    const newAd = {
      owner: loggedUser._id,
      title,
      description,
      category,
      image1,
      image2,
      image3,
      image4,
    };
    const sendData = async () => {
      if (!title || !description || category === "") {
        setErrorMessage(
          'Los campos "Nombre de producto", "descripción" y "categoría" deben estar rellenos para poder añadir un anuncio'
        );
        return;
      }
      try {
        const response = await newAdService(newAd);
        navigate(`/anuncios/${response.data._id}`);
      } catch (error) {
        navigate("/error");
      }
    };
    sendData();
  };

  return (
    <div className="newAd-body">
      <Navbar />
      <Header name={'Añadir Anuncio'}/>
      <div className="newAd-container">
        <div>
          <CloudinaryAdsUploader
            setImage1={setImage1}
            setImage2={setImage2}
            setImage3={setImage3}
            setImage4={setImage4}
          />
        </div>
        <form className="newAd-form">
          <div className="newAd-div">
            <label htmlFor="title">Nombre Producto:</label>
            <input
              type="text"
              name="title"
              id="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </div>
          <div className="newAd-div">
            <label htmlFor="title">Categoría:</label>
            <select
              name="category"
              id="category"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
            >
              <option value="">Seleccionar categoría</option>
              <option value="Videojuegos">Videojuegos</option>
              <option value="Telefonía">Telefonía</option>
              <option value="Informática">Informática</option>
              <option value="Imagen y Sonido">Imagen y Sonido</option>
              <option value="Productos del hogar">Productos del hogar</option>
              <option value="Deportes">Deportes</option>
              <option value="Motor">Motor</option>
              <option value="Libros">Libros</option>
            </select>
          </div>
          <div className="newAd-div">
            <label htmlFor="description">Descripción:</label>
            <textarea
              type="text"
              name="description"
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </div>
          <div>
            <p>{errorMessage}</p>
          </div>
          <button className="btn" onClick={submitNewAd}>
            Crear Anuncio
          </button>
        </form>
      </div>
    </div>
  );
}

export default NewAd;
