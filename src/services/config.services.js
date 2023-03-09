import axios from "axios";

const service = axios.create({
  baseURL: "http://localhost:5005/api",
});


service.interceptors.request.use((config) => {
    
    const storedToken = localStorage.getItem("authToken");
    const tokenAndType = `Bearer ${storedToken}`;
  
    if (storedToken) {
      config.headers.authorization = tokenAndType;
    }
    return config;
  });

export default service;
