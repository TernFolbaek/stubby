const express = require('express')
const router = express.Router()

const {postMessage, fetchMessages} = require('../controllers/messageController');

router.post('/send', postMessage); 
router.get('/retrieve/:userId1/:userId2', fetchMessages);


module.exports = router;