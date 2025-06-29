const { Cliente } = require('../models');

// Função para validar CPF (apenas 11 números)
function validarCPF(cpf) {
  const cpfLimpo = cpf.replace(/[^\d]/g, '');
  return cpfLimpo.length === 11;
}

module.exports = {
  async listarTodos(req, res) {
    try {
      const clientes = await Cliente.findAll({ order: [['id', 'ASC']] });
      res.json(clientes);
    } catch (error) {
      res.status(500).json({ error: 'Erro ao listar clientes' });
    }
  },

  async criar(req, res) {
    try {
      const { nome, cpf, email, telefone } = req.body;
      
      // Validações
      if (!nome || !cpf) {
        return res.status(400).json({ error: 'Nome e CPF são obrigatórios' });
      }
      
      if (!validarCPF(cpf)) {
        return res.status(400).json({ error: 'CPF deve ter 11 números' });
      }
      
      const cliente = await Cliente.create({ nome, cpf, email, telefone });
      res.status(201).json(cliente);
    } catch (error) {
      if (error.name === 'SequelizeUniqueConstraintError') {
        return res.status(400).json({ error: 'CPF já cadastrado' });
      }
      res.status(500).json({ error: 'Erro ao criar cliente' });
    }
  },

  async buscarPorId(req, res) {
    try {
      const cliente = await Cliente.findByPk(req.params.id);
      if (!cliente) {
        return res.status(404).json({ error: 'Cliente não encontrado' });
      }
      res.json(cliente);
    } catch (error) {
      res.status(500).json({ error: 'Erro ao buscar cliente' });
    }
  },

  async atualizar(req, res) {
    try {
      const { nome, cpf, email, telefone } = req.body;
      const cliente = await Cliente.findByPk(req.params.id);
      
      if (!cliente) {
        return res.status(404).json({ error: 'Cliente não encontrado' });
      }
      
      // Validações
      if (cpf && !validarCPF(cpf)) {
        return res.status(400).json({ error: 'CPF deve ter 11 números' });
      }
      
      await cliente.update({ nome, cpf, email, telefone });
      res.json(cliente);
    } catch (error) {
      if (error.name === 'SequelizeUniqueConstraintError') {
        return res.status(400).json({ error: 'CPF já cadastrado' });
      }
      res.status(500).json({ error: 'Erro ao atualizar cliente' });
    }
  },

  async deletar(req, res) {
    try {
      const cliente = await Cliente.findByPk(req.params.id);
      if (!cliente) {
        return res.status(404).json({ error: 'Cliente não encontrado' });
      }
      
      await cliente.destroy();
      res.json({ message: 'Cliente deletado com sucesso' });
    } catch (error) {
      res.status(500).json({ error: 'Erro ao deletar cliente' });
    }
  }
}; 