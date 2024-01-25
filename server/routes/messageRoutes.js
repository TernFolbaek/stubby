const express = require('express')
const router = express.Router()

const {postMessage, fetchMessages, getMessagePreviews} = require('../controllers/messageController');

router.post('/send', postMessage); 
router.get('/retrieve/:userId1/:userId2', fetchMessages);
router.get('/preview/:userId', getMessagePreviews); 



module.exports = router;