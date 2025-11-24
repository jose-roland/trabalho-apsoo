import AuditoriumRepository from "../repositories/auditorium.repository.js";

class AuditoriumService {
  constructor() {
    this.auditoriumRepository = new AuditoriumRepository();
  }

  /**
   * Cria uma nova sala com validações de negócio
   * @param {Object} data - Dados da sala
   * @returns {Promise<Object>} Sala criada
   */
  async createAuditorium(data) {
    try {
      if (!data.number || isNaN(data.number) || data.number < 1) {
        throw new Error("O número da sala deve ser um inteiro maior que zero");
      }

      if (!data.seats || isNaN(data.seats) || data.seats < 1) {
        throw new Error(
          "A capacidade (seats) deve ser um inteiro maior que zero"
        );
      }

      const allowedStatus = ["available", "unavailable"];
      if (!data.status || !allowedStatus.includes(data.status)) {
        throw new Error("Status inválido. Use: " + allowedStatus.join(", "));
      }

      const allowedTypes = ["2d", "3d"];
      if (!data.type || !allowedTypes.includes(data.type)) {
        throw new Error("Tipo inválido. Use: " + allowedTypes.join(", "));
      }

      const existing = await this.auditoriumRepository.findByNumber(
        data.number
      );
      if (existing) {
        throw new Error(
          `Já existe uma sala cadastrada com o número ${data.number}`
        );
      }

      const normalizedData = {
        number: Number(data.number),
        seats: Number(data.seats),
        status: data.status,
        type: data.type,
      };

      const auditorium = await this.auditoriumRepository.create(normalizedData);

      return {
        success: true,
        data: auditorium,
        message: "Sala criada com sucesso",
      };
    } catch (error) {
      console.error("[AuditoriumService] Erro ao criar sala:", error.message);
      return {
        success: false,
        data: null,
        message: error.message,
      };
    }
  }

  /**
   * Busca todas as salas, com filtros opcionais
   * @param {Object} filters - Filtros opcionais (status, type, seats)
   * @returns {Promise<Object>} Lista de salas
   */
  async getAllAuditoriums(filters = {}) {
    try {
      let auditoriums;

      if (filters.status) {
        auditoriums = await this.auditoriumRepository.findByStatus(
          filters.status
        );
      } else if (filters.type) {
        auditoriums = await this.auditoriumRepository.findByType(filters.type);
      } else if (
        filters.seatsMin !== undefined &&
        filters.seatsMax !== undefined
      ) {
        auditoriums = await this.auditoriumRepository.findBySeatsRange(
          Number(filters.seatsMin),
          Number(filters.seatsMax)
        );
      } else {
        auditoriums = await this.auditoriumRepository.findAll();
      }

      return {
        success: true,
        data: auditoriums,
        count: auditoriums.length,
        message: `${auditoriums.length} sala(s) encontrada(s)`,
      };
    } catch (error) {
      console.error("[AuditoriumService] Erro ao buscar salas:", error.message);
      return {
        success: false,
        data: [],
        count: 0,
        message: "Erro ao buscar salas",
      };
    }
  }

  /**
   * Busca sala por ID
   * @param {number} id - ID da sala
   * @returns {Promise<Object>} Sala encontrada
   */
  async getAuditoriumById(id) {
    try {
      if (!id || isNaN(id) || id <= 0) {
        throw new Error("ID inválido");
      }

      const auditorium = await this.auditoriumRepository.findById(id);

      if (!auditorium) {
        return {
          success: false,
          data: null,
          message: `Sala com ID ${id} não encontrada`,
        };
      }

      return {
        success: true,
        data: auditorium,
        message: "Sala encontrada",
      };
    } catch (error) {
      console.error("[AuditoriumService] Erro ao buscar sala:", error.message);
      return {
        success: false,
        data: null,
        message: error.message,
      };
    }
  }

  /**
   * Atualiza uma sala com validações
   * @param {number} id - ID da sala
   * @param {Object} data - Dados para atualizar
   * @returns {Promise<Object>} Sala atualizada
   */
  async updateAuditorium(id, data) {
    try {
      const exists = await this.auditoriumRepository.exists(id);
      if (!exists) {
        throw new Error(`Sala com ID ${id} não encontrada`);
      }

      if (data.number !== undefined) {
        const other = await this.auditoriumRepository.findByNumber(
          Number(data.number)
        );
        if (other && other.id !== id) {
          throw new Error(`Já existe outra sala com o número ${data.number}`);
        }
      }

      if (data.seats !== undefined && (isNaN(data.seats) || data.seats < 1)) {
        throw new Error(
          "A capacidade (seats) deve ser um inteiro maior que zero"
        );
      }

      const allowedStatus = ["available", "unavailable"];
      if (data.status !== undefined && !allowedStatus.includes(data.status)) {
        throw new Error("Status inválido. Use: " + allowedStatus.join(", "));
      }

      const allowedTypes = ["2d", "3d"];
      if (data.type !== undefined && !allowedTypes.includes(data.type)) {
        throw new Error("Tipo inválido. Use: " + allowedTypes.join(", "));
      }

      const normalizedData = {};
      if (data.number !== undefined)
        normalizedData.number = Number(data.number);
      if (data.seats !== undefined) normalizedData.seats = Number(data.seats);
      if (data.status !== undefined) normalizedData.status = data.status;
      if (data.type !== undefined) normalizedData.type = data.type;

      const updated = await this.auditoriumRepository.update(
        id,
        normalizedData
      );

      return {
        success: true,
        data: updated,
        message: "Sala atualizada com sucesso",
      };
    } catch (error) {
      console.error(
        "[AuditoriumService] Erro ao atualizar sala:",
        error.message
      );
      return {
        success: false,
        data: null,
        message: error.message,
      };
    }
  }

  /**
   * Exclui uma sala com validação
   * @param {number} id - ID da sala
   * @returns {Promise<Object>} Resultado da remoção
   */
  async deleteAuditorium(id) {
    try {
      const auditorium = await this.auditoriumRepository.findById(id);
      if (!auditorium) {
        throw new Error(`Sala com ID ${id} não encontrada`);
      }

      const deleted = await this.auditoriumRepository.delete(id);

      if (!deleted) {
        throw new Error("Erro ao deletar sala");
      }

      return {
        success: true,
        data: { id, number: auditorium.number },
        message: `Sala ${auditorium.number} deletada com sucesso`,
      };
    } catch (error) {
      console.error("[AuditoriumService] Erro ao deletar sala:", error.message);
      return {
        success: false,
        data: null,
        message: error.message,
      };
    }
  }

  /**
   * Busca todas as salas disponíveis
   * @returns {Promise<Object>} Salas disponíveis
   */
  async getAvailableAuditoriums() {
    try {
      const auditoriums = await this.auditoriumRepository.findAvailable();
      return {
        success: true,
        data: auditoriums,
        count: auditoriums.length,
        message: `${auditoriums.length} sala(s) disponível(is)`,
      };
    } catch (error) {
      console.error(
        "[AuditoriumService] Erro ao buscar salas disponíveis:",
        error.message
      );
      return {
        success: false,
        data: [],
        count: 0,
        message: "Erro ao buscar salas disponíveis",
      };
    }
  }
}

export default AuditoriumService;
