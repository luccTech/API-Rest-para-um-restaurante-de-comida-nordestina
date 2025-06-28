const express = require('express');
const router = express.Router();
const relatorioController = require('../controllers/relatorioController');

// GET /api/relatorios/pratos-por-pedidos - Listar pratos ordenados por quantidade de pedidos
router.get('/pratos-por-pedidos', relatorioController.pratosPorPedidos);

// GET /api/relatorios/top-clientes-pedidos - Top 5 clientes que mais fizeram pedidos
router.get('/top-clientes-pedidos', relatorioController.topClientesPorPedidos);

// GET /api/relatorios/top-clientes-gasto - Top 5 clientes que mais gastaram
router.get('/top-clientes-gasto', relatorioController.topClientesPorGasto);

// GET /api/relatorios/vendas - Relatório geral de vendas
router.get('/vendas', relatorioController.relatorioVendas);

// GET /api/relatorios/faturamento-periodo - Relatório de faturamento por período
router.get('/faturamento-periodo', relatorioController.faturamentoPorPeriodo);

module.exports = router; 