const express = require('express');
const router = express.Router();
const { addEncargado, getAllEncargados, deleteEncargado, getEncargadoByCedula } = require('../controllers/encargadoController.js');

router.get('/cedula/:cedula', getEncargadoByCedula); 
router.get('/', getAllEncargados);
router.post('/', addEncargado);
router.delete('/:id', deleteEncargado);

module.exports = router;