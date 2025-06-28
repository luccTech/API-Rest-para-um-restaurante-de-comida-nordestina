const { Cliente } = require('../models');

class ClienteController {
  // Listar todos os clientes
  async listarTodos(req, res) {
    try {
      const { ativo } = req.query;
      let whereClause = {};
      
      if (ativo !== undefined) {
        whereClause.ativo = ativo === 'true';
      }
      
      const clientes = await Cliente.findAll({
        where: whereClause,
        order: [['nome', 'ASC']]
      });
      
      res.json({
        success: true,
        data: clientes,
        total: clientes.length
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        error: 'Erro ao listar clientes',
        message: error.message
      });
    }
  }

  // Buscar cliente por ID
  async buscarPorId(req, res) {
    try {
      const { id } = req.params;
      const cliente = await Cliente.findByPk(id);
      
      if (!cliente) {
        return res.status(404).json({
          success: false,
          error: 'Cliente não encontrado'
        });
      }
      
      res.json({
        success: true,
        data: cliente
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        error: 'Erro ao buscar cliente',
        message: error.message
      });
    }
  }

  // Buscar cliente por CPF
  async buscarPorCPF(req, res) {
    try {
      const { cpf } = req.params;
      const cliente = await Cliente.findOne({
        where: { cpf: cpf.replace(/[^\d]/g, '') }
      });
      
      if (!cliente) {
        return res.status(404).json({
          success: false,
          error: 'Cliente não encontrado'
        });
      }
      
      res.json({
        success: true,
        data: cliente
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        error: 'Erro ao buscar cliente',
        message: error.message
      });
    }
  }

  // Criar novo cliente
  async criar(req, res) {
    try {
      const { nome, cpf, email, telefone } = req.body;
      
      // Verificar se CPF já existe
      const clienteExistente = await Cliente.findOne({
        where: { cpf: cpf.replace(/[^\d]/g, '') }
      });
      
      if (clienteExistente) {
        return res.status(400).json({
          success: false,
          error: 'CPF já cadastrado'
        });
      }
      
      const cliente = await Cliente.create({
        nome,
        cpf,
        email,
        telefone
      });
      
      res.status(201).json({
        success: true,
        message: 'Cliente criado com sucesso',
        data: cliente
      });
    } catch (error) {
      res.status(400).json({
        success: false,
        error: 'Erro ao criar cliente',
        message: error.message
      });
    }
  }

  // Atualizar cliente
  async atualizar(req, res) {
    try {
      const { id } = req.params;
      const { nome, cpf, email, telefone, ativo } = req.body;
      
      const cliente = await Cliente.findByPk(id);
      
      if (!cliente) {
        return res.status(404).json({
          success: false,
          error: 'Cliente não encontrado'
        });
      }
      
      // Verificar se CPF já existe em outro cliente
      if (cpf) {
        const clienteExistente = await Cliente.findOne({
          where: { 
            cpf: cpf.replace(/[^\d]/g, ''),
            id: { [require('sequelize').Op.ne]: id }
          }
        });
        
        if (clienteExistente) {
          return res.status(400).json({
            success: false,
            error: 'CPF já cadastrado para outro cliente'
          });
        }
      }
      
      await cliente.update({
        nome,
        cpf,
        email,
        telefone,
        ativo
      });
      
      res.json({
        success: true,
        message: 'Cliente atualizado com sucesso',
        data: cliente
      });
    } catch (error) {
      res.status(400).json({
        success: false,
        error: 'Erro ao atualizar cliente',
        message: error.message
      });
    }
  }

  // Deletar cliente
  async deletar(req, res) {
    try {
      const { id } = req.params;
      const cliente = await Cliente.findByPk(id);
      
      if (!cliente) {
        return res.status(404).json({
          success: false,
          error: 'Cliente não encontrado'
        });
      }
      
      await cliente.destroy();
      
      res.json({
        success: true,
        message: 'Cliente deletado com sucesso'
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        error: 'Erro ao deletar cliente',
        message: error.message
      });
    }
  }
}

module.exports = new ClienteController(); 