const express = require('express');
const router = express.Router();
const clienteController = require('../controllers/clienteController');

// GET /api/clientes - Listar todos os clientes
router.get('/', clienteController.listarTodos);

// GET /api/clientes/:id - Buscar cliente por ID
router.get('/:id', clienteController.buscarPorId);

// GET /api/clientes/cpf/:cpf - Buscar cliente por CPF
router.get('/cpf/:cpf', clienteController.buscarPorCPF);

// POST /api/clientes - Criar novo cliente
router.post('/', clienteController.criar);

// PUT /api/clientes/:id - Atualizar cliente
router.put('/:id', clienteController.atualizar);

// DELETE /api/clientes/:id - Deletar cliente
router.delete('/:id', clienteController.deletar);

module.exports = router; 