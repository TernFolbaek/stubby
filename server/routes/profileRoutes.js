const express = require('express')
const multer = require('multer');
const router = express.Router()
const upload = multer({});

const {updateUserProfile, fetchUserInfo, likeUser} = require('../controllers/profileController');

router.post('/signup', upload.single('profileImage'), updateUserProfile);
router.post('/like',  likeUser);
router.get('/:userId', fetchUserInfo); 

module.exports = router;