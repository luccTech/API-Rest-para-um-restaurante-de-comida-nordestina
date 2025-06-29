const express = require('express');
const router = express.Router();
const pratoController = require('../controllers/pratoController');

router.get('/', pratoController.listarTodos);
router.get('/:id', pratoController.buscarPorId);
router.post('/', pratoController.criar);

module.exports = router; 