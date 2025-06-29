const { Prato, Pedido, Cliente, ItemPedido, sequelize } = require('../models');

module.exports = {
  async pratosPorPedidos(req, res) {
    try {
      // Buscar todos os pratos
      const pratos = await Prato.findAll({
        attributes: ['id', 'nome', 'preco', 'categoria', 'disponivel']
      });

      // Para cada prato, contar quantos itens de pedido existem
      const pratosComContagem = await Promise.all(
        pratos.map(async (prato) => {
          const quantidadePedidos = await ItemPedido.count({
            where: { pratoId: prato.id }
          });
          
          return {
            ...prato.toJSON(),
            quantidadePedidos
          };
        })
      );

      // Ordenar por quantidade de pedidos (decrescente)
      pratosComContagem.sort((a, b) => b.quantidadePedidos - a.quantidadePedidos);

      res.json(pratosComContagem);
    } catch (error) {
      console.error('Erro no relatório pratos por pedidos:', error);
      res.status(500).json({ error: 'Erro ao gerar relatório de pratos por pedidos' });
    }
  },

  async topClientesPorPedidos(req, res) {
    try {
      // Buscar todos os clientes
      const clientes = await Cliente.findAll({
        attributes: ['id', 'nome', 'cpf', 'email']
      });

      // Para cada cliente, contar quantos pedidos existem
      const clientesComContagem = await Promise.all(
        clientes.map(async (cliente) => {
          const quantidadePedidos = await Pedido.count({
            where: { clienteId: cliente.id }
          });
          
          return {
            ...cliente.toJSON(),
            quantidadePedidos
          };
        })
      );

      // Ordenar por quantidade de pedidos (decrescente) e pegar top 5
      clientesComContagem.sort((a, b) => b.quantidadePedidos - a.quantidadePedidos);
      const top5 = clientesComContagem.slice(0, 5);

      res.json(top5);
    } catch (error) {
      console.error('Erro no relatório top clientes por pedidos:', error);
      res.status(500).json({ error: 'Erro ao gerar relatório de top clientes por pedidos' });
    }
  },

  async topClientesPorGasto(req, res) {
    try {
      // Buscar todos os clientes
      const clientes = await Cliente.findAll({
        attributes: ['id', 'nome', 'cpf', 'email']
      });

      // Para cada cliente, calcular total gasto e quantidade de pedidos
      const clientesComGasto = await Promise.all(
        clientes.map(async (cliente) => {
          const pedidos = await Pedido.findAll({
            where: { clienteId: cliente.id },
            attributes: ['total']
          });
          
          const totalGasto = pedidos.reduce((sum, pedido) => sum + parseFloat(pedido.total), 0);
          const quantidadePedidos = pedidos.length;
          
          return {
            ...cliente.toJSON(),
            totalGasto,
            quantidadePedidos
          };
        })
      );

      // Ordenar por total gasto (decrescente) e pegar top 5
      clientesComGasto.sort((a, b) => b.totalGasto - a.totalGasto);
      const top5 = clientesComGasto.slice(0, 5);

      res.json(top5);
    } catch (error) {
      console.error('Erro no relatório top clientes por gasto:', error);
      res.status(500).json({ error: 'Erro ao gerar relatório de top clientes por gasto' });
    }
  }
}; 