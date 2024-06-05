const express = require('express');
const router = express.Router();
const { getTotalBienes, getTotalAreas, getTotalProveedores, getTotalUsuarios} = require('../controllers/inicioController.js');

router.get('/', getTotalBienes);
router.get('/', getTotalAreas);
router.get('/', getTotalProveedores);
router.get('/', getTotalUsuarios);

module.exports = router;