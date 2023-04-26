import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Header from "../components/Header";
import Navbar from "../components/Navbar";
import {
  getChatService,
  sendNewMessageService,
} from "../services/messages.services";
import { PropagateLoader } from "react-spinners";
import EditMessages from "../components/EditMessages";
import "./ChatView.css";

function ChatView() {
  const navigate = useNavigate();
  const params = useParams();

  const [userB, setUserB] = useState(null);
  const [chat, setChat] = useState(null);
  const [newMessage, setNewMessage] = useState("");

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
      getData();
    } catch (error) {
      navigate("/error");
    }
  };

  return (
    <div className="viewchat-body">
      <Navbar />
      <Header name={!userB ? (
          '...Buscando'
        ) : userB.username.slice(0, 17) === "Usuario Eliminado" ? (
          'Usuario Eliminado'
        ) : (
          `${userB.username}`
        )} />
      
      <div className="viewChat-container">
        {!chat ? (
          <div className="loopSearch">
            <h3>Buscando</h3>
            <PropagateLoader />
          </div>
        ) : (
          chat.map((each) => {
            if (each.transmitter._id === userB._id) {
              return (
                <div key={each._id} className="userB-chat">
                  <div className="userB-text-container">
                    <div className="userB-username-div">
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
                    </div>
                    <p className="userB-message">{each.message}</p>
                  </div>
                  <div className="userB-img">
                    <img
                      src={each.transmitter.profileImage}
                      alt="user profile"
                      width="200px"
                    />
                  </div>
                </div>
              );
            } else {
              return (
                <div key={each._id} className="userA-chat">
                  <div className="userA-img">
                    <img
                      src={each.transmitter.profileImage}
                      alt="user profile"
                      width="200px"
                    />
                  </div>
                  <div className="userA-text-container">
                    <div className="userA-username-div">
                      <h4>{each.transmitter.username}</h4>
                      <p>
                        {new Date(each.updatedAt).toLocaleDateString()}{" "}
                        {each.updatedAt.slice(11, 16)}
                      </p>
                    </div>
                    <div className="userA-message-div">
                      <p>{each.message}</p>
                      <EditMessages message={each} getData={getData} />
                    </div>
                  </div>
                </div>
              );
            }
          })
        )}
      </div>
      <div className="chat-form-div">
        <form className="chat-form">
          <textarea
            name="message"
            id="message"
            cols="30"
            rows="5"
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
          ></textarea>
          <button className="btn" onClick={sendMessage}>
            Enviar
          </button>
        </form>
      </div>
    </div>
  );
}

export default ChatView;
