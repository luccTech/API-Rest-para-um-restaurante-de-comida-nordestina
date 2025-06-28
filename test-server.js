const express = require('express');
const app = express();
const PORT = 3000;

app.use(express.json());

// Rota de teste
app.get('/', (req, res) => {
  res.json({
    message: '🍽️ API do Restaurante Nordestino - Teste',
    status: 'Funcionando!'
  });
});

// Rota para testar pratos
app.get('/api/pratos', (req, res) => {
  res.json([
    {
      id: 1,
      nome: 'Baião de Dois',
      descricao: 'Arroz com feijão verde, queijo coalho e carne seca',
      preco: 25.90,
      categoria: 'principal'
    },
    {
      id: 2,
      nome: 'Carne de Sol',
      descricao: 'Carne salgada e seca ao sol, servida com mandioca',
      preco: 32.50,
      categoria: 'principal'
    }
  ]);
});

app.listen(PORT, () => {
  console.log(`🚀 Servidor de teste rodando na porta ${PORT}`);
  console.log(`📖 Teste: http://localhost:${PORT}`);
}); 