import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  deleteOneMessageService,
  updateOneMessageService,
} from "../services/messages.services";
import "./EditMessages.css";

function EditMessages(props) {
  const navigate = useNavigate();
  const [showEdit, setShowEdit] = useState(false);
  const [editInput, setEditInput] = useState(props.message.message);

  const editMessage = async (e) => {
    e.preventDefault();
    const updatedMssg = {
      message: editInput,
    };
    try {
      await updateOneMessageService(props.message._id, updatedMssg);
      setShowEdit(!showEdit);
      props.getData();
    } catch (error) {
      navigate("/error");
    }
  };

  const deleteMessage = async (e) => {
    e.preventDefault();
    try {
      await deleteOneMessageService(props.message._id);
      props.getData();
    } catch (error) {
      navigate("/error");
    }
  };

  return (
    <div className="edit-mssgs-div">
      <button className="btn-editmsgs" onClick={() => setShowEdit(!showEdit)}>
        Editar
      </button>
      {showEdit && (
        <div className="editMessage-div">
          <form>
            <textarea
              type=""
              value={editInput}
              onChange={(e) => setEditInput(e.target.value)}
            />
            <button className="btn-editmsgs" onClick={editMessage}>
              Editar
            </button>
            <button className="btn-editmsgs" onClick={deleteMessage}>
              Borrar
            </button>
          </form>
        </div>
      )}
    </div>
  );
}

export default EditMessages;
