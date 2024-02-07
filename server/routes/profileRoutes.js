const express = require('express')
const multer = require('multer');
const router = express.Router()
const upload = multer({});

const {updateUserProfile, fetchUserInfo, likeUser, deleteUser} = require('../controllers/profileController');

router.post('/signup', upload.single('profileImage'), updateUserProfile);
router.post('/like',  likeUser);
router.get('/:userId', fetchUserInfo); 
router.post('/delete', deleteUser); 


module.exports = router;