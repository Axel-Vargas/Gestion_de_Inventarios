const express = require('express');
const router = express.Router();
const { 
    getDependencias,
    getDependenciaById,
    createDependencia,
    updateDependencia,
    deleteDependencia
} = require('../controllers/dependenciasController.js');

router.get('/', getDependencias);
router.post('/', createDependencia);
router.get('/:id_dep', getDependenciaById);
router.put('/:id_dep', updateDependencia);
router.delete('/:id_dep', deleteDependencia);

module.exports = router;
