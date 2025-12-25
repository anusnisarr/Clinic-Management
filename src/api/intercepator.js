
import API from "./ApiInstance";
import { AuthStore } from "../store/AuthStore"

API.interceptors.request.use((config) => {
  const token = AuthStore.getAccessToken();
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

API.interceptors.response.use(
  (res) => res,
  (error) => {
    return Promise.reject(error);
  }
);


export default API;