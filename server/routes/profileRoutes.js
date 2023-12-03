const express = require('express')
const multer = require('multer');
const router = express.Router()
const upload = multer({});

const {updateUserProfile} = require('../controllers/profileController');

router.post('/signup', upload.single('profileImage'), updateUserProfile);

module.exports = router;