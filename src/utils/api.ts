import axios from "axios"
const  localhost = `http://localhost:4000/api`
const  server = `https://bd.minimatch.uz/api`
export const api = axios.create({
  baseURL: server,
  headers: { "Content-type": "application/json", }
});
