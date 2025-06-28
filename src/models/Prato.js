const { DataTypes, Sequelize } = require('sequelize');

// Configuração do Sequelize com SQLite
const sequelize = new Sequelize({
  dialect: 'sqlite',
  storage: './database.sqlite',
  logging: false
});

const Prato = sequelize.define('Prato', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  nome: {
    type: DataTypes.STRING(50),
    allowNull: false,
    validate: {
      notEmpty: true,
      len: [3, 50],
      isOnlyLetters(value) {
        // Validar se contém apenas letras, espaços e acentos
        const regex = /^[a-zA-ZÀ-ÿ\s]+$/;
        if (!regex.test(value)) {
          throw new Error('Nome do prato deve conter apenas letras');
        }
      }
    }
  },
  descricao: {
    type: DataTypes.TEXT,
    allowNull: true
  },
  preco: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: false,
    validate: {
      min: 0.01
    }
  },
  categoria: {
    type: DataTypes.ENUM('entrada', 'principal', 'sobremesa', 'bebida'),
    allowNull: false,
    defaultValue: 'principal'
  },
  disponivel: {
    type: DataTypes.BOOLEAN,
    defaultValue: true
  },
  imagem: {
    type: DataTypes.STRING(255),
    allowNull: true
  }
}, {
  tableName: 'pratos',
  timestamps: true
});

module.exports = Prato; 