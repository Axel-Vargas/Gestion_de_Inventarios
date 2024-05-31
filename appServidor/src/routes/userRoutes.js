const express = require('express');
const router = express.Router();
const { authenticateUser, addUser, getAllUsers, deleteUser, getUserByCedula, editUser, updatePassword } = require('../controllers/userController.js');

router.get('/cedula/:cedula', getUserByCedula); 
router.get('/', getAllUsers);
router.post('/:auth', authenticateUser);
router.post('/', addUser);
router.delete('/:id', deleteUser);
router.put('/:id', editUser);
router.put('/updatePassword/:id', updatePassword);

module.exports = router;

