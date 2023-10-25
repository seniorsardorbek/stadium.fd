import axios from "axios"
export const getData = axios.create({
  baseURL: `http://192.168.100.22:4000/api`,
  headers: { "Content-type": "application/json", }
});
