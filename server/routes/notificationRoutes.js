const express = require('express')
const router = express.Router()
const { exploreTrue, getUnexploredMatches } = require('../controllers/notificationController');

router.post('/explore/:selectedId', exploreTrue);
router.get('/unexplored/:userId', getUnexploredMatches);


module.exports = router;
