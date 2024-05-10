const express = require('express');
const router = express.Router();
const { authenticateUser } = require('../controllers/userController.js');

router.post('/:auth', authenticateUser);

module.exports = router;