const { Pedido, Cliente, Prato, ItemPedido } = require('../models');

module.exports = {
  async listarTodos(req, res) {
    try {
      const pedidos = await Pedido.findAll({ 
        include: [Cliente],
        order: [['id', 'ASC']] 
      });
      res.json(pedidos);
    } catch (error) {
      console.error('Erro ao listar pedidos:', error);
      res.status(500).json({ error: 'Erro ao listar pedidos' });
    }
  },

  async buscarPorId(req, res) {
    try {
      const pedido = await Pedido.findByPk(req.params.id, {
        include: [Cliente]
      });
      if (!pedido) {
        return res.status(404).json({ error: 'Pedido não encontrado' });
      }
      res.json(pedido);
    } catch (error) {
      console.error('Erro ao buscar pedido:', error);
      res.status(500).json({ error: 'Erro ao buscar pedido' });
    }
  },

  async criar(req, res) {
    try {
      const { clienteId, status, total, observacoes, itens } = req.body;
      
      // Validações
      if (!clienteId) {
        return res.status(400).json({ error: 'ID do cliente é obrigatório' });
      }
      
      // Verificar se o cliente existe
      const cliente = await Cliente.findByPk(clienteId);
      if (!cliente) {
        return res.status(400).json({ error: 'Cliente não encontrado' });
      }
      
      // Calcular total se itens forem fornecidos
      let totalCalculado = total || 0.00;
      if (itens && itens.length > 0) {
        totalCalculado = 0;
        for (const item of itens) {
          const prato = await Prato.findByPk(item.pratoId);
          if (!prato) {
            return res.status(400).json({ error: `Prato com ID ${item.pratoId} não encontrado` });
          }
          if (!prato.disponivel) {
            return res.status(400).json({ error: `Prato ${prato.nome} não está disponível` });
          }
          totalCalculado += prato.preco * (item.quantidade || 1);
        }
      }
      
      const pedido = await Pedido.create({ 
        clienteId, 
        status: status || 'pendente', 
        total: totalCalculado, 
        observacoes 
      });
      
      // Adicionar itens ao pedido se fornecidos
      if (itens && itens.length > 0) {
        for (const item of itens) {
          const prato = await Prato.findByPk(item.pratoId);
          await ItemPedido.create({
            pedidoId: pedido.id,
            pratoId: item.pratoId,
            quantidade: item.quantidade || 1,
            precoUnitario: prato.preco,
            subtotal: prato.preco * (item.quantidade || 1)
          });
        }
      }
      
      // Retornar pedido com dados do cliente
      const pedidoComCliente = await Pedido.findByPk(pedido.id, {
        include: [Cliente]
      });
      
      res.status(201).json(pedidoComCliente);
    } catch (error) {
      console.error('Erro ao criar pedido:', error);
      res.status(500).json({ error: 'Erro ao criar pedido' });
    }
  },

  async atualizarStatus(req, res) {
    try {
      const { status } = req.body;
      const pedido = await Pedido.findByPk(req.params.id);
      
      if (!pedido) {
        return res.status(404).json({ error: 'Pedido não encontrado' });
      }
      
      // Validação do status
      const statusValidos = ['pendente', 'preparando', 'pronto', 'entregue', 'cancelado'];
      if (!statusValidos.includes(status)) {
        return res.status(400).json({ 
          error: 'Status inválido. Use: pendente, preparando, pronto, entregue, cancelado' 
        });
      }
      
      await pedido.update({ status });
      
      // Retornar pedido atualizado com dados do cliente
      const pedidoAtualizado = await Pedido.findByPk(pedido.id, {
        include: [Cliente]
      });
      
      res.json(pedidoAtualizado);
    } catch (error) {
      console.error('Erro ao atualizar status do pedido:', error);
      res.status(500).json({ error: 'Erro ao atualizar status do pedido' });
    }
  },

  async deletar(req, res) {
    try {
      const pedido = await Pedido.findByPk(req.params.id);
      if (!pedido) {
        return res.status(404).json({ error: 'Pedido não encontrado' });
      }
      
      await pedido.destroy();
      res.json({ message: 'Pedido deletado com sucesso' });
    } catch (error) {
      console.error('Erro ao deletar pedido:', error);
      res.status(500).json({ error: 'Erro ao deletar pedido' });
    }
  }
}; 