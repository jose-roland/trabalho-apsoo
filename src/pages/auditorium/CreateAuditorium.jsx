import { useState } from "react";
import { Building2, Save } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function CreateAuditoriumForm() {
  const navigate = useNavigate();

  const [auditorium, setAuditorium] = useState({
    number: "",
    seats: "",
    status: "available",
    type: "2d",
  });

  const [message, setMessage] = useState(null);
  const [loading, setLoading] = useState(false);

  function handleChange(e) {
    const { name, value } = e.target;
    setAuditorium((prev) => ({ ...prev, [name]: value }));
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setMessage(null);
    setLoading(true);

    try {
      const result = await window.auditoriumApi.create(auditorium);

      if (result.success) {
        setMessage({ type: "success", text: "Sala criada com sucesso! 🎉" });
        setAuditorium({
          number: "",
          seats: "",
          status: "available",
          type: "2d",
        });
        setTimeout(() => navigate("/auditoriums"), 1000);
      } else {
        setMessage({ type: "error", text: result.message });
      }
    } catch (error) {
      console.error("Erro ao criar sala:", error);
      setMessage({
        type: "error",
        text: "Falha inesperada ao criar a sala. Verifique o console.",
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
            <Building2 className="w-6 h-6" /> Nova Sala
          </h2>

          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Número da Sala */}
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

            {/* Capacidade (Assentos) */}
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

            {/* Status */}
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

            {/* Tipo de Projeção */}
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
                {loading ? "Salvando..." : "Salvar Sala"}
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
