import React from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import PropTypes from "prop-types";

import TextFieldGroup from "../common/TextFieldGroup";
import TextAreaFieldGroup from "../common/TextAreaFieldGroup";
import SelectListGroup from "../common/SelectListGroup";
import InputGroup from "../common/InputGroup";

import { createProfile } from "../../actions/profileActions";

class CreateProfile extends React.Component {
   constructor(props) {
      super(props);

      this.state = {
         displaySocialInputs: false,
         handle: "",
         company: "",
         website: "",
         location: "",
         status: "",
         skills: "",
         githubusername: "",
         bio: "",
         twitter: "",
         facebook: "",
         linkedin: "",
         youtube: "",
         instagram: "",
         errors: {}
      };

      this.onChange = this.onChange.bind(this);
      this.onSubmit = this.onSubmit.bind(this);
   }

   onChange = event => {
      const { name, value } = event.target;
      this.setState({ [name]: value });
   };

   componentWillReceiveProps(nextProps) {
      if (nextProps.errors) {
         this.setState({ errors: nextProps.errors });
      }
   }

   onSubmit = event => {
      event.preventDefault();

      const profileData = {
         handle: this.state.handle,
         company: this.state.company,
         website: this.state.website,
         location: this.state.location,
         status: this.state.status,
         skills: this.state.skills,
         githubusername: this.state.githubusername,
         bio: this.state.bio,
         twitter: this.state.twitter,
         facebook: this.state.facebook,
         linkedin: this.state.linkedin,
         youtube: this.state.youtube,
         instagram: this.state.instagram
      };

      this.props.createProfile(profileData, this.props.history);
   };

   render() {
      const { errors, displaySocialInputs } = this.state;

      let socialInputs;
      if (displaySocialInputs) {
         socialInputs = (
            <div className="input-group mb-3">
               <InputGroup
                  placeholder="Twitter Profile URL"
                  name="twitter"
                  value={this.state.twitter}
                  onChange={this.onChange}
                  error={errors.twitter}
                  icon="fab fa-twitter"
               />

               <InputGroup
                  placeholder="Facebook Page URL"
                  name="facebook"
                  value={this.state.facebook}
                  onChange={this.onChange}
                  error={errors.facebook}
                  icon="fab fa-facebook"
               />

               <InputGroup
                  placeholder="Linkedin Profile URL"
                  name="linkedin"
                  value={this.state.linkedin}
                  onChange={this.onChange}
                  error={errors.linkedin}
                  icon="fab fa-linkedin"
               />

               <InputGroup
                  placeholder="YouTube Channel URL"
                  name="youtube"
                  value={this.state.youtube}
                  onChange={this.onChange}
                  error={errors.youtube}
                  icon="fab fa-youtube"
               />

               <InputGroup
                  placeholder="Instagram Page URL"
                  name="instagram"
                  value={this.state.instagram}
                  onChange={this.onChange}
                  error={errors.instagram}
                  icon="fab fa-instagram"
               />
            </div>
         );
      }

      // select options for state
      const options = [
         { label: "* Select Professional Status", value: 0 },
         { label: "Developer", value: "Developer" },
         { label: "Junior Developer", value: "Junior Developer" },
         { label: "Senior Developer", value: "Senior Developer" },
         { label: "Manager", value: "Manager" },
         { label: "Student or Learning", value: "Student or Learning" },
         { label: "Instructor or Teacher", value: "Instructor or Teacher" },
         { label: "Intern", value: "Intern" },
         { label: "Other", value: "Other" }
      ];
      return (
         <div className="create-profile">
            <div className="container">
               <div className="row">
                  <div className="col-md-8 m-auto">
                     <a href="dashboard.html" className="btn btn-light">
                        Go Back
                     </a>
                     <h1 className="display-4 text-center">
                        Create Your Profile
                     </h1>
                     <p className="lead text-center">
                        Let's get some information to make your profile stand
                        out
                     </p>
                     <small className="d-block pb-3">* = required field</small>
                     <form onSubmit={this.onSubmit}>
                        <div className="form-group">
                           <TextFieldGroup
                              placeholder="* Profile handle"
                              name="handle"
                              type="text"
                              value={this.state.handle}
                              onChange={this.onChange}
                              error={errors.handle}
                              info="A unique handle for your profile URL. Your full
                              name, company name, nickname, etc (This CAN'T be
                              changed later)"
                           />
                        </div>
                        <div className="form-group">
                           <SelectListGroup
                              name="status"
                              value={this.state.status}
                              onChange={this.onChange}
                              options={options}
                              error={errors.status}
                              info="Give us an idea of where you are at in your career"
                           />
                        </div>
                        <div className="form-group">
                           <TextFieldGroup
                              placeholder="Company"
                              name="company"
                              type="text"
                              value={this.state.company}
                              onChange={this.onChange}
                              error={errors.company}
                              info="Could be your own company or one you work for"
                           />
                        </div>
                        <div className="form-group">
                           <TextFieldGroup
                              placeholder="Website"
                              name="website"
                              type="text"
                              value={this.state.website}
                              onChange={this.onChange}
                              error={errors.website}
                              info="Could be your own or a company website"
                           />
                        </div>
                        <div className="form-group">
                           <TextFieldGroup
                              placeholder="Location"
                              name="location"
                              type="text"
                              value={this.state.location}
                              onChange={this.onChange}
                              error={errors.location}
                              info="City & state suggested (eg. Boston, MA)"
                           />
                        </div>
                        <div className="form-group">
                           <TextFieldGroup
                              placeholder="Skills"
                              name="skills"
                              type="text"
                              value={this.state.skills}
                              onChange={this.onChange}
                              error={errors.skills}
                              info="Please use comma separated values (eg.
                                HTML,CSS,JavaScript,PHP)"
                           />
                        </div>
                        <div className="form-group">
                           <TextFieldGroup
                              placeholder="Github Username"
                              name="githubusername"
                              type="text"
                              value={this.state.githubusername}
                              onChange={this.onChange}
                              error={errors.githubusername}
                              info="If you want your latest repos and a Github link,
                              include your username"
                           />
                        </div>
                        <div className="form-group">
                           <TextAreaFieldGroup
                              placeholder="A short bio of yourself"
                              name="bio"
                              value={this.state.bio}
                              onChange={this.onChange}
                              error={errors.bio}
                              info="Tell us a little about yourself"
                           />
                        </div>

                        <div className="mb-3">
                           <button
                              type="button"
                              onClick={() => {
                                 this.setState(prevState => ({
                                    displaySocialInputs: !prevState.displaySocialInputs
                                 }));
                              }}
                              className="btn btn-light"
                           >
                              Add Social Network Links
                           </button>
                           <span className="text-muted"> Optional</span>
                        </div>
                        {socialInputs}
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

CreateProfile.propTypes = {
   profile: PropTypes.object.isRequired,
   errors: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
   profile: state.profile,
   errors: state.errors
});

export default connect(mapStateToProps, { createProfile })(
   withRouter(CreateProfile)
);
