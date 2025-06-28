const { DataTypes, Sequelize } = require('sequelize');
const { cpf } = require('cpf-cnpj-validator');

// Configuração do Sequelize com SQLite
const sequelize = new Sequelize({
  dialect: 'sqlite',
  storage: './database.sqlite',
  logging: false
});

const Cliente = sequelize.define('Cliente', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  nome: {
    type: DataTypes.STRING(100),
    allowNull: false,
    validate: {
      notEmpty: true,
      len: [2, 100]
    }
  },
  cpf: {
    type: DataTypes.STRING(14),
    allowNull: false,
    unique: true,
    validate: {
      notEmpty: true,
      isCPFValid(value) {
        if (!cpf.isValid(value)) {
          throw new Error('CPF inválido');
        }
      }
    }
  },
  email: {
    type: DataTypes.STRING(100),
    allowNull: true,
    validate: {
      isEmail: true
    }
  },
  telefone: {
    type: DataTypes.STRING(15),
    allowNull: true
  },
  ativo: {
    type: DataTypes.BOOLEAN,
    defaultValue: true
  }
}, {
  tableName: 'clientes',
  timestamps: true,
  hooks: {
    beforeCreate: (cliente) => {
      // Formatar CPF (remover caracteres especiais)
      if (cliente.cpf) {
        cliente.cpf = cliente.cpf.replace(/[^\d]/g, '');
      }
    },
    beforeUpdate: (cliente) => {
      // Formatar CPF (remover caracteres especiais)
      if (cliente.cpf) {
        cliente.cpf = cliente.cpf.replace(/[^\d]/g, '');
      }
    }
  }
});

module.exports = Cliente;
module.exports.sequelize = sequelize; 