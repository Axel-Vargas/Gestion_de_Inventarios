const express = require('express');
const router = express.Router();
const { authenticateUser, addUser, getAllUsers, deleteUser, getUserByCedula } = require('../controllers/userController.js');

router.get('/cedula/:cedula', getUserByCedula); 
router.get('/', getAllUsers);
router.post('/:auth', authenticateUser);
router.post('/', addUser);
router.delete('/:id', deleteUser);

module.exports = router;