const { DataTypes, Sequelize } = require('sequelize');

// Configuração do Sequelize com SQLite
const sequelize = new Sequelize({
  dialect: 'sqlite',
  storage: './database.sqlite',
  logging: false
});

const Pedido = sequelize.define('Pedido', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  clienteId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'clientes',
      key: 'id'
    }
  },
  status: {
    type: DataTypes.ENUM('pendente', 'preparando', 'pronto', 'entregue', 'cancelado'),
    defaultValue: 'pendente'
  },
  total: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: false,
    defaultValue: 0.00
  },
  observacoes: {
    type: DataTypes.TEXT,
    allowNull: true
  },
  dataPedido: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW
  },
  dataEntrega: {
    type: DataTypes.DATE,
    allowNull: true
  }
}, {
  tableName: 'pedidos',
  timestamps: true
});

module.exports = Pedido; 