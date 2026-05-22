const livroRouter = require("express").Router();
const LivroController = require("../controller/livroController");

livroRouter.post("/", LivroController.cadastrarLivro);
livroRouter.get("/", LivroController.listarLivros);
livroRouter.get("/:id", LivroController.buscarLivroPorId);
livroRouter.put("/:id", LivroController.atualizarLivro);
livroRouter.delete("/:id", LivroController.excluirLivro);

module.exports = livroRouter;
