import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { deleteOneMessageService, updateOneMessageService } from "../services/messages.services";

function EditMessages(props) {
  const navigate = useNavigate()
  const [showEdit, setShowEdit] = useState(false);
  const [editInput, setEditInput] = useState(props.message.message);

  const editMessage = async (e) => {
    e.preventDefault()
    const updatedMssg = {
      message: editInput
    }
    try {
      await updateOneMessageService(props.message._id, updatedMssg)
      setShowEdit(!showEdit)
      props.getData()
    } catch (error) {
      navigate('/error')
    }
  }

  const deleteMessage = async (idMensaje) => {
    try {
      await deleteOneMessageService(idMensaje)
      props.getData()
    } catch (error) {
      navigate('/error')
    }
  }

  return (
    <div>
      <button onClick={() => setShowEdit(!showEdit)}>Editar</button>
      {showEdit && (
        <div>
          <form>
            <input
              type="text"
              value={editInput}
              onChange={(e) => setEditInput(e.target.value)}
            />
            <button onClick={editMessage}>Editar</button>
          </form>
          <button onClick={() => deleteMessage(props.message._id)}>Borrar</button>
        </div>
      )}
    </div>
  );
}

export default EditMessages;
