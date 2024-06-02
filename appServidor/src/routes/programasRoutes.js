const express = require('express');
const router = express.Router();
const { addPrograma, getAllProgramas, deletePrograma, editPrograma } = require('../controllers/programaController.js');

router.get('/', getAllProgramas);
router.post('/', addPrograma);
router.delete('/:id', deletePrograma);
router.put('/:id', editPrograma);

module.exports = router;