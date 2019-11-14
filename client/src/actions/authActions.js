import Axios from "axios";
import jwtDecode from "jwt-decode";

import { GET_ERRORS, SET_CURRENT_USER } from "./types";
import setAuthToken from "../utils/setAuthToken";

// register
export const registerUser = (userData, history) => dispatch => {
   Axios.post("/api/users/register", userData)
      .then(result => {
         history.push("/login");
      })
      .catch(error =>
         dispatch({
            type: GET_ERRORS,
            payload: error.response.data
         })
      );
};

// login - get user token
export const loginUser = userData => dispatch => {
   Axios.post("/api/users/login", userData)
      .then(res => {
         // save to localStorage
         const { token } = res.data;
         //set token to ls
         localStorage.setItem("jwtToken", token);
         // set token to Auth header
         setAuthToken(token);
         // decode token to get user data
         const decoded = jwtDecode(token);
         // set current user
         dispatch(setCurrentUser(decoded));
      })
      .catch(error =>
         dispatch({
            type: GET_ERRORS,
            payload: error.response.data
         })
      );
};

// set logged in user
export const setCurrentUser = decoded => {
   return {
      type: SET_CURRENT_USER,
      payload: decoded
   };
};
