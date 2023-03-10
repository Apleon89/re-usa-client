import { useState } from "react";
import GoBack from "../components/GoBack";
import Navbar from "../components/Navbar";
import { useContext } from "react";
import { authContext } from "../context/auth.context";
import { newAdService } from "../services/ad.services";
import { useNavigate } from "react-router-dom";

function NewAd() {
  const navigate = useNavigate();
  const { loggedUser } = useContext(authContext);

  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("");
  const [description, setDescription] = useState("");
  const [image1, setImage1] = useState("");
  const [image2, setImage2] = useState("");
  const [image3, setImage3] = useState("");
  const [image4, setImage4] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

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
      if (!title || !description || category === '') {
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
    <>
      <Navbar />
      <GoBack />
      <h2>Añadir anuncio</h2>
      <form>
        <label htmlFor="title">Nombre Producto:</label>
        <input
          type="text"
          name="title"
          id="title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <br />
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
        <br />
        <label htmlFor="description">Descripción:</label>
        <textarea
          type="text"
          name="description"
          id="description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
        <br />
        <label htmlFor="image1">Imagen 1:</label>
        <input
          type="text"
          name="image1"
          id="image1"
          value={image1}
          onChange={(e) => setImage1(e.target.value)}
        />
        <br />
        <label htmlFor="image2">Imagen 2:</label>
        <input
          type="text"
          name="image2"
          id="image2"
          value={image2}
          onChange={(e) => setImage2(e.target.value)}
        />
        <br />
        <label htmlFor="image3">Imagen 3:</label>
        <input
          type="text"
          name="image3"
          id="image3"
          value={image3}
          onChange={(e) => setImage3(e.target.value)}
        />
        <br />
        <label htmlFor="image4">Imagen 4:</label>
        <input
          type="text"
          name="image4"
          id="image4"
          value={image4}
          onChange={(e) => setImage4(e.target.value)}
        />
        <br />
        <p>{errorMessage}</p>
        <button onClick={submitNewAd}>Crear Anuncio</button>
      </form>
    </>
  );
}

export default NewAd;
