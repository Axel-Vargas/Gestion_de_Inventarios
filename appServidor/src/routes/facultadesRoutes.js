const express = require('express');
const router = express.Router();
const { addFacultad, getAllFacultades, editFacultad } = require('../controllers/facultadController.js');

router.get('/', getAllFacultades);
router.post('/', addFacultad);
router.put('/:id', editFacultad);

module.exports = router;