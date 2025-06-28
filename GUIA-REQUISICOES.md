# 🚀 Guia de Requisições - API Restaurante Nordestino

## 📋 Como fazer requisições no Bruno

### 1. Requisições GET (Buscar dados)

#### Ver informações da API:
```
GET http://localhost:3001/
```

#### Listar todos os pratos:
```
GET http://localhost:3001/api/pratos
```

#### Buscar prato específico:
```
GET http://localhost:3001/api/pratos/1
```

#### Listar todos os clientes:
```
GET http://localhost:3001/api/clientes
```

#### Listar todos os pedidos:
```
GET http://localhost:3001/api/pedidos
```

### 2. Requisições POST (Criar dados)

#### Criar novo prato:
```
POST http://localhost:3001/api/pratos
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
POST http://localhost:3001/api/clientes
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
POST http://localhost:3001/api/pedidos
Headers: Content-Type: application/json
Body:
{
  "clienteId": 1,
  "status": "pendente",
  "total": 45.40,
  "observacoes": "Sem cebola e com mais pimenta"
}
```

## 🎯 Passos no Bruno:

1. **Abra o Bruno**
2. **Crie uma nova coleção**
3. **Configure a URL base**: `http://localhost:3001`
4. **Crie requisições** usando os exemplos acima
5. **Para POST**: Adicione o header `Content-Type: application/json`
6. **Para POST**: Adicione o body em formato JSON

## ✅ Teste primeiro:
1. `GET http://localhost:3001/` - Deve retornar informações da API
2. `GET http://localhost:3001/api/pratos` - Deve retornar lista de pratos

Boa sorte! 🍽️ 