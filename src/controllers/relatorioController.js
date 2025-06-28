const { Pedido, Cliente, Prato, PedidoPrato, sequelize } = require('../models');
const { Op, fn, col, literal } = require('sequelize');

class RelatorioController {
  // Listar todos os pratos ordenados por quantidade de pedidos
  async pratosPorPedidos(req, res) {
    try {
      const pratos = await Prato.findAll({
        attributes: [
          'id',
          'nome',
          'preco',
          'categoria',
          'disponivel',
          [
            literal(`(
              SELECT COUNT(*)
              FROM pedido_pratos pp
              WHERE pp.pratoId = Prato.id
            )`),
            'quantidadePedidos'
          ]
        ],
        order: [
          [literal('quantidadePedidos'), 'DESC'],
          ['nome', 'ASC']
        ]
      });
      
      res.json({
        success: true,
        data: pratos,
        total: pratos.length
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        error: 'Erro ao gerar relatório de pratos por pedidos',
        message: error.message
      });
    }
  }

  // Listar os 5 clientes que mais fizeram pedidos
  async topClientesPorPedidos(req, res) {
    try {
      const clientes = await Cliente.findAll({
        attributes: [
          'id',
          'nome',
          'cpf',
          [
            literal(`(
              SELECT COUNT(*)
              FROM pedidos p
              WHERE p.clienteId = Cliente.id
            )`),
            'quantidadePedidos'
          ]
        ],
        order: [
          [literal('quantidadePedidos'), 'DESC'],
          ['nome', 'ASC']
        ],
        limit: 5
      });
      
      res.json({
        success: true,
        data: clientes,
        total: clientes.length
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        error: 'Erro ao gerar relatório de top clientes por pedidos',
        message: error.message
      });
    }
  }

  // Listar os 5 clientes que mais gastaram
  async topClientesPorGasto(req, res) {
    try {
      const clientes = await Cliente.findAll({
        attributes: [
          'id',
          'nome',
          'cpf',
          [
            literal(`(
              SELECT COALESCE(SUM(p.total), 0)
              FROM pedidos p
              WHERE p.clienteId = Cliente.id
              AND p.status != 'cancelado'
            )`),
            'totalGasto'
          ]
        ],
        order: [
          [literal('totalGasto'), 'DESC'],
          ['nome', 'ASC']
        ],
        limit: 5
      });
      
      res.json({
        success: true,
        data: clientes,
        total: clientes.length
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        error: 'Erro ao gerar relatório de top clientes por gasto',
        message: error.message
      });
    }
  }

  // Relatório geral de vendas
  async relatorioVendas(req, res) {
    try {
      const { dataInicio, dataFim } = req.query;
      let whereClause = {
        status: { [Op.ne]: 'cancelado' }
      };
      
      if (dataInicio && dataFim) {
        whereClause.dataPedido = {
          [Op.between]: [new Date(dataInicio), new Date(dataFim)]
        };
      }
      
      const totalVendas = await Pedido.sum('total', { where: whereClause });
      const totalPedidos = await Pedido.count({ where: whereClause });
      const ticketMedio = totalPedidos > 0 ? totalVendas / totalPedidos : 0;
      
      // Status dos pedidos
      const pedidosPorStatus = await Pedido.findAll({
        attributes: [
          'status',
          [fn('COUNT', col('id')), 'quantidade']
        ],
        where: whereClause,
        group: ['status']
      });
      
      // Top 5 pratos mais vendidos
      const topPratos = await Prato.findAll({
        attributes: [
          'id',
          'nome',
          'preco',
          [
            literal(`(
              SELECT COUNT(*)
              FROM pedido_pratos pp
              INNER JOIN pedidos p ON pp.pedidoId = p.id
              WHERE pp.pratoId = Prato.id
              ${dataInicio && dataFim ? `AND p.dataPedido BETWEEN '${dataInicio}' AND '${dataFim}'` : ''}
              AND p.status != 'cancelado'
            )`),
            'quantidadeVendida'
          ]
        ],
        order: [[literal('quantidadeVendida'), 'DESC']],
        limit: 5
      });
      
      res.json({
        success: true,
        data: {
          periodo: dataInicio && dataFim ? `${dataInicio} a ${dataFim}` : 'Todos os períodos',
          totalVendas: parseFloat(totalVendas || 0),
          totalPedidos,
          ticketMedio: parseFloat(ticketMedio.toFixed(2)),
          pedidosPorStatus,
          topPratos
        }
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        error: 'Erro ao gerar relatório de vendas',
        message: error.message
      });
    }
  }

  // Relatório de faturamento por período
  async faturamentoPorPeriodo(req, res) {
    try {
      const { periodo = 'mes' } = req.query; // dia, semana, mes, ano
      
      let groupBy, dateFormat;
      switch (periodo) {
        case 'dia':
          groupBy = fn('DATE', col('dataPedido'));
          dateFormat = 'YYYY-MM-DD';
          break;
        case 'semana':
          groupBy = fn('strftime', '%Y-%W', col('dataPedido'));
          dateFormat = 'YYYY-WW';
          break;
        case 'mes':
          groupBy = fn('strftime', '%Y-%m', col('dataPedido'));
          dateFormat = 'YYYY-MM';
          break;
        case 'ano':
          groupBy = fn('strftime', '%Y', col('dataPedido'));
          dateFormat = 'YYYY';
          break;
        default:
          groupBy = fn('strftime', '%Y-%m', col('dataPedido'));
          dateFormat = 'YYYY-MM';
      }
      
      const faturamento = await Pedido.findAll({
        attributes: [
          [groupBy, 'periodo'],
          [fn('SUM', col('total')), 'faturamento'],
          [fn('COUNT', col('id')), 'quantidadePedidos']
        ],
        where: {
          status: { [Op.ne]: 'cancelado' }
        },
        group: ['periodo'],
        order: [[col('periodo'), 'DESC']]
      });
      
      res.json({
        success: true,
        data: {
          periodo,
          faturamento,
          total: faturamento.length
        }
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        error: 'Erro ao gerar relatório de faturamento por período',
        message: error.message
      });
    }
  }
}

module.exports = new RelatorioController(); 