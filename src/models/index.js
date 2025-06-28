const { Sequelize } = require('sequelize');
const Cliente = require('./Cliente');
const Prato = require('./Prato');
const Pedido = require('./Pedido');
const PedidoPrato = require('./PedidoPrato');

// Usar a instância do sequelize do Cliente (todos usam a mesma)
const sequelize = Cliente.sequelize;

// Definir associações
Cliente.hasMany(Pedido, { foreignKey: 'clienteId' });
Pedido.belongsTo(Cliente, { foreignKey: 'clienteId' });

Pedido.belongsToMany(Prato, { through: PedidoPrato, foreignKey: 'pedidoId' });
Prato.belongsToMany(Pedido, { through: PedidoPrato, foreignKey: 'pratoId' });

module.exports = {
  sequelize,
  Cliente,
  Prato,
  Pedido,
  PedidoPrato
}; 