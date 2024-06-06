const express = require('express');
const router = express.Router();
const { getBienesTecnologicos, createBienTecnologico, getBienTecnologicoById, updateBienTecnologico, deleteBienTecnologico, obtenerBienesPorBloqueYArea, getBienesTecnologicosPorArea } = require('../controllers/bienesTecnolgicos.controller.js');

router.get('/obtenerPorBloqueYArea/:nombreBloque/:nombreArea', obtenerBienesPorBloqueYArea); // Ruta para obtener bienes por bloque y área
router.get('/', getBienesTecnologicos);
router.get('/area/:id', getBienesTecnologicosPorArea);
router.post('/', createBienTecnologico);
router.get('/:id', getBienTecnologicoById);
router.put('/:id', updateBienTecnologico);
router.delete('/:id', deleteBienTecnologico);

module.exports = router;
