const express = require('express')
const router = express.Router()
const {userSignUp, userLogIn} = require('../controllers/logSignController');

router.post('/login', userLogIn);
router.post('/signup', userSignUp);
module.exports = router;
