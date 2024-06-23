const express = require('express');
const router = express.Router();
const { addBienes, getAllBienes, getMobiliarioByName,editBienes ,deleteBienes, getBienesPorArea, getBienesPorEstado, getBienesPorEncargado} = require('../controllers/mobiliarioController.js');



router.get('/', getAllBienes);
router.get('/nombre/:nombre', getMobiliarioByName);
router.get('/area/:id', getBienesPorArea);
router.get('/estado/:estado', getBienesPorEstado);
router.get('/encargado/:encargado', getBienesPorEncargado);
router.post('/', addBienes);
router.put('/:id', editBienes);
router.delete('/:id', deleteBienes);
module.exports = router;