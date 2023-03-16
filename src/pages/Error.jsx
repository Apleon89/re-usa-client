import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";
import './Error.css'

function Error() {
  return (
    <div className="error-div">
      <Navbar />
      <h3 className="error">Error 500. Problemas de servidor :(</h3>
      <h4 className="error">Problemas de usar alojamientos gratuitos...</h4>
      <h4 className="error">Por favor recarga la página o vuelve a intentarlo en unos minutos</h4>
    </div>
  );
}

export default Error;
