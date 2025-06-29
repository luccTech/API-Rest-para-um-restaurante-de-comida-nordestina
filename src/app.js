const express = require('express');
const cors = require('cors');
const { sequelize, Prato } = require('./models');

const pratoRoutes = require('./routes/pratoRoutes');
const clienteRoutes = require('./routes/clienteRoutes');
const pedidoRoutes = require('./routes/pedidoRoutes');

const app = express();
const PORT = 3000;

// Middleware
app.use(cors());
app.use(express.json());

// Rotas
app.get('/', (req, res) => {
  res.json({
    message: '🍽️ API do Restaurante Nordestino',
    version: '3.0.0',
    rotas: {
      pratos: '/api/pratos',
      clientes: '/api/clientes',
      pedidos: '/api/pedidos'
    }
  });
});

app.use('/api/pratos', pratoRoutes);
app.use('/api/clientes', clienteRoutes);
app.use('/api/pedidos', pedidoRoutes);

// Inicializar servidor
async function startServer() {
  try {
    await sequelize.authenticate();
    await sequelize.sync();
    console.log('✅ Banco sincronizado!');
    app.listen(PORT, () => {
      console.log(`🚀 Servidor rodando na porta ${PORT}`);
    });
  } catch (error) {
    console.error('❌ Erro ao iniciar:', error.message);
  }
}

startServer(); 