import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Edit, PlusCircle, Trash2 } from "lucide-react";

export default function Auditoriums() {
  const [auditoriums, setAuditoriums] = useState([]);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState(null);

  useEffect(() => {
    async function fetchAuditoriums() {
      try {
        const result = await window.auditoriumApi.getAll();
        if (result.success) {
          setAuditoriums(result.data);
        } else {
          setMessage({ type: "error", text: result.message });
        }
      } catch (error) {
        console.error("Erro ao buscar salas:", error);
        setMessage({
          type: "error",
          text: "Falha ao carregar lista de salas. Verifique o console.",
        });
      } finally {
        setLoading(false);
      }
    }

    fetchAuditoriums();
  }, []);

  // 🗑️ Função para excluir uma sala
  async function handleDelete(auditoriumId) {
    const confirmDelete = window.confirm(
      "Tem certeza que deseja excluir esta sala?"
    );
    if (!confirmDelete) return;

    try {
      const result = await window.auditoriumApi.remove(auditoriumId);
      if (result.success) {
        setAuditoriums((prev) => prev.filter((a) => a.id !== auditoriumId));
      } else {
        setMessage({ type: "error", text: result.message });
      }
    } catch (error) {
      console.error("Erro ao excluir sala:", error);
      setMessage({
        type: "error",
        text: "Falha ao excluir sala. Verifique o console.",
      });
    }
  }

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold flex items-center gap-2">
          🏟️ Lista de Salas
        </h2>
        <Link
          to="/auditoriums/new"
          className="btn btn-primary btn-sm flex items-center gap-2"
        >
          <PlusCircle className="w-4 h-4" /> Nova Sala
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
          {auditoriums.length === 0 ? (
            <li className="text-center text-gray-500">
              Nenhuma sala cadastrada.
            </li>
          ) : (
            auditoriums.map((auditorium) => (
              <li
                key={auditorium.id}
                className="flex justify-between items-center p-4 bg-base-200 rounded-lg shadow-sm"
              >
                <div>
                  <p className="font-semibold text-lg">
                    #{auditorium.id} — Sala {auditorium.number}
                  </p>
                  <p className="text-sm opacity-75">
                    Status: {auditorium.status} &nbsp;|&nbsp; Tipo:{" "}
                    {auditorium.type.toUpperCase()} &nbsp;|&nbsp; Assentos:{" "}
                    {auditorium.seats}
                  </p>
                </div>

                <div className="flex gap-2">
                  <Link
                    to={`/auditoriums/edit/${auditorium.id}`}
                    className="btn btn-outline btn-sm flex items-center gap-2"
                  >
                    <Edit className="w-4 h-4" />
                    Editar
                  </Link>

                  <button
                    onClick={() => handleDelete(auditorium.id)}
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
