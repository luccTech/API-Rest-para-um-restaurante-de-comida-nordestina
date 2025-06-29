const { sequelize, Pedido } = require('../models');

async function seedPedidos() {
  await sequelize.sync();
  const pedidos = [
    { clienteId: 1, status: 'pendente', total: 50.90, observacoes: 'Sem cebola no baião' },
    { clienteId: 2, status: 'preparando', total: 32.50, observacoes: 'Adicionar mais queijo' },
    { clienteId: 3, status: 'pronto', total: 18.00, observacoes: 'Retirar coco ralado' },
    { clienteId: 4, status: 'entregue', total: 45.00, observacoes: 'Pouca pimenta' },
    { clienteId: 5, status: 'pendente', total: 22.00, observacoes: 'Sem farinha' }
  ];
  await Pedido.bulkCreate(pedidos);
  console.log('Pedidos inseridos com sucesso!');
  await sequelize.close();
}

seedPedidos(); 