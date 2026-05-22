const Emprestimo = require("../repositories/Emprestimo");
const Livro = require("../repositories/Livro");

class EmprestimoController {
  async cadastrarEmprestimo(req, res) {
    try {
      const { livroId, usuario, dataEmprestimo, dataDevolucao } = req.body;
      const livro = await Livro.buscarLivroPorId(livroId);
      if (!livro) {
        return res.status(404).json({ message: "Livro não encontrado" });
      }
      const emprestimo = {
        livroId,
        usuario,
        dataEmprestimo,
        dataDevolucao,
      };
      const resultado = await Emprestimo.cadastrarEmprestimo(emprestimo);
      res.status(201).json(resultado);
    } catch (error) {
      res.status(500).json({ message: "Erro ao cadastrar empréstimo", error });
    }
  }

  async listarEmprestimos(req, res) {
    try {
      const emprestimos = await Emprestimo.listarEmprestimos();
      res.status(200).json(emprestimos);
    } catch (error) {
      res.status(500).json({ message: "Erro ao listar empréstimos", error });
    }
  }

  async buscarEmprestimoPorId(req, res) {
    try {
      const { id } = req.params;
      const emprestimo = await Emprestimo.buscarEmprestimoPorId(id);
      if (!emprestimo) {
        return res.status(404).json({ message: "Empréstimo não encontrado" });
      }
      res.status(200).json(emprestimo);
    } catch (error) {
      res
        .status(500)
        .json({ message: "Erro ao buscar empréstimo por ID", error });
    }
  }

  async atualizarEmprestimo(req, res) {
    try {
      const { id } = req.params;
      const { livroId, usuario, dataEmprestimo, dataDevolucao } = req.body;
      const emprestimoAtualizado = {
        livroId,
        usuario,
        dataEmprestimo,
        dataDevolucao,
      };
      const resultado = await Emprestimo.atualizarEmprestimo(
        id,
        emprestimoAtualizado,
      );
      if (resultado.matchedCount === 0) {
        return res.status(404).json({ message: "Empréstimo não encontrado" });
      }
      res.status(200).json({ message: "Empréstimo atualizado com sucesso" });
    } catch (error) {
      res.status(500).json({ message: "Erro ao atualizar empréstimo", error });
    }
  }

  async excluirEmprestimo(req, res) {
    try {
      const { id } = req.params;
      const resultado = await Emprestimo.excluirEmprestimo(id);
      if (resultado.deletedCount === 0) {
        return res.status(404).json({ message: "Empréstimo não encontrado" });
      }
      res.status(200).json({ message: "Empréstimo excluído com sucesso" });
    } catch (error) {
      res.status(500).json({ message: "Erro ao excluir empréstimo", error });
    }
  }
}

module.exports = new EmprestimoController();
