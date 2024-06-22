const express = require('express');
const router = express.Router();
const { addEncargado, getAllEncargados, deleteEncargado, getEncargadoByCedula, editEncargado, getBienesMobiliariosByEncargado, getBienesTecnologicosByEncargado, updateEncargadoMobiliario, updateEncargadoTecnologico, getBienesDisponibles} = require('../controllers/encargadoController.js');

router.get('/cedula/:cedula', getEncargadoByCedula); 
router.get('/', getAllEncargados);
router.get('/:id/bienes-mobiliarios', getBienesMobiliariosByEncargado);
router.get('/:id/bienes-tecnologicos', getBienesTecnologicosByEncargado);
router.get('/getBienesDisponibles', getBienesDisponibles);
router.post('/', addEncargado);
router.delete('/:id', deleteEncargado);
router.put('/:id', editEncargado);
router.put('/updateEncargadoMobiliario/:id', updateEncargadoMobiliario);
router.put('/updateEncargadoTecnologico/:id', updateEncargadoTecnologico);

module.exports = router;