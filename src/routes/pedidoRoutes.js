const express = require('express');
const router = express.Router();
const pedidoController = require('../controllers/pedidoController');

// GET /api/pedidos - Listar todos os pedidos
router.get('/', pedidoController.listarTodos);

// GET /api/pedidos/:id - Buscar pedido por ID
router.get('/:id', pedidoController.buscarPorId);

// POST /api/pedidos - Criar novo pedido
router.post('/', pedidoController.criar);

// PATCH /api/pedidos/:id/status - Atualizar status do pedido
router.patch('/:id/status', pedidoController.atualizarStatus);

// PATCH /api/pedidos/:id/cancelar - Cancelar pedido
router.patch('/:id/cancelar', pedidoController.cancelar);

// DELETE /api/pedidos/:id - Deletar pedido
router.delete('/:id', pedidoController.deletar);

module.exports = router; 