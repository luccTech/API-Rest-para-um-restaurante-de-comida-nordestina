# 🚀 Guia de Requisições - API Restaurante Nordestino

## 📋 Como fazer requisições (estou fazendo no bruno) mas insomia e postman tambem irão funcionar

### 1. Requisições GET (Buscar dados)

#### Ver informações da API:
```
GET http://localhost:3000/
```

#### Listar todos os pratos:
```
GET http://localhost:3000/api/pratos
```

#### Buscar prato específico:
```
GET http://localhost:3000/api/pratos/1
```

#### Listar todos os clientes:
```
GET http://localhost:3000/api/clientes
```

#### Buscar cliente específico:
```
GET http://localhost:3000/api/clientes/1
```

#### Listar todos os pedidos:
```
GET http://localhost:3000/api/pedidos
```

#### Buscar pedido específico:
```
GET http://localhost:3000/api/pedidos/1
```

### 2. Requisições POST (Criar dados)

#### Criar novo prato:
```
POST http://localhost:3000/api/pratos
Headers: Content-Type: application/json
Body:
{
  "nome": "Feijão Tropeiro",
  "descricao": "Feijão com farinha, linguiça e ovos",
  "preco": 18.50,
  "categoria": "principal",
  "disponivel": true
}
```

#### Criar novo cliente:
```
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

#### Criar novo pedido:
```
POST http://localhost:3000/api/pedidos
Headers: Content-Type: application/json
Body:
{
  "clienteId": 1,
  "status": "pendente",
  "total": 45.40,
  "observacoes": "Sem cebola e com mais pimenta",
  "itens": [
    {
      "pratoId": 1,
      "quantidade": 2
    },
    {
      "pratoId": 3,
      "quantidade": 1
    }
  ]
}
```

### 3. Requisições PUT (Atualizar dados)

#### Atualizar cliente:
```
PUT http://localhost:3000/api/clientes/1
Headers: Content-Type: application/json
Body:
{
  "nome": "José Pereira Silva",
  "cpf": "11122233344",
  "email": "jose.silva@email.com",
  "telefone": "(81) 99999-7777"
}
```

#### Atualizar prato:
```
PUT http://localhost:3000/api/pratos/1
Headers: Content-Type: application/json
Body:
{
  "nome": "Feijão Tropeiro Especial",
  "descricao": "Feijão com farinha, linguiça, ovos e bacon",
  "preco": 22.50,
  "categoria": "principal",
  "disponivel": false
}
```

### 4. Requisições PATCH (Atualizar parcialmente)

#### Atualizar status do pedido:
```
PATCH http://localhost:3000/api/pedidos/1/status
Headers: Content-Type: application/json
Body:
{
  "status": "preparando"
}
```

Status válidos: `pendente`, `preparando`, `pronto`, `entregue`, `cancelado`

### 5. Requisições DELETE (Deletar dados)

#### Deletar cliente:
```
DELETE http://localhost:3000/api/clientes/1
```

#### Deletar prato:
```
DELETE http://localhost:3000/api/pratos/1
```

#### Deletar pedido:
```
DELETE http://localhost:3000/api/pedidos/1
```

### 6. Relatórios

#### Pratos ordenados por quantidade de pedidos:
```
GET http://localhost:3000/api/relatorios/pratos-por-pedidos
```

#### Top 5 clientes por quantidade de pedidos:
```
GET http://localhost:3000/api/relatorios/top-clientes-pedidos
```

#### Top 5 clientes por gasto total:
```
GET http://localhost:3000/api/relatorios/top-clientes-gasto
```

## 🔍 Validações Implementadas

### Clientes:
- **CPF obrigatório e único**: Deve ter 11 números
- **Nome obrigatório**: Campo nome é obrigatório

### Pratos:
- **Nome**: Apenas letras, mínimo 3 e máximo 50 caracteres
- **Preço**: Valor positivo obrigatório
- **Disponibilidade**: Campo `disponivel` para controlar se o prato está disponível

### Pedidos:
- **Cliente obrigatório**: Deve referenciar um cliente existente
- **Itens**: Podem incluir pratos com quantidade (opcional)
- **Status**: Valores válidos: pendente, preparando, pronto, entregue, cancelado