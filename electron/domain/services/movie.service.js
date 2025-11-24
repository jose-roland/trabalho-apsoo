import MovieRepository from "../repositories/movie.repository.js";

class MovieService {
  constructor() {
    this.movieRepository = new MovieRepository();
  }

  /**
   * Cria um novo filme com validações de negócio
   * @param {Object} data - Dados do filme
   * @returns {Promise<Object>} Filme criado
   */
  async createMovie(data) {
    try {
      if (!data.title || data.title.trim().length < 2) {
        throw new Error("O título do filme deve ter pelo menos 2 caracteres");
      }

      if (!data.duration || data.duration < 1 || data.duration > 600) {
        throw new Error("A duração deve estar entre 1 e 600 minutos");
      }

      const existingMovies = await this.movieRepository.searchByTitle(
        data.title.trim()
      );
      const duplicateMovie = existingMovies.find(
        (movie) => movie.title.toLowerCase() === data.title.trim().toLowerCase()
      );

      if (duplicateMovie) {
        throw new Error(
          `Já existe um filme cadastrado com o título "${data.title}"`
        );
      }

      const normalizedData = {
        ...data,
        title: data.title.trim(),
        genre: data.genre?.trim() || "Desconhecido",
        overview: data.overview?.trim() || null,
        status: data.status || "unavailable",
        certification: data.certification || "everyone",
      };

      const movie = await this.movieRepository.create(normalizedData);

      return {
        success: true,
        data: movie,
        message: "Filme criado com sucesso",
      };
    } catch (error) {
      console.error("[MovieService] Erro ao criar filme:", error.message);
      return {
        success: false,
        data: null,
        message: error.message,
      };
    }
  }

  /**
   * Busca todos os filmes com opções de filtro
   * @param {Object} filters - Filtros opcionais (status, genre, certification)
   * @returns {Promise<Object>} Lista de filmes
   */
  async getAllMovies(filters = {}) {
    try {
      let movies;

      if (filters.status) {
        movies = await this.movieRepository.findByStatus(filters.status);
      } else if (filters.genre) {
        movies = await this.movieRepository.findByGenre(filters.genre);
      } else if (filters.certification) {
        movies = await this.movieRepository.findByCertification(
          filters.certification
        );
      } else {
        movies = await this.movieRepository.findAll();
      }

      return {
        success: true,
        data: movies,
        count: movies.length,
        message: `${movies.length} filme(s) encontrado(s)`,
      };
    } catch (error) {
      console.error("[MovieService] Erro ao buscar filmes:", error.message);
      return {
        success: false,
        data: [],
        count: 0,
        message: "Erro ao buscar filmes",
      };
    }
  }

  /**
   * Busca filme por ID com validação
   * @param {number} id - ID do filme
   * @returns {Promise<Object>} Filme encontrado
   */
  async getMovieById(id) {
    try {
      if (!id || isNaN(id) || id <= 0) {
        throw new Error("ID inválido");
      }

      const movie = await this.movieRepository.findById(id);

      if (!movie) {
        return {
          success: false,
          data: null,
          message: `Filme com ID ${id} não encontrado`,
        };
      }

      return {
        success: true,
        data: movie,
        message: "Filme encontrado",
      };
    } catch (error) {
      console.error("[MovieService] Erro ao buscar filme:", error.message);
      return {
        success: false,
        data: null,
        message: error.message,
      };
    }
  }

