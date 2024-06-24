const express = require('express');
const router = express.Router();
const { getComponentes, createComponente, getComponenteById, updateComponente, deleteComponente } = require('../controllers/componentes.controller.js');

router.get('/', getComponentes);
router.post('/', createComponente);
router.get('/:id', getComponenteById);
router.put('/:id', updateComponente);
router.delete('/:id', deleteComponente);

module.exports = router;
