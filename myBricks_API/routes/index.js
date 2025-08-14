const express = require('express');

const UsersController = require('../controllers/UsersController.js');
const authController = require('../controllers/authController.js');
const collectionController = require('../controllers/collectionController.js');

const authMiddleware = require('../middleware/authMiddleware.js');

const router = express.Router();

router.post('/users', UsersController.postNew);
router.get('/users/count', UsersController.countUsers);

router.post('/login', authController.login);
router.get('/check', authController.checkToken);

router.post('/collection/add', authMiddleware, collectionController.addSet);
router.post('/collection/remove', authMiddleware, collectionController.removeSet);

module.exports = router;