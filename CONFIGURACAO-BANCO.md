# 🗄️ Configuração Banco de Dados - API Restaurante Nordestino

## 📋 Configuração Atual (SQLite):

### 1. Instalar dependências Node.js:
```bash
npm install
```

### 2. Executar o servidor:
```bash
npm start
```

## 🎯 Configurações no código:

**Arquivo:** `src/models/index.js`
```javascript
const sequelize = new Sequelize({
  dialect: 'sqlite',
  storage: path.join(__dirname, '../../database.sqlite'),
  logging: false
});
```

**Banco de dados:** SQLite (arquivo local `database.sqlite`)

## 🍽️ Pratos que serão inseridos (Cuscuz em primeiro!):

1. **Cuscuz** - R$ 8,00 (entrada)
2. Baião de Dois - R$ 25,90 (principal)
3. Carne de Sol - R$ 32,50 (principal)
4. Vatapá - R$ 28,00 (principal)
5. Acarajé - R$ 8,50 (entrada)
6. Tapioca - R$ 12,00 (entrada)
7. Bolo de Rolo - R$ 18,00 (sobremesa)
8. Caldo de Cana - R$ 5,00 (bebida)

## 🚀 Rotas disponíveis:

- `GET /` - Info da API
- `GET /api/pratos` - Listar pratos
- `GET /api/pratos/:id` - Buscar prato
- `POST /api/pratos` - Criar prato
- `GET /api/clientes` - Listar clientes
- `POST /api/clientes` - Criar cliente
- `GET /api/pedidos` - Listar pedidos
- `POST /api/pedidos` - Criar pedido

## 🎯 Comandos úteis:

```bash
# Executar servidor
npm start

# Executar em modo desenvolvimento
npm run dev

# Executar diretamente
node src/app.js
```

## 🔄 Para usar PostgreSQL (opcional):

Se quiser usar PostgreSQL em vez de SQLite:

1. Instalar PostgreSQL:
```bash
sudo apt update
sudo apt install postgresql postgresql-contrib
```

2. Configurar banco:
```bash
sudo -u postgres psql
CREATE DATABASE restaurante_nordestino;
CREATE USER postgres WITH PASSWORD 'sua_senha';
GRANT ALL PRIVILEGES ON DATABASE restaurante_nordestino TO postgres;
\q
```

3. Alterar configuração em `src/models/index.js`:
```javascript
const sequelize = new Sequelize(
  process.env.DB_NAME || 'restaurante_nordestino',
  process.env.DB_USERNAME || 'postgres',
  process.env.DB_PASSWORD || 'sua_senha',
  {
    host: process.env.DB_HOST || 'localhost',
    port: process.env.DB_PORT || 5432,
    dialect: 'postgres',
    logging: false
  }
);
```

Boa sorte! 🍽️ 