import AuditoriumService from "../../../domain/services/auditorium.service.js";

const auditoriumService = new AuditoriumService();

/**
 * Handler IPC para buscar todas as salas (auditoriums)
 * @returns {Promise<{success: boolean, data: any, message: string}>}
 */
export async function getAuditoriumsHandler() {
  try {
    const result = await auditoriumService.getAllAuditoriums();

    const auditoriumList = Array.isArray(result.data) ? result.data : [];

    return {
      success: true,
      data: auditoriumList,
      message: result.message || "Salas carregadas com sucesso",
    };
  } catch (error) {
    console.error("[getAuditoriumsHandler] Erro ao buscar salas:", error);
    return {
      success: false,
      data: [],
      message: "Erro ao buscar salas. Tente novamente mais tarde.",
    };
  }
}
