import service from "./config.services";

const getProfileService = (id) => {
  return service.get(`/perfil/${id}`);
};

const getUserAdsService = (id) => {
  return service.get(`/perfil/${id}/misAnuncios`);
};

const updateUserProfileService = (id, updatedProfile) => {
  return service.patch(`/perfil/${id}/editar`, updatedProfile);
};

const deleteUserService = (id) => {
  return service.patch(`/perfil/${id}/delete`);
};

export {
  getProfileService,
  getUserAdsService,
  updateUserProfileService,
  deleteUserService,
};
