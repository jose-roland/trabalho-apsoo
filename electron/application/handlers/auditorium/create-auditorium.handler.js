import AuditoriumService from "../../../domain/services/auditorium.service.js";
const auditoriumService = new AuditoriumService();

/**
 * Handler IPC para criar uma nova sala (auditorium)
 * @param {Electron.IpcMainInvokeEvent} event - Evento IPC
 * @param {Object} auditoriumData - Dados da sala a ser criada
 * @returns {Promise<Object>} Resultado da operação
 */
export async function createAuditoriumHandler(event, auditoriumData) {
  try {
    if (!auditoriumData || typeof auditoriumData !== "object") {
      return {
        success: false,
        data: null,
        message: "Dados da sala inválidos ou ausentes",
      };
    }

    const result = await auditoriumService.createAuditorium(auditoriumData);

    if (!result.success) {
      console.error(
        "[createAuditoriumHandler] Erro ao criar sala:",
        result.message
      );
    }

    return result;
  } catch (error) {
    console.error("[createAuditoriumHandler] Erro inesperado:", error);
    return {
      success: false,
      data: null,
      message: "Erro inesperado ao criar sala. Tente novamente.",
    };
  }
}
