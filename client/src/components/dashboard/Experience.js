import React from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { withRouter } from "react-router-dom";
import dateformat from "dateformat";

import { deleteExperience } from "../../actions/profileActions";

class Experience extends React.Component {
   onDeleteClick = id => {
      this.props.deleteExperience(id);
   };

   render() {
      const experience = this.props.experience.map(exp => (
         <tr key={exp._id}>
            <td>{exp.company}</td>
            <td>{exp.title}</td>
            <td>
               {dateformat(new Date(exp.from), "yyyy/mm/dd")}-
               {exp.current
                  ? "Now"
                  : dateformat(new Date(exp.to), "yyyy/mm/dd")}
            </td>
            <td>
               <button
                  onClick={this.onDeleteClick.bind(this, exp._id)}
                  className="btn btn-danger"
               >
                  Delete
               </button>
            </td>
         </tr>
      ));
      return (
         <div>
            <h4 className="mb-4">Experience Credentials</h4>
            <table className="table">
               <thead>
                  <tr>
                     <th>Company</th>
                     <th>Title</th>
                     <th>Years</th>
                     <th></th>
                  </tr>
               </thead>
               <tbody>{experience}</tbody>
            </table>
         </div>
      );
   }
}

Experience.propTypes = {
   deleteExperience: PropTypes.func.isRequired
};

export default connect(null, { deleteExperience })(withRouter(Experience));
