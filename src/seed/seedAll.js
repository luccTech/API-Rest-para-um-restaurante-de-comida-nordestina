const { sequelize, Cliente, Prato, Pedido, ItemPedido } = require('../models');

async function seedAll() {
  try {
    console.log('🌱 Iniciando população completa do banco...');

    // 1. Seed de Clientes
    console.log('👥 Criando clientes...');
    const clientes = [
      { nome: 'Maria do Sertão', cpf: '12345678901', email: 'maria@exemplo.com', telefone: '(81) 98888-1111' },
      { nome: 'José Lampião', cpf: '23456789012', email: 'jose@exemplo.com', telefone: '(81) 97777-2222' },
      { nome: 'Chico Nordestino', cpf: '34567890123', email: 'chico@exemplo.com', telefone: '(81) 96666-3333' },
      { nome: 'Severina Flor', cpf: '45678901234', email: 'severina@exemplo.com', telefone: '(81) 95555-4444' },
      { nome: 'Antônio Cuscuz', cpf: '56789012345', email: 'antonio@exemplo.com', telefone: '(81) 94444-5555' }
    ];
    await Cliente.bulkCreate(clientes);
    console.log('✅ 5 clientes criados');

    // 2. Seed de Pratos
    console.log('🍽️ Criando pratos...');
    const pratos = [
      { nome: 'Cuscuz', descricao: 'Massa de milho cozida no vapor, o melhor não tem jeito!!!', preco: 8.00, categoria: 'entrada', disponivel: true },
      { nome: 'Baião de Dois', categoria: 'principal', preco: 25.90, descricao: 'Arroz com feijão verde, queijo coalho e carne seca', disponivel: true },
      { nome: 'Carne de Sol', categoria: 'principal', preco: 32.50, descricao: 'Carne salgada e seca ao sol com mandioca', disponivel: true },
      { nome: 'Vatapá', categoria: 'principal', preco: 28.00, descricao: 'Prato baiano com pão, camarão e leite de coco', disponivel: true },
      { nome: 'Acarajé', categoria: 'entrada', preco: 8.50, descricao: 'Bolinho de feijão fradinho frito no dendê', disponivel: true },
      { nome: 'Moqueca de Peixe', categoria: 'principal', preco: 45.00, descricao: 'Peixe cozido com leite de coco e dendê', disponivel: true },
      { nome: 'Sarapatel', categoria: 'principal', preco: 22.00, descricao: 'Prato pernambucano com vísceras de porco', disponivel: true },
      { nome: 'Buchada de Bode', categoria: 'principal', preco: 35.00, descricao: 'Prato típico do sertão', disponivel: true },
      { nome: 'Tapioca', categoria: 'entrada', preco: 12.00, descricao: 'Massa de goma de mandioca recheada', disponivel: true },
      { nome: 'Queijo Coalho', categoria: 'entrada', preco: 15.00, descricao: 'Queijo típico assado na brasa', disponivel: true },
      { nome: 'Bolo de Rolo', categoria: 'sobremesa', preco: 18.00, descricao: 'Bolo pernambucano com goiabada', disponivel: true },
      { nome: 'Cocada', categoria: 'sobremesa', preco: 6.00, descricao: 'Doce de coco ralado', disponivel: true },
      { nome: 'Caldo de Cana', categoria: 'bebida', preco: 5.00, descricao: 'Suco extraído da cana-de-açúcar', disponivel: true },
      { nome: 'Cajuína', categoria: 'bebida', preco: 7.00, descricao: 'Bebida típica do Piauí', disponivel: true },
      { nome: 'Mungunzá', categoria: 'sobremesa', preco: 12.00, descricao: 'Prato com milho branco e leite de coco', disponivel: true }
    ];
    await Prato.bulkCreate(pratos);
    console.log('✅ 15 pratos criados');

    // 3. Seed de Pedidos
    console.log('📋 Criando pedidos...');
    const pedidos = [
      { clienteId: 1, status: 'pendente', total: 50.90, observacoes: 'Sem cebola no baião' },
      { clienteId: 2, status: 'preparando', total: 32.50, observacoes: 'Adicionar mais queijo' },
      { clienteId: 3, status: 'pronto', total: 18.00, observacoes: 'Retirar coco ralado' },
      { clienteId: 4, status: 'entregue', total: 45.00, observacoes: 'Pouca pimenta' },
      { clienteId: 5, status: 'pendente', total: 22.00, observacoes: 'Sem farinha' }
    ];
    await Pedido.bulkCreate(pedidos);
    console.log('✅ 5 pedidos criados');

    // 4. Seed de Itens dos Pedidos
    console.log('🛒 Criando itens dos pedidos...');
    const itensPedidos = [
      // Pedido 1 - Maria do Sertão (Baião de Dois + Cuscuz)
      { pedidoId: 1, pratoId: 2, quantidade: 1, precoUnitario: 25.90, subtotal: 25.90 },
      { pedidoId: 1, pratoId: 1, quantidade: 1, precoUnitario: 8.00, subtotal: 8.00 },
      { pedidoId: 1, pratoId: 10, quantidade: 1, precoUnitario: 15.00, subtotal: 15.00 },
      { pedidoId: 1, pratoId: 13, quantidade: 1, precoUnitario: 5.00, subtotal: 5.00 },

      // Pedido 2 - José Lampião (Carne de Sol)
      { pedidoId: 2, pratoId: 3, quantidade: 1, precoUnitario: 32.50, subtotal: 32.50 },

      // Pedido 3 - Chico Nordestino (Bolo de Rolo)
      { pedidoId: 3, pratoId: 11, quantidade: 1, precoUnitario: 18.00, subtotal: 18.00 },

      // Pedido 4 - Severina Flor (Moqueca de Peixe)
      { pedidoId: 4, pratoId: 6, quantidade: 1, precoUnitario: 45.00, subtotal: 45.00 },

      // Pedido 5 - Antônio Cuscuz (Sarapatel)
      { pedidoId: 5, pratoId: 7, quantidade: 1, precoUnitario: 22.00, subtotal: 22.00 }
    ];
    await ItemPedido.bulkCreate(itensPedidos);
    console.log('✅ 8 itens de pedidos criados');

    console.log('População completa finalizada!');
    console.log(`Resumo: ${await Cliente.count()} clientes, ${await Prato.count()} pratos, ${await Pedido.count()} pedidos, ${await ItemPedido.count()} itens`);

  } catch (error) {
    console.error('❌ Erro ao popular banco:', error);
  }
}

module.exports = seedAll; 