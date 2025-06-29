const { Prato } = require('../models');

module.exports = {
  async listarTodos(req, res) {
    const pratos = await Prato.findAll({ order: [['id', 'ASC']] });
    res.json(pratos);
  },
  async buscarPorId(req, res) {
    const prato = await Prato.findByPk(req.params.id);
    if (!prato) return res.status(404).json({ error: 'Prato não encontrado' });
    res.json(prato);
  },
  async criar(req, res) {
    const prato = await Prato.create(req.body);
    res.status(201).json(prato);
  }
}; 