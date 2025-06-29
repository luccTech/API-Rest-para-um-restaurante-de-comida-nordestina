module.exports = (sequelize, DataTypes) => {
  const ItemPedido = sequelize.define('ItemPedido', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    pedidoId: { type: DataTypes.INTEGER, allowNull: false },
    pratoId: { type: DataTypes.INTEGER, allowNull: false },
    quantidade: { type: DataTypes.INTEGER, allowNull: false, defaultValue: 1 },
    precoUnitario: { type: DataTypes.DECIMAL(10, 2), allowNull: false },
    subtotal: { type: DataTypes.DECIMAL(10, 2), allowNull: false }
  }, {
    tableName: 'itens_pedido',
    timestamps: true
  });
  return ItemPedido;
}; 