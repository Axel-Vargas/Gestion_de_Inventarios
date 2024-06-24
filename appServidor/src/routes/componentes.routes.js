const express = require('express');
const router = express.Router();
const { getComponentes,getBienesAsignar, getComponentesLibres,asignarComponenteLibre, createComponente, getComponenteById, updateComponente, deleteComponente } = require('../controllers/componentes.controller.js');

router.get('/', getComponentes);
router.get('/libres',getComponentesLibres)
router.get('/bienes',getBienesAsignar)
router.post('/', createComponente);
router.get('/:id', getComponenteById);
router.put('/:id', updateComponente);
router.put('/asignar/:id_componente', asignarComponenteLibre);
router.delete('/:id', deleteComponente);

module.exports = router;
