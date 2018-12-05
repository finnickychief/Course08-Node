const express = require('express');
const router = express.Router();
const TeamController = require('../controllers/TeamController');

router.get('/getTeams', (req, res) => {
  TeamController.getTeams()
    .then(teams => {
      res.json({
        message: 'Successfully found results.',
        data: teams
      });
    })
    .catch(err => {
      res.status(400).json({
        message: 'Failure to find teams',
        error: err
      });
    });
});

router.post('/createTeam', (req, res) => {
  TeamController.createTeam(req.body)
    .then(result => {
      res.json({
        message: 'Succesfully added team!',
        data: result
      });
    })
    .catch(err => {
      res.status(400).json({
        message: 'Could not create team! Check error',
        error: err
      });
    });
});

module.exports = router;
