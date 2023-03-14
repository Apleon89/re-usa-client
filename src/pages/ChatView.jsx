import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import GoBack from "../components/GoBack";
import Navbar from "../components/Navbar";
import {
  getChatService,
  sendNewMessageService,
} from "../services/messages.services";
import { PropagateLoader } from "react-spinners";
import EditMessages from "../components/EditMessages";

function ChatView() {
  const navigate = useNavigate();
  const params = useParams();

  const [userB, setUserB] = useState(null);
  const [chat, setChat] = useState(null);
  const [newMessage, setNewMessage] = useState("");
  const [refreshPage, setRefreshPage] = useState("");

  useEffect(() => {
    const interval = setInterval(() => {
      getData();
    }, 6000);
    getData();
    return () => {
      clearInterval(interval);
    };
  }, [refreshPage]);
  
  const getData = async () => {
    try {
      const response = await getChatService(params.idUsuario);
      setUserB(response.data[0]);
      setChat(response.data[1]);
    } catch (error) {
      navigate("/error");
    }
  };

  const sendMessage = async (e) => {
    e.preventDefault();
    const message = {
      message: newMessage,
    };
    try {
      await sendNewMessageService(params.idUsuario, message);
      setNewMessage("");
      setRefreshPage(newMessage);
    } catch (error) {
      navigate("/error");
    }
  };

  return (
    <>
      <Navbar />
      <div>
        <GoBack />
        {!userB ? (
          <h2>...Buscando</h2>
        ) : userB.username.slice(0, 17) === "Usuario Eliminado" ? (
          <h2>Usuario Eliminado</h2>
        ) : (
          <h2>{userB.username}</h2>
        )}
      </div>
      <div>
        {!chat ? (
          <>
            <h3>Buscando</h3>
            <PropagateLoader />
          </>
        ) : (
          chat.map((each) => {
            if (each.transmitter._id === userB._id) {
              return (
                <div key={each._id}>
                  <div>
                    <img
                      src={each.transmitter.profileImage}
                      alt="user profile"
                      width="200px"
                    />
                  </div>
                  <div>
                    {each.transmitter.username.slice(0, 17) ===
                    "Usuario Eliminado" ? (
                      <h4>Usuario Eliminado</h4>
                    ) : (
                      <h4>{each.transmitter.username}</h4>
                    )}
                    <p>
                      {new Date(each.updatedAt).toLocaleDateString()}{" "}
                      {each.updatedAt.slice(11, 16)}
                    </p>
                    <p>{each.message}</p>
                  </div>
                </div>
              );
            } else {
              return (
                <div key={each._id}>
                  <div>
                    <h4>{each.transmitter.username}</h4>
                    <p>
                      {new Date(each.updatedAt).toLocaleDateString()}{" "}
                      {each.updatedAt.slice(11, 16)}
                    </p>
                    <p>{each.message}</p>
                    <EditMessages message={each} getData={getData}/>
                  </div>
                  <div>
                    <img
                      src={each.transmitter.profileImage}
                      alt="user profile"
                      width="200px"
                    />
                  </div>
                </div>
              );
            }
          })
        )}
      </div>
      <div>
        <form>
          <textarea
            name="message"
            id="message"
            cols="30"
            rows="5"
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
          ></textarea>
          <button onClick={sendMessage}>Enviar</button>
        </form>
      </div>
    </>
  );
}

export default ChatView;
