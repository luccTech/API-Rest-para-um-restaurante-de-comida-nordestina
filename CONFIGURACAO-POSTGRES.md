# 🐘 Configuração PostgreSQL - API Restaurante Nordestino

## 📋 Passos para configurar:

### 1. Instalar PostgreSQL no Kali Linux:
```bash
sudo apt update
sudo apt install postgresql postgresql-contrib
```

### 2. Iniciar o serviço:
```bash
sudo systemctl start postgresql
sudo systemctl enable postgresql
```

### 3. Acessar o PostgreSQL:
```bash
sudo -u postgres psql
```

### 4. Criar banco e usuário:
```sql
CREATE DATABASE restaurante_nordestino;
CREATE USER postgres WITH PASSWORD 'sua_senha';
GRANT ALL PRIVILEGES ON DATABASE restaurante_nordestino TO postgres;
\q
```

### 5. Instalar dependências Node.js:
```bash
npm install
```

### 6. Executar o servidor:
```bash
node app.js
```

## 🎯 Configurações no código:

**Arquivo:** `app.js`
```javascript
const sequelize = new Sequelize('restaurante_nordestino', 'postgres', 'sua_senha', {
  host: 'localhost',
  dialect: 'postgres',
  logging: false
});
```

**Altere:**
- `'sua_senha'` pela senha que você definiu
- `'postgres'` pelo usuário que você criou

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
node app.js
```

Boa sorte! 🍽️ 