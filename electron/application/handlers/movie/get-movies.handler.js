import MovieService from "../../../domain/services/movie.service.js";

const movieService = new MovieService();

/**
 * Handler IPC para buscar todos os filmes
 * @returns {Promise<{success: boolean, data: any, message: string}>}
 */
export async function getMoviesHandler() {
  try {
    const result = await movieService.getAllMovies();

    const movieList = Array.isArray(result.data) ? result.data : [];

    return {
      success: true,
      data: movieList,
      message: result.message || "Filmes carregados com sucesso",
    };
  } catch (error) {
    console.error("[getMoviesHandler] Erro ao buscar filmes:", error);
    return {
      success: false,
      data: [],
      message: "Erro ao buscar filmes. Tente novamente mais tarde.",
    };
  }
}
