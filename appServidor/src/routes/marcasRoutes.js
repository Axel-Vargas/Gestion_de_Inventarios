const express = require('express');
const router = express.Router();
const marcasController = require('../controllers/marcasController');

router.get('/', marcasController.getAllMarcas);
router.post('/', marcasController.createMarcas);
router.get('/:id', marcasController.getMarcasById);
router.put('/:id', marcasController.updateMarcas);
router.delete('/:id', marcasController.deleteMarcas);

module.exports = router;
