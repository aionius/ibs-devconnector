import React from "react";
import { connect } from "react-redux";
import { Link, withRouter } from "react-router-dom";
import PropTypes from "prop-types";

import { addEducation } from "../../actions/profileActions";
import TextFieldGroup from "../../components/common/TextFieldGroup";
import TextAreaFieldGroup from "../../components/common/TextAreaFieldGroup";

class AddEducation extends React.Component {
   constructor(props) {
      super(props);

      this.state = {
         school: "",
         degree: "",
         fieldofstudy: "",
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

      const eduData = {
         school: this.state.school,
         degree: this.state.degree,
         fieldofstudy: this.state.fieldofstudy,
         from: this.state.from,
         to: this.state.to,
         current: this.state.current,
         description: this.state.description
      };

      this.props.addEducation(eduData, this.props.history);
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
                        Add Your Education
                     </h1>
                     <p className="lead text-center">
                        Add any school, bootcamp, etc that you have attended
                     </p>
                     <small className="d-block pb-3">* = required field</small>
                     <form onSubmit={this.onSubmit}>
                        <TextFieldGroup
                           placeholder="* School Or Bootcamp"
                           name="school"
                           type="text"
                           value={this.state.school}
                           onChange={this.onChange}
                           error={errors.school}
                        />
                        <TextFieldGroup
                           placeholder="* Degree Or Certificate"
                           name="degree"
                           type="text"
                           value={this.state.degree}
                           onChange={this.onChange}
                           error={errors.degree}
                        />
                        <TextFieldGroup
                           placeholder="* Field Of Study"
                           name="fieldofstudy"
                           type="text"
                           value={this.state.fieldofstudy}
                           onChange={this.onChange}
                           error={errors.fieldofstudy}
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
                              onChange={this.onCheck}
                              checked={this.state.current}
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
                           info="Tell us about your experience and what you learned"
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

AddEducation.propTypes = {
   addEducation: PropTypes.func.isRequired,
   profile: PropTypes.object.isRequired,
   errors: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
   profile: state.profile,
   errors: state.errors
});

export default connect(mapStateToProps, { addEducation })(
   withRouter(AddEducation)
);
