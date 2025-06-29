const { Cliente } = require('../models');

module.exports = {
  async listarTodos(req, res) {
    const clientes = await Cliente.findAll();
    res.json(clientes);
  },
  async criar(req, res) {
    const cliente = await Cliente.create(req.body);
    res.status(201).json(cliente);
  }
}; 