import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Film, Save, ArrowLeft } from "lucide-react";

export default function UpdateMovie() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [movie, setMovie] = useState(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState(null);

  // Busca os dados do filme ao carregar
  useEffect(() => {
    async function fetchMovie() {
      try {
        const result = await window.movieApi.getById(Number(id));
        if (result.success) {
          setMovie(result.data);
        } else {
          setMessage({ type: "error", text: result.message });
        }
      } catch (error) {
        console.error("Erro ao carregar filme:", error);
        setMessage({
          type: "error",
          text: "Erro ao buscar dados do filme. Verifique o console.",
        });
      } finally {
        setLoading(false);
      }
    }

    fetchMovie();
  }, [id]);

  function handleChange(e) {
    const { name, value } = e.target;
    setMovie((prev) => ({ ...prev, [name]: value }));
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setMessage(null);
    setSaving(true);

    try {
      const result = await window.movieApi.update(id, movie);

      if (result.success) {
        setMessage({
          type: "success",
          text: "Filme atualizado com sucesso! 🎉",
        });
        setTimeout(() => navigate("/movies"), 1000);
      } else {
        setMessage({ type: "error", text: result.message });
      }
    } catch (error) {
      console.error("Erro ao atualizar filme:", error);
      setMessage({
        type: "error",
        text: "Falha inesperada ao atualizar o filme.",
      });
    } finally {
      setSaving(false);
    }
  }

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <span className="loading loading-spinner loading-lg"></span>
      </div>
    );
  }

  if (!movie) {
    return (
      <div className="text-center mt-10">
        <p className="text-error font-semibold">
          {message?.text || "Filme não encontrado."}
        </p>
        <button
          onClick={() => navigate("/movies")}
          className="btn btn-outline mt-4"
        >
          <ArrowLeft className="w-4 h-4" /> Voltar
        </button>
      </div>
    );
  }

  return (
    <div className="flex justify-center items-center min-h-screen bg-base-200">
      <div className="card w-full max-w-2xl shadow-2xl bg-base-100">
        <div className="card-body">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-2xl font-bold flex items-center gap-2">
              <Film className="w-6 h-6" /> Editar Filme #{id}
            </h2>
            <button
              onClick={() => navigate("/movies")}
              className="btn btn-outline btn-sm"
            >
              <ArrowLeft className="w-4 h-4" /> Voltar
            </button>
          </div>

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
                value={movie.genre || ""}
                onChange={handleChange}
                className="input input-bordered w-full"
                placeholder="Ex: Ação, Comédia..."
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

            {/* Classificação */}
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
                value={movie.overview || ""}
                onChange={handleChange}
                className="textarea textarea-bordered w-full"
                placeholder="Breve descrição do filme..."
              />
            </div>

            {/* Botão de salvar */}
            <div className="flex justify-end">
              <button
                type="submit"
                disabled={saving}
                className={`btn btn-primary flex items-center gap-2 ${
                  saving ? "btn-disabled" : ""
                }`}
              >
                <Save className="w-4 h-4" />
                {saving ? "Salvando..." : "Salvar Alterações"}
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
