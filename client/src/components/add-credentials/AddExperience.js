import React from "react";
import { Link, withRouter } from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from "prop-types";

import TextFieldGroup from "../common/TextFieldGroup";
import TextAreaFieldGroup from "../common/TextAreaFieldGroup";

import { addExperience } from "../../actions/profileActions";

class AddExperience extends React.Component {
   constructor(props) {
      super(props);

      this.state = {
         company: "",
         title: "",
         location: "",
         from: "",
         to: "",
         current: false,
         disabled: false,
         description: "",
         errors: {}
      };

      this.onSubmit = this.onSubmit.bind(this);
      this.onChange = this.onChange.bind(this);
      this.onCheck = this.onCheck.bind(this);
   }

   onSubmit = event => {
      event.preventDefault();
      const expData = {
         company: this.state.company,
         title: this.state.title,
         location: this.state.location,
         from: this.state.from,
         to: this.state.to,
         current: this.state.current,
         description: this.state.description
      };

      this.props.addExperience(expData, this.props.history);
   };

   onChange = event => {
      const { name, value } = event.target;
      this.setState({ [name]: value });
   };

   onCheck = event => {
      this.setState({
         current: !this.state.current,
         disabled: !this.state.disabled
      });
   };

   componentWillReceiveProps(nextProps) {
      if (nextProps.errors) {
         this.setState({ errors: nextProps.errors });
      }
   }

   render() {
      const { errors } = this.state;

      return (
         <div className="add-experience">
            <div className="container">
               <div className="row">
                  <div className="col-md-8 m-auto">
                     <Link to="/dashboard" className="btn btn-light">
                        Go Back
                     </Link>
                     <h1 className="display-4 text-center">
                        Add Your Experience
                     </h1>
                     <p className="lead text-center">
                        Add any developer/programming positions that you have
                        had in the past
                     </p>
                     <small className="d-block pb-3">* = required field</small>
                     <form onSubmit={this.onSubmit}>
                        <TextFieldGroup
                           placeholder="* Job Title"
                           name="title"
                           type="text"
                           value={this.state.title}
                           onChange={this.onChange}
                           error={errors.title}
                        />
                        <TextFieldGroup
                           placeholder="* Company"
                           name="company"
                           type="text"
                           value={this.state.company}
                           onChange={this.onChange}
                           error={errors.company}
                        />
                        <TextFieldGroup
                           placeholder="Location"
                           name="location"
                           type="text"
                           value={this.state.location}
                           onChange={this.onChange}
                           error={errors.location}
                        />

                        <h6>From Date</h6>
                        <TextFieldGroup
                           name="from"
                           type="date"
                           value={this.state.from}
                           onChange={this.onChange}
                           error={errors.from}
                        />

                        <h6>To Date</h6>
                        <TextFieldGroup
                           name="to"
                           type="date"
                           value={this.state.to}
                           onChange={this.onChange}
                           error={errors.to}
                           disabled={this.state.disabled ? "disabled" : ""}
                        />

                        <div className="form-check mb-4">
                           <input
                              className="form-check-input"
                              type="checkbox"
                              name="current"
                              value={this.state.current}
                              checked={this.state.current}
                              onChange={this.onCheck}
                              id="current"
                           />
                           <label
                              className="form-check-label"
                              htmlFor="current"
                           >
                              Current Job
                           </label>
                        </div>

                        <TextAreaFieldGroup
                           placeholder=""
                           name="description"
                           value={this.state.description}
                           onChange={this.onChange}
                           error={errors.description}
                           info="Tell us about the position"
                        />

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

AddExperience.propTypes = {
   addExperience: PropTypes.func.isRequired,
   errors: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
   errors: state.errors
});

export default connect(mapStateToProps, { addExperience })(
   withRouter(AddExperience)
);
