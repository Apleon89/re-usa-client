import axios from "axios";

const service = axios.create({
  baseURL: process.env.REACT_APP_SERVER_URL,
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
