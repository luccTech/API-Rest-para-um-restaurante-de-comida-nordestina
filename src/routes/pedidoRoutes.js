const express = require('express');
const router = express.Router();
const pedidoController = require('../controllers/pedidoController');

router.get('/', pedidoController.listarTodos);
router.post('/', pedidoController.criar);

module.exports = router; 