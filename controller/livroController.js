const Livro = require("../repositories/Livro");

class LivroController {
  async cadastrarLivro(req, res) {
    try {
      const { titulo, autor, anoPublicacao } = req.body;
      const livro = new Livro(titulo, autor, anoPublicacao);
      await livro.save();
      res.status(201).json({ message: "Livro cadastrado com sucesso!" });
    } catch (error) {
      res.status(500).json({ message: "Erro ao cadastrar livro", error });
    }
  }
  async listarLivros(req, res) {
    try {
      const livros = await Livro.find();
      res.status(200).json(livros);
    } catch (error) {
      res.status(500).json({ message: "Erro ao listar livros", error });
    }
  }

  async buscarLivroPorId(req, res) {
    try {
      const { id } = req.params;
      const livro = await Livro.findById(id);
      if (!livro) {
        return res.status(404).json({ message: "Livro não encontrado" });
      }
      res.status(200).json(livro);
    } catch (error) {
      res.status(500).json({ message: "Erro ao buscar livro por ID", error });
    }
  }

  async atualizarLivro(req, res) {
    try {
      const { id } = req.params;
      const { titulo, autor, anoPublicacao } = req.body;
      const livroAtualizado = { titulo, autor, anoPublicacao };
      const resultado = await Livro.findByIdAndUpdate(id, livroAtualizado, {
        new: true,
      });
      if (!resultado) {
        return res.status(404).json({ message: "Livro não encontrado" });
      }
      res
        .status(200)
        .json({ message: "Livro atualizado com sucesso", livro: resultado });
    } catch (error) {
      res.status(500).json({ message: "Erro ao atualizar livro", error });
    }
  }

  async excluirLivro(req, res) {
    try {
      const { id } = req.params;
      const resultado = await Livro.findByIdAndDelete(id);
      if (!resultado) {
        return res.status(404).json({ message: "Livro não encontrado" });
      }
      res.status(200).json({ message: "Livro excluído com sucesso" });
    } catch (error) {
      res.status(500).json({ message: "Erro ao excluir livro", error });
    }
  }
}

module.exports = new LivroController();
