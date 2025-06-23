import axios from "axios";

const instance = axios.create({
  baseURL: "https://recipai.o-r.kr",
  headers: {
    "Content-Type": "application/json",
  },
  timeout: 10000,
});

export default instance;
