import AuditoriumService from "../../../domain/services/auditorium.service.js";

const auditoriumService = new AuditoriumService();

export async function getAuditoriumByIdHandler(event, auditoriumId) {
  try {
    const result = await auditoriumService.getAuditoriumById(auditoriumId);

    if (!result.success) {
      return { success: false, error: result.message };
    }

    return { success: true, data: result.data };
  } catch (error) {
    console.error("Erro ao buscar sala por ID:", error);
    return { success: false, error: error.message };
  }
}
