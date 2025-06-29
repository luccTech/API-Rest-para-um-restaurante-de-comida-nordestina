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

// Associações
Cliente.hasMany(Pedido, { foreignKey: 'clienteId' });
Pedido.belongsTo(Cliente, { foreignKey: 'clienteId' });

module.exports = {
  sequelize,
  Prato,
  Cliente,
  Pedido
}; 