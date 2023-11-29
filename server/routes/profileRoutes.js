const express = require('express')
const router = express.Router()
const {updateUserProfile} = require('../controllers/profileController');

router.post('/signup', updateUserProfile);

module.exports = router;