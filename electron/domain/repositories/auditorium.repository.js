import Auditorium from "../models/auditorium.model.js";
import BaseRepository from "./base.repository.js";

class AuditoriumRepository extends BaseRepository {
  constructor() {
    super(Auditorium);
  }

  /**
   * Busca todas as salas disponíveis (status: available)
   * @returns {Promise<Array>} Lista de salas disponíveis
   */
  async findAvailable() {
    try {
      return await this.findAll({
        where: { status: "available" },
      });
    } catch (error) {
      console.error(
        `[AuditoriumRepository] Erro ao buscar disponíveis:`,
        error.message
      );
      throw new Error(`Erro ao buscar salas disponíveis: ${error.message}`);
    }
  }

  /**
   * Busca salas por tipo (2d/3d)
   * @param {string} type - Tipo da sala ('2d' ou '3d')
   * @returns {Promise<Array>} Lista de salas do tipo informado
   */
  async findByType(type) {
    try {
      return await this.findAll({
        where: { type },
      });
    } catch (error) {
      console.error(
        `[AuditoriumRepository] Erro ao buscar por tipo:`,
        error.message
      );
      throw new Error(`Erro ao buscar salas por tipo: ${error.message}`);
    }
  }

  /**
   * Busca sala pelo número identificador (único)
   * @param {number} number - Número da sala
   * @returns {Promise<Object|null>} Sala encontrada ou null
   */
  async findByNumber(number) {
    try {
      const results = await this.findAll({
        where: { number },
      });
      return results.length > 0 ? results[0] : null;
    } catch (error) {
      console.error(
        `[AuditoriumRepository] Erro ao buscar por número:`,
        error.message
      );
      throw new Error(`Erro ao buscar sala por número: ${error.message}`);
    }
  }

  /**
   * Busca salas por faixa de capacidade de assentos
   * @param {number} minSeats - Mínimo de assentos
   * @param {number} maxSeats - Máximo de assentos
   * @returns {Promise<Array>} Lista de salas no intervalo
   */
  async findBySeatsRange(minSeats, maxSeats) {
    try {
      const { Op } = await import("sequelize");
      return await this.findAll({
        where: {
          seats: {
            [Op.between]: [minSeats, maxSeats],
          },
        },
      });
    } catch (error) {
      console.error(
        `[AuditoriumRepository] Erro ao buscar por capacidade:`,
        error.message
      );
      throw new Error(`Erro ao buscar salas por capacidade: ${error.message}`);
    }
  }

  /**
   * Busca todas as salas com determinado status
   * @param {string} status - Status da sala ('available', 'unavailable')
   * @returns {Promise<Array>} Lista de salas com o status
   */
  async findByStatus(status) {
    try {
      return await this.findAll({
        where: { status },
      });
    } catch (error) {
      console.error(
        `[AuditoriumRepository] Erro ao buscar por status:`,
        error.message
      );
      throw new Error(`Erro ao buscar salas por status: ${error.message}`);
    }
  }
}

export default AuditoriumRepository;
