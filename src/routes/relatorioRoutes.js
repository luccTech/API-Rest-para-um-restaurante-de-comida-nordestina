const express = require('express');
const router = express.Router();
const relatorioController = require('../controllers/relatorioController');

router.get('/pratos-por-pedidos', relatorioController.pratosPorPedidos);
router.get('/top-clientes-pedidos', relatorioController.topClientesPorPedidos);
router.get('/top-clientes-gasto', relatorioController.topClientesPorGasto);

module.exports = router; 