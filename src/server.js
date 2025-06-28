const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');
const { sequelize } = require('./models');
const { seedDatabase } = require('./seeders/seedData');
const clienteRoutes = require('./routes/clienteRoutes');
const pratoRoutes = require('./routes/pratoRoutes');
const pedidoRoutes = require('./routes/pedidoRoutes');
const relatorioRoutes = require('./routes/relatorioRoutes');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware de segurança
app.use(helmet());

// Rate limiting
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutos
  max: 100 // limite de 100 requests por IP
});
app.use(limiter);

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Rotas
app.use('/api/clientes', clienteRoutes);
app.use('/api/pratos', pratoRoutes);
app.use('/api/pedidos', pedidoRoutes);
app.use('/api/relatorios', relatorioRoutes);

// Rota de teste
app.get('/', (req, res) => {
  res.json({
    message: '🍽️ API do Restaurante Nordestino - ADS-Labs',
    version: '1.0.0',
    rotas: {
      clientes: '/api/clientes',
      pratos: '/api/pratos',
      pedidos: '/api/pedidos',
      relatorios: '/api/relatorios'
    }
  });
});

// Middleware de tratamento de erros
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({
    error: 'Erro interno do servidor',
    message: err.message
  });
});

// Middleware para rotas não encontradas
app.use('*', (req, res) => {
  res.status(404).json({
    error: 'Rota não encontrada',
    message: `A rota ${req.originalUrl} não existe`
  });
});

// Inicializar banco de dados e servidor
async function startServer() {
  try {
    await sequelize.sync({ force: false });
    console.log('✅ Banco de dados sincronizado');
    
    // Popular banco com dados de exemplo
    await seedDatabase();
    
    app.listen(PORT, () => {
      console.log(`🚀 Servidor rodando na porta ${PORT}`);
      console.log(`📖 Documentação: http://localhost:${PORT}`);
      console.log('🍽️ API do Restaurante Nordestino pronta para uso!');
    });
  } catch (error) {
    console.error('❌ Erro ao inicializar servidor:', error);
  }
}

startServer(); 