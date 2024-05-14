const express = require('express');
const router = express.Router();
const { authenticateUser } = require('../controllers/userController.js');
//const { authenticateUser, getAllBienes ,addBienes , editBienes} = require('../controllers/bienesMController.js');
router.post('/:auth', authenticateUser);

module.exports = router;

