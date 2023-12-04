const express = require('express')
const multer = require('multer');
const router = express.Router()
const upload = multer({});

const {updateUserProfile, fetchUserInfo} = require('../controllers/profileController');

router.post('/signup', upload.single('profileImage'), updateUserProfile);
router.post('/like',  updateUserProfile);
router.get('/:userId', fetchUserInfo); 

module.exports = router;