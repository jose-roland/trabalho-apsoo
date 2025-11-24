import { useState } from "react";
import { Film, Save } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function CreateMovieForm() {
  const navigate = useNavigate();

  const [movie, setMovie] = useState({
    title: "",
    duration: "",
    overview: "",
    status: "unavailable",
    genre: "",
    certification: "everyone",
  });

  const [message, setMessage] = useState(null);
  const [loading, setLoading] = useState(false);

  function handleChange(e) {
    const { name, value } = e.target;
    setMovie((prev) => ({ ...prev, [name]: value }));
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setMessage(null);
    setLoading(true);

    try {
      const result = await window.movieApi.create(movie);

      if (result.success) {
        setMessage({ type: "success", text: "Filme criado com sucesso! 🎉" });
        setMovie({
          title: "",
          duration: "",
          overview: "",
          status: "unavailable",
          genre: "",
          certification: "everyone",
        });
        setTimeout(() => navigate("/movies"), 1000);
      } else {
        setMessage({ type: "error", text: result.message });
      }
    } catch (error) {
      console.error("Erro ao criar filme:", error);
      setMessage({
        type: "error",
        text: "Falha inesperada ao criar o filme. Verifique o console.",
      });
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="flex justify-center items-center min-h-screen bg-base-200">
      <div className="card w-full max-w-2xl shadow-2xl bg-base-100">
        <div className="card-body">
          <h2 className="text-2xl font-bold flex items-center gap-2 mb-4">
            <Film className="w-6 h-6" /> Novo Filme
          </h2>

          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Título */}
            <div>
              <label className="label">
                <span className="label-text">Título</span>
              </label>
              <input
                type="text"
                name="title"
                value={movie.title}
                onChange={handleChange}
                className="input input-bordered w-full"
                required
              />
            </div>

            {/* Gênero */}
            <div>
              <label className="label">
                <span className="label-text">Gênero</span>
              </label>
              <input
                type="text"
                name="genre"
                value={movie.genre}
                onChange={handleChange}
                className="input input-bordered w-full"
                placeholder="Ex: Ação, Comédia, Drama..."
                required
              />
            </div>

            {/* Duração */}
            <div>
              <label className="label">
                <span className="label-text">Duração (minutos)</span>
              </label>
              <input
                type="number"
                name="duration"
                value={movie.duration}
                onChange={handleChange}
                className="input input-bordered w-full"
                min="1"
                max="600"
                required
              />
            </div>

            {/* Status */}
            <div>
              <label className="label">
                <span className="label-text">Status</span>
              </label>
              <select
                name="status"
                value={movie.status}
                onChange={handleChange}
                className="select select-bordered w-full"
              >
                <option value="available">Disponível</option>
                <option value="unavailable">Indisponível</option>
                <option value="soon">Em breve</option>
              </select>
            </div>

            {/* Classificação indicativa */}
            <div>
              <label className="label">
                <span className="label-text">Classificação indicativa</span>
              </label>
              <select
                name="certification"
                value={movie.certification}
                onChange={handleChange}
                className="select select-bordered w-full"
              >
                <option value="everyone">Livre</option>
                <option value="teen">12+</option>
                <option value="mature">16+</option>
                <option value="adult">18+</option>
              </select>
            </div>

            {/* Sinopse */}
            <div>
              <label className="label">
                <span className="label-text">Sinopse</span>
              </label>
              <textarea
                name="overview"
                value={movie.overview}
                onChange={handleChange}
                className="textarea textarea-bordered w-full"
                placeholder="Breve descrição do filme..."
              />
            </div>

            {/* Botão de envio */}
            <div className="flex justify-end">
              <button
                type="submit"
                disabled={loading}
                className={`btn btn-primary flex items-center gap-2 ${
                  loading ? "btn-disabled" : ""
                }`}
              >
                <Save className="w-4 h-4" />
                {loading ? "Salvando..." : "Salvar Filme"}
              </button>
            </div>
          </form>

          {/* Mensagem de status */}
          {message && (
            <div
              className={`mt-4 alert ${
                message.type === "success" ? "alert-success" : "alert-error"
              }`}
            >
              <span>{message.text}</span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
