Claro, aqui está o arquivo README.md atualizado com as rotas (endpoints) utilizadas para teste no Postman:

---

# Sistema de Gerenciamento de Clientes

## Descrição

Este projeto implementa um sistema completo para gerenciamento de clientes, composto por um front-end interativo e um back-end robusto.

## Tecnologias Utilizadas

### Front-end
- **HTML**: Estrutura da página web.
- **JavaScript (scripts.js)**:
  - Gerencia interações do usuário (envio de formulários, etc.).
  - Faz requisições HTTP para o servidor Node.js usando a Fetch API.
  - Atualiza dinamicamente a página sem recarregar.
- **Tailwind CSS**: Framework CSS utilitário para criar designs personalizados sem sair do HTML.

### Back-end
- **Node.js (app.js)**:
  - Define rotas RESTful (GET, POST, PUT, DELETE).
  - Conecta ao banco de dados MySQL usando mysql2.
  - Executa consultas SQL (CRUD).
  - Usa Express para criar o servidor web.
  - Usa Body-parser para manipular dados JSON.

### Banco de Dados
- **MySQL**: Armazena os dados dos clientes.

## Funcionalidades

- Adicionar novos clientes.
- Visualizar lista de clientes.
- Atualizar informações de clientes.
- Excluir clientes.
- Pesquisar clientes.

## Benefícios

- Sistema completo para gerenciamento de clientes.
- Interface amigável e interativa.
- Back-end robusto e seguro.
- Atualizações dinâmicas da página sem recarregar.
- Fácil de usar e implementar.

## Como Usar

1. **Clone o repositório:**
   ```bash
   git clone https://github.com/marconesdb/crud_NodeJs_MySQL.git
   cd crud_NodeJs_MySQL
   ```

2. **Comandos utilizados para instalar as dependências:**

   ```bash
   npm init -y
   ```

   ```bash
   npm install express mysql2 body-parser cors
   ```

3. **Rode o servidor Node.js:**
   ```bash
   cd backend
   node index.js
   ```

4. **Acesse a aplicação em:** [http://localhost:3000](http://localhost:3000).

5. **Crie o banco de dados MySQL e a tabela necessária:**
   ```sql
   CREATE DATABASE nome_do_seu_banco_de_dados;
   USE nome_do_seu_banco_de_dados;
   CREATE TABLE cliente (
       id INT AUTO_INCREMENT PRIMARY KEY,
       nome VARCHAR(255) NOT NULL,
       endereco VARCHAR(255) NOT NULL,
       telefone VARCHAR(20) NOT NULL,
       email VARCHAR(255) NOT NULL,
       cpf VARCHAR(20) NOT NULL
   );
   ```

6. **Configure a senha do seu banco de dados no arquivo `index.js`:**
   ```javascript
   const db = mysql.createConnection({
     host: 'localhost',
     user: 'root',
     password: 'sua_senha_aqui',
     database: 'nome_do_seu_banco_de_dados'
   });
   ```

## Testando Endpoints com Postman

### 1. Listar Todos os Clientes
- **Método:** GET
- **URL:** `http://localhost:3000/cliente`

### 2. Buscar um Cliente pelo ID
- **Método:** GET
- **URL:** `http://localhost:3000/cliente/:id` (substitua `:id` pelo ID do cliente)

### 3. Buscar Clientes pelo Nome
- **Método:** GET
- **URL:** `http://localhost:3000/clientes?nome=John` (substitua `John` pelo nome do cliente)

### 4. Adicionar um Novo Cliente
- **Método:** POST
- **URL:** `http://localhost:3000/cliente`
- **Corpo (Body):**
  ```json
  {
    "nome": "John Doe",
    "endereco": "123 Main St",
    "telefone": "1234567890",
    "email": "john.doe@example.com",
    "cpf": "123.456.789-00"
  }
  ```

### 5. Atualizar um Cliente Existente
- **Método:** PUT
- **URL:** `http://localhost:3000/cliente/:id` (substitua `:id` pelo ID do cliente)
- **Corpo (Body):**
  ```json
  {
    "nome": "Jane Doe",
    "endereco": "456 Elm St",
    "telefone": "0987654321",
    "email": "jane.doe@example.com",
    "cpf": "987.654.321-00"
  }
  ```

### 6. Excluir um Cliente
- **Método:** DELETE
- **URL:** `http://localhost:3000/cliente/:id` (substitua `:id` pelo ID do cliente)

## Observações

- Este projeto é um exemplo básico e pode ser adaptado às suas necessidades específicas.
- Para mais informações, consulte a documentação das tecnologias utilizadas.

## Licença

Este projeto está licenciado sob a licença MIT. Consulte o arquivo LICENSE para obter mais detalhes.

---

Feito com 💻 e ☕ por [Marcone Silva de Brito](https://github.com/marconesdb).

---

Com essas informações, você deve conseguir testar todas as rotas da API utilizando o Postman.