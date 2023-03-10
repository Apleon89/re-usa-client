import { Link } from "react-router-dom";
import "./Home.css";
import video from "../assets/video/IMG_0021.MP4";

function Home() {
  return (
    <div className="body">
      {/* <h2 className="titulo">Re-Usa</h2> */}
      <video autoPlay muted loop className="video-home">
        <source src={video} type="video/mp4" />
      </video>
      <div>
        <p className="eslogan-text">
          ¡Reduce, reutiliza, Re-Usa! Tu app para intercambiar productos de
          segunda mano.
        </p>
        <div>
          <p className="frase-anuncios">Echa un vistazo a los anuncios:</p>
          <Link to="/anuncios">
            <button className="btn btn-anuncios">Ver anuncios</button>
          </Link>
        </div>
        <div>
          <Link to="/registro">
            <button className="btn btn-registro">Regístrate</button>
          </Link>
          <Link to="/acceso">
            <button className="btn btn-acceso">Entrar</button>
          </Link>
        </div>
        <footer>
          <p className="footer">Un proyecto de: Alberto Pérez León.</p>
        </footer>
      </div>
    </div>
  );
}

export default Home;
