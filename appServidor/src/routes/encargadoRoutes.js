const express = require('express');
const router = express.Router();
const { addEncargado, getAllEncargados } = require('../controllers/encargadoController.js');

router.get('/', getAllEncargados);
router.post('/', addEncargado);

module.exports = router;