import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Building2, Save, ArrowLeft } from "lucide-react";

export default function UpdateAuditorium() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [auditorium, setAuditorium] = useState(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState(null);

  useEffect(() => {
    async function fetchAuditorium() {
      try {
        const result = await window.auditoriumApi.getById(Number(id));
        if (result.success) {
          setAuditorium(result.data);
        } else {
          setMessage({ type: "error", text: result.message });
        }
      } catch (error) {
        console.error("Erro ao carregar sala:", error);
        setMessage({
          type: "error",
          text: "Erro ao buscar dados da sala. Verifique o console.",
        });
      } finally {
        setLoading(false);
      }
    }

    fetchAuditorium();
  }, [id]);

  function handleChange(e) {
    const { name, value } = e.target;
    setAuditorium((prev) => ({ ...prev, [name]: value }));
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setMessage(null);
    setSaving(true);

    try {
      const result = await window.auditoriumApi.update(id, auditorium);

      if (result.success) {
        setMessage({
          type: "success",
          text: "Sala atualizada com sucesso! 🎉",
        });
        setTimeout(() => navigate("/auditoriums"), 1000);
      } else {
        setMessage({ type: "error", text: result.message });
      }
    } catch (error) {
      console.error("Erro ao atualizar sala:", error);
      setMessage({
        type: "error",
        text: "Falha inesperada ao atualizar a sala.",
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

  if (!auditorium) {
    return (
      <div className="text-center mt-10">
        <p className="text-error font-semibold">
          {message?.text || "Sala não encontrada."}
        </p>
        <button
          onClick={() => navigate("/auditoriums")}
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
              <Building2 className="w-6 h-6" /> Editar Sala #{id}
            </h2>
            <button
              onClick={() => navigate("/auditoriums")}
              className="btn btn-outline btn-sm"
            >
              <ArrowLeft className="w-4 h-4" /> Voltar
            </button>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="label">
                <span className="label-text">Número da Sala</span>
              </label>
              <input
                type="number"
                name="number"
                value={auditorium.number}
                onChange={handleChange}
                className="input input-bordered w-full"
                min="1"
                required
              />
            </div>

            <div>
              <label className="label">
                <span className="label-text">Capacidade de Assentos</span>
              </label>
              <input
                type="number"
                name="seats"
                value={auditorium.seats}
                onChange={handleChange}
                className="input input-bordered w-full"
                min="1"
                required
              />
            </div>

            <div>
              <label className="label">
                <span className="label-text">Status</span>
              </label>
              <select
                name="status"
                value={auditorium.status}
                onChange={handleChange}
                className="select select-bordered w-full"
              >
                <option value="available">Disponível</option>
                <option value="unavailable">Indisponível</option>
              </select>
            </div>

            <div>
              <label className="label">
                <span className="label-text">Tipo</span>
              </label>
              <select
                name="type"
                value={auditorium.type}
                onChange={handleChange}
                className="select select-bordered w-full"
              >
                <option value="2d">2D</option>
                <option value="3d">3D</option>
              </select>
            </div>

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
