import BaseRepository from "./base.repository.js";
import Movie from "../models/movie.model.js";

class MovieRepository extends BaseRepository {
  constructor() {
    super(Movie);
  }

  /**
   * Busca filmes por gênero
   * @param {string} genre - Gênero do filme
   * @returns {Promise<Array>} Lista de filmes do gênero
   */
  async findByGenre(genre) {
    try {
      return await this.findAll({
        where: { genre },
      });
    } catch (error) {
      console.error(
        `[MovieRepository] Erro ao buscar por gênero:`,
        error.message
      );
      throw new Error(`Erro ao buscar filmes por gênero: ${error.message}`);
    }
  }

  /**
   * Busca filmes disponíveis
   * @returns {Promise<Array>} Lista de filmes disponíveis
   */
  async findAvailable() {
    try {
      return await this.findAll({
        where: { status: "available" },
      });
    } catch (error) {
      console.error(
        `[MovieRepository] Erro ao buscar disponíveis:`,
        error.message
      );
      throw new Error(`Erro ao buscar filmes disponíveis: ${error.message}`);
    }
  }

  /**
   * Busca filmes por status
   * @param {string} status - Status do filme (available, unavailable, soon)
   * @returns {Promise<Array>} Lista de filmes com o status
   */
  async findByStatus(status) {
    try {
      return await this.findAll({
        where: { status },
      });
    } catch (error) {
      console.error(
        `[MovieRepository] Erro ao buscar por status:`,
        error.message
      );
      throw new Error(`Erro ao buscar filmes por status: ${error.message}`);
    }
  }

  /**
   * Busca filmes por título (busca parcial)
   * @param {string} title - Título ou parte do título
   * @returns {Promise<Array>} Lista de filmes encontrados
   */
  async searchByTitle(title) {
    try {
      const { Op } = await import("sequelize");
      return await this.findAll({
        where: {
          title: {
            [Op.like]: `%${title}%`,
          },
        },
      });
    } catch (error) {
      console.error(
        `[MovieRepository] Erro ao buscar por título:`,
        error.message
      );
      throw new Error(`Erro ao buscar filmes por título: ${error.message}`);
    }
  }

  /**
   * Busca filmes por classificação indicativa
   * @param {string} certification - Classificação (everyone, teen, mature, adult)
   * @returns {Promise<Array>} Lista de filmes com a classificação
   */
  async findByCertification(certification) {
    try {
      return await this.findAll({
        where: { certification },
      });
    } catch (error) {
      console.error(
        `[MovieRepository] Erro ao buscar por classificação:`,
        error.message
      );
      throw new Error(
        `Erro ao buscar filmes por classificação: ${error.message}`
      );
    }
  }

  /**
   * Busca filmes com duração em um intervalo
   * @param {number} minDuration - Duração mínima em minutos
   * @param {number} maxDuration - Duração máxima em minutos
   * @returns {Promise<Array>} Lista de filmes no intervalo
   */
  async findByDurationRange(minDuration, maxDuration) {
    try {
      const { Op } = await import("sequelize");
      return await this.findAll({
        where: {
          duration: {
            [Op.between]: [minDuration, maxDuration],
          },
        },
      });
    } catch (error) {
      console.error(
        `[MovieRepository] Erro ao buscar por duração:`,
        error.message
      );
      throw new Error(`Erro ao buscar filmes por duração: ${error.message}`);
    }
  }
}

export default MovieRepository;
