const { Pedido, Cliente, Prato, PedidoPrato, sequelize } = require('../models');
const { Op } = require('sequelize');

class PedidoController {
  // Listar todos os pedidos
  async listarTodos(req, res) {
    try {
      const { status, clienteId } = req.query;
      let whereClause = {};
      
      if (status) {
        whereClause.status = status;
      }
      
      if (clienteId) {
        whereClause.clienteId = clienteId;
      }
      
      const pedidos = await Pedido.findAll({
        where: whereClause,
        include: [
          {
            model: Cliente,
            attributes: ['id', 'nome', 'cpf']
          },
          {
            model: Prato,
            through: { attributes: ['quantidade', 'precoUnitario', 'subtotal'] },
            attributes: ['id', 'nome', 'preco']
          }
        ],
        order: [['dataPedido', 'DESC']]
      });
      
      res.json({
        success: true,
        data: pedidos,
        total: pedidos.length
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        error: 'Erro ao listar pedidos',
        message: error.message
      });
    }
  }

  // Buscar pedido por ID
  async buscarPorId(req, res) {
    try {
      const { id } = req.params;
      const pedido = await Pedido.findByPk(id, {
        include: [
          {
            model: Cliente,
            attributes: ['id', 'nome', 'cpf', 'email', 'telefone']
          },
          {
            model: Prato,
            through: { attributes: ['quantidade', 'precoUnitario', 'subtotal'] },
            attributes: ['id', 'nome', 'preco', 'descricao']
          }
        ]
      });
      
      if (!pedido) {
        return res.status(404).json({
          success: false,
          error: 'Pedido não encontrado'
        });
      }
      
      res.json({
        success: true,
        data: pedido
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        error: 'Erro ao buscar pedido',
        message: error.message
      });
    }
  }

  // Criar novo pedido
  async criar(req, res) {
    const transaction = await sequelize.transaction();
    
    try {
      const { clienteId, pratos, observacoes } = req.body;
      
      // Verificar se cliente existe
      const cliente = await Cliente.findByPk(clienteId);
      if (!cliente) {
        await transaction.rollback();
        return res.status(404).json({
          success: false,
          error: 'Cliente não encontrado'
        });
      }
      
      // Verificar se pratos existem e estão disponíveis
      const pratosIds = pratos.map(p => p.pratoId);
      const pratosExistentes = await Prato.findAll({
        where: {
          id: { [Op.in]: pratosIds },
          disponivel: true
        }
      });
      
      if (pratosExistentes.length !== pratos.length) {
        await transaction.rollback();
        return res.status(400).json({
          success: false,
          error: 'Um ou mais pratos não encontrados ou indisponíveis'
        });
      }
      
      // Calcular total do pedido
      let total = 0;
      const pratosComPreco = pratos.map(pedidoPrato => {
        const prato = pratosExistentes.find(p => p.id === pedidoPrato.pratoId);
        const subtotal = prato.preco * pedidoPrato.quantidade;
        total += subtotal;
        
        return {
          ...pedidoPrato,
          precoUnitario: prato.preco,
          subtotal
        };
      });
      
      // Criar pedido
      const pedido = await Pedido.create({
        clienteId,
        total,
        observacoes,
        status: 'pendente'
      }, { transaction });
      
      // Criar relacionamentos pedido-prato
      const pedidoPratos = pratosComPreco.map(prato => ({
        pedidoId: pedido.id,
        pratoId: prato.pratoId,
        quantidade: prato.quantidade,
        precoUnitario: prato.precoUnitario,
        subtotal: prato.subtotal
      }));
      
      await PedidoPrato.bulkCreate(pedidoPratos, { transaction });
      
      await transaction.commit();
      
      // Buscar pedido criado com relacionamentos
      const pedidoCriado = await Pedido.findByPk(pedido.id, {
        include: [
          {
            model: Cliente,
            attributes: ['id', 'nome', 'cpf']
          },
          {
            model: Prato,
            through: { attributes: ['quantidade', 'precoUnitario', 'subtotal'] },
            attributes: ['id', 'nome', 'preco']
          }
        ]
      });
      
      res.status(201).json({
        success: true,
        message: 'Pedido criado com sucesso',
        data: pedidoCriado
      });
    } catch (error) {
      await transaction.rollback();
      res.status(400).json({
        success: false,
        error: 'Erro ao criar pedido',
        message: error.message
      });
    }
  }

  // Atualizar status do pedido
  async atualizarStatus(req, res) {
    try {
      const { id } = req.params;
      const { status } = req.body;
      
      const pedido = await Pedido.findByPk(id);
      
      if (!pedido) {
        return res.status(404).json({
          success: false,
          error: 'Pedido não encontrado'
        });
      }
      
      const statusValidos = ['pendente', 'preparando', 'pronto', 'entregue', 'cancelado'];
      if (!statusValidos.includes(status)) {
        return res.status(400).json({
          success: false,
          error: 'Status inválido'
        });
      }
      
      const updateData = { status };
      
      // Se status for 'entregue', definir dataEntrega
      if (status === 'entregue') {
        updateData.dataEntrega = new Date();
      }
      
      await pedido.update(updateData);
      
      res.json({
        success: true,
        message: 'Status do pedido atualizado com sucesso',
        data: pedido
      });
    } catch (error) {
      res.status(400).json({
        success: false,
        error: 'Erro ao atualizar status do pedido',
        message: error.message
      });
    }
  }

  // Cancelar pedido
  async cancelar(req, res) {
    try {
      const { id } = req.params;
      const pedido = await Pedido.findByPk(id);
      
      if (!pedido) {
        return res.status(404).json({
          success: false,
          error: 'Pedido não encontrado'
        });
      }
      
      if (pedido.status === 'entregue') {
        return res.status(400).json({
          success: false,
          error: 'Não é possível cancelar um pedido já entregue'
        });
      }
      
      await pedido.update({ status: 'cancelado' });
      
      res.json({
        success: true,
        message: 'Pedido cancelado com sucesso',
        data: pedido
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        error: 'Erro ao cancelar pedido',
        message: error.message
      });
    }
  }

  // Deletar pedido
  async deletar(req, res) {
    try {
      const { id } = req.params;
      const pedido = await Pedido.findByPk(id);
      
      if (!pedido) {
        return res.status(404).json({
          success: false,
          error: 'Pedido não encontrado'
        });
      }
      
      await pedido.destroy();
      
      res.json({
        success: true,
        message: 'Pedido deletado com sucesso'
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        error: 'Erro ao deletar pedido',
        message: error.message
      });
    }
  }
}

module.exports = new PedidoController(); 