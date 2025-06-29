module.exports = (sequelize, DataTypes) => {
  const Prato = sequelize.define('Prato', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    nome: { type: DataTypes.STRING(100), allowNull: false },
    descricao: { type: DataTypes.TEXT },
    preco: { type: DataTypes.DECIMAL(10, 2), allowNull: false },
    categoria: { type: DataTypes.ENUM('entrada', 'principal', 'sobremesa', 'bebida'), defaultValue: 'principal' },
    disponivel: { type: DataTypes.BOOLEAN, defaultValue: true }
  }, {
    tableName: 'pratos',
    timestamps: true
  });
  return Prato;
}; 