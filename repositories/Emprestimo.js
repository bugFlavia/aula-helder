const db = require("../db/MongoClient.js");
const { ObjectId } = require("mongodb");
const { conectar, getDatabase } = require("../db/MongoClient.js");

class Emprestimo {
  constructor() {
    this.colecao = getDatabase("biblioteca").collection("emprestimos");
  }

  async cadastrarEmprestimo(emprestimo) {
    try {
      const resultado = await this.colecao.insertOne(emprestimo);
      return resultado;
    } catch (error) {
      console.error("Erro ao cadastrar empréstimo:", error);
      throw error;
    }
  }
  async listarEmprestimos() {
    try {
      const emprestimos = await this.colecao.find().toArray();
      return emprestimos;
    } catch (error) {
      console.error("Erro ao listar empréstimos:", error);
      throw error;
    }
  }
  async buscarEmprestimoPorId(id) {
    try {
      const emprestimo = await this.colecao.findOne({ _id: new ObjectId(id) });
      return emprestimo;
    } catch (error) {
      console.error("Erro ao buscar empréstimo por ID:", error);
      throw error;
    }
  }
  async atualizarEmprestimo(id, emprestimoAtualizado) {
    try {
      const resultado = await this.colecao.updateOne(
        { _id: new ObjectId(id) },
        { $set: emprestimoAtualizado },
      );
      return resultado;
    } catch (error) {
      console.error("Erro ao atualizar empréstimo:", error);
      throw error;
    }
  }
  async excluirEmprestimo(id) {
    try {
      const resultado = await this.colecao.deleteOne({ _id: new ObjectId(id) });
      return resultado;
    } catch (error) {
      console.error("Erro ao excluir empréstimo:", error);
      throw error;
    }
  }
}

module.exports = new Emprestimo();
