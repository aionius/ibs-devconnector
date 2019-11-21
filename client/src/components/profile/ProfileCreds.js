import React from "react";
import dateformat from "dateformat";
import { Link } from "react-router-dom";

import isEmpty from "../../validations/is-empty";

class ProfileCreds extends React.Component {
   render() {
      const { education, experience } = this.props;

      const expList = experience.map(exp => (
         <li className="list-group-item" key={exp._id}>
            <h4>{exp.company}</h4>
            <p>
               {dateformat(new Date(exp.from), "mmmm yyyy")}{" "}
               {exp.current
                  ? "- Current"
                  : `- ${dateformat(new Date(exp.to), "mmmm yyyy")}`}
            </p>
            <p>
               <strong>Position:</strong> {exp.title}
            </p>
            {isEmpty(exp.location) ? null : (
               <p>
                  <strong>Location: </strong> {exp.location}
               </p>
            )}

            {isEmpty(exp.description) ? null : (
               <p>
                  <strong>Description:</strong> {exp.description}
               </p>
            )}
         </li>
      ));

      const eduList = education.map(edu => (
         <li className="list-group-item" key={edu._id}>
            <h4>{edu.school}</h4>
            <p>
               {dateformat(new Date(edu.from), "mmmm yyyy")}{" "}
               {edu.current
                  ? "- Now"
                  : `- ${dateformat(new Date(edu.to), "mmmm yyyy")}`}
            </p>
            <p>
               <strong>Degree: </strong>
               {edu.degree}
            </p>
            <p>
               <strong>Field Of Study: </strong>
               {edu.fieldofstudy}
            </p>

            {isEmpty(edu.description) ? null : (
               <p>
                  <strong>Description:</strong> {edu.description}
               </p>
            )}
         </li>
      ));

      return (
         <div className="row">
            <div className="col-md-6">
               <h3 className="text-center text-info">Experience</h3>
               {expList.length > 0 ? (
                  <ul className="list-group">{expList}</ul>
               ) : (
                  <div className="text-center">
                     <p>No Experience Listed</p>
                     <Link to="/add-experience" className="btn btn-info">
                        Add Experience
                     </Link>
                  </div>
               )}
            </div>

            <div className="col-md-6">
               <h3 className="text-center text-info">Education</h3>
               {eduList.length > 0 ? (
                  <ul className="list-group">{eduList}</ul>
               ) : (
                  <div className="text-center">
                     <p>No Education Listed</p>
                     <Link to="/add-education" className="btn btn-info">
                        Add Education
                     </Link>
                  </div>
               )}
            </div>
         </div>
      );
   }
}

export default ProfileCreds;
