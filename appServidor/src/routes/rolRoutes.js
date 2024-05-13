const express = require('express');
const router = express.Router();
const { getAllRols} = require('../controllers/rolController.js');

router.get('/', getAllRols);

module.exports = router;