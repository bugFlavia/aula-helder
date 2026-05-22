const emprestimoRouter = require("express").Router();
const EmprestimoController = require("../controller/emprestimoController");

emprestimoRouter.post("/", EmprestimoController.cadastrarEmprestimo);
emprestimoRouter.get("/", EmprestimoController.listarEmprestimos);
emprestimoRouter.get("/:id", EmprestimoController.buscarEmprestimoPorId);
emprestimoRouter.put("/:id", EmprestimoController.atualizarEmprestimo);
emprestimoRouter.delete("/:id", EmprestimoController.excluirEmprestimo);

module.exports = emprestimoRouter;
