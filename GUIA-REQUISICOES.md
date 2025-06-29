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

#### Listar todos os pedidos:
```
GET http://localhost:3000/api/pedidos
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
  "observacoes": "Sem cebola e com mais pimenta"
}
```