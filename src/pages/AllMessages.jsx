import { useEffect, useState } from "react";
import { deleteAllMssgsOneUserService, getAllOpenChats } from "../services/messages.services";
import Navbar from "../components/Navbar";
import OneElement from "../components/OneElement";
import { Link } from "react-router-dom";
import { PropagateLoader } from "react-spinners";
import GoBack from "../components/GoBack";

function AllMessages() {
  const [allChats, setAllChats] = useState(null);
  const [deleteButton, setDeleteButton] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      getData();
    }, 6000);
    getData();
    return () => {
      clearInterval(interval)
    }
  }, []);
  
  const getData = async () => {
    try {
      const response = await getAllOpenChats();
      setAllChats(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  const showDeleteButton = () => {
    setDeleteButton(!deleteButton);
  };

  const deleteAllMsgsOneUser = async (id) => {
    try {
      await deleteAllMssgsOneUserService(id)
      getData()
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <Navbar />
      <GoBack />
      <h3>Mensajes</h3>
      <button onClick={showDeleteButton}>Editar</button>
      {!allChats ? (
        <>
          <h3>Buscando</h3>
          <PropagateLoader />
        </>
      ) : allChats.length === 0 ? (
        <h2>No hay chats</h2>
      ) : (
        allChats.map((each) => (
          <div key={each.id}>
            <Link to={`/mensajes/${each.id}`}>
              {each.username.slice(0, 17) === "Usuario Eliminado" ? (
                <OneElement
                  img={each.img}
                  title={"Usuario Eliminado"}
                  id={each.id}
                />
              ) : (
                <OneElement img={each.img} title={each.username} id={each.id} />
              )}
            </Link>
            {deleteButton && (
              <button onClick={() => deleteAllMsgsOneUser(each.id)}>
                Borrar
              </button>
            )}
          </div>
        ))
      )}
    </>
  );
}

export default AllMessages;
