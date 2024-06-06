const express = require('express');
const router = express.Router();
const { getTotalBienes, getTotalAreas, getTotalProveedores, getTotalUsuarios, getFacultades, getBloques} = require('../controllers/inicioController.js');

router.get('/total-bienes', getTotalBienes);
router.get('/total-areas', getTotalAreas);
router.get('/total-proveedores', getTotalProveedores);
router.get('/total-usuarios', getTotalUsuarios);
router.get('/facultades', getFacultades);
router.get('/bloques', getBloques);

module.exports = router;

