import { useEffect, useState } from "react";
import {
  deleteAllMssgsOneUserService,
  getAllOpenChats,
} from "../services/messages.services";
import Navbar from "../components/Navbar";
import OneElement from "../components/OneElement";
import { Link, useNavigate } from "react-router-dom";
import { PropagateLoader } from "react-spinners";
import GoBack from "../components/GoBack";
import "./AllMessages.css";

function AllMessages() {
  const navigate = useNavigate();
  const [allChats, setAllChats] = useState(null);
  const [deleteButton, setDeleteButton] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      getData();
    }, 6000);
    getData();
    return () => {
      clearInterval(interval);
    };
  }, []);

  const getData = async () => {
    try {
      const response = await getAllOpenChats();
      setAllChats(response.data);
    } catch (error) {
      navigate("/error");
    }
  };

  const showDeleteButton = () => {
    setDeleteButton(!deleteButton);
  };

  const deleteAllMsgsOneUser = async (id) => {
    try {
      await deleteAllMssgsOneUserService(id);
      getData();
    } catch (error) {
      navigate("/error");
    }
  };

  return (
    <div className="allmsgs-body">
      <Navbar />
      <div className="allmsgs-title-container">
        <GoBack />
        <h3>Mensajes</h3>
        <button className="edit-btn" onClick={showDeleteButton}>
          Editar
        </button>
      </div>
      <div className="allmsgs-container">
        {!allChats ? (
          <div className="loopSearch">
            <h3>Buscando</h3>
            <PropagateLoader />
          </div>
        ) : allChats.length === 0 ? (
          <h2>No hay chats</h2>
        ) : (
          allChats.map((each) => (
            <div key={each.id} className="contact-link-container">
              <div className="one-chat-link">
                <Link to={`/mensajes/${each.id}`}>
                  {each.username.slice(0, 17) === "Usuario Eliminado" ? (
                    <OneElement
                      img={each.img}
                      title={"Usuario Eliminado"}
                      id={each.id}
                    />
                  ) : (
                    <OneElement
                      img={each.img}
                      title={each.username}
                      id={each.id}
                    />
                  )}
                </Link>
              </div>
              {deleteButton && (
                <div className="deleteChat-btn-div">
                  <button
                    className="deleteChat-btn"
                    onClick={() => deleteAllMsgsOneUser(each.id)}
                  >
                    Borrar
                  </button>
                </div>
              )}
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default AllMessages;
