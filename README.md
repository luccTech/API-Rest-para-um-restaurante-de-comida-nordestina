# 🍽️ API REST - Restaurante de Comida Nordestina

🧪 **Desafio ADS-Labs – API de Pratos Nordestinos**

Viso criar uma API para um desafio da ADS-Labs, onde concentro minhas energias aqui mesmo no Nordeste e irei tomar os pratos nordestinos como base para essa aprendizagem. O objetivo aqui é criar uma API que controla pratos e pedidos dos clientes.

O objetivo deste projeto é criar uma **API REST** que controla **pratos típicos nordestinos** e **pedidos de clientes**, simulando o funcionamento de um sistema simples de pedidos.

---

## 🚀 Tecnologias Utilizadas

- ![Node.js](https://img.shields.io/badge/Node.js-339933?style=flat&logo=nodedotjs&logoColor=white)  
- ![Express](https://img.shields.io/badge/Express-000000?style=flat&logo=express&logoColor=white)
- ![Sequelize](https://img.shields.io/badge/Sequelize-52B0E7?style=flat&logo=sequelize&logoColor=white)  
- ![SQLite](https://img.shields.io/badge/SQLite-07405E?style=flat&logo=sqlite&logoColor=white)
- ![Insomnia](https://img.shields.io/badge/Insomnia-4000BF?style=flat&logo=insomnia&logoColor=white)

---

## 📋 Funcionalidades Implementadas

### ✅ Regras de Negócio
- **Validação de CPF**: Todos os clientes devem ter um CPF válido e único
- **Validação de Nomes de Pratos**: Apenas letras, mínimo 3 e máximo 50 caracteres
- **Validação de Preços**: Valores positivos obrigatórios
- **Controle de Disponibilidade**: Pratos podem ser marcados como disponíveis/indisponíveis

### ✅ Operações CRUD Completas
- **Clientes**: Criar, listar, buscar, atualizar e deletar
- **Pratos**: Criar, listar, buscar, atualizar e deletar
- **Pedidos**: Criar, listar, buscar, atualizar status e deletar

### ✅ Relatórios Solicitados
1. **Pratos por Pedidos**: Lista todos os pratos ordenados por quantidade de pedidos
2. **Top 5 Clientes por Pedidos**: Clientes que mais fizeram pedidos
3. **Top 5 Clientes por Gasto**: Clientes que mais gastaram

---

## 🍽️ Pratos Nordestinos Incluídos

| Prato | Categoria | Preço | Descrição |
|-------|-----------|-------|-----------|
| Baião de Dois | Principal | R$ 25,90 | Arroz com feijão verde, queijo coalho e carne seca |
| Carne de Sol | Principal | R$ 32,50 | Carne salgada e seca ao sol com mandioca |
| Vatapá | Principal | R$ 28,00 | Prato baiano com pão, camarão e leite de coco |
| Acarajé | Entrada | R$ 8,50 | Bolinho de feijão fradinho frito no dendê |
| Moqueca de Peixe | Principal | R$ 45,00 | Peixe cozido com leite de coco e dendê |
| Sarapatel | Principal | R$ 22,00 | Prato pernambucano com vísceras de porco |
| Buchada de Bode | Principal | R$ 35,00 | Prato típico do sertão |
| Tapioca | Entrada | R$ 12,00 | Massa de goma de mandioca recheada |
| Cuscuz | Entrada | R$ 8,00 | Massa de milho cozida no vapor |
| Queijo Coalho | Entrada | R$ 15,00 | Queijo típico assado na brasa |
| Bolo de Rolo | Sobremesa | R$ 18,00 | Bolo pernambucano com goiabada |
| Cocada | Sobremesa | R$ 6,00 | Doce de coco ralado |
| Caldo de Cana | Bebida | R$ 5,00 | Suco extraído da cana-de-açúcar |
| Cajuína | Bebida | R$ 7,00 | Bebida típica do Piauí |
| Mungunzá | Sobremesa | R$ 12,00 | Prato com milho branco e leite de coco |

---

## 📚 Documentação da API

A documentação completa está disponível no arquivo `documentacao.txt` na raiz do projeto.

### Principais Endpoints

#### 👥 Clientes
- `GET /api/clientes` - Listar todos os clientes
- `POST /api/clientes` - Criar novo cliente
- `GET /api/clientes/:id` - Buscar cliente por ID
- `PUT /api/clientes/:id` - Atualizar cliente
- `DELETE /api/clientes/:id` - Deletar cliente

#### 🍽️ Pratos
- `GET /api/pratos` - Listar todos os pratos
- `POST /api/pratos` - Criar novo prato
- `GET /api/pratos/:id` - Buscar prato por ID
- `PUT /api/pratos/:id` - Atualizar prato
- `DELETE /api/pratos/:id` - Deletar prato

#### 📋 Pedidos
- `GET /api/pedidos` - Listar todos os pedidos
- `POST /api/pedidos` - Criar novo pedido
- `GET /api/pedidos/:id` - Buscar pedido por ID
- `PATCH /api/pedidos/:id/status` - Atualizar status do pedido

#### 📊 Relatórios
- `GET /api/relatorios/pratos-por-pedidos` - Pratos ordenados por pedidos
- `GET /api/relatorios/top-clientes-pedidos` - Top 5 clientes por pedidos
- `GET /api/relatorios/top-clientes-gasto` - Top 5 clientes por gasto

---

## 🗄️ Estrutura do Banco de Dados

### Tabelas
- **clientes**: Dados dos clientes (nome, CPF, email, telefone)
- **pratos**: Cardápio do restaurante (nome, descrição, preço, categoria)
- **pedidos**: Pedidos dos clientes (cliente, status, total, observações)
- **pedido_pratos**: Relacionamento entre pedidos e pratos (quantidade, preço)

---

## 🔍 Exemplos de Uso

### Criar um Cliente
```bash
POST http://localhost:3000/api/clientes
Headers: Content-Type: application/json
Body:
{
  "nome": "José Pereira",
  "cpf": "11122233344",
  "email": "jose.pereira@email.com",
  "telefone": "(81) 99999-6666"
}
```

### Criar um Pedido
```bash
curl -X POST http://localhost:3000/api/pedidos \
  -H "Content-Type: application/json" \
  -d '{
    "clienteId": 1,
    "pratos": [
      {
        "pratoId": 1,
        "quantidade": 2
      },
      {
        "pratoId": 3,
        "quantidade": 1
      }
    ],
    "observacoes": "Sem cebola no baião"
  }'
```

### Gerar Relatório
```bash
curl http://localhost:3000/api/relatorios/top-clientes-gasto
```

---

## 📝 Licença

Este projeto está sob a licença MIT. Veja o arquivo [LICENSE](LICENSE) para mais detalhes.

---

## 👨‍💻 Autor

**ADS-Labs** - Desafio de desenvolvimento de API REST
**Lucas Barbosa Barreto** - Quem realizou o desafio

---

**🍽️ Sabor do Nordeste em cada linha de código!**
