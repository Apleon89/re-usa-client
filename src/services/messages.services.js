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

export { getChatService, sendNewMessageService, getAllOpenChats };
