import service from "./config.services";

const allAdsService = () => {
  return service.get("/anuncios");
};

const adDetailsService = (id) => {
  return service.get(`/anuncios/${id}`);
};

const newAdService = (newAd) => {
  return service.post("/anuncios/anadir", newAd);
};

const deleteAdService = (id) => {
  return service.delete(`/anuncios/${id}/eliminar`);
};

const editAdService = (id, updatedAd) => {
  return service.patch(`/anuncios/${id}/editar`, updatedAd);
};

const addRemoveFavService = (id, updateFav) => {
  return service.patch(`/anuncios/${id}/favorito`, updateFav)
}

export {
  allAdsService,
  adDetailsService,
  newAdService,
  deleteAdService,
  editAdService,
  addRemoveFavService
};
