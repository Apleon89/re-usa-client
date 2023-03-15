import { Link, useNavigate } from "react-router-dom";
import './Goback.css'

function GoBack() {
  const navigate = useNavigate();

  const goBack = () => {
    navigate(-1);
  };
  return (
    <div>
      <Link onClick={goBack} to="#">
        <button className="btn-atras">Atrás</button>
      </Link>
    </div>
  );
}

export default GoBack;
