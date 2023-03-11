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

export { getProfileService, getUserAdsService, updateUserProfileService };
