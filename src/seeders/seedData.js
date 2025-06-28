const { Cliente, Prato } = require('../models');

const pratosNordestinos = [
  {
    nome: 'Baião de Dois',
    descricao: 'Arroz com feijão verde, queijo coalho e carne seca, típico do Ceará',
    preco: 25.90,
    categoria: 'principal',
    imagem: 'https://example.com/baião-de-dois.jpg'
  },
  {
    nome: 'Carne de Sol',
    descricao: 'Carne salgada e seca ao sol, servida com mandioca e farofa',
    preco: 32.50,
    categoria: 'principal',
    imagem: 'https://example.com/carne-de-sol.jpg'
  },
  {
    nome: 'Vatapá',
    descricao: 'Prato baiano com pão, camarão, amendoim e leite de coco',
    preco: 28.00,
    categoria: 'principal',
    imagem: 'https://example.com/vatapá.jpg'
  },
  {
    nome: 'Acarajé',
    descricao: 'Bolinho de feijão fradinho frito no azeite de dendê, recheado com vatapá',
    preco: 8.50,
    categoria: 'entrada',
    imagem: 'https://example.com/acarajé.jpg'
  },
  {
    nome: 'Moqueca de Peixe',
    descricao: 'Peixe cozido com leite de coco, dendê e temperos baianos',
    preco: 45.00,
    categoria: 'principal',
    imagem: 'https://example.com/moqueca.jpg'
  },
  {
    nome: 'Sarapatel',
    descricao: 'Prato pernambucano com vísceras de porco e sangue',
    preco: 22.00,
    categoria: 'principal',
    imagem: 'https://example.com/sarapatel.jpg'
  },
  {
    nome: 'Buchada de Bode',
    descricao: 'Prato típico do sertão com vísceras de bode',
    preco: 35.00,
    categoria: 'principal',
    imagem: 'https://example.com/buchada.jpg'
  },
  {
    nome: 'Tapioca',
    descricao: 'Massa de goma de mandioca recheada com diversos sabores',
    preco: 12.00,
    categoria: 'entrada',
    imagem: 'https://example.com/tapioca.jpg'
  },
  {
    nome: 'Cuscuz',
    descricao: 'Massa de milho cozida no vapor, servida com manteiga',
    preco: 8.00,
    categoria: 'entrada',
    imagem: 'https://example.com/cuscuz.jpg'
  },
  {
    nome: 'Queijo Coalho',
    descricao: 'Queijo típico do Nordeste, assado na brasa',
    preco: 15.00,
    categoria: 'entrada',
    imagem: 'https://example.com/queijo-coalho.jpg'
  },
  {
    nome: 'Bolo de Rolo',
    descricao: 'Bolo pernambucano com massa fina enrolada com goiabada',
    preco: 18.00,
    categoria: 'sobremesa',
    imagem: 'https://example.com/bolo-de-rolo.jpg'
  },
  {
    nome: 'Cocada',
    descricao: 'Doce de coco ralado com açúcar, típico do Nordeste',
    preco: 6.00,
    categoria: 'sobremesa',
    imagem: 'https://example.com/cocada.jpg'
  },
  {
    nome: 'Caldo de Cana',
    descricao: 'Suco extraído da cana-de-açúcar',
    preco: 5.00,
    categoria: 'bebida',
    imagem: 'https://example.com/caldo-de-cana.jpg'
  },
  {
    nome: 'Cajuína',
    descricao: 'Bebida típica do Piauí feita com caju',
    preco: 7.00,
    categoria: 'bebida',
    imagem: 'https://example.com/cajuína.jpg'
  },
  {
    nome: 'Mungunzá',
    descricao: 'Prato com milho branco, leite de coco e açúcar',
    preco: 12.00,
    categoria: 'sobremesa',
    imagem: 'https://example.com/mungunzá.jpg'
  }
];

const clientesExemplo = [
  {
    nome: 'João Silva',
    cpf: '12345678901',
    email: 'joao.silva@email.com',
    telefone: '(81) 99999-1111'
  },
  {
    nome: 'Maria Santos',
    cpf: '98765432100',
    email: 'maria.santos@email.com',
    telefone: '(81) 99999-2222'
  },
  {
    nome: 'Pedro Oliveira',
    cpf: '11122233344',
    email: 'pedro.oliveira@email.com',
    telefone: '(81) 99999-3333'
  },
  {
    nome: 'Ana Costa',
    cpf: '55566677788',
    email: 'ana.costa@email.com',
    telefone: '(81) 99999-4444'
  },
  {
    nome: 'Carlos Ferreira',
    cpf: '99988877766',
    email: 'carlos.ferreira@email.com',
    telefone: '(81) 99999-5555'
  }
];

async function seedDatabase() {
  try {
    console.log('🌱 Iniciando população do banco de dados...');
    
    // Criar pratos
    console.log('📝 Criando pratos nordestinos...');
    for (const prato of pratosNordestinos) {
      await Prato.findOrCreate({
        where: { nome: prato.nome },
        defaults: prato
      });
    }
    
    // Criar clientes
    console.log('👥 Criando clientes de exemplo...');
    for (const cliente of clientesExemplo) {
      await Cliente.findOrCreate({
        where: { cpf: cliente.cpf },
        defaults: cliente
      });
    }
    
    console.log('✅ Banco de dados populado com sucesso!');
    console.log(`🍽️ ${pratosNordestinos.length} pratos criados`);
    console.log(`👥 ${clientesExemplo.length} clientes criados`);
    
  } catch (error) {
    console.error('❌ Erro ao popular banco de dados:', error);
  }
}

module.exports = { seedDatabase }; 