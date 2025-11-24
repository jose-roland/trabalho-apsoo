import MovieService from "../../../domain/services/movie.service.js";

const movieService = new MovieService();

/**
 * Handler IPC para deletar um filme
 * @param {Electron.IpcMainInvokeEvent} event - Evento IPC
 * @param {number} id - ID do filme
 * @returns {Promise<Object>} Resultado padronizado
 */
export async function deleteMovieHandler(event, id) {
  try {
    if (!id || isNaN(id) || id <= 0) {
      return {
        success: false,
        data: null,
        message: "ID do filme inválido",
      };
    }

    const result = await movieService.deleteMovie(id);

    if (!result.success) {
      console.error(`[deleteMovieHandler] Erro: ${result.message}`);
    }

    return result;
  } catch (error) {
    console.error("[deleteMovieHandler] Erro inesperado:", error);
    return {
      success: false,
      data: null,
      message: "Erro inesperado ao deletar filme. Tente novamente.",
    };
  }
}
