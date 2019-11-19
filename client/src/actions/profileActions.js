import Axios from "axios";

import {
   GET_PROFILE,
   PROFILE_LOADING,
   CLEAR_CURRENT_PROFILE,
   GET_ERRORS
} from "./types";

// get current profile
export const getCurrentProfile = () => dispatch => {
   dispatch(setProfileLoading());

   Axios.get("/api/profile")
      .then(result =>
         dispatch({
            type: GET_PROFILE,
            payload: result.data
         })
      )
      .catch(error =>
         dispatch({
            type: GET_PROFILE,
            payload: {}
         })
      );
};

// profile loading
export const setProfileLoading = () => {
   return {
      type: PROFILE_LOADING
   };
};

// clear profile
export const clearCurrentProfile = () => {
   return {
      type: CLEAR_CURRENT_PROFILE
   };
};

// create profile
export const createProfile = (profileData, history) => dispatch => {
   Axios.post("/api/profile", profileData)
      .then(result => history.push("/dashboard"))
      .catch(error =>
         dispatch({ type: GET_ERRORS, payload: error.response.data })
      );
};
