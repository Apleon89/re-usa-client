import { Link, useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import "./NotFound.css";
import errorImg from "../assets/images/Error404-mobile.png";

function NotFound() {
  const navigate = useNavigate();

  return (
    <div className="nofFound-div">
      <Navbar />
      <img className="notFoundImgMobile" src={errorImg} alt="404" />
      <h3>Error 404. Pagina no encontrada :(</h3>
      <Link className="go-back-404Btn" to={navigate(-1)}>
        <button className="btn go-back-404Btn">Vuelve atrás</button>
      </Link>
    </div>
  );
}

export default NotFound;
