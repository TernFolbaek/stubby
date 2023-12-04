const express = require('express')
const router = express.Router()
const { fetchUsersForExploration } = require('../controllers/exploreController');

router.get('/users/:userId', fetchUsersForExploration);

module.exports = router;
