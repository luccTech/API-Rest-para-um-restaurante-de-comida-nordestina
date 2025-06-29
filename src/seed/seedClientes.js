const { sequelize, Cliente } = require('../models');

async function seedClientes() {
  await sequelize.sync();
  const clientes = [
    { nome: 'Maria do Sertão', cpf: '12345678901', email: 'maria@exemplo.com', telefone: '(81) 98888-1111' },
    { nome: 'José Lampião', cpf: '23456789012', email: 'jose@exemplo.com', telefone: '(81) 97777-2222' },
    { nome: 'Chico Nordestino', cpf: '34567890123', email: 'chico@exemplo.com', telefone: '(81) 96666-3333' },
    { nome: 'Severina Flor', cpf: '45678901234', email: 'severina@exemplo.com', telefone: '(81) 95555-4444' },
    { nome: 'Antônio Cuscuz', cpf: '56789012345', email: 'antonio@exemplo.com', telefone: '(81) 94444-5555' }
  ];
  await Cliente.bulkCreate(clientes);
  console.log('Clientes inseridos com sucesso!');
  await sequelize.close();
}

seedClientes(); 