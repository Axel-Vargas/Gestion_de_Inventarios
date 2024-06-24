const express = require('express');
const router = express.Router();
const { getBloquesFacultad, getBloques, getBloquesFisei, getBloqueById, createBloque, updateBloque, deleteBloque } = require('../controllers/bloquesController.js');

router.get('/', getBloques);
router.get('/bloques/:nombre',getBloquesFacultad)
router.post('/', createBloque);
router.get('/:id', getBloqueById);
router.put('/:id', updateBloque);
router.delete('/:id', deleteBloque);
router.get('/area/:id_facu_per', getBloquesFisei);
module.exports = router;
