module.exports = (sequelize, DataTypes) => {
  const Cliente = sequelize.define('Cliente', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    nome: { type: DataTypes.STRING(100), allowNull: false },
    cpf: { type: DataTypes.STRING(14), unique: true },
    email: { type: DataTypes.STRING(100) },
    telefone: { type: DataTypes.STRING(15) }
  }, {
    tableName: 'clientes',
    timestamps: true
  });
  return Cliente;
}; 