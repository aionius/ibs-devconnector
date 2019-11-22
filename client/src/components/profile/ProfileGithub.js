import React from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import Axios from "axios";

class ProfileGithub extends React.Component {
   constructor(props) {
      super(props);

      this.state = {
         clientId: "9b37421a285d369e4382",
         clientSecret: "a866da42ab14285909f51851743fe0ce6aa21bf2",
         count: 5,
         sortValue: "created:asc",
         repos: []
      };
   }

   componentDidMount() {
      const { username } = this.props;
      const { count, sortValue, clientId, clientSecret } = this.state;

      fetch(
         `https://api/github.com/users/${username}/repos?per_page=${count}&sort=${sortValue}&client_id=${clientId}&client_secret=${clientSecret}`,
         { method: "", mode: "no-cors" }
      )
         .then(res => res.json())
         .then(data => {
            this.setState({ repos: data });
         })
         .catch(err => console.log(err.message));
   }

   render() {
      const { repos } = this.state;

      const repoItems = repos.map(repo => (
         <div key={repo.id} className="card card-body mb-2">
            <div className="row">
               <div className="col-md-6">
                  <h4>
                     <Link
                        to={repo.html_url}
                        className="text-info"
                        target="_blank"
                     >
                        {repo.name}
                     </Link>
                  </h4>
                  <p>{repo.description}</p>
               </div>
               <div className="col-md-6">
                  <span className="badge badge-info mr-1">
                     Stars: {repo.stargazers_count}
                  </span>
                  <span className="badge badge-secondary mr-1">
                     Watchers: {repo.watchers_count}
                  </span>
                  <span className="badge badge-success">
                     Forks: {repo.forks_count}
                  </span>
               </div>
            </div>
         </div>
      ));
      return (
         <div ref="myRef">
            <hr />
            <h3 className="mb-4">Latest Github Repos</h3>
            {repoItems}
         </div>
      );
   }
}

ProfileGithub.propTypes = {
   username: PropTypes.string.isRequired
};

export default ProfileGithub;
