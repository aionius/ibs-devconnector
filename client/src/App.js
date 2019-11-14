import React from "react";
import { BrowserRouter, Route } from "react-router-dom";
import { Provider } from "react-redux";
import jwtDecode from "jwt-decode";

import Navbar from "./components/layout/Navbar";
import Footer from "./components/layout/Footer";
import Landing from "./components/layout/Landing";
import Register from "./components/auth/Register";
import Login from "./components/auth/Login";

import setAuthToken from "./utils/setAuthToken";
import { setCurrentUser } from "./actions/authActions";

import store from "./store";

import "./App.css";

// check for token
if (localStorage.jwtToken) {
   // set auth token header
   setAuthToken(localStorage.jwtToken);
   // decode token and get user info and expiration
   const decoded = jwtDecode(localStorage.jwtToken);
   // set user and isAuthenticated
   store.dispatch(setCurrentUser(decoded));
}

class App extends React.Component {
   render() {
      return (
         <Provider store={store}>
            <BrowserRouter>
               <div className="App">
                  <Navbar />
                  <Route exact path="/" component={Landing} />
                  <div className="container">
                     <Route exact path="/register" component={Register} />
                     <Route exact path="/login" component={Login} />
                  </div>
                  <Footer />
               </div>
            </BrowserRouter>
         </Provider>
      );
   }
}

export default App;
