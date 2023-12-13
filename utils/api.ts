import axios from "axios"
export const getData = axios.create({
  baseURL: `http://94.228.112.211:4000/api`,
  headers: { "Content-type": "application/json", }
});
