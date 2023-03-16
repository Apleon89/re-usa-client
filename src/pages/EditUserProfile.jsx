import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import GoBack from "../components/GoBack";
import Navbar from "../components/Navbar";
import {
  getProfileService,
  updateUserProfileService,
} from "../services/profile.services";
import { useContext } from "react";
import { authContext } from "../context/auth.context";
import { uploadImageService } from "../services/upload.services";
import { PropagateLoader } from "react-spinners";
import "./EditUserProfile.css";

function EditUserProfile() {
  const { loggedUser } = useContext(authContext);

  const navigate = useNavigate();

  const [username, setUsername] = useState("");
  const [location, setLocation] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [imageUrl, setImageUrl] = useState(null);
  const [isUploading, setIsUploading] = useState(false);

  useEffect(() => {
    const getData = async () => {
      try {
        const response = await getProfileService(loggedUser._id);
        setUsername(response.data.username);
        setLocation(response.data.location);
        setImageUrl(response.data.profileImage);
      } catch (error) {
        navigate("/error");
      }
    };
    getData();
  }, []);

  const handleFileUpload = async (e) => {
    if (!e.target.files[0]) {
      return;
    }
    setIsUploading(true);

    const uploadData = new FormData();
    uploadData.append("image", e.target.files[0]);
    try {
      const response = await uploadImageService(uploadData);
      setImageUrl(response.data.imageUrl);
      setIsUploading(false);
    } catch (error) {
      navigate("/error");
    }
  };

  const editProfile = async (e) => {
    e.preventDefault();

    const updatedProfile = {
      username,
      location,
      profileImage: imageUrl,
    };
    try {
      await updateUserProfileService(loggedUser._id, updatedProfile);
      navigate(`/perfil/${loggedUser._id}`);
    } catch (error) {
      if (error.response.status === 400) {
        setErrorMessage(error.response.data.errorMessage);
      } else {
        navigate("/error");
      }
    }
  };
  return (
    <div className="editProfile-body">
      <Navbar />
      <div className="editProfile-title-container">
        <GoBack />
        <h3>Editar Perfil</h3>
        <div className="divStyle"></div>
      </div>
      <div className="editProfile-container">
        {imageUrl && (
          <div className="editProfile-imgContainer">
            <img src={imageUrl} alt="img" width={200} />
          </div>
        )}
        {isUploading && <PropagateLoader />}
        <div className="uploadImg-container">
        <label htmlFor="image">Cambiar imagen</label>
        <input
          type="file"
          name="image"
          id="image"
          className="inputfile"
          onChange={handleFileUpload}
          disabled={isUploading}
        />
        </div>
      </div>
      <form className="editProfile-form">
        <div className="editProfile-div">
          <label htmlFor="username">Nombre Usuario:</label>
          <input
            type="text"
            name="username"
            id="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>
        <div className="editProfile-div">
          <label htmlFor="location">Localización:</label>
          <input
            type="text"
            name="location"
            id="location"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
          />
        </div>
        <div>{errorMessage !== "" && <h2>{errorMessage}</h2>}</div>
        <button className="btn" onClick={editProfile}>Editar</button>
      </form>
      <Link to={`/perfil/${loggedUser._id}/borrarCuenta`}>
        <button className="btn">Borrar cuenta</button>
      </Link>
    </div>
  );
}

export default EditUserProfile;
