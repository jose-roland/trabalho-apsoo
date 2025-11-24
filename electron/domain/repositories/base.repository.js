export default class BaseRepository {
  constructor(model) {
    if (!model) {
      throw new Error("Model é obrigatório para criar um Repository");
    }
    this.model = model;
  }

  /**
   * Cria um novo registro no banco
   * @param {Object} data - Dados do registro
   * @returns {Promise<Object>} Registro criado
   */
  async create(data) {
    try {
      if (!data || typeof data !== "object") {
        throw new Error("Dados inválidos para criação");
      }

      const result = await this.model.create(data);
      return result.toJSON();
    } catch (error) {
      console.error(
        `[${this.model.name}Repository] Erro ao criar:`,
        error.message
      );
      throw new Error(`Erro ao criar ${this.model.name}: ${error.message}`);
    }
  }

  /**
   * Busca todos os registros com opções opcionais
   * @param {Object} options - Opções de busca (where, limit, order, etc)
   * @returns {Promise<Array>} Lista de registros
   */
  async findAll(options = {}) {
    try {
      const results = await this.model.findAll(options);
      return results.map((result) => result.toJSON());
    } catch (error) {
      console.error(
        `[${this.model.name}Repository] Erro ao buscar todos:`,
        error.message
      );
      throw new Error(`Erro ao buscar ${this.model.name}: ${error.message}`);
    }
  }

  /**
   * Busca um registro por ID
   * @param {number} id - ID do registro
   * @returns {Promise<Object|null>} Registro encontrado ou null
   */
  async findById(id) {
    try {
      if (!id || isNaN(id)) {
        throw new Error("ID inválido");
      }

      const result = await this.model.findByPk(id);
      return result ? result.toJSON() : null;
    } catch (error) {
      console.error(
        `[${this.model.name}Repository] Erro ao buscar por ID:`,
        error.message
      );
      throw new Error(
        `Erro ao buscar ${this.model.name} por ID: ${error.message}`
      );
    }
  }

  /**
   * Atualiza um registro existente
   * @param {number} id - ID do registro
   * @param {Object} data - Dados para atualizar
   * @returns {Promise<Object|null>} Registro atualizado ou null se não encontrado
   */
  async update(id, data) {
    try {
      if (!id || isNaN(id)) {
        throw new Error("ID inválido");
      }

      if (!data || typeof data !== "object") {
        throw new Error("Dados inválidos para atualização");
      }

      const [affectedRows] = await this.model.update(data, {
        where: { id },
        returning: true, // PostgreSQL suporta, SQLite não
      });

      if (affectedRows === 0) {
        return null;
      }

      const updatedRecord = await this.model.findByPk(id);
      return updatedRecord ? updatedRecord.toJSON() : null;
    } catch (error) {
      console.error(
        `[${this.model.name}Repository] Erro ao atualizar:`,
        error.message
      );
      throw new Error(`Erro ao atualizar ${this.model.name}: ${error.message}`);
    }
  }

  /**
   * Deleta um registro
   * @param {number} id - ID do registro
   * @returns {Promise<boolean>} true se deletado, false se não encontrado
   */
  async delete(id) {
    try {
      if (!id || isNaN(id)) {
        throw new Error("ID inválido");
      }

      const deletedRows = await this.model.destroy({
        where: { id },
      });

      return deletedRows > 0;
    } catch (error) {
      console.error(
        `[${this.model.name}Repository] Erro ao deletar:`,
        error.message
      );
      throw new Error(`Erro ao deletar ${this.model.name}: ${error.message}`);
    }
  }

  /**
   * Conta quantos registros existem com as opções fornecidas
   * @param {Object} options - Opções de contagem (where, etc)
   * @returns {Promise<number>} Número de registros
   */
  async count(options = {}) {
    try {
      return await this.model.count(options);
    } catch (error) {
      console.error(
        `[${this.model.name}Repository] Erro ao contar:`,
        error.message
      );
      throw new Error(`Erro ao contar ${this.model.name}: ${error.message}`);
    }
  }

  /**
   * Verifica se um registro existe
   * @param {number} id - ID do registro
   * @returns {Promise<boolean>} true se existe, false caso contrário
   */
  async exists(id) {
    try {
      if (!id || isNaN(id)) {
        return false;
      }

      const count = await this.model.count({ where: { id } });
      return count > 0;
    } catch (error) {
      console.error(
        `[${this.model.name}Repository] Erro ao verificar existência:`,
        error.message
      );
      return false;
    }
  }
}
