// File to hold all user-defined middleware that goes directly onto the app
const { attachLocals } = require('./utilities');

module.exports = app => {
  app.use(attachLocals);
};
