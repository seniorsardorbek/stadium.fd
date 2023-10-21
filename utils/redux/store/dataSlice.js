import { createSlice } from "@reduxjs/toolkit";

const isLocalStorageAvailable = () => {
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
  token: isLocalStorageAvailable()
    ? localStorage.getItem("token") 
    : false,
  likemassiv: isLocalStorageAvailable()
    ? JSON.parse(localStorage.getItem("likesmassiv")) || []
    : [],
  userdata: isSessionStorageAvailable() ? JSON.parse(sessionStorage.getItem('userdata')) :  false,
  search: "",
};

const dataSlice = createSlice({
  name: "data",
  initialState,
  reducers: {
    setUserData(state, action) {
      sessionStorage.setItem("userdata" , JSON.stringify(action.payload.data))

      state.userdata = action.payload.data;
    },
    setToken(state, action) {
      isLocalStorageAvailable() &&  localStorage.setItem('token' , action.payload.token)  
      state.token = action.payload.token;
    },
     
  }
});

export const { setUserData ,setToken } = dataSlice.actions;
export default dataSlice.reducer;
