const express = require('express')
const router = express.Router()
const {userSignUp, userLogIn} = require('../controllers/userController');

router.post('/login', userLogIn);
router.post('/signup', userSignUp);
module.exports = router;
