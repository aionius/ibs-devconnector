import React from "react";
import PropTypes from "prop-types";

import isEmpty from "../../validations/is-empty";

class ProfileAbout extends React.Component {
   render() {
      const { profile } = this.props;

      const firstname = profile.user.name.trim().split(" ")[0];

      const skillSet = profile.skills.map((skill, index) => (
         <div className="p-3" key={index}>
            <i className="fa fa-check"></i> {skill}
         </div>
      ));

      return (
         <div className="row">
            <div className="col-md-12">
               <div className="card card-body bg-light mb-3">
                  <h3 className="text-center text-info">{firstname}'s Bio</h3>
                  <p className="lead">
                     {isEmpty(profile.bio)
                        ? `${firstname} doesn't have a bio`
                        : profile.bio}
                  </p>
                  <hr />
                  <h3 className="text-center text-info">Skill Set</h3>
                  <div className="row">
                     <div className="d-flex flex-wrap justify-content-center align-items-center">
                        {skillSet}
                     </div>
                  </div>
               </div>
            </div>
         </div>
      );
   }
}

ProfileAbout.propTypes = {
   profile: PropTypes.object.isRequired
};

export default ProfileAbout;
