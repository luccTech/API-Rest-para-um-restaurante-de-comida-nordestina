const { Prato, Pedido, Cliente, ItemPedido, sequelize } = require('../models');

module.exports = {
  async pratosPorPedidos(req, res) {
    try {
      const pratos = await Prato.findAll({
        attributes: [
          'id',
          'nome',
          'preco',
          'categoria',
          'disponivel',
          [sequelize.fn('COUNT', sequelize.col('ItemPedidos.id')), 'quantidadePedidos']
        ],
        include: [{
          model: ItemPedido,
          as: 'ItemPedidos',
          attributes: []
        }],
        group: ['Prato.id'],
        order: [[sequelize.fn('COUNT', sequelize.col('ItemPedidos.id')), 'DESC']]
      });

      res.json(pratos);
    } catch (error) {
      res.status(500).json({ error: 'Erro ao gerar relatório de pratos por pedidos' });
    }
  },

  async topClientesPorPedidos(req, res) {
    try {
      const clientes = await Cliente.findAll({
        attributes: [
          'id',
          'nome',
          'cpf',
          'email',
          [sequelize.fn('COUNT', sequelize.col('Pedidos.id')), 'quantidadePedidos']
        ],
        include: [{
          model: Pedido,
          as: 'Pedidos',
          attributes: []
        }],
        group: ['Cliente.id'],
        order: [[sequelize.fn('COUNT', sequelize.col('Pedidos.id')), 'DESC']],
        limit: 5
      });

      res.json(clientes);
    } catch (error) {
      res.status(500).json({ error: 'Erro ao gerar relatório de top clientes por pedidos' });
    }
  },

  async topClientesPorGasto(req, res) {
    try {
      const clientes = await Cliente.findAll({
        attributes: [
          'id',
          'nome',
          'cpf',
          'email',
          [sequelize.fn('SUM', sequelize.col('Pedidos.total')), 'totalGasto'],
          [sequelize.fn('COUNT', sequelize.col('Pedidos.id')), 'quantidadePedidos']
        ],
        include: [{
          model: Pedido,
          as: 'Pedidos',
          attributes: []
        }],
        group: ['Cliente.id'],
        order: [[sequelize.fn('SUM', sequelize.col('Pedidos.total')), 'DESC']],
        limit: 5
      });

      res.json(clientes);
    } catch (error) {
      res.status(500).json({ error: 'Erro ao gerar relatório de top clientes por gasto' });
    }
  }
}; 