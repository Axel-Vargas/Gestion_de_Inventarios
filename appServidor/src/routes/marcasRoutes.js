const express = require('express');
const router = express.Router();
const marcasController = require('../controllers/marcasController');

// Rutas para las marcas
router.get('/', marcasController.getAllMarcas);
router.post('/', marcasController.createMarcas);
router.get('/tecnologicos', marcasController.geMarcasTecnologicos); 
router.get('/mobiliarios', marcasController.geMarcasMobiliarios); 
router.get('/:id', marcasController.getMarcasById);
router.put('/:id', marcasController.updateMarcas);
router.delete('/:id', marcasController.deleteMarcas);

module.exports = router;
