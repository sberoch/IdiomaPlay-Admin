import axios from "axios";

const api = axios.create({
  baseURL: "https://tp-tdp2.herokuapp.com/",
});

export default api;
