import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Home from "./pages/Home";
import Movies from "./pages/movie/Movies";
import CreateMovie from "./pages/movie/CreateMovie";
import UpdateMovie from "./pages/movie/UpdateMovie";

import CreateAuditoriumForm from "./pages/auditorium/CreateAuditorium";
import UpdateAuditorium from "./pages/auditorium/UpdateAuditorium";
import Auditoriums from "./pages/auditorium/Auditorium";

export default function App() {
  return (
    <Router>
      <div className="min-h-screen bg-base-200">
        {/* Navbar simples usando DaisyUI */}
        <div className="navbar bg-base-100 shadow-md">
          <div className="flex-1 px-4">
            <Link to="/" className="text-xl font-bold">
              🎬 Quadro a Quadro
            </Link>
          </div>
          <div className="flex gap-3 px-4">
            <Link to="/" className="btn btn-ghost btn-sm">
              Home
            </Link>
            <Link to="/movies" className="btn btn-ghost btn-sm">
              Filmes
            </Link>{" "}
            <Link to="/auditoriums" className="btn btn-ghost btn-sm">
              Salas
            </Link>
          </div>
        </div>

        {/* Área principal */}
        <div className="p-6">
          <Routes>
            <Route path="/" element={<Home />} />

            <Route path="/movies" element={<Movies />} />
            <Route path="/movies/new" element={<CreateMovie />} />
            <Route path="/movies/edit/:id" element={<UpdateMovie />} />

            <Route path="/auditoriums" element={<Auditoriums />} />
            <Route path="/auditoriums/new" element={<CreateAuditoriumForm />} />
            <Route
              path="/auditoriums/edit/:id"
              element={<UpdateAuditorium />}
            />
          </Routes>
        </div>
      </div>
    </Router>
  );
}
