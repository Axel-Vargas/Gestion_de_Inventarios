const express = require('express');
const router = express.Router();
const modeloController = require('../controllers/modeloController');

router.get('/', modeloController.getAllModelos);
router.post('/', modeloController.createModelo);
router.get('/:id', modeloController.getModeloById);
router.put('/:id', modeloController.updateModelo);
router.delete('/:id', modeloController.deleteModelo);

module.exports = router;
