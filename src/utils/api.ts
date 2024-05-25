import axios from "axios"
export const  SERVER = `https://app.minimatch.uz/`||`http://192.168.50.196:4000/`
export const api = axios.create({
  baseURL: SERVER +"api/",
  headers: { "Content-type": "application/json", }
});
