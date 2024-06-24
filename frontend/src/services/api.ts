import axios from "axios";
import toast from "react-hot-toast";

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL ?? "http://localhost:3000",
  withCredentials: true,
});

api.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error) => {
    if (error.response?.data === "Session expired.") {
      const response = await api.post("/users/refresh");
      api.defaults.headers.common.Authorization = `Bearer ${response.data.accessToken}`;
      error.config.headers.Authorization = `Bearer ${response.data.accessToken}`;
      return api.request(error.config);
    }

    if (error.response?.data === "Authentication expired.") {
      return toast.error(
        "Sua sessão expirou. Por favor, faça o login novamente."
      );
    }

    return Promise.reject(error);
  }
);

export default api;
