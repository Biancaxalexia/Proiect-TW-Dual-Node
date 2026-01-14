// Pagina pentru trimiterea unei versiuni revizuite a unei lucrări
import { useParams, useNavigate } from "react-router-dom";
import { useState } from "react";
import api from "../api/api";

export default function SubmitRevision() {

  // Preluarea ID-ului lucrării din URL
  const { id } = useParams();
  const navigate = useNavigate();

  // Stare pentru fișierul ales
  const [file, setFile] = useState(null);

  // Stare pentru mesajele de eroare
  const [error, setError] = useState("");

  // Funcție apelată la trimiterea reviziei
  const submit = async () => {
    setError("");

    // Validare: fișier obligatoriu
    if (!file) {
      setError("Trebuie să selectezi un fișier înainte de trimitere");
      return;
    }

    // Crearea obiect pentru upload
    const formData = new FormData();
    formData.append("file", file);

    try {
      // Trimiterea reviziei către backend
      await api.post(`/submissions/${id}/revision`, formData);

      // Redirecționare către lista lucrărilor autorului
      navigate("/my-submissions");
    } catch (err) {
      setError("Eroare la trimiterea reviziei");
    }
  };

  return (
    <div className="card">

      {/* Titlul paginii */}
      <h2>Trimite revizie</h2>

      {/* Selectarea fișierului */}
      <input
        type="file"
        onChange={(e) => setFile(e.target.files[0])}
      />

      {/* Mesaj de eroare */}
      {error && <div className="error">{error}</div>}

      <div className="actions">

        {/* Trimiterea reviziei */}
        <button className="btn-primary" onClick={submit}>
          Trimite
        </button>

        {/* Buton pentru revenire la pagina anterioară */}
        <button
          className="btn-secondary"
          onClick={() => navigate(-1)}
        >
          Înapoi
        </button>

      </div>
    </div>
  );
}
