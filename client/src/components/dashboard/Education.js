import React from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { deleteEducation } from "../../actions/profileActions";
import dateformat from "dateformat";

class Education extends React.Component {
   onDeleteClick = eduId => {
      this.props.deleteEducation(eduId);
   };

   render() {
      const education = this.props.education.map(edu => (
         <tr key={edu._id}>
            <td>{edu.school}</td>
            <td>{edu.degree}</td>
            <td>
               {dateformat(new Date(edu.from), "yyyy/mm/dd")}-
               {edu.current
                  ? "Now"
                  : dateformat(new Date(edu.to), "yyyy/mm/dd")}
            </td>
            <td>
               <button
                  onClick={this.onDeleteClick.bind(this, edu._id)}
                  className="btn btn-danger"
               >
                  Delete
               </button>
            </td>
         </tr>
      ));

      return (
         <div>
            <h4 className="mb-4">Education Credentials</h4>
            <table className="table">
               <thead>
                  <tr>
                     <th>School</th>
                     <th>Degree</th>
                     <th>Years</th>
                     <th></th>
                  </tr>
               </thead>
               <tbody>{education}</tbody>
            </table>
         </div>
      );
   }
}

Education.propTypes = {
   deleteEducation: PropTypes.func.isRequired
};

export default connect(null, { deleteEducation })(Education);
