module.exports = (sequelize, DataTypes) => {
  const Pedido = sequelize.define('Pedido', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    clienteId: { type: DataTypes.INTEGER, allowNull: false },
    status: { type: DataTypes.ENUM('pendente', 'preparando', 'pronto', 'entregue', 'cancelado'), defaultValue: 'pendente' },
    total: { type: DataTypes.DECIMAL(10, 2), defaultValue: 0.00 },
    observacoes: { type: DataTypes.TEXT }
  }, {
    tableName: 'pedidos',
    timestamps: true
  });
  return Pedido;
}; 