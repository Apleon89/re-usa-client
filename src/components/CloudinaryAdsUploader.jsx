import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { PropagateLoader } from "react-spinners";
import { uploadImageService } from "../services/upload.services";
import './CloudinaryAdsUploader.css'

function CloudinaryAdsUploader(props) {
  const navigate = useNavigate();
  const [imageUrl1, setImageUrl1] = useState(null);
  const [imageUrl2, setImageUrl2] = useState(null);
  const [imageUrl3, setImageUrl3] = useState(null);
  const [imageUrl4, setImageUrl4] = useState(null);
  const [isUploading1, setIsUploading1] = useState(false);
  const [isUploading2, setIsUploading2] = useState(false);
  const [isUploading3, setIsUploading3] = useState(false);
  const [isUploading4, setIsUploading4] = useState(false);

  useEffect(() => {
    if (props.userImages) {
      setImageUrl1(props.userImages[0]);
      setImageUrl2(props.userImages[1]);
      setImageUrl3(props.userImages[2]);
      setImageUrl4(props.userImages[3]);
    }
  }, []);

  const handleFileUpload1 = async (e) => {
    if (!e.target.files[0]) {
      return;
    }
    setIsUploading1(true);

    const uploadData = new FormData();
    uploadData.append("image", e.target.files[0]);
    try {
      const response = await uploadImageService(uploadData);
      setImageUrl1(response.data.imageUrl);
      props.setImage1(response.data.imageUrl);
      setIsUploading1(false);
    } catch (error) {
      navigate("/error");
    }
  };

  const handleFileUpload2 = async (e) => {
    if (!e.target.files[0]) {
      return;
    }
    setIsUploading2(true);

    const uploadData = new FormData();
    uploadData.append("image", e.target.files[0]);
    try {
      const response = await uploadImageService(uploadData);
      setImageUrl2(response.data.imageUrl);
      props.setImage2(response.data.imageUrl);
      setIsUploading2(false);
    } catch (error) {
      navigate("/error");
    }
  };

  const handleFileUpload3 = async (e) => {
    if (!e.target.files[0]) {
      return;
    }
    setIsUploading3(true);

    const uploadData = new FormData();
    uploadData.append("image", e.target.files[0]);
    try {
      const response = await uploadImageService(uploadData);
      setImageUrl3(response.data.imageUrl);
      props.setImage3(response.data.imageUrl);
      setIsUploading3(false);
    } catch (error) {
      navigate("/error");
    }
  };

  const handleFileUpload4 = async (e) => {
    if (!e.target.files[0]) {
      return;
    }
    setIsUploading4(true);

    const uploadData = new FormData();
    uploadData.append("image", e.target.files[0]);
    try {
      const response = await uploadImageService(uploadData);
      setImageUrl4(response.data.imageUrl);
      props.setImage4(response.data.imageUrl);
      setIsUploading4(false);
    } catch (error) {
      navigate("/error");
    }
  };

  return (
    <div className="cloudinary-view-container">
      <div className="cloudinary-images">
        {imageUrl1 && (
          <div className="eachImg-div">
            <p>1</p>
            <img src={imageUrl1} alt="img" width={50} />
          </div>
        )}
        {imageUrl2 && (
          <div className="eachImg-div">
            <p>2</p>
            <img src={imageUrl2} alt="img" width={50} />
          </div>
        )}
        {imageUrl3 && (
          <div className="eachImg-div">
            <p>3</p>
            <img src={imageUrl3} alt="img" width={50} />
          </div>
        )}
        {imageUrl4 && (
          <div className="eachImg-div">
            <p>4</p>
            <img src={imageUrl4} alt="img" width={50} />
          </div>
        )}
      </div>
      <div className="selectImg-container">
        {isUploading1 && <PropagateLoader />}
        <label htmlFor="image1Edit">Imagen  1</label>
        <input
          type="file"
          name="image"
          className="inputfile"
          id="image1Edit"
          onChange={handleFileUpload1}
          disabled={isUploading1}
        />
        <br />
        {isUploading2 && <PropagateLoader />}
        <label htmlFor="image2Edit">Imagen 2</label>
        <input
          type="file"
          name="image"
          className="inputfile"
          id="image2Edit"
          onChange={handleFileUpload2}
          disabled={isUploading2}
        />
        <br />
        {isUploading3 && <PropagateLoader />}
        <label htmlFor="image3Edit">Imagen 3</label>
        <input
          type="file"
          name="image"
          className="inputfile"
          id="image3Edit"
          onChange={handleFileUpload3}
          disabled={isUploading3}
        />
        <br />
        {isUploading4 && <PropagateLoader />}
        <label htmlFor="image4Edit">Imagen 4</label>
        <input
          type="file"
          name="image"
          className="inputfile"
          id="image4Edit"
          onChange={handleFileUpload4}
          disabled={isUploading4}
        />
      </div>
    </div>
  );
}

export default CloudinaryAdsUploader;
