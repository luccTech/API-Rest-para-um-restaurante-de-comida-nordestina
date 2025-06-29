const express = require('express');
const cors = require('cors');
const { sequelize, Prato } = require('./models');
const seedAll = require('./seed/seedAll');

const pratoRoutes = require('./routes/pratoRoutes');
const clienteRoutes = require('./routes/clienteRoutes');
const pedidoRoutes = require('./routes/pedidoRoutes');
const relatorioRoutes = require('./routes/relatorioRoutes');

const app = express();
const PORT = 3000;

// Middleware
app.use(cors());
app.use(express.json());

// Rotas
app.get('/', (req, res) => {
  res.json({
    message: '🍽️ API do Restaurante Nordestino', // a api vai com mts enfeites pq sou do front kakak
    version: '3.0.0',
    rotas: {
      pratos: '/api/pratos',
      clientes: '/api/clientes',
      pedidos: '/api/pedidos',
      relatorios: '/api/relatorios'
    }
  });
});

app.use('/api/pratos', pratoRoutes);
app.use('/api/clientes', clienteRoutes);
app.use('/api/pedidos', pedidoRoutes);
app.use('/api/relatorios', relatorioRoutes);

// Inicializar servidor
async function startServer() {
  try {
    await sequelize.authenticate();
    
    // recriar o banco to usando para meus testes
    await sequelize.sync({ force: true });
    console.log('✅ Banco recriado com sucesso!');
    
    // Popular com todos os dados dos seedAll
    await seedAll();
    
    app.listen(PORT, () => {
      console.log(`🚀 Servidor rodando na porta ${PORT}`);
    });
  } catch (error) {
    console.error('❌ Erro ao iniciar:', error.message);
  }
}

startServer(); 