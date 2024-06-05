const express = require('express');
const router = express.Router();
const { getTotalBienes, getTotalAreas, getTotalProveedores, getTotalUsuarios} = require('../controllers/inicioController.js');

router.get('/total-bienes', getTotalBienes);
router.get('/total-areas', getTotalAreas);
router.get('/total-proveedores', getTotalProveedores);
router.get('/total-usuarios', getTotalUsuarios);

module.exports = router;