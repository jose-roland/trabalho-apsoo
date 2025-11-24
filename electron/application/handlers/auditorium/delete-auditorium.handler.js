import AuditoriumService from "../../../domain/services/auditorium.service.js";

const auditoriumService = new AuditoriumService();

/**
 * Handler IPC para deletar uma sala (auditorium)
 * @param {Electron.IpcMainInvokeEvent} event - Evento IPC
 * @param {number} id - ID da sala
 * @returns {Promise<Object>} Resultado padronizado
 */
export async function deleteAuditoriumHandler(event, id) {
  try {
    if (!id || isNaN(id) || id <= 0) {
      return {
        success: false,
        data: null,
        message: "ID da sala inválido",
      };
    }

    const result = await auditoriumService.deleteAuditorium(id);

    if (!result.success) {
      console.error(`[deleteAuditoriumHandler] Erro: ${result.message}`);
    }

    return result;
  } catch (error) {
    console.error("[deleteAuditoriumHandler] Erro inesperado:", error);
    return {
      success: false,
      data: null,
      message: "Erro inesperado ao deletar sala. Tente novamente.",
    };
  }
}