  /**
   * Atualiza um filme com validações
   * @param {number} id - ID do filme
   * @param {Object} data - Dados para atualizar
   * @returns {Promise<Object>} Filme atualizado
   */
  async updateMovie(id, data) {
    try {
      const exists = await this.movieRepository.exists(id);
      if (!exists) {
        throw new Error(`Filme com ID ${id} não encontrado`);
      }

      if (data.title) {
        const existingMovies = await this.movieRepository.searchByTitle(
          data.title.trim()
        );
        const duplicateMovie = existingMovies.find(
          (movie) =>
            movie.title.toLowerCase() === data.title.trim().toLowerCase() &&
            movie.id !== id
        );

        if (duplicateMovie) {
          throw new Error(
            `Já existe outro filme cadastrado com o título "${data.title}"`
          );
        }
      }

      if (
        data.duration !== undefined &&
        (data.duration < 1 || data.duration > 600)
      ) {
        throw new Error("A duração deve estar entre 1 e 600 minutos");
      }

      const normalizedData = {};
      if (data.title) normalizedData.title = data.title.trim();
      if (data.genre) normalizedData.genre = data.genre.trim();
      if (data.overview !== undefined)
        normalizedData.overview = data.overview?.trim() || null;
      if (data.duration) normalizedData.duration = data.duration;
      if (data.status) normalizedData.status = data.status;
      if (data.certification) normalizedData.certification = data.certification;

      const updatedMovie = await this.movieRepository.update(
        id,
        normalizedData
      );

      return {
        success: true,
        data: updatedMovie,
        message: "Filme atualizado com sucesso",
      };
    } catch (error) {
      console.error("[MovieService] Erro ao atualizar filme:", error.message);
      return {
        success: false,
        data: null,
        message: error.message,
      };
    }
  }

  /**
   * Deleta um filme com validações
   * @param {number} id - ID do filme
   * @returns {Promise<Object>} Resultado da deleção
   */
  async deleteMovie(id) {
    try {
      const movie = await this.movieRepository.findById(id);
      if (!movie) {
        throw new Error(`Filme com ID ${id} não encontrado`);
      }

      const deleted = await this.movieRepository.delete(id);

      if (!deleted) {
        throw new Error("Erro ao deletar filme");
      }

      return {
        success: true,
        data: { id, title: movie.title },
        message: `Filme "${movie.title}" deletado com sucesso`,
      };
    } catch (error) {
      console.error("[MovieService] Erro ao deletar filme:", error.message);
      return {
        success: false,
        data: null,
        message: error.message,
      };
    }
  }

  /**
   * Busca filmes disponíveis para exibição
   * @returns {Promise<Object>} Filmes disponíveis
   */
  async getAvailableMovies() {
    try {
      const movies = await this.movieRepository.findAvailable();
      return {
        success: true,
        data: movies,
        count: movies.length,
        message: `${movies.length} filme(s) disponível(is)`,
      };
    } catch (error) {
      console.error(
        "[MovieService] Erro ao buscar filmes disponíveis:",
        error.message
      );
      return {
        success: false,
        data: [],
        count: 0,
        message: "Erro ao buscar filmes disponíveis",
      };
    }
  }

  /**
   * Busca filmes por termo no título
   * @param {string} searchTerm - Termo de busca
   * @returns {Promise<Object>} Filmes encontrados
   */
  async searchMovies(searchTerm) {
    try {
      if (!searchTerm || searchTerm.trim().length < 2) {
        throw new Error("O termo de busca deve ter pelo menos 2 caracteres");
      }

      const movies = await this.movieRepository.searchByTitle(
        searchTerm.trim()
      );

      return {
        success: true,
        data: movies,
        count: movies.length,
        message: `${movies.length} filme(s) encontrado(s)`,
      };
    } catch (error) {
      console.error("[MovieService] Erro ao buscar filmes:", error.message);
      return {
        success: false,
        data: [],
        count: 0,
        message: error.message,
      };
    }
  }

  /**
   * Altera o status de um filme
   * @param {number} id - ID do filme
   * @param {string} newStatus - Novo status (available, unavailable, soon)
   * @returns {Promise<Object>} Filme atualizado
   */
  async changeMovieStatus(id, newStatus) {
    try {
      const validStatuses = ["available", "unavailable", "soon"];

      if (!validStatuses.includes(newStatus)) {
        throw new Error(`Status inválido. Use: ${validStatuses.join(", ")}`);
      }

      const movie = await this.movieRepository.findById(id);
      if (!movie) {
        throw new Error(`Filme com ID ${id} não encontrado`);
      }

      const updatedMovie = await this.movieRepository.update(id, {
        status: newStatus,
      });

      return {
        success: true,
        data: updatedMovie,
        message: `Status do filme alterado para "${newStatus}"`,
      };
    } catch (error) {
      console.error("[MovieService] Erro ao alterar status:", error.message);
      return {
        success: false,
        data: null,
        message: error.message,
      };
    }
  }
}

export default MovieService;
