import axios from "axios";

const apiBack = axios.create({
  baseURL: `http://${process.env.REACT_APP_BACKEND_URL}:${process.env.REACT_APP_BACKEND_PORT}/`,
  headers: {
    "Content-Type": "application/json",
  },
});

export default apiBack;
