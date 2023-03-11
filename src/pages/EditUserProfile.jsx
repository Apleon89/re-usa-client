import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { PropagateLoader } from "react-spinners";
import GoBack from "../components/GoBack";
import Navbar from "../components/Navbar";
import {
  getProfileService,
  updateUserProfileService,
} from "../services/profile.services";
import { useContext } from "react";
import { authContext } from "../context/auth.context";

function EditUserProfile() {
  const { loggedUser } = useContext(authContext);

  const navigate = useNavigate();

  const [username, setUsername] = useState("");
  const [location, setLocation] = useState("");
  const [image, setImage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    const getData = async () => {
      try {
        const response = await getProfileService(loggedUser._id);
        setUsername(response.data.username);
        setLocation(response.data.location);
        setImage(response.data.profileImage);
      } catch (error) {
        navigate("/error");
        console.log(error);
      }
    };
    getData();
  }, []);

  const editProfile = async (e) => {
    e.preventDefault();

    const updatedProfile = {
      username,
      location,
      profileImage: image,
    };
    try {
      await updateUserProfileService(loggedUser._id, updatedProfile);
      navigate(`/perfil/${loggedUser._id}`);
    } catch (error) {
      if (error.response.status === 400) {
        setErrorMessage(error.response.data.errorMessage);
      } else {
        navigate("/error");
        console.log(error);
      }
    }
  };
  return (
    <>
      <Navbar />
      <GoBack />
      <form>
        <label htmlFor="username">Nombre Usuario:</label>
        <input
          type="text"
          name="username"
          id="username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <br />
        <label htmlFor="location">Localización:</label>
        <input
          type="text"
          name="location"
          id="location"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
        />
        <br />
        <label htmlFor="image">Imagen de perfil:</label>
        <input
          type="text"
          name="image"
          id="image"
          value={image}
          onChange={(e) => setImage(e.target.value)}
        />
        <br />
        <div>{errorMessage !== "" && <h2>{errorMessage}</h2>}</div>
        <button onClick={editProfile}>Editar</button>
      </form>
    </>
  );
}

export default EditUserProfile;
