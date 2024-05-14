const express = require('express');
const router = express.Router();
const { getAllEncargados} = require('../controllers/encargadoController.js');



router.get('/', getAllEncargados);

module.exports = router;