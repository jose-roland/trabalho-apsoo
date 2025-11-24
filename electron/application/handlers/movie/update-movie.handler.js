import MovieService from "../../../domain/services/movie.service.js";

const movieService = new MovieService();

/**
 * Handler IPC para atualizar um filme existente
 * @param {Electron.IpcMainInvokeEvent} event - Evento IPC
 * @param {Object} payload - Dados da requisição
 * @param {number} payload.id - ID do filme
 * @param {Object} payload.movie - Dados a serem atualizados
 * @returns {Promise<Object>} Resultado da operação
 */
export async function updateMovieHandler(event, payload) {
  try {
    if (!payload || typeof payload !== "object") {
      return {
        success: false,
        data: null,
        message: "Dados inválidos ou ausentes",
      };
    }

    console.log("ppayload safada: ", payload);
    const { id, movie } = payload;
    console.log("id diabo: ", id);
    console.log("data fofinha: ", movie);

    if (!id || isNaN(id) || id <= 0) {
      return {
        success: false,
        data: null,
        message: "ID do filme inválido",
      };
    }

    if (!movie || typeof movie !== "object") {
      return {
        success: false,
        data: null,
        message: "Dados de atualização inválidos ou ausentes",
      };
    }

    const result = await movieService.updateMovie(id, movie);

    if (!result.success) {
      console.error(
        `[updateMovieHandler] Erro ao atualizar filme (ID: ${id}):`,
        result.message
      );
    }

    return result;
  } catch (error) {
    console.error("[updateMovieHandler] Erro inesperado:", error);
    return {
      success: false,
      data: null,
      message: "Erro inesperado ao atualizar filme. Tente novamente.",
    };
  }
}
