import { Link, useNavigate } from "react-router-dom";
import { useContext, useState } from "react";
import { authContext } from "../context/auth.context";
import { deleteUserService } from "../services/profile.services";
import './DeleteProfile.css'

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
    <div className="delete-acount-view">
      {!deletedAccount ? (
        <>
          <h2>¿Seguro que quiere eliminar su cuenta?</h2>
          <button className="btn btn-delete" onClick={deleteUSerAccount}>Sí</button>
          <Link to={`/perfil/${loggedUser._id}`}>
            <button className="btn btn-delete">No</button>
          </Link>
        </>
      ) : (
        <h2>Cuenta eliminada</h2>
      )}
    </div>
  );
}

export default DeleteProfile;
