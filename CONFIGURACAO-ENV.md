# 🔧 Configuração com Variáveis de Ambiente

## 📋 Passos para configurar:

### 1. Instalar PostgreSQL:
```bash
sudo apt update
sudo apt install postgresql postgresql-contrib
sudo systemctl start postgresql
sudo systemctl enable postgresql
```

### 2. Criar banco de dados:
```bash
sudo -u postgres psql
CREATE DATABASE restaurante_nordestino;
CREATE USER postgres WITH PASSWORD 'sua_senha';
GRANT ALL PRIVILEGES ON DATABASE restaurante_nordestino TO postgres;
\q
```

### 3. Configurar variáveis de ambiente:
```bash
# Copiar o arquivo de exemplo
cp env-example.txt .env

# Editar o arquivo .env com suas configurações
nano .env
```

### 4. Conteúdo do arquivo .env:
```env
SECRET_KEY=chave_secreta_restaurante_nordestino

#DB
DB_USERNAME=postgres
DB_PASSWORD=sua_senha_aqui
DB_HOST=localhost
DB_PORT=5432
DB_NAME=restaurante_nordestino
```

### 5. Instalar dependências:
```bash
npm install
```

### 6. Executar o servidor:
```bash
npm start
```

## 🎯 Estrutura do projeto:
```
src/
  app.js              # Servidor principal
  models/
    index.js          # Configuração do Sequelize
    Prato.js          # Modelo Prato
    Cliente.js        # Modelo Cliente
    Pedido.js         # Modelo Pedido
  controllers/
    pratoController.js
    clienteController.js
    pedidoController.js
  routes/
    pratoRoutes.js
    clienteRoutes.js
    pedidoRoutes.js
.env                  # Variáveis de ambiente
```

## 🚀 Rotas disponíveis:
- `GET /` - Info da API
- `GET /api/pratos` - Listar pratos
- `GET /api/pratos/:id` - Buscar prato
- `POST /api/pratos` - Criar prato
- `GET /api/clientes` - Listar clientes
- `POST /api/clientes` - Criar cliente
- `GET /api/pedidos` - Listar pedidos
- `POST /api/pedidos` - Criar pedido

## 🍽️ Cuscuz sempre em primeiro!
O primeiro prato inserido será sempre o Cuscuz! 🥳 