import axios from "axios"
export const getData = axios.create({
  baseURL: `http://localhost:4000/api`,
  headers: { "Content-type": "application/json", }
});
