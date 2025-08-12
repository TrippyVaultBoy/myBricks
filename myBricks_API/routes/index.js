const express = require('express');

const UsersController = require('../controllers/UsersController.js');

const router = express.Router();

router.post('/users', UsersController.postNew);
router.get('/users/count', UsersController.countUsers);

module.exports = router;