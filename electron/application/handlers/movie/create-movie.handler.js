import MovieService from "../../../domain/services/movie.service.js";

const movieService = new MovieService();

/**
 * Handler IPC para criar um novo filme
 * @param {Electron.IpcMainInvokeEvent} event - Evento IPC
 * @param {Object} movieData - Dados do filme a ser criado
 * @returns {Promise<Object>} Resultado da operação
 */
export async function createMovieHandler(event, movieData) {
  try {
    if (!movieData || typeof movieData !== "object") {
      return {
        success: false,
        data: null,
        message: "Dados do filme inválidos ou ausentes",
      };
    }

    const result = await movieService.createMovie(movieData);

    if (!result.success) {
      console.error(
        "[createMovieHandler] Erro ao criar filme:",
        result.message
      );
    }

    return result;
  } catch (error) {
    console.error("[createMovieHandler] Erro inesperado:", error);
    return {
      success: false,
      data: null,
      message: "Erro inesperado ao criar filme. Tente novamente.",
    };
  }
}
