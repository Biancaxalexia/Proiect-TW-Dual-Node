// Pagina pentru trimiterea unui articol la o conferință
import { useParams, useNavigate } from "react-router-dom";
import { useState } from "react";
import api from "../api/api";

export default function SubmitArticle() {

  // Preluarea ID-ului conferinței din URL
  const { conferenceId } = useParams();
  const navigate = useNavigate();

  // Stări pentru datele articolului
  const [title, setTitle] = useState("");
  const [file, setFile] = useState(null);

  // Stare pentru mesajele de eroare
  const [error, setError] = useState("");

  // Funcție apelată la trimiterea formularului
  const submit = async (e) => {
    e.preventDefault();
    setError("");

    // Validare simplă unde titlul și fișierul sunt obligatorii
    if (!title || !file) {
      setError("Completează titlul și alege un fișier");
      return;
    }

    // Crearea obiectului pentru trimiterea fișierului
    const formData = new FormData();
    formData.append("title", title);
    formData.append("file", file);
    formData.append("conferenceId", conferenceId);

    try {
      console.log("Trimitem articol:", {
        title,
        conferenceId,
        file
      });

      await api.post("/submissions", formData);

      // Redirecționare către lista lucrărilor autorului
      navigate("/my-submissions");
    } catch (err) {
      console.error("Eroare submit articol:", err);
      setError("Eroare la trimiterea articolului");
    }
  };

  return (
    <div className="card">

      {/* Titlul paginii */}
      <h2>Trimite articol</h2>

      {/* Formular pentru trimiterea articolului */}
      <form onSubmit={submit}>

        {/* Titlul articolului */}
        <input
          placeholder="Titlu articol"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />

        {/* Selectarea fișierului */}
        <input
          type="file"
          onChange={(e) => setFile(e.target.files[0])}
        />

        {/* Mesaj de eroare */}
        {error && <div className="error">{error}</div>}

        <div className="actions">

          {/* Trimiterea articolului */}
          <button className="btn-primary">
            Trimite
          </button>

          {/* Anularea operației */}
          <button
            type="button"
            className="btn-secondary"
            onClick={() => navigate(-1)}
          >
            Anulează
          </button>

        </div>
      </form>
    </div>
  );
}
