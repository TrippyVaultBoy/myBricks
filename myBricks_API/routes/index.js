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

/**
 * @swagger
 * openapi: 3.0.0
 * info:
 *   title: MyBricks API
 *   version: 1.0.0
 * servers:
 *   - url: http://localhost:4000
 * /user:
 *   post:
 *     tags:
 *       - default
 *     summary: Register a new user
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             example:
 *               email: user@example.com
 *               username: user123
 *               password: mypassword
 *     responses:
 *       '201':
 *         description: Created
 *         headers:
 *           Content-Type:
 *             schema:
 *               type: string
 *               example: application/json; charset=utf-8
 *           Content-Length:
 *             schema:
 *               type: integer
 *               example: 106
 *         content:
 *           text/plain:
 *             schema:
 *               type: string
 *             example: |
 *               {
 *                   "message": "User user123 successfully created",
 *                   "id": "68a2c7e07971b1d2f0126ab9",
 *                   "email": "user@example.com"
 *               }
 *       '400':
 *         description: Bad Request
 *         headers:
 *           Content-Type:
 *             schema:
 *               type: string
 *               example: application/json; charset=utf-8
 *           Content-Length:
 *             schema:
 *               type: integer
 *               example: 31
 *         content:
 *           text/plain:
 *             schema:
 *               type: string
 *             examples:
 *               example-0:
 *                 summary: User already exists
 *                 value: |
 *                   {
 *                       "error": "User already exists"
 *                   }
 *               example-1:
 *                 summary: Missing email
 *                 value: |
 *                   {
 *                       "error": "Missing email"
 *                   }
 *               example-2:
 *                 summary: Missing username
 *                 value: |
 *                   {
 *                       "error": "Missing username"
 *                   }
 *               example-3:
 *                 summary: Missing password
 *                 value: |
 *                   {
 *                       "error": "Missing password"
 *                   }
 */
router.post('/user', usersController.postNew);

router.post('/login', authController.login);

router.get('/collection', authMiddleware, collectionController.getCollection);
router.get('/collection/:setNum', authMiddleware, collectionController.getSet);
router.post('/collection', authMiddleware, collectionController.addSet);
router.patch('/collection/:setNum', authMiddleware, collectionController.updateSet);
router.delete('/collection/:setNum', authMiddleware, collectionController.removeSet);

router.get('/stats/parts', authMiddleware, statsController.getPartCount);

module.exports = router;