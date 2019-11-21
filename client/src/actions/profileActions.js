import Axios from "axios";

import {
   GET_PROFILE,
   PROFILE_LOADING,
   CLEAR_CURRENT_PROFILE,
   GET_ERRORS,
   SET_CURRENT_USER,
   GET_PROFILES
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

// get profile by handle
export const getProfileByHandle = handle => dispatch => {
   dispatch(setProfileLoading());

   Axios.get(`/api/profile/handle/${handle}`)
      .then(result => dispatch({ type: GET_PROFILE, payload: result.data }))
      .catch(error => dispatch({ type: GET_PROFILE, payload: null }));
};

// delete account and profile
export const deleteAccount = () => dispatch => {
   if (window.confirm("Are you sure? THis can NOT be undone!")) {
      Axios.delete("/api/profile")
         .then(res => dispatch({ type: SET_CURRENT_USER, payload: {} }))
         .catch(error =>
            dispatch({
               type: GET_ERRORS,
               payload: error.response.data
            })
         );
   }
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
      .catch(error => {
         dispatch({ type: GET_ERRORS, payload: error.response.data });
      });
};

// add experience
export const addExperience = (expData, history) => dispatch => {
   Axios.post("/api/profile/experience", expData)
      .then(result => history.push("/dashboard"))
      .catch(error => {
         dispatch({ type: GET_ERRORS, payload: error.response.data });
      });
};

// delete experience
export const deleteExperience = expId => dispatch => {
   Axios.delete(`/api/profile/experience/${expId}`)
      .then(result =>
         dispatch({
            type: GET_PROFILE,
            payload: result.data
         })
      )
      .catch(error =>
         dispatch({ type: GET_ERRORS, payload: error.response.data })
      );
};

// add education
export const addEducation = (eduData, history) => dispatch => {
   Axios.post("/api/profile/education", eduData)
      .then(result => history.push("/dashboard"))
      .catch(error => {
         dispatch({ type: GET_ERRORS, payload: error.response.data });
      });
};

// delete education
export const deleteEducation = eduId => dispatch => {
   Axios.delete(`/api/profile/education/${eduId}`)
      .then(result =>
         dispatch({
            type: GET_PROFILE,
            payload: result.data
         })
      )
      .catch(error =>
         dispatch({ type: GET_ERRORS, payload: error.response.data })
      );
};

// get all profiles
export const getProfiles = () => dispatch => {
   dispatch(setProfileLoading());

   Axios.get("/api/profile/all")
      .then(result => dispatch({ type: GET_PROFILES, payload: result.data }))
      .catch(error => dispatch({ type: GET_PROFILES, payload: null }));
};
