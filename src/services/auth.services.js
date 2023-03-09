import service from "./config.services";

const signupService = (newUser) => {
  return service.post("/auth/registro", newUser);
};

const loginService = (user) => {
  return service.post("/auth/acceso", user);
};

const verifyService = () => {
  return service.get("/auth/verify");
};

export { signupService, loginService, verifyService };
