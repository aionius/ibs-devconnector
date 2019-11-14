import React from "react";
import Classnames from "classnames";
import Axios from "axios";

class Login extends React.Component {
   constructor() {
      super();

      this.state = {
         email: "",
         password: "",
         errors: {}
      };

      this.onChange = this.onChange.bind(this);
      this.onSubmit = this.onSubmit.bind(this);
   }

   onChange(event) {
      const { name, value } = event.target;
      this.setState({ [name]: value });
   }

   onSubmit(event) {
      event.preventDefault();
      const user = {
         email: this.state.email,
         password: this.state.password
      };
      Axios.post("/api/users/login", user)
         .then(result => {
            console.log(result.data);
         })
         .catch(error => this.setState({ errors: error.response.data }));
   }

   render() {
      const { errors } = this.state;

      return (
         <div className="login">
            <div className="container">
               <div className="row">
                  <div className="col-md-8 m-auto">
                     <h2 className="display-4 text-center">Log In</h2>
                     <p className="lead text-center">
                        Sign in to your DevConnector account
                     </p>
                     <form noValidate onSubmit={this.onSubmit}>
                        <div className="form-group">
                           <input
                              type="email"
                              className={Classnames(
                                 "form-control form-control-lg",
                                 {
                                    "is-invalid": errors.email
                                 }
                              )}
                              placeholder="Email Address"
                              name="email"
                              value={this.state.email}
                              onChange={this.onChange}
                           />
                           {errors.email && (
                              <div className="invalid-feedback">
                                 {errors.email}
                              </div>
                           )}
                        </div>
                        <div className="form-group">
                           <input
                              type="password"
                              className={Classnames(
                                 "form-control form-control-lg",
                                 {
                                    "is-invalid": errors.password
                                 }
                              )}
                              placeholder="Password"
                              name="password"
                              value={this.state.password}
                              onChange={this.onChange}
                           />
                           {errors.password && (
                              <div className="invalid-feedback">
                                 {errors.password}
                              </div>
                           )}
                        </div>
                        <input
                           type="submit"
                           className="btn btn-info btn-block mt-4"
                        />
                     </form>
                  </div>
               </div>
            </div>
         </div>
      );
   }
}

export default Login;
