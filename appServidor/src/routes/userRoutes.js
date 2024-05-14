const express = require('express');
const router = express.Router();
const { authenticateUser, addUser, getAllUsers, editUser, desactivateUser, getUserByCedula } = require('../controllers/userController.js');

router.get('/cedula/:cedula', getUserByCedula); 
router.get('/', getAllUsers);
router.post('/:auth', authenticateUser);
router.post('/', addUser);
router.put('/:id', editUser);
router.put('/:id/desactivate', desactivateUser);

module.exports = router;