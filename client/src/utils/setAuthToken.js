import Axios from "axios";

const setAuthToken = token => {
   if (token) {
      // appliy to every request
      Axios.defaults.headers.common["Authorization"] = token;
   } else {
      // delete auth header
      delete Axios.defaults.headers.common["Authorization"];
   }
};

export default setAuthToken;
