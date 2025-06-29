const { Pedido, Cliente } = require('../models');

module.exports = {
  async listarTodos(req, res) {
    const pedidos = await Pedido.findAll({ include: [Cliente] });
    res.json(pedidos);
  },
  async criar(req, res) {
    const pedido = await Pedido.create(req.body);
    res.status(201).json(pedido);
  }
}; 