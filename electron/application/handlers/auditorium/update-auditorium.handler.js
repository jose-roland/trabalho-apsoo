import AuditoriumService from "../../../domain/services/auditorium.service.js";

const auditoriumService = new AuditoriumService();

/**
 * Handler IPC para atualizar uma sala existente
 * @param {Electron.IpcMainInvokeEvent} event - Evento IPC
 * @param {Object} payload - Dados da requisição
 * @param {number} payload.id - ID da sala
 * @param {Object} payload.auditorium - Dados a serem atualizados
 * @returns {Promise<Object>} Resultado da operação
 */
export async function updateAuditoriumHandler(event, payload) {
  try {
    if (!payload || typeof payload !== "object") {
      return {
        success: false,
        data: null,
        message: "Dados inválidos ou ausentes",
      };
    }

    const { id, auditorium } = payload;

    if (!id || isNaN(id) || id <= 0) {
      return {
        success: false,
        data: null,
        message: "ID da sala inválido",
      };
    }

    if (!auditorium || typeof auditorium !== "object") {
      return {
        success: false,
        data: null,
        message: "Dados de atualização inválidos ou ausentes",
      };
    }

    const result = await auditoriumService.updateAuditorium(id, auditorium);

    if (!result.success) {
      console.error(
        `[updateAuditoriumHandler] Erro ao atualizar sala (ID: ${id}):`,
        result.message
      );
    }

    return result;
  } catch (error) {
    console.error("[updateAuditoriumHandler] Erro inesperado:", error);
    return {
      success: false,
      data: null,
      message: "Erro inesperado ao atualizar sala. Tente novamente.",
    };
  }
}
