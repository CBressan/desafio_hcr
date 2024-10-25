import axios from "axios";

const api = axios.create({
  baseURL: "http://127.0.0.1:8000/api",
});

export const setAuthToken = (token) => {
  if (token) {
    api.defaults.headers.common["Authorization"] = `Bearer ${token}`;
  } else {
    delete api.defaults.headers.common["Authorization"];
  }
};

export const isValidJwt = (token) => {
  const parts = token.split(".");
  return parts.length === 3;
};

const token = localStorage.getItem("token");
if (token && isValidJwt(token)) {
  setAuthToken(token);
}

export default api;
