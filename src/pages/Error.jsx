import { Link, useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import "./Error.css";
import error500 from '../assets/images/error-500.png'

function Error() {
  const navigate = useNavigate();

  return (
    <div className="error-div">
      <Navbar />
      <img className="error500Img" src={error500} alt="500" />
      <h3 className="error">Error 500. Problemas de servidor :(</h3>
      <h4 className="error">¡ El alojamiento es gratuito..!</h4>
      <Link to={navigate(-1)}>
        <button className="btn go-back-500Btn">Inténtalo de nuevo</button>
      </Link>
    </div>
  );
}

export default Error;
