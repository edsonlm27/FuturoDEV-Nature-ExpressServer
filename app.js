// Exercícios-Trello - FuturoDEV-M1-S09

// [M1S09] Ex. 1 -Introdução ao Express
// Crie um novo projeto Node.js.
// Instale o Express.js usando o npm.
// Crie um arquivo app.js e configure um servidor Express básico que escute na porta 3000.

// [M1S09] Ex. 2 - Rotas
// Adicione rotas ao novo projeto:
// Uma rota GET que responda à URL '/sobre' com uma mensagem sobre o seu aplicativo.
// Uma rota GET que responda à URL '/contato' com uma mensagem de contato.

// [M1S09] Ex. 3 - MIddleware
// Crie um middleware que registre informações sobre todas as solicitações recebidas pelo servidor Express.
// Use esse middleware para registrar o método HTTP, a URL e o horário de cada solicitação no console.

// [M1S09] Ex. 4 - Paramêtros
// Defina uma rota GET que aceite um parâmetro de rota, como '/produto/:id', e responda com uma mensagem personalizada, com base no ID do produto fornecido.

// [M1S09] Ex. 5 - Arquivos Estáticos
// Configure o Express para servir arquivos estáticos, como imagens, arquivos CSS e JavaScript, de um diretório específico em seu projeto.

// [M1S09] Ex. 6 - CRUD
// Elabore um CRUD para a rota /users

// Criação (Create):
// Implemente uma rota POST /users que permita adicionar um novo usuário à lista.
// O corpo da solicitação deve conter os dados do usuário a ser adicionado.
// Após adicionar o usuário com sucesso, retorne uma resposta com status 201 (Created) e os dados do usuário recém-criado.
// Leitura (Read):
// Implemente uma rota GET /users que retorne a lista completa de usuários.
// Implemente uma rota GET /users/:id que retorne os detalhes de um usuário específico com base no ID fornecido na URL.
// Se o usuário não for encontrado, retorne uma resposta com status 404 (Not Found).
// Atualização (Update):
// Implemente uma rota PUT /users/:id que permita atualizar os dados de um usuário existente com base no ID fornecido na URL.
// O corpo da solicitação deve conter os novos dados do usuário a serem atualizados.
// Se o usuário não for encontrado, retorne uma resposta com status 404 (Not Found).
// Após atualizar o usuário com sucesso, retorne uma resposta com status 200 (OK) e os dados atualizados do usuário.
// Exclusão (Delete):
// Implemente uma rota DELETE /users/:id que permita excluir um usuário com base no ID fornecido na URL.
// Se o usuário não for encontrado, retorne uma resposta com status 404 (Not Found).
// Após excluir o usuário com sucesso, retorne uma resposta com status 200 (OK) e uma mensagem indicando que o usuário foi excluído.

// Exerc 1 - Introducao ao Express
const express = require("express");
const app = express();
const port = 3000;

let users = [];

// Exerc 3 - Middleware para registrar o horário de cada solicitação recebida
const logHoraMiddleware = (req, res, next) => {
  const horaAtual = new Date().toISOString();
  console.log(
    `[${horaAtual}] Nova solicitação recebida para: ${req.method} ${req.originalUrl}`
  );
  next(); // Chamar next() para passar a solicitação para o próximo middleware
};

app.use(express.json());
app.use(logHoraMiddleware);

// Exerc 2 - Rotas
app.get("/sobre", function (req, res) {
  res.send("Página sobre, com as informações.");
});

app.get("/contato", function (req, res) {
  res.send("Página contato, entre em contato pelo telefone (99)98765-4321");
});

// Exerc 4 - Parâmetros
app.get("/produto/:id", function (req, res) {
  const id = req.params.id;
  res.send(`O produto de id ${id} foi encontrado.`);
});

// Exerc 5 - Arquivos estáticos
app.get("/", function (req, res) {
  res.sendFile(__dirname + "/public/index.html");
});

// Exerc 6 - CRUD para a rota /users

// rota POST /users, para adicionar um novo usuário
app.post("/users", function (req, res) {
  const user = req.body;
  user.id = users.length > 0 ? users[users.length - 1].id + 1 : 1;
  users.push(user);
  res.status(201).send("Usuário adicionada com sucesso!");
});

// rota GET /users, para retornar a lista completa de usuários
app.get("/users", function (req, res) {
  res.json(users);
});

// rota GET /users/:id, para retornar os detalhes de um usuário específico com base no ID fornecido na URL
app.get("/users/:id", function (req, res) {
  const { id } = req.params;
  const user = users.find((user) => user.id === parseInt(id));
  if (!user) {
    res.status(404).send("Pessoa não encontrada!");
    return;
  }
  res.json(user);
});

// rota PUT /users/:id para atualizar os dados de um usuário existente com base no ID fornecido na URL
app.put("/users/:id", function (req, res) {
  const { id } = req.params;
  const newData = req.body;
  const index = users.findIndex((user) => user.id === parseInt(id));
  if (index === -1) {
    res.status(404).send("Pessoa não encontrada!");
    return;
  }
  users[index] = { ...users[index], ...newData };
  res.status(200).send("Pessoa atualizada com sucesso.");
});

// rota DELETE /users/:id para deletar uma pessoa por ID
app.delete("/users/:id", (req, res) => {
  const { id } = req.params;
  const index = users.findIndex((user) => user.id === parseInt(id));
  if (index === -1) {
    res.status(404).send("Usuário não encontrado!");
    return;
  }
  users.splice(index, 1);
  res.status(200).send("Usuário deletado com sucesso!");
});

app.listen(port, function () {
  console.log(`Aplicação rodando na porta ${port}`);
});
