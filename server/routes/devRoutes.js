const express = require('express')
const router = express.Router()
const { createUsers, deleteUsers } = require('../controllers/devController');

router.post('/create-users', createUsers);
router.post('/delete-users', deleteUsers);


module.exports = router;
