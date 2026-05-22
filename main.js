const express = require("express");
const app = express();
const port = 3000;

const Livro = require("./repositories/Livro.js");
const Emprestimo = require("./repositories/Emprestimo.js");

const livroRouter = require("./routes/livroRoute.js");
const emprestimoRouter = require("./routes/emprestimoRoute.js");

app.use(express.json());

app.use("/livros", livroRouter);
app.use("/emprestimos", emprestimoRouter);

app.listen(port, async () => {
  console.log(`Servidor rodando em http://localhost:${port}`);

  try {
    const { conectar } = require("./db/MongoClient.js");

    await conectar();

    const resultadoLivro = await Livro.cadastrarLivro({
      titulo: "O Senhor dos Anéis",
      autor: "J.R.R. Tolkien",
      anoPublicacao: 1954,
    });

    console.log("Livro cadastrado:", resultadoLivro);

    const livroId = resultadoLivro.insertedId;

    const resultadoEmprestimo = await Emprestimo.cadastrarEmprestimo({
      livroId: livroId,
      usuario: "João Silva",
      dataEmprestimo: new Date(),
      dataDevolucao: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
    });

    console.log("Empréstimo cadastrado:", resultadoEmprestimo);

    const emprestimoId = resultadoEmprestimo.insertedId;

    const livros = await Livro.listarLivros();

    console.log("Livros cadastrados:", livros);

    const emprestimos = await Emprestimo.listarEmprestimos();

    console.log("Empréstimos cadastrados:", emprestimos);

    const livro = await Livro.buscarLivroPorId(livroId);

    console.log("Livro encontrado:", livro);

    const emprestimo = await Emprestimo.buscarEmprestimoPorId(emprestimoId);

    console.log("Empréstimo encontrado:", emprestimo);

    const resultadoAtualizacaoLivro = await Livro.atualizarLivro(livroId, {
      titulo: "O Senhor dos Anéis - Edição Especial",
    });

    console.log(
      "Resultado da atualização do livro:",
      resultadoAtualizacaoLivro,
    );

    const resultadoAtualizacaoEmprestimo = await Emprestimo.atualizarEmprestimo(
      emprestimoId,
      {
        dataDevolucao: new Date(Date.now() + 14 * 24 * 60 * 60 * 1000),
      },
    );

    console.log(
      "Resultado da atualização do empréstimo:",
      resultadoAtualizacaoEmprestimo,
    );

    const resultadoExclusaoLivro = await Livro.excluirLivro(livroId);

    console.log("Resultado da exclusão do livro:", resultadoExclusaoLivro);

    const resultadoExclusaoEmprestimo =
      await Emprestimo.excluirEmprestimo(emprestimoId);

    console.log(
      "Resultado da exclusão do empréstimo:",
      resultadoExclusaoEmprestimo,
    );
  } catch (error) {
    console.error("Erro:", error);
  }
});
