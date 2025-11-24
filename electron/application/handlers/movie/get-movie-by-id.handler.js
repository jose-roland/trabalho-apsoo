import MovieService from "../../../domain/services/movie.service.js";

const movieService = new MovieService();

export async function getMovieByIdHandler(event, movieId) {
  try {
    const result = await movieService.getMovieById(movieId);

    if (!result.success) {
      return { success: false, error: result.message };
    }

    return { success: true, data: result.data };
  } catch (error) {
    console.error("Erro ao buscar filme por ID:", error);
    return { success: false, error: error.message };
  }
}
