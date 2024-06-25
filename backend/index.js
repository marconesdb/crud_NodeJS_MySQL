/*
Explicação Geral
Módulos Importados:

express: Framework para construir aplicações web e APIs em Node.js.
mysql2: Biblioteca para interagir com um banco de dados MySQL.
bodyParser: Middleware para analisar corpos de requisições HTTP.
cors: Middleware para habilitar CORS (Cross-Origin Resource Sharing).
Configuração do Servidor:

Cria uma instância do aplicativo express.
Define a porta do servidor como 3000.
Configura middlewares para analisar JSON, habilitar CORS e servir arquivos estáticos.
Configuração do Banco de Dados:

Cria uma conexão com um banco de dados MySQL.
Tenta conectar ao banco de dados e exibe uma mensagem no console indicando sucesso ou erro.
Rotas da API:

GET /cliente: Retorna todos os clientes.
GET /clientes: Retorna clientes que correspondem ao nome pesquisado.
POST /cliente: Adiciona um novo cliente.
PUT /cliente/:id: Atualiza um cliente existente pelo ID.
DELETE /cliente/:id: Exclui um cliente pelo ID.
Inicialização do Servidor:

Inicia o servidor para escutar na porta especificada e exibe uma mensagem no console quando o servidor está rodando.
Esse código configura um servidor Node.js com uma API RESTful para gerenciar um CRUD de clientes, conectando-se a um banco de dados MySQL e permitindo operações de criação, leitura, atualização e exclusão de registros de clientes.
*/

// Importação de módulos e configuração do servidor

// Importação de módulos e configuração do servidor

// Importa o módulo express para criar o servidor web
const express = require('express');

// Importa o módulo mysql2 para conectar ao banco de dados MySQL
const mysql = require('mysql2');

// Importa o módulo body-parser para analisar os corpos das requisições JSON
const bodyParser = require('body-parser');

// Importa o módulo cors para permitir requisições de diferentes origens
const cors = require('cors');

// Cria uma aplicação express
const app = express();

// Define a porta na qual o servidor vai escutar
const port = 3000;

// Configura o body-parser para analisar corpos das requisições no formato JSON
app.use(bodyParser.json());

// Configura o CORS para permitir requisições de qualquer origem
app.use(cors());

// Serve arquivos estáticos da pasta 'frontend'
app.use(express.static('../frontend'));

// Configuração do banco de dados

// Cria uma conexão com o banco de dados MySQL
const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '123456M*',
  database: 'crud_nodejs_mysql'
});

// Conecta ao banco de dados
db.connect(err => {
  if (err) {
    // Exibe um erro no console caso a conexão falhe
    console.error('Erro ao conectar ao banco de dados:', err);
    return;
  }
  // Exibe uma mensagem no console caso a conexão seja bem-sucedida
  console.log('Conectado ao banco de dados MySQL');
});

// Definição das rotas da API

// Rota para listar todos os clientes
app.get('/cliente', (req, res) => {
  db.query('SELECT * FROM cliente', (err, results) => {
    if (err) {
      // Envia um status 500 e o erro caso ocorra algum problema na consulta
      return res.status(500).send(err);
    }
    // Retorna os resultados da consulta em formato JSON
    res.json(results);
  });
});

// Rota para buscar um cliente pelo ID
app.get('/cliente/:id', (req, res) => {
  const { id } = req.params;
  db.query('SELECT * FROM cliente WHERE id = ?', [id], (err, results) => {
    if (err) {
      return res.status(500).send(err);
    }
    if (results.length === 0) {
      return res.status(404).send('Cliente não encontrado');
    }
    res.json(results[0]);
  });
});


// Rota para buscar clientes pelo nome
app.get('/clientes', (req, res) => { // Alterado para '/clientes'
  const { nome } = req.query; // Obtém o parâmetro de consulta 'nome'
  let sql = 'SELECT * FROM cliente';
  let params = [];

  if (nome) {
    // Adiciona condição para filtrar clientes pelo nome
    sql += ' WHERE nome LIKE ?';
    params = [`%${nome}%`];
  }

  db.query(sql, params, (err, results) => {
    if (err) {
      // Envia um status 500 e o erro caso ocorra algum problema na consulta
      return res.status(500).send(err);
    }
    // Retorna os resultados da consulta em formato JSON
    res.json(results);
  });
});

// Rota para adicionar um novo cliente
app.post('/cliente', (req, res) => {
  const { nome, endereco, telefone, email, cpf } = req.body;
  db.query('INSERT INTO cliente (nome, endereco, telefone, email, cpf) VALUES (?, ?, ?, ?, ?)', [nome, endereco, telefone, email, cpf], (err, results) => {
    if (err) {
      // Envia um status 500 e o erro caso ocorra algum problema na inserção
      return res.status(500).send(err);
    }
    // Envia uma mensagem de sucesso
    res.send('Cliente adicionado com sucesso!');
  });
});

// Rota para atualizar um cliente existente
app.put('/cliente/:id', (req, res) => {
  const { id } = req.params; // Obtém o ID do cliente a ser atualizado
  const { nome, endereco, telefone, email, cpf } = req.body;
  db.query(
    'UPDATE cliente SET nome = ?, endereco = ?, telefone = ?, email = ?, cpf = ? WHERE id = ?',
    [nome, endereco, telefone, email, cpf, id],
    (err, results) => {
      if (err) {
        // Envia um status 500 e o erro caso ocorra algum problema na atualização
        return res.status(500).send(err);
      }
      // Verifica se algum registro foi afetado
      if (results.affectedRows === 0) {
        return res.status(404).send('Cliente não encontrado para atualização');
      }
      // Envia uma mensagem de sucesso
      res.send('Cliente atualizado com sucesso!');
    }
  );
});

// Rota para excluir um cliente
app.delete('/cliente/:id', (req, res) => {
  const { id } = req.params; // Obtém o ID do cliente a ser excluído
  db.query('DELETE FROM cliente WHERE id = ?', [id], (err, results) => {
    if (err) {
      // Envia um status 500 e o erro caso ocorra algum problema na exclusão
      return res.status(500).send(err);
    }
    // Envia uma mensagem de sucesso
    res.send('Cliente excluído com sucesso!');
  });
});

// Inicialização do servidor

// Rota para servir o arquivo index.html na raiz
app.get('/', (req, res) => {
  res.sendFile('index.html', { root: '../frontend' });
});

// Inicia o servidor e faz com que ele escute na porta especificada
app.listen(port, () => {
  console.log(`Servidor rodando na porta ${port}`);
});
