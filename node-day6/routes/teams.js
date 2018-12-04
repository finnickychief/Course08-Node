const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

const TeamSchema = new mongoose.Schema({
  name: { type: String, required: true, default: '' },
  division: { type: String, required: true, default: 'Unorganized' },
  hometown: { type: String, required: true },
  mascot: { type: String },
  colors: { type: Array }
});

const Team = mongoose.model('teams', TeamSchema);

router.get('/getTeams', (req, res) => {
  Team.find({}, (err, result) => {
    res.json(
      err ? { message: 'failed' } : { message: 'success', data: result }
    );
  });
});

router.post('/createTeam', (req, res) => {
  Team.create(req.body, (err, result) => {
    res.json(err ? { message: 'failed' } : { message: 'success' });
  });
});

module.exports = router;
