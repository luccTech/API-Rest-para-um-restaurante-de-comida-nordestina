const { Cliente, Prato, Pedido, ItemPedido } = require('../models');

async function seedData() {
  try {
    console.log('🌱 Populando banco com dados de teste...');

    // Criar clientes
    const cliente1 = await Cliente.create({
      nome: 'João Silva',
      cpf: '12345678901',
      email: 'joao@email.com',
      telefone: '(81) 99999-1111'
    });

    const cliente2 = await Cliente.create({
      nome: 'Maria Santos',
      cpf: '98765432100',
      email: 'maria@email.com',
      telefone: '(81) 99999-2222'
    });

    // Criar pratos
    const prato1 = await Prato.create({
      nome: 'Feijão Tropeiro',
      descricao: 'Feijão com farinha, linguiça e ovos',
      preco: 18.50,
      categoria: 'principal',
      disponivel: true
    });

    const prato2 = await Prato.create({
      nome: 'Carne de Sol',
      descricao: 'Carne de sol com macaxeira',
      preco: 25.00,
      categoria: 'principal',
      disponivel: true
    });

    const prato3 = await Prato.create({
      nome: 'Baião de Dois',
      descricao: 'Arroz com feijão e queijo coalho',
      preco: 20.00,
      categoria: 'principal',
      disponivel: true
    });

    // Criar pedidos
    const pedido1 = await Pedido.create({
      clienteId: cliente1.id,
      status: 'pendente',
      total: 43.50,
      observacoes: 'Sem cebola'
    });

    const pedido2 = await Pedido.create({
      clienteId: cliente2.id,
      status: 'preparando',
      total: 25.00,
      observacoes: 'Com mais pimenta'
    });

    // Criar itens dos pedidos
    await ItemPedido.create({
      pedidoId: pedido1.id,
      pratoId: prato1.id,
      quantidade: 1,
      precoUnitario: 18.50,
      subtotal: 18.50
    });

    await ItemPedido.create({
      pedidoId: pedido1.id,
      pratoId: prato3.id,
      quantidade: 1,
      precoUnitario: 20.00,
      subtotal: 20.00
    });

    await ItemPedido.create({
      pedidoId: pedido1.id,
      pratoId: prato2.id,
      quantidade: 1,
      precoUnitario: 25.00,
      subtotal: 25.00
    });

    await ItemPedido.create({
      pedidoId: pedido2.id,
      pratoId: prato2.id,
      quantidade: 1,
      precoUnitario: 25.00,
      subtotal: 25.00
    });

    console.log('✅ Dados de teste criados com sucesso!');
    console.log(`📊 Resumo: ${await Cliente.count()} clientes, ${await Prato.count()} pratos, ${await Pedido.count()} pedidos`);

  } catch (error) {
    console.error('❌ Erro ao popular dados:', error);
  }
}

module.exports = seedData; 