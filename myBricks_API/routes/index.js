const express = require('express');

const UsersController = require('../controllers/UsersController.js');
const authController = require('../controllers/authController.js');

const router = express.Router();

router.post('/users', UsersController.postNew);
router.get('/users/count', UsersController.countUsers);

router.post('/login', authController.login);
router.get('/check', authController.checkToken);

module.exports = router;