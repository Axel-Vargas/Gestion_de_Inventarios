const express = require('express');
const router = express.Router();
const { getTipoBienesTecnologicos, createTipoBienTecnologico, getTipoBienTecnologicoById, updateTipoBienTecnologico, deleteTipoBienTecnologico } = require('../controllers/tipotecnologicoController');

router.get('/', getTipoBienesTecnologicos);
router.post('/', createTipoBienTecnologico);
router.get('/:id', getTipoBienTecnologicoById);
router.put('/:id', updateTipoBienTecnologico);
router.delete('/:id', deleteTipoBienTecnologico);

module.exports = router;
