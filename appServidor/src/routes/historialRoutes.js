const express = require('express');
const router = express.Router();
const { getHistorialActividades, getHistorialActividadById, agregarHistorialActividad, actualizarHistorialActividad, eliminarHistorialActividad } = require('../controllers/historialController.js');

router.get('/', getHistorialActividades);
router.post('/', agregarHistorialActividad);
router.get('/:id', getHistorialActividadById);
router.put('/:id', actualizarHistorialActividad);
router.delete('/:id', eliminarHistorialActividad);

module.exports = router;
