import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Edit, PlusCircle, Trash2 } from "lucide-react";

export default function Movies() {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState(null);

  useEffect(() => {
    async function fetchMovies() {
      try {
        const result = await window.movieApi.getMovies();
        if (result.success) {
          setMovies(result.data);
        } else {
          setMessage({ type: "error", text: result.message });
        }
      } catch (error) {
        console.error("Erro ao buscar filmes:", error);
        setMessage({
          type: "error",
          text: "Falha ao carregar lista de filmes. Verifique o console.",
        });
      } finally {
        setLoading(false);
      }
    }

    fetchMovies();
  }, []);

  // 🗑️ Função para excluir um filme
  async function handleDelete(movieId) {
    const confirmDelete = window.confirm(
      "Tem certeza que deseja excluir este filme?"
    );
    if (!confirmDelete) return;

    try {
      const result = await window.movieApi.remove(movieId);
      if (result.success) {
        setMovies((prev) => prev.filter((m) => m.id !== movieId));
      } else {
        setMessage({ type: "error", text: result.message });
      }
    } catch (error) {
      console.error("Erro ao excluir filme:", error);
      setMessage({
        type: "error",
        text: "Falha ao excluir filme. Verifique o console.",
      });
    }
  }

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold flex items-center gap-2">
          🎞️ Lista de Filmes
        </h2>
        <Link
          to="/movies/new"
          className="btn btn-primary btn-sm flex items-center gap-2"
        >
          <PlusCircle className="w-4 h-4" /> Novo Filme
        </Link>
      </div>

      {loading ? (
        <div className="flex justify-center py-10">
          <span className="loading loading-spinner loading-lg"></span>
        </div>
      ) : message ? (
        <div
          className={`alert ${
            message.type === "error" ? "alert-error" : "alert-success"
          }`}
        >
          <span>{message.text}</span>
        </div>
      ) : (
        <ul className="space-y-3">
          {movies.length === 0 ? (
            <li className="text-center text-gray-500">
              Nenhum filme cadastrado.
            </li>
          ) : (
            movies.map((movie) => (
              <li
                key={movie.id}
                className="flex justify-between items-center p-4 bg-base-200 rounded-lg shadow-sm"
              >
                <div>
                  <p className="font-semibold text-lg">
                    #{movie.id} — {movie.title}
                  </p>
                  <p className="text-sm opacity-75">{movie.status}</p>
                </div>

                <div className="flex gap-2">
                  <Link
                    to={`/movies/edit/${movie.id}`}
                    className="btn btn-outline btn-sm flex items-center gap-2"
                  >
                    <Edit className="w-4 h-4" />
                    Editar
                  </Link>

                  <button
                    onClick={() => handleDelete(movie.id)}
                    className="btn btn-error btn-sm flex items-center gap-2"
                  >
                    <Trash2 className="w-4 h-4" />
                    Excluir
                  </button>
                </div>
              </li>
            ))
          )}
        </ul>
      )}
    </div>
  );
}
