const express = require('express');
const router = express.Router();
const { authenticateUser, addUser, getAllUsers } = require('../controllers/userController.js');

router.get('/', getAllUsers);
router.post('/:auth', authenticateUser);
router.post('/', addUser);

module.exports = router;