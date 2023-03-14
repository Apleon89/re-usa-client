import service from "./config.services";

const getChatService = (id) => {
  return service.get(`/mensajes/${id}`);
};

const sendNewMessageService = (id, message) => {
  return service.post(`/mensajes/${id}`, message);
};

const getAllOpenChats = () => {
  return service.get("/mensajes");
};

const deleteAllMssgsOneUserService = (idUsuario) => {
  return service.delete(`/mensajes/${idUsuario}`);
};

const deleteOneMessageService = (idMensaje) => {
  return service.delete(`/mensajes/${idMensaje}`);
};

const updateOneMessageService = (idMensaje, updatedMssg) => {
  return service.patch(`/mensajes/${idMensaje}`, updatedMssg);
};

export {
  getChatService,
  sendNewMessageService,
  getAllOpenChats,
  deleteAllMssgsOneUserService,
  deleteOneMessageService,
  updateOneMessageService,
};
