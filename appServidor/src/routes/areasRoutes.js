const express = require('express');
const router = express.Router();
const { getAllAreas} = require('../controllers/areasController.js');



router.get('/', getAllAreas);

module.exports = router;