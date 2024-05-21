const express = require('express');
const router = express.Router();
const { getAreas,getAreasFisei, getAreaById, createArea, updateArea, deleteArea } = require('../controllers/areasController.js');

router.get('/', getAreas);
router.post('/', createArea);
router.get('/:id', getAreaById);
router.put('/:id', updateArea);
router.delete('/:id', deleteArea);
router.get('/bloque/:id_bloque_per', getAreasFisei);

module.exports = router;
