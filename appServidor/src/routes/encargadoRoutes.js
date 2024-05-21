const express = require('express');
const router = express.Router();
const { addEncargado, getAllEncargados, deleteEncargado, getEncargadoByCedula, editEncargado } = require('../controllers/encargadoController.js');

router.get('/cedula/:cedula', getEncargadoByCedula); 
router.get('/', getAllEncargados);
router.post('/', addEncargado);
router.delete('/:id', deleteEncargado);
router.put('/:id', editEncargado);

module.exports = router;