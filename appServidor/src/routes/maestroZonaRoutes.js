const express = require('express');
const router = express.Router();
const { getZonas, createZona, getZonaById, updateZona, deleteZona } = require('../controllers/maestroZona.js');

router.get('/', getZonas);
router.post('/', createZona);
router.get('/:id', getZonaById);
router.put('/:id', updateZona);
router.delete('/:id', deleteZona);

module.exports = router;
