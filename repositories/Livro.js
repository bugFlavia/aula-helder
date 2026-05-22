const { conectar, getDatabase } = require("../db/MongoClient.js");

class Livro {
  constructor() {
    this.colecao = getDatabase("biblioteca").collection("livros");
  }

  async cadastrarLivro(livro) {
    try {
      const resultado = await this.colecao.insertOne(livro);
      return resultado;
    } catch (error) {
      console.error("Erro ao cadastrar livro:", error);
      throw error;
    }
  }
  async listarLivros() {
    try {
      const livros = await this.colecao.find().toArray();
      return livros;
    } catch (error) {
      console.error("Erro ao listar livros:", error);
      throw error;
    }
  }
  async buscarLivroPorId(id) {
    try {
      const livro = await this.colecao.findOne({ _id: new ObjectId(id) });
      return livro;
    } catch (error) {
      console.error("Erro ao buscar livro por ID:", error);
      throw error;
    }
  }
  async atualizarLivro(id, livroAtualizado) {
    try {
      const resultado = await this.colecao.updateOne(
        { _id: new ObjectId(id) },
        { $set: livroAtualizado },
      );
      return resultado;
    } catch (error) {
      console.error("Erro ao atualizar livro:", error);
      throw error;
    }
  }
  async excluirLivro(id) {
    try {
      const resultado = await this.colecao.deleteOne({ _id: new ObjectId(id) });
      return resultado;
    } catch (error) {
      console.error("Erro ao excluir livro:", error);
      throw error;
    }
  }
}
