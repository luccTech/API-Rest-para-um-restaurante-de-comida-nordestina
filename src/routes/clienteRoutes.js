const express = require('express');
const router = express.Router();
const clienteController = require('../controllers/clienteController');

router.get('/', clienteController.listarTodos);
router.post('/', clienteController.criar);

module.exports = router; 