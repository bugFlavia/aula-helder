const express = require("express");
const app = express();
const port = 3000;
const Livro = require("./repositories/Livro.js");
const Emprestimo = require("./repositories/Emprestimo.js");

app.use(express.json());

const livroRepository = new Livro();
const emprestimoRepository = new Emprestimo();
