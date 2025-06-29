const express = require('express');
const router = express.Router();
const pratoController = require('../controllers/pratoController');

router.get('/', pratoController.listarTodos);
router.get('/:id', pratoController.buscarPorId);
router.post('/', pratoController.criar);
router.put('/:id', pratoController.atualizar);
router.delete('/:id', pratoController.deletar);

module.exports = router; 