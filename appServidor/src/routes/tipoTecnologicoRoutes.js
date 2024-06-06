const express = require('express');
const router = express.Router();
const { getBienesTecnologicos, createBienTecnologico, getBienTecnologicoById, updateBienTecnologico, deleteBienTecnologico } = require('../controllers/tipotecnologicoController');

router.get('/', getBienesTecnologicos);
router.post('/', createBienTecnologico);
router.get('/:id', getBienTecnologicoById);
router.put('/:id', updateBienTecnologico);
router.delete('/:id', deleteBienTecnologico);

module.exports = router;
