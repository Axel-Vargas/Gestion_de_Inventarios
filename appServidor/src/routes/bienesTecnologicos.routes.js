const express = require('express');
const router = express.Router();
const { getBienesTecnologicos, createBienTecnologico, getBienTecnologicoById, updateBienTecnologico, deleteBienTecnologico, obtenerBienesPorBloqueYArea } = require('../controllers/bienesTecnolgicos.controller.js');

router.get('/obtenerPorBloqueYArea/:nombreBloque/:nombreArea', obtenerBienesPorBloqueYArea); // Ruta para obtener bienes por bloque y área
router.get('/', getBienesTecnologicos);
router.post('/', createBienTecnologico);
router.get('/:id', getBienTecnologicoById);
router.put('/:id', updateBienTecnologico);
router.delete('/:id', deleteBienTecnologico);

module.exports = router;
