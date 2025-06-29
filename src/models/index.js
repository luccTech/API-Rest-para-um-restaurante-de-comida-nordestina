require('dotenv').config();
const { Sequelize, DataTypes } = require('sequelize');

const sequelize = new Sequelize(
  process.env.DB_NAME || 'restaurante_nordestino',
  process.env.DB_USERNAME || 'postgres',
  process.env.DB_PASSWORD || 'sua_senha',
  {
    host: process.env.DB_HOST || 'localhost',
    port: process.env.DB_PORT || 5432,
    dialect: 'postgres',
    logging: false
  }
);

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