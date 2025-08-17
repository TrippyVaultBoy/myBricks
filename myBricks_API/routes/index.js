const express = require('express');

const usersController = require('../controllers/usersController.js');
const authController = require('../controllers/authController.js');
const collectionController = require('../controllers/collectionController.js');
const statsController = require('../controllers/statsController.js');

const authMiddleware = require('../middleware/authMiddleware.js');

const router = express.Router();

router.get('/error', (req, res, next) => {
    throw new Error('test error.');
});

router.post('/user', usersController.postNew);

router.post('/login', authController.login);

router.get('/collection', authMiddleware, collectionController.getCollection);
router.get('/collection/:setNum', authMiddleware, collectionController.getSet);
router.post('/collection', authMiddleware, collectionController.addSet);
router.patch('/collection/:setNum', authMiddleware, collectionController.updateSet);
router.delete('/collection/:setNum', authMiddleware, collectionController.removeSet);

router.get('/stats/parts', authMiddleware, statsController.getPartCount);

module.exports = router;