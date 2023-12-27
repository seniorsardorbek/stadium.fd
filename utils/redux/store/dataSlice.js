import { createSlice } from "@reduxjs/toolkit";
import Cookies from 'js-cookie';
export const isLocalStorageAvailable = () => {
  try {
    const testKey = "__test__";
    localStorage.setItem(testKey, testKey);
    localStorage.removeItem(testKey);
    return true;
  } catch (error) {
    return false;
  }
};
const isSessionStorageAvailable = () => {
  try {
    const testKey = "__test__";
    localStorage.setItem(testKey, testKey);
    localStorage.removeItem(testKey);
    return true;
  } catch (error) {
    return false;
  }
};

const initialState = {
  token:  Cookies.get('passport')  || false,
  likemassiv: isLocalStorageAvailable()
    ? JSON.parse(localStorage.getItem("likesmassiv")) || []
    : [],
  userdata : isLocalStorageAvailable()
    ? JSON.parse(localStorage.getItem("userdata"))
    : false,
  UserLoc:  false,
  search: "",
};

const dataSlice = createSlice({
  name: "data",
  initialState,
  reducers: {
    setUserData(state, action) {
      localStorage.setItem("userdata", JSON.stringify(action.payload.data));
      state.userdata = action.payload.data;
    },
    setUserLoc(state, action) {
      state.UserLoc = action.payload;
    },
    setToken(state, action) {
      const expirationTime = 7 * 24 * 60 * 60 * 1000;
      const expirationDate = new Date(Date.now() + expirationTime);

      document.cookie = `passport=${
        action.payload.token
      }; expires=${expirationDate.toUTCString()}; path=/`;
      state.token = action.payload.token;
    },
  },
});

export const { setUserData, setToken, setUserLoc } = dataSlice.actions;
export default dataSlice.reducer;
