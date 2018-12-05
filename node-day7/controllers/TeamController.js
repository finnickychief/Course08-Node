// Import the model to make it available for use
const Team = require('../models/Team');

// Export an object to act as the container for all of our functionality
module.exports = {
  createTeam: teamObject => {
    return new Promise((resolve, reject) => {
      Team.create(teamObject, (err, result) => {
        err ? reject(err) : resolve(result);
      });
    });
  },

  getTeams: () => {
    // Return a promise so we can use .then and .catch in the route
    return new Promise((resolve, reject) => {
      // Use the model to search for all teams
      Team.find({}, (err, result) => {
        if (err) {
          // Send an error back to the route/caller
          reject(err);
        } else {
          // Send the result of the search back if it was succesful
          resolve(result);
        }
      });
    });
  }
};
