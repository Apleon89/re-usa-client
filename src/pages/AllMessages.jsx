import { useEffect, useState } from "react";
import { getAllOpenChats } from "../services/messages.services";
import Navbar from "../components/Navbar";
import OneElement from "../components/OneElement";
import { Link } from "react-router-dom";
import { PropagateLoader } from "react-spinners";
import GoBack from "../components/GoBack";

function AllMessages() {
  const [allChats, setAllChats] = useState(null);

  useEffect(() => {
    const getData = async () => {
      try {
        const response = await getAllOpenChats();
        setAllChats(response.data);
      } catch (error) {
        console.log(error);
      }
    };
    getData();
  }, []);

  return (
    <>
      <Navbar />
      <GoBack />
      <h3>Mensajes</h3>
      {!allChats ? (
        <>
          <h3>Buscando</h3>
          <PropagateLoader />
        </>
      ) : allChats.length === 0 ? (
        <h2>No hay chats</h2>
      ) : (
        allChats.map((each) => (
          <Link to={`/mensajes/${each.id}`} key={each.id}>
            <OneElement img={each.img} title={each.username} />
          </Link>
        ))
      )}
    </>
  );
}

export default AllMessages;
