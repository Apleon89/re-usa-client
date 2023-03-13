import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import CloudinaryAdsUploader from "../components/CloudinaryAdsUploader";
import GoBack from "../components/GoBack";
import Navbar from "../components/Navbar";
import { adDetailsService, editAdService } from "../services/ad.services";

function EditAd() {
  const params = useParams();
  const { idProducto } = params;

  const navigate = useNavigate();

  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("");
  const [description, setDescription] = useState("");
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
  const [userImages, setUserImages] = useState(null);
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    const getData = async () => {
      try {
        const response = await adDetailsService(idProducto);
        setTitle(response.data[0].title);
        setCategory(response.data[0].category);
        setDescription(response.data[0].description);
        setImage1(response.data[0].adImages[0]);
        setImage2(response.data[0].adImages[1]);
        setImage3(response.data[0].adImages[2]);
        setImage4(response.data[0].adImages[3]);
        setUserImages(response.data[0].adImages);
      } catch (error) {
        navigate("/error");
      }
    };
    getData();
  }, []);

  const updateAd = async (e) => {
    e.preventDefault();
    const updatedAd = {
      title,
      description,
      category,
      image1,
      image2,
      image3,
      image4,
    };
    try {
      if (!title || !description || category === "") {
        setErrorMessage(
          'Los campos "Nombre de producto", "descripción" y "categoría" deben estar rellenos para poder añadir un anuncio'
        );
        return;
      }
      await editAdService(idProducto, updatedAd);
      navigate(`/anuncios/${idProducto}`);
    } catch (error) {
      navigate("/error");
    }
  };
  return (
    <>
      <Navbar />
      <GoBack />
      <h2>Editar anuncio</h2>
      {userImages && (
        <CloudinaryAdsUploader
          userImages={userImages}
          setImage1={setImage1}
          setImage2={setImage2}
          setImage3={setImage3}
          setImage4={setImage4}
        />
      )}
      <form onSubmit={updateAd}>
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
        <p>{errorMessage}</p>
        <button>Editar Anuncio</button>
      </form>
    </>
  );
}

export default EditAd;
