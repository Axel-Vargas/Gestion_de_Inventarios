const express = require('express');
const router = express.Router();
const { addEncargado, getAllEncargados, deleteEncargado, getEncargadoByCedula, editEncargado, getBienesMobiliariosByEncargado, getBienesTecnologicosByEncargado, updateBienEncargado} = require('../controllers/encargadoController.js');

router.get('/cedula/:cedula', getEncargadoByCedula); 
router.get('/', getAllEncargados);
router.get('/:id/bienes-mobiliarios', getBienesMobiliariosByEncargado);
router.get('/:id/bienes-tecnologicos', getBienesTecnologicosByEncargado);
router.post('/', addEncargado);
router.delete('/:id', deleteEncargado);
router.put('/:id', editEncargado);
router.put('/updateBienEncargado', updateBienEncargado);

module.exports = router;