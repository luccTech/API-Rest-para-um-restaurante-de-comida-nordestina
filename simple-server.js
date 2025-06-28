const express = require('express');
const cors = require('cors');
const app = express();
const PORT = 3001;

// Middleware
app.use(cors());
app.use(express.json());

// Dados mockados
const pratos = [
  {
    id: 1,
    nome: 'Baião de Dois',
    descricao: 'Arroz com feijão verde, queijo coalho e carne seca, típico do Ceará',
    preco: 25.90,
    categoria: 'principal',
    disponivel: true
  },
  {
    id: 2,
    nome: 'Carne de Sol',
    descricao: 'Carne salgada e seca ao sol, servida com mandioca e farofa',
    preco: 32.50,
    categoria: 'principal',
    disponivel: true
  },
  {
    id: 3,
    nome: 'Vatapá',
    descricao: 'Prato baiano com pão, camarão, amendoim e leite de coco',
    preco: 28.00,
    categoria: 'principal',
    disponivel: true
  },
  {
    id: 4,
    nome: 'Acarajé',
    descricao: 'Bolinho de feijão fradinho frito no azeite de dendê',
    preco: 8.50,
    categoria: 'entrada',
    disponivel: true
  }
];

const clientes = [
  {
    id: 1,
    nome: 'João Silva',
    cpf: '12345678901',
    email: 'joao.silva@email.com',
    telefone: '(81) 99999-1111'
  },
  {
    id: 2,
    nome: 'Maria Santos',
    cpf: '98765432100',
    email: 'maria.santos@email.com',
    telefone: '(81) 99999-2222'
  }
];

const pedidos = [
  {
    id: 1,
    clienteId: 1,
    status: 'pendente',
    total: 58.40,
    observacoes: 'Sem cebola',
    dataPedido: new Date()
  }
];

// Rotas
app.get('/', (req, res) => {
  res.json({
    message: '🍽️ API do Restaurante Nordestino - Versão Simples',
    version: '1.0.0',
    rotas: {
      pratos: '/api/pratos',
      clientes: '/api/clientes',
      pedidos: '/api/pedidos'
    }
  });
});

// Rotas de Pratos
app.get('/api/pratos', (req, res) => {
  res.json(pratos);
});

app.get('/api/pratos/:id', (req, res) => {
  const prato = pratos.find(p => p.id === parseInt(req.params.id));
  if (!prato) {
    return res.status(404).json({ error: 'Prato não encontrado' });
  }
  res.json(prato);
});

app.post('/api/pratos', (req, res) => {
  const novoPrato = {
    id: pratos.length + 1,
    ...req.body
  };
  pratos.push(novoPrato);
  res.status(201).json(novoPrato);
});

// Rotas de Clientes
app.get('/api/clientes', (req, res) => {
  res.json(clientes);
});

app.get('/api/clientes/:id', (req, res) => {
  const cliente = clientes.find(c => c.id === parseInt(req.params.id));
  if (!cliente) {
    return res.status(404).json({ error: 'Cliente não encontrado' });
  }
  res.json(cliente);
});

app.post('/api/clientes', (req, res) => {
  const novoCliente = {
    id: clientes.length + 1,
    ...req.body
  };
  clientes.push(novoCliente);
  res.status(201).json(novoCliente);
});

// Rotas de Pedidos
app.get('/api/pedidos', (req, res) => {
  res.json(pedidos);
});

app.get('/api/pedidos/:id', (req, res) => {
  const pedido = pedidos.find(p => p.id === parseInt(req.params.id));
  if (!pedido) {
    return res.status(404).json({ error: 'Pedido não encontrado' });
  }
  res.json(pedido);
});

app.post('/api/pedidos', (req, res) => {
  const novoPedido = {
    id: pedidos.length + 1,
    dataPedido: new Date(),
    ...req.body
  };
  pedidos.push(novoPedido);
  res.status(201).json(novoPedido);
});

app.listen(PORT, () => {
  console.log(`🚀 Servidor simples rodando na porta ${PORT}`);
  console.log(`📖 API: http://localhost:${PORT}`);
  console.log('🍽️ Pronto para testar com o Bruno!');
}); 