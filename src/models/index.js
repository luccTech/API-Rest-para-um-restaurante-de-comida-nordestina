require('dotenv').config();
const { Sequelize, DataTypes } = require('sequelize');
const path = require('path');

const sequelize = new Sequelize({
  dialect: 'sqlite',
  storage: path.join(__dirname, '../../database.sqlite'),
  logging: false
});

const Prato = require('./Prato')(sequelize, DataTypes);
const Cliente = require('./Cliente')(sequelize, DataTypes);
const Pedido = require('./Pedido')(sequelize, DataTypes);
const ItemPedido = require('./ItemPedido')(sequelize, DataTypes);

// Associações
Cliente.hasMany(Pedido, { foreignKey: 'clienteId' });
Pedido.belongsTo(Cliente, { foreignKey: 'clienteId' });

Pedido.hasMany(ItemPedido, { foreignKey: 'pedidoId' });
ItemPedido.belongsTo(Pedido, { foreignKey: 'pedidoId' });

Prato.hasMany(ItemPedido, { foreignKey: 'pratoId' });
ItemPedido.belongsTo(Prato, { foreignKey: 'pratoId' });

// Relacionamento many-to-many entre Pedido e Prato através de ItemPedido
Pedido.belongsToMany(Prato, { through: ItemPedido, foreignKey: 'pedidoId' });
Prato.belongsToMany(Pedido, { through: ItemPedido, foreignKey: 'pratoId' });

module.exports = {
  sequelize,
  Prato,
  Cliente,
  Pedido,
  ItemPedido
}; 