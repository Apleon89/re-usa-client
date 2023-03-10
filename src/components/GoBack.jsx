import { Link, useNavigate } from "react-router-dom";

function GoBack() {
  const navigate = useNavigate();

  const goBack = () => {
    navigate(-1);
  };
  return (
    <div>
      <Link onClick={goBack} to="#">
        <button>Atrás</button>
      </Link>
    </div>
  );
}

export default GoBack;
