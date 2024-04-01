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

const express = require("express");
const app = express();
const port = 3000;

app.get("/sobre", function (req, res) {
  res.send("Página sobre, com as informações.");
});

app.get("/contato", function (req, res) {
  res.send("Página contato, entre em contato pelo telefone (99)98765-4321");
});

app.get("/produto/:id", function (req, res) {
  const id = req.params.id;
  res.send(`O produto de id ${id} foi encontrado.`);
});

app.listen(port, function () {
  console.log(`Aplicação rodando na porta ${3000}`);
});
