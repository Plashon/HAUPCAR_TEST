import axios from "axios";
const backendUrl = import.meta.env.VITE_BACKEND_URL

const instance = axios.create({
  baseURL: backendUrl,
  headers: {
    "Content-Type": "application/json",
  },
});

export default instance;