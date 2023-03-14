import { Link, useNavigate } from "react-router-dom";
import { useContext, useState } from "react";
import { authContext } from "../context/auth.context";
import { deleteUserService } from "../services/profile.services";

function DeleteProfile() {
  const navigate = useNavigate();
  const { loggedUser, validateToken } = useContext(authContext);
  const [deletedAccount, setDeletedAccount] = useState(false);

  const deleteUSerAccount = async () => {
    try {
      await deleteUserService(loggedUser._id);
      setDeletedAccount(true);
      setTimeout(() => {
        navigate("/");
        localStorage.removeItem("authToken");
        validateToken();
      }, 2000);
    } catch (error) {
      navigate("/error");
    }
  };
  return (
    <>
      {!deletedAccount ? (
        <>
          <h2>¿Seguro que quiere eliminar su cuenta?</h2>
          <button onClick={deleteUSerAccount}>Sí</button>
          <Link to={`/perfil/${loggedUser._id}`}>
            <button>No</button>
          </Link>
        </>
      ) : (
        <h2>Cuenta eliminada</h2>
      )}
    </>
  );
}

export default DeleteProfile;
