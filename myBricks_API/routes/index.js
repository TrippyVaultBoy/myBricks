const express = require('express');

const usersController = require('../controllers/usersController.js');
const authController = require('../controllers/authController.js');
const collectionController = require('../controllers/collectionController.js');

const authMiddleware = require('../middleware/authMiddleware.js');

const router = express.Router();

router.post('/users', usersController.postNew);
router.get('/users/count', usersController.countUsers);

router.post('/login', authController.login);
router.get('/check', authController.checkToken);

// router.get('/collection', authMiddleware, collectionController.getCollection);
// router.get('/collection/:setNum', authMiddleware, collectionController.getCollection);
router.post('/collection/add', authMiddleware, collectionController.addSet);
router.post('/collection/remove', authMiddleware, collectionController.removeSet);

// router.get('/stats/parts', authMiddleware, statsController.getPartCount);

module.exports = router;