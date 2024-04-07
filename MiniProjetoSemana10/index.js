// [M1S10] Mini-Projeto nº 1 - Produtos

// Instruções do Exercício:
// 1	Funcionalidades do CRUD:
// - Criar Produto:
// Crie uma rota POST para adicionar um novo produto.
// A rota deve receber um JSON com os dados do produto (por exemplo, nome, preço, descrição) para esta rota.
// O servidor deve validar os dados recebidos e adicionar o produto a uma lista temporária.

// - Listar Produtos:
// Crie uma rota GET para obter todos os produtos.
// O servidor deve retornar a lista de produtos em formato JSON.

// - Atualizar Produto:
// Crie uma rota PUT para atualizar um produto existente.
// A rota deve receber um JSON com os dados atualizados do produto, incluindo o ID do produto a ser atualizado.
// O servidor deve encontrar o produto na lista pelo ID e atualizar seus dados.

// - Excluir Produto:
// Crie uma rota DELETE para excluir um produto existente.
// A rota deve receber o ID do produto a ser excluído.
// O servidor deve encontrar o produto na lista pelo ID e removê-lo.

// 2	Testando com o Postman:
// Monte uma coleção no Postman para realizar as operações CRUD.
// As rotas devem enviar requisições para as rotas criadas, usando os métodos HTTP corretos (POST, GET, PUT, DELETE).

// 3	Aplicando Middlewares:
// Adicione Middlewares nas rotas para logar as informações de cada chamada realizada

// 4	Recursos Adicionais (opcional):
// Você pode adicionar validação de entrada para garantir que os dados enviados para o servidor sejam válidos.
// Também pode implementar um mecanismo de persistência simples, usando um array em memória para armazenar os produtos.
// Os alunos podem experimentar com outros tipos de requisições, como PATCH para atualizações parciais ou OPTIONS para obter informações sobre as rotas disponíveis.

const express = require("express");
const app = express();
const PORT = process.env.PORT || 3001;

let produtos = [];

// Middleware para logar as informações de cada chamada realizada
const logHoraMiddleware = (req, res, next) => {
  const horaAtual = new Date().toISOString();
  console.log(
    `[${horaAtual}] Nova solicitação recebida para: ${req.method} ${req.originalUrl}`
  );
  next(); // Chamar next() para passar a solicitação para o próximo middleware
};

app.use(express.json());
app.use(logHoraMiddleware);

// criando uma rota POST para adicionar um novo produto
app.post("/produtos", (req, res) => {
  const produto = req.body;
  produto.id = produtos.length > 0 ? produtos[produtos.length - 1].id + 1 : 1;
  produtos.push(produto);
  res.status(201).send("Produto adicionado com sucesso!");
});

// criando uma rota GET para obter todos os produtos
app.get("/produtos", (req, res) => {
  res.json(produtos);
});

// criando uma rota PUT para atualizar um produto existente
app.put("/produtos/:id", function (req, res) {
  const { id } = req.params;
  const newData = req.body;
  const index = produtos.findIndex((produto) => produto.id === parseInt(id));
  if (index === -1) {
    res.status(404).send("Produto não encontrado!");
    return;
  }
  produtos[index] = { ...produtos[index], ...newData };
  res.status(200).send("Produto atualizado com sucesso.");
});

// criando uma rota DELETE para excluir um produto existente
app.delete("/produtos/:id", (req, res) => {
  const { id } = req.params;
  const index = produtos.findIndex((produto) => produto.id === parseInt(id));
  if (index === -1) {
    res.status(404).send("Produto não encontrado!");
    return;
  }
  produtos.splice(index, 1);
  res.status(200).send("Produto deletado com sucesso!");
});

app.listen(PORT, (req, res) => {
  console.log(`Aplicação rodando na porta ${PORT}`);
});
