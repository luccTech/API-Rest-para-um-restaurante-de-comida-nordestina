const { sequelize, Prato } = require('../models');

async function seedPratos() {
  await sequelize.sync();
  const pratos = [
    {
      nome: 'Cuscuz',
      descricao: 'Massa de milho cozida no vapor, o melhor não tem jeito!!!',// sempre em primeiro lugar o cuscuz
      preco: 8.00,
      categoria: 'entrada'
    }, // o restante peguei na internet kakkaka
    { nome: 'Baião de Dois', categoria: 'principal', preco: 25.90, descricao: 'Arroz com feijão verde, queijo coalho e carne seca' },
    { nome: 'Carne de Sol', categoria: 'principal', preco: 32.50, descricao: 'Carne salgada e seca ao sol com mandioca' },
    { nome: 'Vatapá', categoria: 'principal', preco: 28.00, descricao: 'Prato baiano com pão, camarão e leite de coco' },
    { nome: 'Acarajé', categoria: 'entrada', preco: 8.50, descricao: 'Bolinho de feijão fradinho frito no dendê' },
    { nome: 'Moqueca de Peixe', categoria: 'principal', preco: 45.00, descricao: 'Peixe cozido com leite de coco e dendê' },
    { nome: 'Sarapatel', categoria: 'principal', preco: 22.00, descricao: 'Prato pernambucano com vísceras de porco' },
    { nome: 'Buchada de Bode', categoria: 'principal', preco: 35.00, descricao: 'Prato típico do sertão' },
    { nome: 'Tapioca', categoria: 'entrada', preco: 12.00, descricao: 'Massa de goma de mandioca recheada' },
    { nome: 'Queijo Coalho', categoria: 'entrada', preco: 15.00, descricao: 'Queijo típico assado na brasa' },
    { nome: 'Bolo de Rolo', categoria: 'sobremesa', preco: 18.00, descricao: 'Bolo pernambucano com goiabada' },
    { nome: 'Cocada', categoria: 'sobremesa', preco: 6.00, descricao: 'Doce de coco ralado' },
    { nome: 'Caldo de Cana', categoria: 'bebida', preco: 5.00, descricao: 'Suco extraído da cana-de-açúcar' },
    { nome: 'Cajuína', categoria: 'bebida', preco: 7.00, descricao: 'Bebida típica do Piauí' },
    { nome: 'Mungunzá', categoria: 'sobremesa', preco: 12.00, descricao: 'Prato com milho branco e leite de coco' }
  ];
  await Prato.bulkCreate(pratos);
  console.log('Pratos inseridos com sucesso!');
  await sequelize.close();
}

seedPratos(); 