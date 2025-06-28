const express = require('express');
const router = express.Router();
const pratoController = require('../controllers/pratoController');

// GET /api/pratos - Listar todos os pratos
router.get('/', pratoController.listarTodos);

// GET /api/pratos/:id - Buscar prato por ID
router.get('/:id', pratoController.buscarPorId);

// GET /api/pratos/categoria/:categoria - Buscar pratos por categoria
router.get('/categoria/:categoria', pratoController.buscarPorCategoria);

// POST /api/pratos - Criar novo prato
router.post('/', pratoController.criar);

// PUT /api/pratos/:id - Atualizar prato
router.put('/:id', pratoController.atualizar);

// PATCH /api/pratos/:id/disponibilidade - Alterar disponibilidade do prato
router.patch('/:id/disponibilidade', pratoController.alterarDisponibilidade);

// DELETE /api/pratos/:id - Deletar prato
router.delete('/:id', pratoController.deletar);

module.exports = router; 